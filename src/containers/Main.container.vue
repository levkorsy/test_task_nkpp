<template>
    <div>
        <MainCatalog
                :item-stock="itemStock"
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
                itemStock: [],
                dollarRate: 45,
                cartItems:{},
                key: 0

            }
        },
        methods: {
            addToCart(item){    //Function adds item to cart array
                // this.key += 1
                // eslint-disable-next-line no-prototype-builtins
                if(this.cartItems.hasOwnProperty(item.id)){
                    let amount = this.cartItems[item.id]['amount'];
                    delete this.cartItems[item.id]['amount']
                  this.cartItems = Object.assign({}, this.cartItems, {
                    [item.id]: {amount: amount+1, title: item.title, price:item.price, id: item.id},
                  });
                } else{
                    // this.cartItems[item.id] = {amount: 1, title: item.title, price:item.price, id: item.id}
                  this.cartItems = Object.assign({}, this.cartItems, {
                                [item.id]: {amount: 1, title: item.title, price:item.price, id: item.id},
                              });
                }
            },
            removeFromCart(item){
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
            await this.sortItemsByGroup(data.Value.Goods, names)
             // console.log(data)
            // this.itemTitles = names
            },
            // sortItemsByGroup(items){ //Function sorts all items by group
            //
            //   console.log(items)
            //     items.forEach(item=>{
            //       console.log(item.G)
            //         // eslint-disable-next-line no-prototype-builtins
            //         if(this.itemStock.hasOwnProperty(item.G)){
            //             this.itemStock[item.G].push(item)
            //         } else{
            //             // this.itemStock[item['G']] = [item]
            //           this.itemStock = Object.assign({}, this.itemStock, {
            //             [item.G]: [item],
            //           });
            //           // console.log(this.itemStock)
            //         }
            //     })
            // }
            sortItemsByGroup(items, names){ //Function sorts all items by group
             let ids = [...new Set(items.map(id=>id.G))]
              ids.forEach(id=>{
                // console.log(names[id].G)
                // let groupTitle = names['id']
                // console.log(groupTitle,777)
                let tempArr =[]
                items.forEach(item=>{
                 if(item.G === id){
                   item.groupTitle = names[id].G

                   item.title = names[id].B[item.T]
                   tempArr.push(item);
                 }
                })
                // console.log(tempArr)
                this.itemStock.push(tempArr)
})


              // ids.forEach(item=>{
              //     console.log(item)
              //
              //       // eslint-disable-next-line no-prototype-builtins
              //       if(this.itemStock.hasOwnProperty(item)){
              //           this.itemStock.item.push(item)
              //       } else{
              //           // this.itemStock[item['G']] = [item]
              //         this.itemStock = Object.assign({}, this.itemStock, {
              //           [item]: [item],
              //         });
              //         // console.log(this.itemStock)
              //       }
              //   })
            }
        },
        watch:{
            cartItems: function () {
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