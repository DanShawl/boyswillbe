import React, { Children, Component } from 'react'
import Client from 'shopify-buy'
import { client } from '../utils/shopify'

const ShopContext = React.createContext()

// export const client = Client.buildClient({
//   domain: process.env.SHOPIFY_STORE_DOMAIN,
//   storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
// })

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

class ShopProvider extends Component {
  state = {
    product: {},
    products: [],
    checkout: {},
    isBagOpen: false,
    isMenuOpen: false,
  }

  // componentDidMount() {
  //   if (localStorage.checkout_id) {
  //     this.fetchCheckout(localStorage.checkout_id)
  //   } else {
  //     this.createCheckout()
  //   }
  // }
  componentDidMount() {
    if (localStorage.checkoutId) {
      this.fetchCheckout(localStorage.checkoutId)
    } else {
      this.createCheckout()
    }
  }

  createCheckout = async () => {
    const storage = window.localStorage
    let checkoutId = storage.getItem('checkoutId')
    if (!checkoutId) {
      const checkout = await client.checkout.create()
      checkoutId = checkout.id
    }

    storage.setItem('checkoutId', checkoutId)
  }

  // createCheckout = async () => {
  //   //  Creates checkout ID
  //   const checkout = await client.checkout.create()
  //   localStorage.setItem('checkout_id', checkout.id)
  //   this.setState({ checkout: checkout })
  //   console.log(checkout.id)
  // }

  fetchCheckout = (checkoutId) => {
    client.checkout.fetch(checkoutId).then((checkout) => {
      this.setState({ checkout: checkout })
    })
    // console.log(checkoutId)
  }

  addItemToCheckout = async (variantId, quantity) => {
    // const variant = variantId.slice(29)

    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
        //  quanitity 10 is the base
      },
    ]

    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    )

    this.setState({ checkout: checkout })
    //  addLineItems was provided by shopify
    // console.log(checkout.lineItems)
    this.openBag()
  }

  removeLineItem = async (lineItemIdsToRemove) => {
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      lineItemIdsToRemove
    )
    this.setState({ checkout: checkout })
  }

  openBag = () => {
    this.setState({ isBagOpen: true })
  }

  closeBag = () => {
    this.setState({ isBagOpen: false })
  }

  // fetchAllProducts = async () => {
  //   const products = await client.product.fetchAll()
  //   this.setState({ products: products })
  // }

  // fetchProductWithHandle = async (handle) => {
  //   const product = await client.product.fetchByHandle(handle)
  //   this.setState({ product: product })

  //   return product
  // }

  // closeCart = () => {
  //   this.setState({ isCartOpen: false })
  // }

  // openCart = () => {
  //   this.setState({ isCartOpen: true })
  // }

  // closeMenu = () => {
  //   this.setState({ isMenuOpen: false })
  // }

  // openMenu = () => {
  //   this.setState({ isMenuOpen: true })
  // }

  // toggleBag = () => {
  //   this.setState({ toggleBag: !toggleBag })
  // }

  // toggleBag = () => {

  //   this.setState(prevState => ({
  //     isBagOpen: !prevState.isBagOpen
  //   }));
  // }

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          //   fetchAllProducts: this.fetchAllProducts,
          //   fetchProductWithHandle: this.fetchProductWithHandle,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          closeBag: this.closeBag,
          openBag: this.openBag,
          //   closeMenu: this.closeMenu,
          //   openMenu: this.openMenu,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}

const ShopConsumer = ShopContext.Consumer
export { ShopConsumer, ShopContext }

export default ShopProvider

//---------------
// class ShopProvider extends Component {
//   state = {
//     product: {},
//     products: [],
//     checkout: {},
//     isCartOpen: false,
//     isMenuOpen: false,
//   }

//   createCheckout = async () => {}

//   fetchCheckout = async () => {}

//   addItemToCheckout = async () => {}

//   removeLineItem = async (lineItemIdsToRemove) => {}

//   fetchAllProducts = async () => {}

//   fetchProductWithHandle = async (handle) => {}
