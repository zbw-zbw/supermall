<template>
  <div>
  </div>
</template>

<script>
  import GridView from "../../../components/common/gridView/GridView";

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {}
  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
