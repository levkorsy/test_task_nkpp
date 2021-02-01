<template>
    <div>
        <MainCatalog
                :item-stock="itemStock"
                :item-titles ="itemTitles"
                :dollar-rate="dollarRate"
        />
        <Cart/>
    </div>

</template>

<script>
    import MainCatalog from "../components/Catalog/MainCatalog.component";
    import Cart from "../components/Cart/Cart";
    import data from "../dump_db/data.json"
    import names from "../dump_db/names.json"
    export default {
        name: "Main",
        components: {Cart, MainCatalog},
        data() {
            return {
                itemTitles: {},
                itemStock: {},
                dollarRate: 45
            }
        },
        methods: {
           async fetchData() {  //Function simulates API request to server
            await this.sortItemsByGroup(data.Value.Goods)
            this.itemTitles = names
            },
            sortItemsByGroup(items){ //Function sorts all items by group
                items.forEach(item=>{
                    // eslint-disable-next-line no-prototype-builtins
                    if(this.itemStock.hasOwnProperty(item['G'])){
                        this.itemStock[item['G']].push(item)
                    } else{
                        this.itemStock[item['G']] = [item]
                    }
                })
            }
        },
        created() {
            this.fetchData()

        },
        mounted() {}
    }
</script>

<style scoped>

</style>