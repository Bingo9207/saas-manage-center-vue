<template>
  <universal-page
    :actionArray="actionArray"
    :formColumns="formColumns"
    :tableProps="tableProps"
  />
</template>

<script>
import UniversalPage from "../../../components/Page.vue";
export default {
  name: "1",
  data() {
    return {
      actionArray: [{ type: "close" }],
      formColumns: [
        {
          label: "商品条码",
          name: "itemNo",
        },
        {
          label: "自编码",
          name: "itemSubno",
        }
      ],
      tableProps: {
        url: "/api/saas/bdItemInfo/bizpage",
        columns: [
          {
            title: "商品条码",
            dataIndex: "itemNo",
            width: 160,
          },
          {
            title: "商品自编码",
            dataIndex: "itemSubno",
            width: 160,
          },
          {
            title: "商品名称",
            dataIndex: "itemName",
            width: 160,
          },
        ],
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