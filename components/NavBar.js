import React, { useState, useContext } from 'react'
import {
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineShoppingBag,
} from 'react-icons/md'
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
          className="ml-2 flex items-center space-x-2 text-left text-2xl font-extrabold sm:items-start sm:text-left sm:text-sm md:ml-0  md:flex-col md:space-x-0 lg:flex-row lg:space-x-2"
        >
          {/* <h1 className="text-lg">BOYS WILL BE</h1> */}

          <img
            src="../../boyswillbe-logo.jpg"
            alt=""
            className="-mt-1 h-9 w-9 object-cover"
          />
          <h1 className="nav__title mt-2 tracking-tighter">BOYS WILL BE</h1>
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
          (openNav ? 'left-0 flex-1' : '-left-full ') +
          ' transition-left fixed bottom-0 top-14 w-full items-center space-y-3  bg-white px-5 pt-8 font-semibold leading-3 text-black duration-500 sm:pt-12  md:static md:w-auto md:space-y-0 md:bg-transparent md:px-0 md:font-normal lg:pt-8'
        }
        // className="flex items-center justify-between space-x-7 p-2 text-gray-700"
      >
        <h3 className="pb-3 md:hidden">APPAREL</h3>
        <li
          className={`text-xs text-zinc-700 md:text-[11px] md:text-black`}
          onClick={() => setOpenNav(!openNav)}
        >
          <Link href="/bags">
            <a>SHOP BAGS</a>
          </Link>
        </li>
        <li className={`text-xs text-zinc-700 md:text-[11px] md:text-black`}>
          <Link href="/bags">
            <a>SHOP HOODIES</a>
          </Link>
        </li>
        <li className={`text-xs text-zinc-700 md:text-[11px] md:text-black`}>
          <Link href="/bags">
            <a>SHOP HATS</a>
          </Link>
        </li>

        <br />
        <br />
        {/* <li className={`text-xs md:text-[11px]`} onClick={() => openBag()}>
          <Link href="">
            <a>
              MY BAG{' '}
              {checkout.lineItems?.length ? (
                <strong>({checkout.lineItems?.length} ITEMS)</strong>
              ) : null}
            </a>
          </Link>
        </li> */}
        <li className={`text-xs text-zinc-700 md:text-[11px] md:text-black`}>
          <Link href="/bags">
            <a>COLLECTIONS</a>
          </Link>
        </li>
        <li className={`text-xs text-zinc-700 md:text-[11px] md:text-black`}>
          <Link href="/bags">
            <a>NEW ARRIVALS</a>
          </Link>
        </li>

        <h3 className=" pt-10 pb-3 md:hidden">
          MY BAG (
          {checkout.lineItems?.length ? checkout.lineItems?.length : '0'})
        </h3>

        <div className="flex space-x-1 overflow-x-scroll md:hidden">
          {checkout.lineItems?.length
            ? checkout.lineItems?.map((item) => (
                <img
                  key={item.id}
                  src={item.variant?.image.src}
                  alt=""
                  className=" w-[45%] cursor-pointer sm:w-[30%]"
                  onClick={() => {
                    setOpenNav(!openNav)
                    openBag()
                  }}
                />
              ))
            : null}
        </div>
        {checkout.lineItems?.length ? (
          <Link href={checkout.webUrl} className="">
            <div className="flex items-center space-x-0 sm:hidden">
              <button className="text-xs font-medium">GO TO CHECKOUT</button>
              <MdChevronRight />
            </div>
          </Link>
        ) : null}
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
