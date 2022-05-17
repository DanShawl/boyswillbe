import Image from 'next/image'
import Link from 'next/link'
import { client } from '../utils/shopify'
import boyswillbeimg from '../public/boyswillbe-hero-image.jpg'
console.log(client)

export default function Home({ products, product }) {
  console.log(products)
  console.log(product)
  return (
    <div className="z-10 flex items-center justify-center">
      <div className="hero-image relative h-screen max-h-screen md:p-10">
        {/* <Image
          src={'/../public/boyswillbe-hero-image.jpg'}
          width={500}
          height={650}
          objectFit={'contain'}
        /> */}
        {/* <Image src={boyswillbeimg} objectFit={'contain'} /> */}

        <img
          src="/boyswillbe-hero-image.jpg"
          alt=""
          className="h-[100%] object-cover "
        />
        <div className="absolute inset-x-0 bottom-[50%] text-center leading-4 text-black">
          <Link href="/bags">
            <button className="bg-white py-2 px-3 text-sm font-normal ">
              DISCOVER THE COLLECTION
            </button>
          </Link>
        </div>
      </div>

      {/* <Image src={boyswillbeimg} objectFit={'cover'} /> */}
    </div>

    // <div>
    //   <ul>
    //     {products.map((product) => {
    //       // console.log(product)
    //       return (
    //         <li key={product.id}>
    //           <Link href={`/product/${product.handle}`}>
    //             <div>
    //               {/* <Image src={product.images[0].src} width="10px" height="10px" /> */}
    //               <img
    //                 src={product.images[0].src}
    //                 alt=""
    //                 className="h-[300px]"
    //               />
    //               <a>{product.title}</a>
    //             </div>
    //           </Link>
    //         </li>
    //       )
    //     })}
    //   </ul>
    // </div>
  )
}

export const getServerSideProps = async () => {
  // const products = await client.product.fetchAll() // Fetch products
  const products = await client.product.fetchAll() // Fetch products
  // const product = await client.product.fetchByHandle()
  return {
    props: {
      // infos: JSON.parse(JSON.stringify(infos)),
      // policies: JSON.parse(JSON.stringify(policies)),
      products: JSON.parse(JSON.stringify(products)),
      // product: JSON.parse(JSON.stringify(product)),
    },
  }
}

// import type { NextPage } from 'next'
// import React, { useContext, useEffect } from 'react'

// // import { ShopContext } from '../context/shopContext'

// // import { client } from '../context/shopContext'

// import { client } from '../utils/shopify'

// console.log(client)

// export default function Home({ products }) {
//   return (
//     <div>
//       hello
//       {/*  */}
//       {/*  */}
//     </div>
//   )
// }

// // const Home: NextPage = (props) => {
// //   console.log(props)
// //   return <div>Hello World</div>
// // }
// export const getServerSideProps = async () => {
//   const products = await client.product.fetchAll() // Fetch product

//   return {
//     props: {
//       // infos: JSON.parse(JSON.stringify(infos)),
//       // policies: JSON.parse(JSON.stringify(policies)),
//       products: JSON.parse(JSON.stringify(products)),
//     },
//   }
// }

// // const Home: NextPage = () => {
// //   const { fetchAllProducts, products } = useContext(ShopContext)

// //   useEffect(() => {
// //     fetchAllProducts()
// //   }, [fetchAllProducts])

// //   if (!products) return <div>Loading...</div>

// //   return (
// //     <div>
// //       <h1>Hello</h1>
// //     </div>
// //   )
// // }

// // export default Home
