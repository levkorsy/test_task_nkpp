<template>
  <div class="main-container">
    <MainCatalog
        :item-stock="itemStock"
        :dollar-rate="dollarRate"
    />
    <Cart :cart-items="cartItems" :key="key" :dollar-rate="dollarRate" @resetCart="()=>{ cartItems = {} }"/>
  </div>

</template>

<script>
import MainCatalog from "../components/Catalog/MainCatalog.component";
import Cart from "../components/Cart/Cart";
import data from "../dump_db/data.json"
import names from "../dump_db/names.json"
import EventBus from '../eventBus'

export default {
  name: "Main",
  components: {Cart, MainCatalog},
  created() {
    this.fetchDataWithInterval()  // Simulates fetching data
  },
  mounted() {
    EventBus.$on('add_item', (payload) => {
      this.addToCart(payload)  // Emit listener for adding items to cart
    })
    EventBus.$on('remove_item', (payload) => {
      this.removeFromCart(payload) // Emit listener for removing items to cart
    })
  },
  data() {
    return {
      itemTitles: {},
      itemStock: [],
      dollarRate: {
        previous: 45,
        current: 45
      },
      cartItems: {},
      key: 0
    }
  },
  methods: {
    //Function adds item to cart array. Gets object
    addToCart(item) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.cartItems.hasOwnProperty(item.id)) {   // Checks if item is already in the cart adn updates amount
        let amount = this.cartItems[item.id]['amount'];
        delete this.cartItems[item.id]['amount']
        this.cartItems = Object.assign({}, this.cartItems, {      // Used Object.assign for Vue reactivity
          [item.id]: {amount: amount + 1, title: item.title, price: item.price, id: item.id, quantity: item.quantity},
        });
      } else { // Adds item to cart
        this.cartItems = Object.assign({}, this.cartItems, {
          [item.id]: {amount: 1, title: item.title, price: item.price, id: item.id, quantity: item.quantity},
        });
      }
    },
    //Function removes item to cart array. Gets object
    removeFromCart(item) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.cartItems.hasOwnProperty(item.id)) { // Checks if item is in the cart adn updates amount
        this.cartItems[item.id].amount -= 1 // If item amount bigger than 1 subtracts 1
        if (this.cartItems[item.id].amount < 1) {  // If item amount smaller than 1 deletes item
          delete this.cartItems[item.id]
        }
      }
      this.updateStock(item.id)   // Updates stock of items after removing
    },
    // Simulates fetching data request
    fetchDataWithInterval() {
      this.sortItemsByGroup(data.Value.Goods, names)  // Separates items due the categories
      setInterval(() => {
        this.fetchData()// Simulates API request
      }, 15000)
    },
    // Simulates API request for dollar rate. Gets min and max numbers
    getDollarRate(min, max) {
      this.dollarRate.previous = this.dollarRate.current
      this.dollarRate.current = Math.floor(Math.random() * (max - min + 1)) + min
    },
    //Function simulates API request to server
    async fetchData() {
      await this.getDollarRate(20, 80)  // Simulates API request for dollar rate. Gets min and max numbers
      await this.sortItemsByGroup(data.Value.Goods, names) // Separates items due the categories

    },
    // Updates stock of items. Gets number
    updateStock(id) {
      this.itemStock.forEach(itemGroup => {
        itemGroup.forEach(item => {
          if (item.T === id) {
            item.P += 1
          }
        })
      })
    },
    //Function sorts all items by group. Gets items(array of objects) and names(object)
    sortItemsByGroup(items, names) {
      this.itemStock = []
      let ids = [...new Set(items.map(id => id.G))]   // Creates array of group ids
      ids.forEach(id => {
        let tempArr = []
        items.forEach(item => {         // Separates items due the category
          if (item.G === id) {
            item.groupTitle = names[id].G
            item.title = names[id].B[item.T]
            tempArr.push(item);
          }
        })
        this.itemStock.push(tempArr)
      })
    }
  },

}
</script>

<style scoped>
.main-container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>