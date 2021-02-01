<template>
    <div class="container">
        <table class="table table-bordered table-responsive">
            <thead>
            <tr>
                <th style="width: 50%">Title & description</th>
                <th style="width: 30%">Amount</th>
                <th style="width: 15%">Price</th>
                <th style="width: 5%"></th>
            </tr>
            </thead>
            <tbody>
                 <CartItem v-for="(cItem, index) in cartItems" :key="index" :cart-item="cItem"/>
            </tbody>
        </table>
    </div>
</template>

<script>
    import CartItem from "./CartItem.component";
    export default {
        name: "Cart",
        components: {CartItem},
        props:{
            cartItems:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>