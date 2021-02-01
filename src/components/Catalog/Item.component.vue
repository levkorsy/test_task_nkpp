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
    .price{
        flex: 1;
    }
</style>