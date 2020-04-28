<template>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import TabContentDetail from "./TabContentDetail";
  import TabContentCategory from "./TabContentCategory";

  export default {
    name: "TabContent",
    components: {
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      },
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
</style>
