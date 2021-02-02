<template>
  <div class="main-catalog-wrapper" style="box-shadow:rgb(0 0 0 / 24%) 0px 3px 8px;
">
    <h5 class="item-group-title">Корзина</h5>

    <table class="table table-bordered table-responsive">
      <thead>
      <tr>
        <th style="width: 50%">Title & description</th>
        <th style="width: 20%">Amount</th>
        <th style="width: 10%">Price</th>
        <th style="width: 20%" colspan="2">Total price</th>
<!--        <th style="width: 5%"></th>-->
      </tr>
      </thead>
      <tbody>
      <CartItem v-for="(cItem, index) in cartItems" :key="index" :cart-item="cItem" :dollar-rate="dollarRate"/>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="3">Sum</td>
<!--        <td></td>-->
<!--        <td>{{ getTotalAmount(cartItems)}}</td>-->
<!--        <td>Sum</td>-->
        <td :class="setClassByDollarRate(dollarRate)" colspan="2">{{ getTotalPrice(cartItems) }}</td>
<!--        <td></td>-->
      </tr>
      </tfoot>
    </table>



<!--    <div class="r-table r-table&#45;&#45;5cols r-table&#45;&#45;collapse">-->
<!--      <div class="r-table-row r-table-row&#45;&#45;head">-->
<!--        <div class="r-table-cell title-cell column-heading">Title & description</div>-->
<!--        <div class="r-table-cell amt-cell column-heading">Amount</div>-->
<!--        <div class="r-table-cell price-cell column-heading">-->
<!--          Price-->
<!--        </div>-->
<!--        <div class="r-table-cell t-price-cell column-heading">Total price</div>-->
<!--        <div class="r-table-cell del-cell column-heading"></div>-->
<!--      </div>-->
<!--      <CartItem v-for="(cItem, index) in cartItems" :key="index" :cart-item="cItem" :dollar-rate="dollarRate"/>-->
<!--      <div class="r-table-cell r-table-cell&#45;&#45;foot continent-cell" :class="setClassByDollarRate(dollarRate)">-->
<!--        <div class="r-table-cell&#45;&#45;heading">Checklist</div>-->
<!--        <div class="r-table-cell&#45;&#45;content pdf-content">-->
<!--          {{ getTotalPrice(cartItems) }}-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
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

<style scoped  lang="scss">
  $titleColor:#556c6d;
  .item-group-title{
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
  .flip-list-move {
    transition: transform 1s;
  }
  .main-catalog-wrapper{
    border: 1px solid #dedddd;
    padding: 20px;
    border-radius: 10px;
flex:1;
    margin: 50px;
    max-width: 30%;
    height: fit-content;
  }
  .price-up{
    color: red;
  }
  .price-down{
    color: green;
  }

  $breakpoint: 750px;
  /*$heading-color: #43bac0;*/
  $heading-color: #c12fff;

  * {
    box-sizing: border-box;
  }

  .wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 1em auto;
    padding: 1em;
  }

  .is-striped {
    /*background-color: rgba(233, 200, 147, 0.2);*/
    background-color: #f8f8f8;
  }

  /* Table column sizing
  ================================== */
  .title-cell {
    width: 50%;
  }
  .amt-cell {
    width: 10%;
  }
  .price-cell {
    width: 15%;
  }
  .t-price-cell {
    width: 15%;
  }
  .del-cell {
    width: 10%;
  }


  /* Apply styles
  ================================== */
  .r-table {
    display: flex;
    flex-wrap: wrap;
    /*margin: 0 0 3em 0;*/
    padding: 0;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);

  .r-table-row {
    width: 100%;
    display: flex;

  .r-table-cell {
    box-sizing: border-box;
    flex-grow: 1;
    padding: 0.8em 1.2em;
    overflow: hidden; // Or flex might break
  list-style: none;

  &.column-heading {
     background-color: $heading-color;
     color: white;
     padding: 1em;
   }

  .r-table-cell--heading {
    display: none;
  }

  .r-table-cell--content {
  a {
    font-size: 2em;
    color: #333;
  }

  .webinar-date {
    font-weight: 700;
  }
  }
  }
  }
  }

  /* Responsive
  ==================================== */
  @media all and (max-width: $breakpoint) {
    .is-striped {
      background-color: white;
    }

    .r-table--collapse {
      display: block;
      width: 100%;
      padding: 1em;
      box-shadow: none;

    .r-table-row {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2em;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);

    .r-table-cell {
      width: 100% !important;
      display: flex;
      align-items: center;

    .r-table-cell--heading {
      display: inline-block;
      flex: 1;
      max-width: 120px;
      min-width: 120px;
      color: $heading-color;
      font-weight: 700;
      border-right: 1px solid #ccc;
      margin-right: 1em;
    }

    .r-table-cell--content {
      flex: 2;
      padding-left: 1em;
    }
  }
  }

  .atm-cell {
    background-color: $heading-color;
    color: white;
    font-weight: 700;
    order: -1;

  .r-table-cell--content {
    padding-left: 0 !important;
  }
  }

  .r-table-row--head {
    display: none;
  }
  }
  }

  // Non-Flex modernizer fallback
     .no-flexbox .r-table {
       display: block;

  &.r-table-cell {
     width: 100%;
   }
  }
</style>