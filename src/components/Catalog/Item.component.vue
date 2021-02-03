<template>
  <div class="item-wrapper">
    <div class="title">
      <p class="item-title">
        {{ item.title.N }}
      </p>
    </div>
    <div class="stock">
      <span><span v-if="item.P > 0">({{ item.P }})</span> <span class="stock-comment">{{
          getComment(item.P)
        }}</span></span>
    </div>
    <div class="price"
         :class="setClassByDollarRate(dollarRate)"
    >
            <span><i class="fas fa-arrow-up"
                     :class="setClassByDollarRate(dollarRate)"
            ></i>{{ (item.C * dollarRate.current).toFixed(2) }} &#8381;</span>
    </div>
    <div class="add-item">
      <button class="btn btn-add" @click="addToCart" :disabled="item.P < 1">
        <i class="fas fa-cart-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from '../../eventBus'
import functions from "../../utils/functions";

export default {
  name: "Item",
  mixins: [functions], // Using function from utils
  props: {
    dollarRate: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },

  },
  methods: {
    addToCart() {  // Triggers emit for adding items from cart || Object sent
      this.item.P -= 1;
      EventBus.$emit('add_item', {
        id: this.item.T,
        group: this.item.G,
        title: this.item.title.N,
        price: this.item.C,
        quantity: this.item.P
      })
    },
    getComment(value) { // Gets items amount(number) returns comment(string)
      return value < 1 ? 'Товара нет в наличии' : value < 10 ? 'товар заканчивается' : 'в наличии';
    }
  }
}
</script>

<style scoped>
.item-wrapper {
  display: flex;
}

.title {
  flex: 7;
  padding: 5px 10px;
  background-color: white;
}

.price, .add-item {
  flex: 1;
  text-align: center;
  align-self: baseline;
}

.price {
  min-width: 100px;
}

.price-up {
  color: red;
}

.price-down {
  color: green;
}

.item-title {
  width: 80%;
}

.stock {
  flex: 2;
  /*text-align: center;*/
  align-self: baseline;
  padding-left: 10px;
}

.stock-comment {
  font-size: 11px;
}

.price span {
  white-space: nowrap;
}

.btn-add {
  background-color: #76adaf;
  transition: all 0.3s ease-in-out;
  color: white;
}

.btn-add:hover,
.btn-add:focus,
.btn-add:active {
  background-color: #619092;
  border-color: #76adaf;
}

.btn-add:focus {
  transform: scale(1.1);
}

i.price-down {
  transform: rotate(180deg);
  transition: all 0.4s ease-in;
}

i.price-up {
  transform: rotate(360deg);
  transition: all 0.4s ease-in;
}

i.fa-arrow-up {
  margin-right: 10px;
}
</style>