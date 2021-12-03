<template>
  <div class="page">
    <div class="header">
      <div>
        <universal-tool :toolArray="toolArray" />
      </div>
      <n-divider class="line" />
    </div>
    <div class="container">
      <div class="main">
        123
        <!-- <n-data-table
          class="table"
          size="small"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :loading="loadingTable"
          :single-line="false"
          :flex-height="true"
          scroll-x="2400"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import UniversalTool from "./Toolbar.vue";
export default {
  name: "Page",
  props: {
    tableProps: {
      default: {},
    },
  },
  data() {
    return {
      toolArray: [{ type: "search" }, { type: "add" }, { type: "close" }],
      data: [],
      loadingTable: false,
      columns: [
        {
          title: "商品编码",
          key: "itemNo",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品名称",
          key: "itemName",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品编码",
          key: "itemNo",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品名称",
          key: "itemName",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品编码",
          key: "itemNo",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品名称",
          key: "itemName",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品编码",
          key: "itemNo",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品名称",
          key: "itemName",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品编码",
          key: "itemNo",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品名称",
          key: "itemName",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品编码",
          key: "itemNo",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "商品名称",
          key: "itemName",
          align: "center",
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },
      ],
    };
  },
  created() {
    this.fetchTableList();
  },
  methods: {
    fetchTableList() {
      this.loadingTable = true;
      this.$http({
        url: this.tableProps.url,
        data: {
          current: 1,
          size: 100,
          model: {},
        },
      }).then((res) => {
        this.loadingTable = false;
        console.log(res);
        this.data = res.data.records;
      });
    },
  },
  components: {
    UniversalTool,
  },
};
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    padding: 8px;
    background-color: #fff;

    .line {
      margin: 8px 0;
    }
  }

  .container {
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 100%;
    margin-top: 8px;
    padding: 8px;
    background-color: #fff;
    overflow: hidden;

    .main {
      flex: 1;
      overflow: hidden;

      .table {
        height: 100%;

        .n-data-table .n-data-table-table {
          width: fit-content;
        }
      }
    }
  }
}
</style>