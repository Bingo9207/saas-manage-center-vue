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
        common: {
          fontSize: "12px",
          primaryColor: "#2080f0",
          primaryColorHover: "#4098FC",
          primaryColorPressed: "#1060C9",
        },
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
