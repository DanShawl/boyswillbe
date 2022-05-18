import React, { useState, useEffect, useContext } from 'react'
import {
  Drawer,
  Box,
  Typography,
  SwipeableDrawer,
  Divider,
} from '@mui/material'
import { ShopContext } from '../context/shopContext'
import Link from 'next/link'

export const MuiBag = () => {
  const { checkout, removeLineItem, isBagOpen, openBag, closeBag } =
    useContext(ShopContext)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [isDesktop, setDesktop] = useState(false)

  useEffect(() => {
    if (window.innerWidth > 640) {
      setDesktop(true)
    } else {
      setDesktop(false)
    }

    const updateMedia = () => {
      if (window.innerWidth > 640) {
        setDesktop(true)
      } else {
        setDesktop(false)
      }
    }
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  }, [])

  // const updateMedia = () => {
  //   setDesktop(window.innerWidth > 1050)
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', updateMedia)
  //   return () => window.removeEventListener('resize', updateMedia)
  // })

  return (
    <>
      <SwipeableDrawer
        anchor={isDesktop ? 'right' : 'bottom'}
        open={isBagOpen}
        onClose={() => closeBag(false)}
        onOpen={() => openBag(true)}
      >
        {/* <Divider></Divider> */}
        <Box
          p={2}
          className="w-screen px-3 tracking-tight sm:w-[400px] lg:w-[550px]"
          // textAlign={'center'}
          role="presentation"
        >
          {checkout.lineItems?.length ? (
            <div className="pb-5">
              <Link href={checkout.webUrl}>
                <button className="mt-2 w-full bg-neutral-900 py-2 text-xs font-semibold uppercase text-white">
                  GO TO CHECKOUT
                </button>
              </Link>
              <button
                onClick={() => closeBag()}
                className="mt-2 w-full text-xs underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <button
              onClick={() => closeBag()}
              className="mb-5 w-full bg-neutral-900 py-2 text-xs font-semibold uppercase text-white"
            >
              Start Shopping
            </button>
          )}
          {checkout.lineItems?.length ? (
            <p className="pb-3 font-semibold">
              {checkout.lineItems?.length} ITEM
              {checkout.lineItems?.length > 1 ? 'S' : null}
            </p>
          ) : null}

          {/* Items list */}
          {checkout.lineItems?.length ? (
            checkout.lineItems.map((item) => (
              <div className="grid grid-cols-6 gap-3 text-xs" key={item.id}>
                {/* {console.log(item)} */}
                <img
                  className="col-span-2 mb-3 max-h-36 w-full object-cover object-bottom"
                  src={item.variant?.image.src}
                  alt=""
                />
                <div className=" col-span-3">
                  <h2 className="mb-3 uppercase">
                    <strong>{item.title}</strong>{' '}
                  </h2>
                  {/* <p className="text-xs uppercase">
                    {item.variant?.selectedOptions[0].name}{' '}
                    <strong>{item.variant?.title}</strong>
                  </p> */}
                  <p className="text-xs uppercase">
                    {' '}
                    QUANTITY <strong>{item.quantity}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-3">
                    {' '}
                    <strong>$ {item.variant?.price}</strong>
                  </p>
                  <button
                    onClick={() => removeLineItem(item.id)}
                    className="uppercase text-neutral-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-[60vh] items-center justify-center text-center">
              <p>Your bag is empty.</p>
            </div>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  )
}
