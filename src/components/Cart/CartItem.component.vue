<template>
    <tr>
        <td class="cart-item-title">{{cartItem.title}}</td>
        <td class="cart-item-amount">Doe</td>
        <td class="cart-item-price">john@example.com</td>
        <td class="cart-item-remove">
            <button class="btn btn-danger">X</button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "CartItem",
        props:{
            cartItem:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>