import React, { useState, useContext } from 'react'
import { MdMenu, MdChevronLeft, MdOutlineShoppingBag } from 'react-icons/md'
import Link from 'next/link'
import {
  BsList,
  BsHandbag,
  BsChevronRight,
  BsChevronLeft,
  BsBag,
} from 'react-icons/bs'

import { ShopContext } from '../context/shopContext'

// import { client } from '../utils/shopify'

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false)
  const { isBagOpen, openBag, closeBag, checkout } = useContext(ShopContext)
  const linkFontSize = 11
  return (
    <nav className="sticky top-0 z-20 h-14 flex-col items-center justify-center bg-white px-3 md:h-screen md:pl-10 md:pt-6">
      <div className="flex h-[100%] items-center justify-between text-left md:h-7 md:items-start">
        <a
          href="/"
          className="ml-2 text-left text-2xl font-extrabold sm:text-sm"
        >
          {/* <h1 className="text-lg">BOYS WILL BE</h1> */}

          <img
            src="../../boyswillbe-logo.jpg"
            alt=""
            className="-mt-1 h-9 w-9 object-cover"
          />
        </a>
        <div className="flex">
          {/* {openNav ? null : ( */}
          <div className="flex">
            <BsBag
              onClick={() => openBag()}
              className="block h-9 w-9 cursor-pointer p-2 md:hidden"
            />
            {checkout.lineItems?.length ? (
              <div
                onClick={() => openBag()}
                className=" mt-1 -ml-3 flex h-3 w-3 items-center justify-center text-[9px] md:hidden"
              >
                {checkout.lineItems?.length ? checkout.lineItems?.length : null}
              </div>
            ) : null}
          </div>
          {/* )} */}
          {openNav ? (
            <BsChevronLeft
              onClick={() => setOpenNav(!openNav)}
              className="block h-9 w-9 cursor-pointer p-2 md:hidden"
            />
          ) : (
            <BsList
              onClick={() => setOpenNav(!openNav)}
              className="block h-9 w-9 cursor-pointer p-2 md:hidden"
            />
          )}
        </div>
      </div>

      <ul
        className={
          (openNav ? 'left-0 flex-1 px-5 ' : '-left-full ') +
          ' transition-left fixed bottom-0 top-14 w-full items-center space-y-3  bg-white pt-8 font-semibold leading-3 text-black duration-500 md:static md:w-auto md:space-y-0 md:bg-transparent md:font-normal'
        }
        // className="flex items-center justify-between space-x-7 p-2 text-gray-700"
      >
        <h3 className="pb-3 md:hidden">APPAREL</h3>
        <li
          className={`text-xs md:text-[11px]`}
          onClick={() => setOpenNav(!openNav)}
        >
          <Link href="/bags">
            <a>SHOP BAGS</a>
          </Link>
        </li>
        <li className={`text-xs md:text-[11px]`}>
          <Link href="/bags">
            <a>SHOP HOODIES</a>
          </Link>
        </li>
        <li className={`text-xs md:text-[11px]`}>
          <Link href="/bags">
            <a>SHOP HATS</a>
          </Link>
        </li>

        <br />
        <li className={`text-xs md:text-[11px]`} onClick={() => openBag()}>
          <Link href="/">
            <a>
              BAG{' '}
              {checkout.lineItems?.length ? (
                <strong>({checkout.lineItems?.length} ITEMS)</strong>
              ) : null}
            </a>
          </Link>
        </li>
        <li className={`text-xs md:text-[11px]`}>
          <Link href="/bags">
            <a>COLLECTIONS</a>
          </Link>
        </li>
        <h3 className=" pt-10 pb-3 md:hidden">MY BAG</h3>
        <div className="flex space-x-1 overflow-x-scroll md:hidden">
          {checkout.lineItems?.length
            ? checkout.lineItems?.map((item) => (
                <img
                  src={item.variant?.image.src}
                  alt=""
                  className=" w-[45%]"
                />
              ))
            : null}
        </div>
      </ul>
    </nav>
  )
}

export default NavBar

// export const getServerSideProps = async () => {
//   // const products = await client.product.fetchAll() // Fetch products
//   const collections = await client.collection.fetchAllWithProducts() // Fetch products
//   // const product = await client.product.fetchByHandle()
//   return {
//     props: {
//       collections: JSON.parse(JSON.stringify(collections)),
//       // infos: JSON.parse(JSON.stringify(infos)),
//       // policies: JSON.parse(JSON.stringify(policies)),
//       // products: JSON.parse(JSON.stringify(products)),
//       // product: JSON.parse(JSON.stringify(product)),
//     },
//   }
// }
