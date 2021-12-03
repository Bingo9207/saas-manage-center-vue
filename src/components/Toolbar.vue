<template>
  <a-space :size="8">
    <a-button
      v-for="item in toolArray"
      :key="item.type"
      type="primary"
    >
      <template #icon>
        <SearchOutlined v-if="item.type === 'search'" />
        <PlusOutlined v-if="item.type === 'add'" />
        <CloseOutlined v-if="item.type === 'close'" />
      </template>
      <span v-if="item.type === 'search'">查询</span>
      <span v-if="item.type === 'add'">新增</span>
      <span v-if="item.type === 'close'">关闭</span>
    </a-button>
  </a-space>
</template>

<script>
import {
  SearchOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "Page",
  props: {
    toolArray: {
      default: [],
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.toolArray);
  },
  components: {
    SearchOutlined,
    PlusOutlined,
    CloseOutlined,
  },
};
</script>

<style lang="less" scoped>
</style>