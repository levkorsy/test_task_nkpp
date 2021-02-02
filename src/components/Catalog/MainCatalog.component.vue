<template>
   <div class="main-catalog-wrapper">
      <ItemGroup v-for="(itemGroup, index) in itemStock" :key="index" class="group" :itemGroup="itemGroup"
                 :dollar-rate="dollarRate"

      />
   </div>
</template>

<script>
    import ItemGroup from "./ItemGroup.component";
    export default {
        name: "MainCatalog",
        components: {ItemGroup},
        props:{
           dollarRate: {
              type: Object,
              required: true
           },
          itemStock:{
             type: Array,
             required: true
          },

       },
       methods:{

       }
    }
</script>

<style scoped>
.main-catalog-wrapper{
   border: 1px solid #dedddd;
   padding: 20px;
   border-radius: 10px;
   box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
   flex: 2;
   margin: 50px;
   min-width: 820px;
   max-width: 47%;

}
</style>