<template>
  <div class="container">
    <table class="table table-bordered table-responsive">
      <thead>
      <tr>
        <th style="width: 50%">Title & description</th>
        <th style="width: 20%">Amount</th>
        <th style="width: 10%">Price</th>
        <th style="width: 15%">Total price</th>
        <th style="width: 5%"></th>
      </tr>
      </thead>
      <tbody>
      <CartItem v-for="(cItem, index) in cartItems" :key="index" :cart-item="cItem"/>
      </tbody>
      <tfoot>
      <tr>
        <td>Sum</td>
        <td></td>
<!--        <td>{{ getTotalAmount(cartItems)}}</td>-->
        <td>Sum</td>
        <td>{{ getTotalPrice(cartItems) }}</td>
        <td></td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import CartItem from "./CartItem.component";

export default {
  name: "Cart",
  components: {CartItem},
  props: {
    cartItems: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      totalAmount: 0
    }
  },
  methods: {
    // getTotalAmount(cartItems) {
    //   let sum = 0;
    //
    //   if (cartItems) {
    //     for (const item in cartItems) {
    //       sum += cartItems[item]['amount']
    //     }
    //
    //   }
    //
    //   return sum
    // },
    getTotalPrice(cartItems) {
      let sum = 0;

      if (cartItems) {
        for (const item in cartItems) {
          sum += cartItems[item]['price']*cartItems[item]['amount']
        }
        // cartItems.forEach(item => {
        //   sum += item.price
        // })
      }

      return sum.toFixed(2)
    }
  }
}
</script>

<style scoped>

</style>