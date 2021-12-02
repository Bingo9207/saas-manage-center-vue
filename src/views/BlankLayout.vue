<template>
  <div>
    <n-input v-model:value="input" type="text" placeholder="基本的 Input" />
  </div>
</template>

<script>
export default {
  name: "BlankLayout",
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style>
</style>