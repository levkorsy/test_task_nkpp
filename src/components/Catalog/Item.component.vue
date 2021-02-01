<template>
    <div class="item-wrapper">
        <div class="title">
            <p>
                {{ itemGroupInfo.B[item.T].N }}
                <span>({{ item.P }})</span>
            </p>
        </div>
        <div class="price">
            <span>{{ (item.C * dollarRate).toFixed(2) }} &#8381;</span>
        </div>
        <div class="add-item">
            <button class="btn btn-success" @click="$parent.$parent.$emit('addToCart', {id:item.T, group:item.G, title: itemGroupInfo.B[item.T].N, price: item.C})">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Item",
        props: {
            dollarRate: {
                type: Number,
                required: true
            },
            item:{
                type:Object,
                required: true
            },
            itemGroupInfo:{
                type: Object,
                required: true
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
.item-wrapper{
    display: flex;
}
    .title{
        flex: 10;
    }
    .price, .add-item{
        flex: 1;
    }
</style>