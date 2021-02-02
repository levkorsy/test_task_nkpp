<template>
    <div class="item-group-wrapper">
        <h5>{{ itemGroup.length > 0 ? itemGroup[0].groupTitle: 'Group' }}</h5>
            <Item v-for="(item, index) in itemGroup" :key="index" :item="item" :dollar-rate="dollarRate"/>
    </div>
</template>

<script>
    import Item from "./Item.component";
    export default {
        name: "ItemGroup",
        components: {
            Item
        },
        props:{
            dollarRate: {
                type: Number,
                required: true
            },
            itemGroup:{
                type: Array,
                required: true
            },

        }
    }
</script>

<style scoped>
.item-group-wrapper{
    border: 1px solid black;
    margin: 10px;
}
</style>