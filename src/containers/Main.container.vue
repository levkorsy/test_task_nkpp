<template>
    <div class="main-container">
        <MainCatalog
                :item-stock="itemStock"
                :dollar-rate="dollarRate"
        />
        <Cart :cart-items="cartItems" :key="key" :dollar-rate="dollarRate"/>
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
                itemStock: [],
                dollarRate: {
                    previous: 45,
                    current: 45
                },
                cartItems: {},
                key: 0

            }
        },
        methods: {
            addToCart(item) {    //Function adds item to cart array
                // eslint-disable-next-line no-prototype-builtins
                if (this.cartItems.hasOwnProperty(item.id)) {
                    let amount = this.cartItems[item.id]['amount'];
                    delete this.cartItems[item.id]['amount']
                    this.cartItems = Object.assign({}, this.cartItems, {
                        [item.id]: {amount: amount + 1, title: item.title, price: item.price, id: item.id, quantity: item.quantity},
                    });
                } else {
                    this.cartItems = Object.assign({}, this.cartItems, {
                        [item.id]: {amount: 1, title: item.title, price: item.price, id: item.id, quantity: item.quantity},
                    });
                }
            },
            removeFromCart(item) {
                // eslint-disable-next-line no-prototype-builtins
                if (this.cartItems.hasOwnProperty(item.id)) {
                    this.cartItems[item.id].amount -= 1
                    if (this.cartItems[item.id].amount < 1) {
                      delete this.cartItems[item.id]
                    }
                }
                this.updateStock(item.id)
            },
            fetchDataWithInterval(){
                this.sortItemsByGroup(data.Value.Goods, names)
                setInterval(()=>{
                    this.fetchData()
                }, 5000)
            },
            getDollarRate(min, max){
                this.dollarRate.previous = this.dollarRate.current
                this.dollarRate.current = Math.floor(Math.random() * (max - min + 1)) + min

            },

            async fetchData() {  //Function simulates API request to server
                  await this.getDollarRate(20, 80)
                  await this.sortItemsByGroup(data.Value.Goods, names)

            },
            updateStock(id){
                this.itemStock.forEach(itemGroup=>{
                    itemGroup.forEach(item=>{
                        if(item.T === id){
                            item.P += 1
                        }
                    })
                })
            },

            sortItemsByGroup(items, names) { //Function sorts all items by group
                this.itemStock = []
                let ids = [...new Set(items.map(id => id.G))]
                ids.forEach(id => {
                    let tempArr = []
                    items.forEach(item => {
                        if (item.G === id) {
                            item.groupTitle = names[id].G

                            item.title = names[id].B[item.T]
                            tempArr.push(item);
                        }
                    })
                    this.itemStock.push(tempArr)
                })
            }
        },
        watch: {
            cartItems: function () {
            }
        },
        created() {
            this.fetchDataWithInterval()

        },
        mounted() {
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
.main-container{
    /*background-color: #f7f7f7;*/
    padding: 20px;
    display: flex;
    flex-wrap: wrap;

}
</style>