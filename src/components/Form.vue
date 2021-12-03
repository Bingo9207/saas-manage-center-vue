<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
  >
    <a-row gutter="20">
      <a-col v-for="item in columns" :key="item.name" :span="item.span || 8">
        <a-form-item :label="item.label" :name="item.name">
          <a-input v-model:value="form[item.name]" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: "Form",
  props: {
    columns: {
      default: [],
    },
    labelCol: {
      default: {
        style: {
          width: "100px",
        },
      },
    },
  },
  data() {
    return {
      form: {},
    };
  },
  created() {
    console.log(this.columns);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>