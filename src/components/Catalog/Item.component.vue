<template>
    <div class="item-wrapper">
        <div class="title">
            <p>
                {{ item.title.N }}
                <span>({{ item.P }})</span>
                <span v-if="item.P < 1">Товара нет в наличии</span>
            </p>
        </div>
        <div class="price"
             :class="setClassByDollarRate(dollarRate)"
        >
            <span>{{ (item.C * dollarRate.current).toFixed(2) }} &#8381;</span>
        </div>
        <div class="add-item">
            <!--            <button class="btn btn-success" @click="$parent.$parent.$emit('addToCart', {id:item.T, group:item.G, title: itemGroupInfo.B[item.T].N, price: item.C})">+</button>-->
            <button class="btn btn-success" @click="addToCart" :disabled="item.P < 1">+</button>
        </div>
    </div>
</template>

<script>
    import EventBus from '../../eventBus'
    import functions from "../../utils/functions";
    export default {
        name: "Item",
        mixins:[functions],
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
            addToCart() {
                this.item.P -= 1;
                EventBus.$emit('add_item', {
                    id: this.item.T,
                    group: this.item.G,
                    title: this.item.title.N,
                    price: this.item.C,
                    quantity: this.item.P
                })
            },

        }
    }
</script>

<style scoped>
    .item-wrapper {
        display: flex;
    }

    .title {
        flex: 10;
    }

    .price, .add-item {
        flex: 1;
    }
    .price-up{
        color: red;
    }
    .price-down{
        color: green;
    }
</style>