import React from 'react'
import Link from 'next/link'

const SideNav = () => {
  return (
    <div className="sticky top-0 flex flex-col px-3 md:h-screen md:items-end md:px-6 md:pt-12">
      <ul className="flex justify-between px-5 py-5 md:flex-col md:space-y-1 md:text-right">
        <div>
          <li className="text-xs md:text-[11px]">
            <Link href="/">
              <a>ABOUT</a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="/about">
              <a>DONATE</a>
            </Link>
          </li>
        </div>

        <br />
        <div className="text-right">
          <li className="text-xs md:text-[11px]">
            <Link href="/about">
              <a>FACEBOOK</a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="/about">
              <a>TWITTER</a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="/about">
              <a>INSTAGRAM</a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="/about">
              <a>TIK TOK</a>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default SideNav
