<template>
    <tr>
        <td class="cart-item-title">{{cartItem.title}}</td>
        <td class="cart-item-amount">Doe</td>
        <td class="cart-item-price">john@example.com</td>
        <td class="cart-item-remove">
            <button class="btn btn-danger" @click="removeFromCart">X</button>
        </td>
    </tr>
</template>

<script>
    import EventBus from "../../eventBus";

    export default {
        name: "CartItem",
        props:{
            cartItem:{
                type: Object,
                required: true
            }
        },
        methods:{
            removeFromCart(){
                EventBus.$emit('remove_item', {id:this.cartItem.id})
            }
        }
    }
</script>

<style scoped>

</style>