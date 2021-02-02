<template>
  <div class="main-catalog-wrapper">
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
      <CartItem v-for="(cItem, index) in cartItems" :key="index" :cart-item="cItem" :dollar-rate="dollarRate"/>
      </tbody>
      <tfoot>
      <tr>
        <td>Sum</td>
        <td></td>
<!--        <td>{{ getTotalAmount(cartItems)}}</td>-->
        <td>Sum</td>
        <td :class="setClassByDollarRate(dollarRate)">{{ getTotalPrice(cartItems) }}</td>
        <td></td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import CartItem from "./CartItem.component";
import functions from "../../utils/functions";

export default {
  name: "Cart",
  mixins:[functions],
  components: {CartItem},
  props: {
    cartItems: {
      type: Object,
      required: true
    },
    dollarRate: {
      type: Object,
      required: true
    },
  },
  data(){
    return{
      totalAmount: 0
    }
  },
  methods: {
    getTotalPrice(cartItems) {
      let sum = 0;
      if (cartItems) {
        for (const item in cartItems) {
          sum += cartItems[item]['price']*cartItems[item]['amount']
        }
      }
      // sum*=this.dollarRate.current
      // console.log(sum, sum*this.dollarRate.current, (sum*this.dollarRate.current).toFixed(2))
      return (sum*this.dollarRate.current).toFixed(2)
    }
  }
}
</script>

<style scoped>
  .main-catalog-wrapper{
    border: 1px solid #dedddd;
    padding: 20px;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
flex:1;
    margin: 50px;
    min-width: 500px;
  }
  .price-up{
    color: red;
  }
  .price-down{
    color: green;
  }
</style>