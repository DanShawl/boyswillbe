import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { client } from '../../utils/shopify'
import { ShopContext } from '../../context/shopContext'
import { MdCircle } from 'react-icons/md'
import Image from 'next/dist/client/image'
// import { Head } from 'next/dist/shared/lib/head'

const Product = ({ product }) => {
  const router = useRouter()
  const { productHandle } = router.query
  const [quantity, setQuantity] = useState(0)
  const { addItemToCheckout, checkout, removeLineItem } =
    useContext(ShopContext)

  const [topImage, setTopImage] = useState(product.images[0])

  // console.log(product)

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
    <div className="mb-8 grid grid-cols-1 tracking-tight md:grid-cols-7">
      {/* <Head>
        <title>
          Boys Will Be | Bags {'>'} {product.title}
        </title>
      </Head> */}
      <div>
        <div className="md:col-span-4">
          <img
            // src={product.images[0].src}
            src={topImage.src}
            alt=""
            // className="h-[300px]"
            className="max-h-[500px] w-full object-cover"
          />
        </div>
        {/* <div className="col-span-1  grid grid-cols-3"> */}
        <div className="mt-1 flex space-x-1 overflow-x-scroll md:hidden">
          {product.images.map((productImage) => (
            // <Image
            //   src={productImage.src}
            //   onClick={() => setTopImage(productImage)}
            //   width={60}
            //   height={100}
            //   objectFit="cover"
            // />
            <img
              src={productImage.src}
              alt=""
              className="w-[30%]"
              onClick={() => setTopImage(productImage)}
            />
          ))}
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
          <p className="text-xs uppercase">{product.productType}</p>
          <h2 className="text-normal pb-3 font-semibold uppercase md:text-lg">
            {product.title}
          </h2>
        </div>

        <div className="flex justify-between pb-5">
          <p className="text-sm font-semibold">$ {product.variants[0].price}</p>
          <div className="flex items-center gap-x-2 text-xs uppercase">
            <MdCircle
              className={`text-xs ${
                product.availableForSale ? ' text-green-500' : 'text-red-500'
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
        <div className="mb-3">
          {product.availableForSale ? (
            <button
              className="w-full bg-black py-2 text-sm text-white "
              onClick={() => addItemToCheckout(product.variants[0].id, 1)}
            >
              PLACE IN BAG
            </button>
          ) : (
            <button
              className="w-full bg-neutral-200 py-2 text-sm text-black "
              disabled
              onClick={() => addItemToCheckout(product.variants[0].id, 1)}
            >
              OUT OF STOCK
            </button>
          )}
        </div>
        <p className="text-xs font-light">{product.description}</p>
        <ul className="py-3">
          {product.options.map((option) => (
            <li className="flex space-x-2 text-xs uppercase">
              <p>
                <strong>{option.name}</strong>
              </p>
              <p>{option.values[0].value}</p>
            </li>
          ))}
        </ul>
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
      product: JSON.parse(JSON.stringify(product)),
      // policies: JSON.parse(JSON.stringify(policies)),
      // product: JSON.parse(JSON.stringify(product)),
    },
  }
}

export default Product
