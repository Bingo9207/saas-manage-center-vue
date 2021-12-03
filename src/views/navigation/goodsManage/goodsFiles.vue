<template>
  <universal-page :tableProps="tableProps" />
</template>

<script>
import UniversalPage from "../../../components/Page.vue";
export default {
  name: "1",
  data() {
    return {
      tableProps: {
        url: "/api/saas/bdItemInfo/bizpage"
      },
    };
  },
  components: {
    UniversalPage,
  },
};
</script>

<style scoped lang="less">
</style>