<template>
  <universal-page
    :actionArray="actionArray"
    :formColumns="formColumns"
    :formValues="formValues"
    :tableProps="tableProps"
  />
</template>

<script>
import UniversalPage from "../../../components/Page.vue";
export default {
  name: "日客单分析",
  data() {
    return {
      actionArray: [{ type: "close" }],
      formColumns: [],
      formValues: {
        searchModel: "0",
      },
      tableProps: {
        url: "/api/saas/analy/dailyGuestAnaly",
        columns: [
          {
            title: "机构编码",
            dataIndex: "branchNo",
            width: 100,
          },
          {
            title: "机构名称",
            dataIndex: "branchName",
            width: 140,
          },
          {
            title: "总金额",
            dataIndex: "totalAmt",
          },
          {
            title: "销售总量",
            dataIndex: "saleCount",
          },
          {
            title: "成交笔数",
            dataIndex: "transactionCount",
          },
          {
            title: "客单价",
            dataIndex: "kedanPrice",
          },
          {
            title: "客单量",
            dataIndex: "kedanLiang",
          },
        ],
      },
    };
  },
  created() {
    this.initFormColumns();
  },
  methods: {
    initFormColumns() {
      this.formColumns = [
        {
          label: "商品条码",
          name: "itemNo",
          type: "input",
        },
        {
          label: "自编码",
          name: "itemSubno",
          type: "input",
        },
        {
          label: "商品状态",
          name: "status",
          type: "select",
          options: this.$attr.commodity.props.status.options,
        },
        {
          label: "查询模式",
          name: "searchModel",
          type: "select",
          options: [
            { label: "按机构", value: "0" },
            { label: "按类别", value: "1" },
            { label: "按供应商", value: "2" },
          ],
        },
      ];
    },
  },
  components: {
    UniversalPage,
  },
};
</script>

<style scoped lang="less">
</style>