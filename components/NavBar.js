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

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false)
  const { isBagOpen, openBag, closeBag, checkout } = useContext(ShopContext)
  const linkFontSize = 11
  return (
    <nav className="sticky top-0 z-20 h-12 flex-col items-center justify-center bg-white px-3 md:h-screen md:pl-10 md:pt-6">
      <div className="flex h-[100%] items-center justify-between text-left md:h-7 md:items-start">
        <a href="/" className="text-left text-2xl font-extrabold sm:text-sm">
          {/* <h1 className="text-lg">BOYS WILL BE</h1> */}

          <img
            src="../../boyswillbe-logo.jpg"
            alt=""
            className="-mt-1 h-9 w-9 object-cover"
          />
        </a>
        <div className="flex">
          {openNav ? null : (
            <div className="flex">
              <BsBag
                onClick={() => openBag()}
                className="block h-8 w-8 cursor-pointer p-2 md:hidden"
              />
              {checkout.lineItems?.length ? (
                <div
                  onClick={() => openBag()}
                  className=" mt-1 -ml-3 flex h-3 w-3 items-center justify-center bg-neutral-800 text-[8px] text-white md:hidden"
                >
                  {checkout.lineItems?.length
                    ? checkout.lineItems?.length
                    : null}
                </div>
              ) : null}
            </div>
          )}
          {openNav ? (
            <BsChevronLeft
              onClick={() => setOpenNav(!openNav)}
              className="block h-8 w-8 cursor-pointer p-2 md:hidden"
            />
          ) : (
            <BsList
              onClick={() => setOpenNav(!openNav)}
              className="block h-8 w-8 cursor-pointer p-2 md:hidden"
            />
          )}
        </div>
      </div>

      <ul
        className={
          (openNav ? 'left-0 flex-1 px-5 ' : '-left-full ') +
          ' transition-left fixed bottom-0 top-10 w-full items-center space-y-0 bg-white  pt-5 font-normal leading-3 text-black duration-500 md:static md:w-auto md:space-y-0 md:bg-transparent'
        }
        // className="flex items-center justify-between space-x-7 p-2 text-gray-700"
      >
        <li
          className={`text-xs md:text-xs`}
          onClick={() => setOpenNav(!openNav)}
        >
          <Link href="/bags">
            <a>SHOP BAGS</a>
          </Link>
        </li>
        <li className={`text-xs md:text-xs`}>
          <Link href="/">
            <a>SHOP HOODIES</a>
          </Link>
        </li>
        <li className={`text-xs md:text-xs`}>
          <Link href="/">
            <a>SHOP HATS</a>
          </Link>
        </li>

        <br />
        <li className={`text-xs md:text-xs`} onClick={() => openBag()}>
          <Link href="/">
            <a>
              BAG{' '}
              {checkout.lineItems?.length ? (
                <strong>({checkout.lineItems?.length} ITEMS)</strong>
              ) : null}
            </a>
          </Link>
        </li>
        <li className={`text-xs md:text-xs`}>
          <Link href="/">
            <a>COLLECTIONS</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar