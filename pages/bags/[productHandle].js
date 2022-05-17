import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { client } from '../../utils/shopify'
import { ShopContext } from '../../context/shopContext'
import { MdCircle } from 'react-icons/md'

const Product = ({ product }) => {
  const router = useRouter()
  const { productHandle } = router.query
  const [quantity, setQuantity] = useState(0)
  const { addItemToCheckout, checkout, removeLineItem } =
    useContext(ShopContext)

  console.log(product)

  // const addToCart = async () => {
  //   const storage = window.localStorage
  //   let checkoutId = storage.getItem('checkoutId')
  //   console.log(checkoutId)
  //   if (!checkoutId) {
  //     const checkout = await client.checkout.create()
  //     checkoutId = checkout.id
  //   }
  //   storage.setItem('checkoutId', checkoutId)
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7">
      <div>
        <div className="md:col-span-4">
          <img
            src={product.images[0].src}
            alt=""
            // className="h-[300px]"
          />
        </div>
        {/* <div className="col-span-1 grid grid-cols-3">
          <img
            src={product.images[0].src}
            alt=""
            // className="h-[300px]"
          />
          <img
            src={product.images[0]?.src}
            alt=""
            // className="h-[300px]"
          />
          <img
            src={product.images[0].src}
            alt=""
            // className="h-[300px]"
          />
        </div> */}
      </div>
      <div className="col-span-2 px-4 pt-6 md:ml-6 md:pt-6">
        <div>
          <p className="text-sm uppercase">{product.productType}</p>
          <h2 className="text-normal pb-3 font-bold uppercase md:text-lg">
            {product.title}
          </h2>
        </div>

        <div className="flex justify-between pb-5">
          <p className="text-sm font-bold">$ {product.variants[0].price}</p>
          <div className="flex items-center gap-x-2 text-sm uppercase">
            <MdCircle
              className={`text-xs ${
                product.availableForSale ? 'text-green-300' : 'text-red-500'
              }`}
            />
            <p>{product.availableForSale ? 'In Stock' : 'Out of Stock'}</p>
            {/* {product.availableForSale ? 'green.300' : 'red.500'} */}
          </div>
        </div>
        {/* <div>
          {product.variants.map((variant) => (
            <h2>{variant.title}</h2>
          ))}
        </div> */}
        <div>
          <button
            className="w-full bg-black py-2 text-sm text-white"
            onClick={() => addItemToCheckout(product.variants[0].id, 1)}
          >
            PLACE IN BAG
          </button>
        </div>
      </div>
      {/* video @ 1:28 for changing main image */}
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
