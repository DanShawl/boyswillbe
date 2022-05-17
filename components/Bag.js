import React, { useState, useContext } from 'react'
// import { ShopContext } from '../../context/shopContext'
import { ShopContext } from '../context/shopContext'
import { BsChevronDown } from 'react-icons/bs'

const Bag = () => {
  // const [openBag, setOpenBag] = useState(false)
  const { checkout, removeLineItem, isBagOpen, openBag, closeBag } =
    useContext(ShopContext)

  return (
    <div
      className={
        (isBagOpen
          ? 'bottom-0 px-5 sm:h-[500px] sm:w-64 sm:overflow-y-scroll md:top-0 '
          : '-bottom-full ') +
        ' fixed bottom-0 z-20 w-full items-center space-y-0 rounded-t-md bg-white px-5 pt-12 pb-5 font-normal leading-5 text-black shadow-[0px_0_30px_0px_rgba(67,67,67,0.5)] transition-[bottom] duration-500 sm:left-0  md:space-y-0 md:transition-[left]'
      }
    >
      <button
        onClick={() => closeBag()}
        className="absolute top-2 left-0 flex w-full justify-center py-2"
      >
        <BsChevronDown />
      </button>
      {checkout.lineItems?.length ? (
        <p className="pb-3">
          {checkout.lineItems?.length} ITEM
          {checkout.lineItems?.length > 1 ? 'S' : null}
        </p>
      ) : null}

      {/* Items list */}
      {checkout.lineItems?.length ? (
        checkout.lineItems.map((item) => (
          <div className="grid grid-cols-3 gap-3 text-xs">
            <img className="mb-3" src={item.variant?.image.src} alt="" />
            <div>
              <h2 className="mb-3 uppercase">
                <strong>{item.title}</strong>{' '}
              </h2>
              <p className="text-xs uppercase">
                {item.variant?.selectedOptions[0].name}{' '}
                <strong>{item.variant?.title}</strong>
              </p>
              <p className="text-xs uppercase">
                {' '}
                QUANTITY <strong>{item.quantity}</strong>
              </p>
            </div>
            <div className="text-right">
              <p className="mb-3">$ {item.variant?.price} </p>
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
        <div className="h-[60vh]">Your bag is empty.</div>
      )}

      {checkout.lineItems?.length ? (
        <div>
          <button className="mt-2 w-full bg-black py-3 text-sm uppercase text-white">
            PROCEED TO CHECKOUT
          </button>
          <button onClick={() => closeBag()} className="mt-2 w-full">
            Continue Shopping
          </button>
        </div>
      ) : (
        <button
          onClick={() => closeBag()}
          className="w-full bg-black py-2 text-sm uppercase text-white"
        >
          Start Shopping
        </button>
      )}
    </div>
  )
}

export default Bag
