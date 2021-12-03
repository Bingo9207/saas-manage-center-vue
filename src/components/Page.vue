<template>
  <div class="page">
    <div class="header">
      <div class="tool">
        <div class="main">
          <universal-tool :toolArray="toolArray" @onToolEvent="onToolEvent" />
        </div>
        <div class="action">
          <universal-tool
            :toolArray="actionArray"
            @onToolEvent="onActionEvent"
          />
        </div>
      </div>
      <a-divider style="margin: 8px 0 0 0" />
      <div>
        <universal-form ref="form" :columns="formColumns" />
      </div>
    </div>
    <div class="container">
      <div class="main">
        <universal-table
          bordered
          class="table"
          size="small"
          :columns="tableProps.columns"
          :dataSource="data"
          :loading="loadingTable"
          :pagination="false"
          :scroll="tableScroll"
          rowKey="id"
        />
      </div>
    </div>
    <div class="footer">
      <a-pagination
        size="small"
        show-size-changer
        v-model:current="current"
        :page-size="pageSize"
        :total="total"
        :page-size-options="['50', '100', '200', '500']"
        :show-total="(total) => `共 ${total} 条`"
        @change="changePage"
        @showSizeChange="changePageSize"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }} 条/页</span>
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<script>
import UniversalTool from "./Toolbar.vue";
import UniversalForm from "./Form.vue";
import UniversalTable from "./Table.vue";
export default {
  name: "Page",
  props: {
    actionArray: {
      default: [],
    },
    formColumns: {
      default: [],
    },
    tableProps: {
      default: {},
    },
  },
  data() {
    return {
      toolArray: [{ type: "search" }, { type: "add" }],
      data: [],
      loadingTable: false,
      current: 1,
      pageSize: 50,
      total: 0,
      condition: {},
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
          current: this.current,
          size: this.pageSize,
          model: {
            ...this.condition
          },
        },
      }).then((res) => {
        this.loadingTable = false;
        if (res?.code === 0) {
          this.data = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    changePage(page) {
      this.current = page;
      this.fetchTableList();
    },
    changePageSize(page, size) {
      this.pageSize = size;
      this.fetchTableList();
    },
    onToolEvent(type) {
      if (type === "search") {
        this.$refs.form.$refs.formRef.validate().then(() => {
          this.condition = this.$refs.form.form;
          this.fetchTableList();
        });
      }
    },
    onActionEvent(type) {
      if (type === "close") {
        this.$store.commit("router/deleteTabItem");
      }
    },
  },
  components: {
    UniversalTool,
    UniversalForm,
    UniversalTable,
  },
};
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .header {
    padding: 8px;
    background-color: #fff;

    .tool {
      display: flex;
      flex-direction: row;

      .main {
        flex: 1;
      }

      .action {
        text-align: right;
      }
    }

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
    }
  }

  .footer {
    padding: 0 8px 8px;
    background-color: #fff;
  }
}
</style>