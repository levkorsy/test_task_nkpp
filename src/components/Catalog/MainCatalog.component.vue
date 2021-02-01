<template>
   <div class="container">
      <ItemGroup v-for="(itemGroup, index) in itemStock" :key="index" class="group" :itemGroup="itemGroup"
                 :item-group-info="itemTitles[index]" :dollar-rate="dollarRate"

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
             type: Object,
             required: true
          },
          itemTitles:{
             type: Object,
             required: true
          }
       }
    }
</script>

<style scoped>

</style>