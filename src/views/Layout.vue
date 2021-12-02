<template>
  <div class="layout">
    <div class="header">
      <div class="logo"><img src="../assets/logo.png" alt="logo" /></div>
      <div class="title">云•POS商业管理系统</div>
      <div class="account">
        <n-dropdown trigger="click" @select="handleSelect" :options="options">
          {{ userName }} ({{ account }})
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      account: "",
      userName: "",
      options: [],
    };
  },
  created() {
    const account = sessionStorage.getItem("account");
    const userName = sessionStorage.getItem("userName");
    const branchNo = sessionStorage.getItem("branchNo");
    const branchName = sessionStorage.getItem("branchName");
    if (!account) {
      // this.$router.push("/login");
    }
    this.account = account;
    this.userName = userName;
    this.options = [
      {
        label: `${branchName} (${branchNo})`,
        key: "userInfo",
      },
      {
        type: "divider",
        key: "d1",
      },
      {
        label: "退出登录",
        key: "logout",
      },
    ];
  },
};
</script>

<style scoped lang="less">
.layout {
  height: 100vh;
  background-color: #f1f1f1;
  overflow: hidden;

  .header {
    position: relative;
    height: 50px;
    box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    z-index: 2;

    .logo {
      float: left;
      padding: 0 15px;

      img {
        display: block;
        height: 50px;
      }
    }

    .title {
      float: left;
      font-weight: 600;
      font-size: 20px;
      line-height: 50px;
      letter-spacing: 2px;
    }

    .account {
      float: right;
      padding-right: 20px;
      line-height: 50px;
    }
  }
}
</style>