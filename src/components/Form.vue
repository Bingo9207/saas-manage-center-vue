<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-row>
      <a-col v-for="item in columns" :key="item.name" :span="item.span || 8">
        <a-form-item ref="name" label="Activity name" name="name">
          <a-input v-model:value="form.name" />
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
  },
  data() {
    return {
      form: {},
    };
  },
  created() {
    console.log(this.columns)
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>