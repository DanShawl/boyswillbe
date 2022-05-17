import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { client } from '../../utils/shopify'
import { ShopContext } from '../../context/shopContext'

const Product = ({ product }) => {
  const router = useRouter()
  const { productHandle } = router.query
  const [quantity, setQuantity] = useState(0)
  const { addItemToCheckout, checkout, removeLineItem } =
    useContext(ShopContext)

  // console.log(product)

  const addToCart = async () => {
    const storage = window.localStorage
    let checkoutId = storage.getItem('checkoutId')
    // console.log(checkoutId)
    if (!checkoutId) {
      const checkout = await client.checkout.create()
      checkoutId = checkout.id
    }
    storage.setItem('checkoutId', checkoutId)
  }

  return (
    <div>
      <p>Product: {productHandle}</p>
      <p>{product.title}</p>
      {/* video @ 1:28 for changing main image */}
      <img src={product.images[0].src} alt="" className="h-[300px]" />

      <div>
        <button onClick={() => addItemToCheckout(product.variants[0].id, 1)}>
          Add Item
        </button>

        {/* <button onClick={addToCart}>Add To Cart</button> */}
      </div>

      <div>
        {checkout.lineItems?.length ? (
          checkout.lineItems.map((item) => (
            <div>
              <h1>{item.title}</h1>
              <p onClick={() => removeLineItem(item.id)}>Remove</p>
            </div>
          ))
        ) : (
          <p>empty</p>
        )}
      </div>
    </div>

    //
    //
  )
}

export const getServerSideProps = async ({ query }) => {
  // const products = await client.product.fetchAll() // Fetch products
  const productHandle = query.productHandle
  const product = await client.product.fetchByHandle(productHandle)
  // const product = await client.product.fetch(productHandle)
  return {
    props: {
      product: product,
      // infos: JSON.parse(JSON.stringify(infos)),
      // policies: JSON.parse(JSON.stringify(policies)),
      product: JSON.parse(JSON.stringify(product)),
      // product: JSON.parse(JSON.stringify(product)),
    },
  }
}

export default Product
