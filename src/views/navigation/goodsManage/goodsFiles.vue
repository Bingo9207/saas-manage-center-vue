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
      formColumns: [],
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
          {
            title: "商品类别",
            dataIndex: "itemClsName",
            width: 180,
          },
          {
            title: "是否积分",
            dataIndex: "vipAccFlag",
            width: 80,
            slots: { customRender: "flag" },
          },
          {
            title: "供应商",
            dataIndex: "mainSupcustName",
            width: 130,
          },
          {
            title: "进货价",
            dataIndex: "price",
            type: "price",
          },
          {
            title: "零售价",
            dataIndex: "salePrice",
            type: "price",
          },
          {
            title: "会员价",
            dataIndex: "vipPrice",
            type: "price",
          },
          {
            title: "会员价一",
            dataIndex: "vipPrice1",
            type: "price",
          },
          {
            title: "会员价二",
            dataIndex: "vipPrice2",
            type: "price",
          },
          {
            title: "会员价三",
            dataIndex: "vipPrice3",
            type: "price",
          },
          {
            title: "单位",
            dataIndex: "unitName",
            width: 80,
          },
          {
            title: "规格",
            dataIndex: "itemSize",
          },
          {
            title: "产地",
            dataIndex: "productArea",
            width: 180,
          },
          {
            title: "商品状态",
            dataIndex: "status",
            width: 80,
            customRender: (column) => {
              const textArray = ["正常", "停购", "停售", "淘汰", "新品"];
              return textArray[column.text];
            },
          },
          {
            title: "允许折扣",
            dataIndex: "enDis",
            width: 80,
            slots: { customRender: "flag" },
          },
          {
            title: "前台议价",
            dataIndex: "changePrice",
            width: 80,
            slots: { customRender: "flag" },
          },
          {
            title: "创建日期",
            dataIndex: "createTime",
            width: 180,
          },
          {
            title: "修改日期",
            dataIndex: "updateTime",
            width: 180,
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
          label: "计价方式",
          name: "pricingFlag",
          type: "select",
          options: [
            { label: "全部", value: "-1" },
            { label: "普通", value: "0" },
            { label: "计重", value: "1" },
            { label: "计数", value: "2" },
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