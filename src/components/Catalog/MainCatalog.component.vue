<template>
   <div class="container">
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
              type: Number,
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

</style>