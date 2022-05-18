import React from 'react'
import { client } from '../../utils/shopify'
import Link from 'next/dist/client/link'
import Head from 'next/dist/shared/lib/head'

export default function Bags({ products }) {
  return (
    <div className="mx-1 mb-8 grid grid-cols-2 lg:grid-cols-3">
      <Head>
        <title>Boys Will Be | Bags</title>
      </Head>
      {products
        ? products.map((product) => (
            <Link href={`/bags/${product.handle}`} className="cursor-pointer">
              <div className="mx-1 mb-6 cursor-pointer tracking-tight">
                <img className="mb-2" src={product.images[0].src} alt="" />
                <h2 className="mb-1 text-xs font-semibold uppercase">
                  {product.title}
                </h2>
                <p className="text-xs">$ {product?.variants[0]?.price}</p>
              </div>
            </Link>
          ))
        : null}
    </div>
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
