<template>
    <div>
        <MainCatalog
                :item-stock="itemStock"
                :item-titles ="itemTitles"
                :dollar-rate="dollarRate"

        />
        <Cart :cart-items="cartItems" :key="key"/>
    </div>

</template>

<script>
    import MainCatalog from "../components/Catalog/MainCatalog.component";
    import Cart from "../components/Cart/Cart";
    import data from "../dump_db/data.json"
    import names from "../dump_db/names.json"
    import EventBus from '../eventBus'
    export default {
        name: "Main",
        components: {Cart, MainCatalog},
        data() {
            return {
                itemTitles: {},
                itemStock: {},
                dollarRate: 45,
                cartItems:{},
                key: 0

            }
        },
        methods: {
            addToCart(item){    //Function adds item to cart array
                console.log('add')
                this.key += 1
                // eslint-disable-next-line no-prototype-builtins
                if(this.cartItems.hasOwnProperty(item.id)){
                    this.cartItems[item.id].amount += 1
                } else{
                    this.cartItems[item.id] = {amount: 1, title: item.title, price:item.price, id: item.id}
                }
            },
            removeFromCart(item){
                console.log('remove', item)

                this.key -= 1
                // eslint-disable-next-line no-prototype-builtins
                if(this.cartItems.hasOwnProperty(item.id)){
                    this.cartItems[item.id].amount -= 1
                    if(this.cartItems[item.id].amount < 1){
                        this.cartItems[item.id] = null
                    }
                }
            },
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
        watch:{
            cartItems: function () {
                console.log('watch')
            }
        },
        created() {
            this.fetchData()

        },
        mounted () {
            EventBus.$on('add_item', (payload) => {
                this.addToCart(payload)
            })
            EventBus.$on('remove_item', (payload) => {
                this.removeFromCart(payload)
            })
        }
    }
</script>

<style scoped>

</style>