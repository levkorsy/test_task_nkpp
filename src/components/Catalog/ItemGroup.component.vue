<template>
  <div class="item-group-wrapper">
    <h5 class="item-group-title"><span class="chevron"><i class="fas fa-angle-double-down"></i>
      </span>{{ itemGroup.length > 0 ? itemGroup[0].groupTitle : 'Group' }}<span class="chevron"><i
        class="fas fa-angle-double-down"></i></span></h5>
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
  props: {
    dollarRate: {
      type: Object,
      required: true
    },
    itemGroup: {
      type: Array,
      required: true
    },
  },
}
</script>

<style scoped lang="scss">
$titleColor: #76adaf;
.item-group-wrapper {
  border: 2px solid #dedddd;
  margin: 10px 10px 40px;
  border-radius: 10px;
  color: #797575;;
  background-color: #f8fcff;
}

.item-group-title {
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  background-color: $titleColor;
  border: 2px solid $titleColor;
  border-radius: 10px 10px 0px 0px;
  margin-top: -2px;
  margin-left: -2px;
  margin-right: -2px;
  padding: 15px 0px;
  color: white;
}

.chevron {
  margin-right: 10px;
  margin-left: 10px;
}
</style>