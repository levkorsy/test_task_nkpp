<template>
  <tr class="animate-tr">
    <td class="cart-item-title">{{ cartItem.title }}
      <div class="amount-msg" v-if="cartItem.quantity<10">Товар заканчивается</div>
    </td>
    <td class="cart-item-amount">{{ cartItem.amount }}

    </td>
    <td class="cart-item-price" :class="setClassByDollarRate(dollarRate)">
      {{ (cartItem.price * dollarRate.current).toFixed(2) }} &#8381;
    </td>
    <td class="cart-item-price" :class="setClassByDollarRate(dollarRate)">
      {{ (cartItem.price * cartItem.amount * dollarRate.current).toFixed(2) }} &#8381;
    </td>
    <td class="cart-item-remove">
      <button class="btn btn-danger" @click="removeFromCart" title="Удалить товар"><i class="far fa-trash-alt"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import EventBus from "../../eventBus";
import functions from "../../utils/functions";

export default {
  name: "CartItem",
  mixins: [functions], // Using function from utils
  props: {
    cartItem: {
      type: Object,
      required: true
    },
    dollarRate: {
      type: Object,
      required: true
    },
  },
  methods: {
    // Triggers emit for removing items from cart
    removeFromCart() {
      EventBus.$emit('remove_item', {id: this.cartItem.id})
    },
  },
}
</script>

<style scoped>
.price-up {
  color: red;
}

.price-down {
  color: green;
}

td {
  text-align: center;
  vertical-align: middle;

}

.cart-item-price {
  font-size: 0.9em;
  padding: 0.5rem .3rem;
  min-width: 100px;
}

.animate-tr {
  max-height: 0px;
  animation: trAnimate 1s linear;
}

@keyframes trAnimate {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.amount-msg {
  opacity: 0.3;
  font-size: 12px;
}
</style>