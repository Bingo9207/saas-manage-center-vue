<template>
  <icon-font :type="type" />
</template>
<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2578750_olw2j6oqqu.js",
});
export default {
  props: {
    type: {
      default: ''
    }
  },
  components: {
    IconFont,
  },
};
</script>