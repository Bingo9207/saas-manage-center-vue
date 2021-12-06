<template>
  <a-form
    ref="formRef"
    :class="formatFormClass"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
  >
    <a-row gutter="20">
      <a-col v-for="item in columns" :key="item.name" :span="item.span || 8">
        <a-form-item :label="item.label" :name="item.name">
          <a-input
            v-if="item.type === 'input'"
            v-model:value="form[item.name]"
            autoComplete="false"
          />
          <a-select
            v-if="item.type === 'select'"
            v-model:value="form[item.name]"
            :allow-clear="true"
            placeholder="请选择"
          >
            <a-select-option
              v-for="row in item.options"
              :key="row.value"
              :value="row.value"
              >{{ row.label }}</a-select-option
            >
          </a-select>
          <a-radio-group
            v-if="item.type === 'radio'"
          >
            <a-radio
              v-for="row in item.options"
              :key="row.value"
              :value="row.value"
              >{{ row.label }}</a-radio
            >
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: "Form",
  props: {
    formType: {
      default: "search",
    },
    formValues: {
      default: {}
    },
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
  computed: {
    formatFormClass: function () {
      return {
        "search-form": this.formType === "search",
      };
    },
  },
  created() {
    this.form = this.formValues;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.search-form {
  :deep(.ant-form-item) {
    margin-top: 8px;
    margin-bottom: 0;

    .ant-form-item-control-input {
      max-width: 240px;
    }
  }
}
</style>