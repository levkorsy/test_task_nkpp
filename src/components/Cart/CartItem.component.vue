<template>
    <tr>
        <td class="cart-item-title">{{cartItem.title}}</td>
        <td class="cart-item-amount">{{cartItem.amount}}</td>
        <td class="cart-item-price" :class="setClassByDollarRate(dollarRate)">{{(cartItem.price * dollarRate.current).toFixed(2)}}</td>
        <td class="cart-item-price" :class="setClassByDollarRate(dollarRate)">{{(cartItem.price * cartItem.amount * dollarRate.current).toFixed(2)}}</td>
        <td class="cart-item-remove">
            <button class="btn btn-danger" @click="removeFromCart"><i class="far fa-trash-alt"></i></button>
        </td>
    </tr>
<!--    <div-->
<!--            class="r-table-row"-->
<!--           >-->
<!--        <div class="r-table-cell title-cell">-->
<!--            <div class="r-table-cell&#45;&#45;content date-content">-->
<!--                {{cartItem.title}}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="r-table-cell amt-cell">-->
<!--            <div class="r-table-cell&#45;&#45;content title-content">-->
<!--                {{cartItem.amount}}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="r-table-cell price-cell" :class="setClassByDollarRate(dollarRate)">-->
<!--            <div class="r-table-cell&#45;&#45;heading"></div>-->
<!--            <div class="r-table-cell&#45;&#45;content access-link-content">-->
<!--                {{(cartItem.price * dollarRate.current).toFixed(2)}}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="r-table-cell t-price-cell" :class="setClassByDollarRate(dollarRate)">-->
<!--            <div class="r-table-cell&#45;&#45;content replay-link-content">-->
<!--                {{(cartItem.price * cartItem.amount * dollarRate.current).toFixed(2)}}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="r-table-cell del-cell" :class="setClassByDollarRate(dollarRate)">-->
<!--            <div class="r-table-cell&#45;&#45;content replay-link-content">-->
<!--                <button class="btn btn-danger" @click="removeFromCart"><i class="far fa-trash-alt"></i></button>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
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