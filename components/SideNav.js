import React from 'react'
import Link from 'next/link'

const SideNav = () => {
  return (
    <div className="sticky top-0 flex flex-col border-t border-neutral-300 px-3 sm:pt-12 md:mt-0 md:h-screen md:items-end md:border-none md:px-6">
      <ul className="flex justify-between px-5 py-5 md:flex-col md:space-y-1 md:text-right">
        <div>
          <li className="text-xs md:text-[11px]">
            <Link href="/bags">
              <a>ABOUT</a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="/bags">
              <a>DONATE</a>
            </Link>
          </li>
        </div>

        <br />
        <div className="text-right">
          <li className="text-xs md:text-[11px]">
            <Link href="https://www.instagram.com/kwam_/">
              <a target="_blank" rel="noreferrer">
                FACEBOOK
              </a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="https://www.instagram.com/kwam_/">
              <a target="_blank" rel="noreferrer">
                TWITTER
              </a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="https://www.instagram.com/kwam_/">
              <a target="_blank" rel="noreferrer">
                INSTAGRAM
              </a>
            </Link>
          </li>
          <li className="text-xs md:text-[11px]">
            <Link href="https://www.instagram.com/kwam_/">
              <a target="_blank" rel="noreferrer">
                TIK TOK
              </a>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default SideNav
