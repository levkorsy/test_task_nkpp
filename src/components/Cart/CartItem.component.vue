<template>
    <tr>
        <td class="cart-item-title">{{cartItem.title}}</td>
        <td class="cart-item-amount">{{cartItem.amount}}</td>
        <td class="cart-item-price" :class="setClassByDollarRate(dollarRate)">{{(cartItem.price * dollarRate.current).toFixed(2)}}</td>
        <td class="cart-item-price" :class="setClassByDollarRate(dollarRate)">{{(cartItem.price * cartItem.amount * dollarRate.current).toFixed(2)}}</td>
        <td class="cart-item-remove">
            <button class="btn btn-danger" @click="removeFromCart">X</button>
        </td>
    </tr>
</template>

<script>
    import EventBus from "../../eventBus";
    import functions from "../../utils/functions";

    export default {
        name: "CartItem",
        mixins:[functions],
        props:{
            cartItem:{
                type: Object,
                required: true
            },
            dollarRate: {
                type: Object,
                required: true
            },
        },
        methods:{
            removeFromCart(){
                EventBus.$emit('remove_item', {id:this.cartItem.id})
            }
        }
    }
</script>

<style scoped>
    .price-up{
        color: red;
    }
    .price-down{
        color: green;
    }
</style>