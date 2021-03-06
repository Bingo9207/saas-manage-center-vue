<template>
  <div class="layout">
    <div class="layout-header">
      <div class="logo"><img src="../assets/logo.png" alt="logo" /></div>
      <div class="title">云•POS商业管理系统</div>
      <div class="account">
        <a-dropdown trigger="click">
          <a class="ant-dropdown-link" @click.prevent>
            {{ userName }} ({{ account }})
            <down-outlined />
          </a>
          <template #overlay>
            <a-menu @click="handleAccount">
              <a-menu-item>{{ formatBranchInfo }}</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="layout-container">
      <div class="layout-aside">
        <div class="menu">
          <div
            class="menu-item"
            v-for="(item, index) in sideNav"
            :key="item.path"
            :class="{
              'menu-item-fixed': index === sideNav.length - 1,
              'menu-item-active': sideKeys === item.path,
            }"
            @click="linkRouter(item)"
          >
            <div class="icon">
              <my-icon :type="item.meta.icon" :style="iconStyle" />
            </div>
            <div class="title">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="layout-main">
        <div class="layout-tabs-container">
          <div class="layout-tabs">
            <a-tag
              v-for="tag in tabList"
              size="large"
              :key="tag.path"
              :closable="tag.path.split('/').length > 2"
              @click="changeTab(tag)"
              @close.stop="closeTab(tag)"
            >
              {{ tag.name }}
            </a-tag>
          </div>
        </div>
        <div class="layout-content">
          <keep-alive v-for="item in tabPlatList" :key="item.path">
            <component v-if="tabKeys === item.path" :is="item.comp" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
import { DownOutlined } from "@ant-design/icons-vue";
import ErrorComponent from "./Error.vue";
import MyIcon from "../components/MyIcon.vue";
export default {
  name: "Layout",
  data() {
    return {
      account: "",
      userName: "",
      sideNav: [],
      tabPlatList: [],
      normalTab: {
        // borderColor
      },
      iconStyle: {
        fontSize: "24px",
      },
    };
  },
  computed: {
    ...mapState({
      sideKeys: (state) => state.router.sideKeys,
      tabKeys: (state) => state.router.tabKeys,
      tabList: (state) => state.router.tabList,
    }),
    formatBranchInfo() {
      return `${sessionStorage.getItem("branchName")} (${sessionStorage.getItem(
        "branchNo"
      )})`;
    },
  },
  created() {
    const account = sessionStorage.getItem("account");
    const userName = sessionStorage.getItem("userName");
    const router = JSON.parse(sessionStorage.getItem("router") || "[]");
    if (!account) {
      this.$router.push("/login");
    }
    this.sideNav = router;
    this.account = account;
    this.userName = userName;
    // 初始化赋值
    this.initSideKeys();
    this.initTabKeys();
    this.initTabList();
    this.loadTabPlat();
  },
  methods: {
    // 初始化sideKeys
    initSideKeys() {
      const sideKeys = sessionStorage.getItem("sideKeys");
      if (sideKeys) {
        this.$store.commit("router/updateSideKeys", sideKeys);
      }
    },
    // 初始化tabKeys
    initTabKeys() {
      this.tabKeys = this.$route.path;
      this.$store.commit("router/updateTabKeys", this.$route.path);
    },
    // 初始化sideKeys
    initTabList() {
      const tabList = JSON.parse(sessionStorage.getItem("tabList") || "[]");
      if (tabList) {
        this.$store.commit("router/assignmentTabList", tabList);
      }
    },
    // 跳转路由
    linkRouter(record) {
      sessionStorage.setItem("sideKeys", record.path);
      this.$store.commit("router/updateSideKeys", record.path);
      if (record.path === "/welcome") {
        this.$router.push("/welcome");
        this.$store.commit("router/updateTabKeys", record.path);
        this.$store.commit("router/updateTabList", {
          path: "/welcome",
          name: "工作台",
        });
      } else {
        this.$router.push("/nav");
        this.$store.commit("router/updateTabKeys", "/nav");
        this.$store.commit("router/updateTabList", {
          path: "/nav",
          name: "导航页",
        });
      }
      this.loadTabPlat();
    },
    // 切换tab
    changeTab(record) {
      this.$router.push(record.path);
      this.$store.commit("router/updateTabKeys", record.path);
    },
    // 加载组件
    loadTabPlat() {
      this.tabList.forEach((item) => {
        if (this.tabPlatList.findIndex((row) => row.path === item.path) < 0) {
          const tempItem = { ...item };
          switch (item.path) {
            case "/welcome":
              tempItem.comp = defineAsyncComponent({
                loader: () => import("./Welcome.vue"),
              });
              break;

            case "/nav":
              tempItem.comp = defineAsyncComponent({
                loader: () => import("./Nav.vue"),
              });
              break;

            default:
              tempItem.comp = defineAsyncComponent({
                loader: () => import("." + item.path),
                errorComponent: ErrorComponent,
              });
              break;
          }
          this.tabPlatList.push(tempItem);
        }
      });
      this.tabPlatList.forEach((item, index) => {
        if (this.tabList.findIndex((row) => row.path === item.path) < 0) {
          this.tabPlatList.splice(index, 1);
        }
      });
    },
    // 用户操作
    handleAccount({ key }) {
      switch (key) {
        case "logout":
          this.$store.commit("router/logout");
          this.$router.push("/login");
          break;

        default:
          break;
      }
    },
    // 关闭tab页
    closeTab(record) {
      this.$store.commit("router/deleteTabItem", record.path);
    },
  },
  watch: {
    tabKeys(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.loadTabPlat();
      }
    },
  },
  components: {
    DownOutlined,
    ErrorComponent,
    MyIcon,
  },
};
</script>

<style scoped lang="less">
.layout {
  height: 100vh;
  background-color: #f1f1f1;
  overflow: hidden;

  .layout-header {
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

      .user {
        cursor: pointer;
      }
    }
  }

  .layout-container {
    display: flex;
    height: calc(100vh - 50px);
    overflow: hidden;

    .layout-aside {
      position: relative;
      width: 100px;
      height: 100%;
      background-color: #313540;
      overflow: hidden;

      .menu {
        height: calc(100% - 80px);
        color: #f1f1f1;
        text-align: center;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.4);
        }

        &::-webkit-scrollbar-track {
          border-radius: 0;
          background: rgba(255, 255, 255, 0.9);
        }

        .menu-item {
          height: 80px;
          padding: 8px 0;
          cursor: pointer;

          &:hover {
            background-color: #3e4556;
          }

          .icon {
            height: 32px;
            padding: 4px 0;
          }

          .title {
            height: 32px;
            line-height: 32px;
            user-select: none;
          }
        }

        .menu-item-fixed {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
        }

        .menu-item-active {
          color: #fff;
          background-color: var(--primaryColor);

          &:hover {
            background-color: var(--primaryColor);
          }
        }
      }
    }

    .layout-main {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0 8px 8px;
      background-color: #f0f0f0;
      overflow: hidden;

      .layout-tabs-container {
        height: 48px;

        .layout-tabs {
          padding: 8px 0;
        }
      }

      .layout-content {
        flex: 1;
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>