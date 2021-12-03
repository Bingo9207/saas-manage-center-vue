<template>
  <universal-page :actionArray="actionArray" :formColumns="formColumns" :tableProps="tableProps" />
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
          name: 'itemNo'
        },
        {
          name: 'itemNo1'
        },
        {
          name: 'itemNo2'
        }
      ],
      tableProps: {
        url: "/api/saas/bdItemInfo/bizpage",
        columns: [
          {
            title: "商品条码",
            dataIndex: "itemNo",
          },
          {
            title: "商品自编码",
            dataIndex: "itemSubno",
          },
          {
            title: "商品名称",
            dataIndex: "itemName",
            width: 160
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