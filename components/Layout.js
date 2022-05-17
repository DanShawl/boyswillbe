import React from 'react'
import NavBar from './NavBar'
import SideNav from './SideNav'
import Bag from './Bag'
import { MuiBag } from './MuiBag.js'

const Layout = ({ children }) => {
  return (
    <div className="grid-cols-5 md:grid">
      <NavBar />
      <MuiBag />
      {/* <Bag /> */}
      {/* <div className="col-span-3 flex items-center justify-center md:py-10"> */}
      {/* <div className="col-span-3 md:py-10">{children}</div> */}
      <div className="col-span-3">{children}</div>
      <SideNav />
    </div>
  )
}

export default Layout
