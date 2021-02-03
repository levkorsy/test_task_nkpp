<template>
  <div class="main-catalog-wrapper" style="box-shadow:rgb(0 0 0 / 24%) 0px 3px 8px;
">
    <h5 class="item-group-title">Корзина</h5>
    <button class="btn reset-btn" @click="$emit('resetCart')" title="Очистить корзину"><i class="far fa-times-circle"></i></button>
    <table class="table table-bordered table-responsive">
      <thead>
      <tr class="text-center">
        <th style="width: 80%">Наименование товара</th>
        <th style="width: 10%">Шт.</th>
        <th style="width: 10%">Цена</th>
        <th style="width: 20%" colspan="2">Стоимость</th>
      </tr>
      </thead>
      <tbody>
      <CartItem v-for="(cItem, index) in cartItems" :key="index" :cart-item="cItem" :dollar-rate="dollarRate"/>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="3">Итого:</td>
        <td :class="getTotalPrice(cartItems) >0 ?setClassByDollarRate(dollarRate): ''" colspan="2">
          {{ getTotalPrice(cartItems) }} &#8381;
        </td>
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
  mixins: [functions], // Using function from utils
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
  methods: {
    //Calculates total price of all items object || Gets object || Returns number
    getTotalPrice(cartItems) {
      let sum = 0;
      if (cartItems) {
        for (const item in cartItems) {  // Iterate through items
          sum += cartItems[item]['price'] * cartItems[item]['amount']
        }
      }
      return (sum * this.dollarRate.current).toFixed(2)
    },
  }
}
</script>

<style scoped lang="scss">
$titleColor: #556c6d;
.item-group-title {
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  background-color: $titleColor;
  border: 2px solid $titleColor;
  border-radius: 10px 10px 0px 0px;
  margin-top: -2px;
  margin-left: -2px;
  margin-right: -2px;
  padding: 15px 0px;
  color: white;
}

.main-catalog-wrapper {
  position: relative;
  border: 1px solid #dedddd;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  margin: 50px;
  max-width: 30%;
  height: fit-content;
  min-width: 700px;
}

.price-up {
  color: red;
}

.price-down {
  color: green;
}

tfoot {
  font-weight: bold;
}

.reset-btn {
  position: absolute;
  color: white;
  right: 25px;
  top: 25px;
  font-size: 25px;
  font-weight: 600;
}

.reset-btn:hover {
  opacity: 0.8;
}

.reset-btn:focus, .reset-btn:active, {
  outline: none !important;  // Used important for rewrite bootstrap class
}
</style>