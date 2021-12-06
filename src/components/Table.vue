<template>
  <a-table
    bordered
    class="table"
    size="small"
    :columns="formatTableColumns"
    :data-source="dataSource"
    :loading="loading"
    :pagination="false"
    :scroll="tableScroll"
    rowKey="id"
  >
    <template #flag="{ text }">
      <a-checkbox :checked="text === '1'" @change="false" />
    </template>
  </a-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    columns: {
      default: [],
    },
    dataSource: {
      default: [],
    },
    loading: {
      default: false,
    },
  },
  data() {
    return {
      tableScroll: {
        y: 200,
        x: "max-content",
      },
    };
  },
  computed: {
    formatTableColumns() {
      this.columns.forEach((item) => {
        item.width = item.width || 100;
        item.ellipsis = true;
        item.align = "center";
        if (item.type) {
          item.width = item.width || 120;
          item.align = "right";
          item.customHeaderCell = (column) => {
            column.align = "center";
            return column;
          };
          if (item.type === "price") {
            item.customRender = (column) => {
              return parseFloat(column.text || 0).toFixed(2);
            };
          } else if (item.type === "quantity") {
            item.customRender = (column) => {
              return parseFloat(column.text || 0).toFixed(3);
            };
          }
        }
      });
      console.log(this.columns);
      return this.columns;
    },
  },
  created() {},
  methods: {},
  components: {},
};
</script>

<style lang="less" scoped>
.table {
  height: 100%;
  border-left: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  :deep(.ant-spin-nested-loading) {
    height: 100%;

    .ant-spin-container {
      height: 100%;

      .ant-table {
        height: 100%;

        .ant-table-content {
          height: 100%;

          .ant-table-scroll {
            display: flex;
            height: 100%;
            flex-direction: column;

            .ant-table-header {
              .ant-table-fixed {
                width: fit-content;
                min-width: fit-content;
                border-left: 0;

                .ant-table-thead tr th:last-child {
                  border-color: #f0f0f0;
                }
              }
            }

            .ant-table-body {
              flex: 1;
              height: 100%;
              max-height: 100% !important;
              overflow-y: auto !important;

              tr:last-child td {
                border-bottom: 0;
              }

              .ant-table-fixed {
                width: fit-content !important;
                min-width: fit-content;
                border-left: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>