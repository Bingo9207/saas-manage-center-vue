<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<script>
import { NConfigProvider } from "naive-ui";
export default {
  name: "Home",
  data() {
    return {
      themeOverrides: {
        // common: {
        //   primaryColor: "#1890ff",
        //   primaryColorHover: "#f60"
        // },
        // Button: {
        //   textColor: "#FF0000",
        // },
        // Select: {
        //   peers: {
        //     InternalSelection: {
        //       textColor: "#FF0000",
        //     },
        //   },
        // },
      },
    };
  },
  components: {
    NConfigProvider,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}
</style>
