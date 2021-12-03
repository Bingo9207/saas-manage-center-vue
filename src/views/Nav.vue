<template>
  <div class="container-nav">
    <div class="container">
      <div class="column" v-for="item in nav" :key="item.name">
        <div class="avatar">
          <my-icon :type="item.meta.icon" :style="iconStyle" />
        </div>
        <dl>
          <dt>{{ item.name }}</dt>
          <dd>
            <span
              v-for="row in item.children"
              :key="row.path"
              @click="linkRouter(row)"
              >{{ row.name }}</span
            >
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyIcon from "../components/MyIcon.vue";
export default {
  name: "Nav",
  data() {
    return {
      nav: [],
      iconStyle: {
        fontSize: "32px",
        color: "#999",
      },
    };
  },
  computed: {
    ...mapState({
      sideKeys: (state) => {
        return state.router.sideKeys;
      },
    }),
  },
  created() {
    this.fetchRouter();
  },
  methods: {
    fetchRouter() {
      const router = JSON.parse(sessionStorage.getItem("router") || "[]");
      const currentMenu = router.filter((item) => item.path === this.sideKeys);
      this.nav = currentMenu[0].children;
    },
    linkRouter(record) {
      this.$router.push(record.path);
      this.$store.commit("router/updateTabKeys", record.path);
      this.$store.commit("router/updateTabList", {
        path: record.path,
        name: record.name,
      });
    },
  },
  watch: {
    sideKeys(newValue, oldValue) {
      if (newValue && oldValue !== newValue) {
        this.fetchRouter();
      }
    },
  },
  components: {
    MyIcon,
  },
};
</script>

<style scoped lang="less">
.container-nav {
  height: 100%;
  background-color: #fff;

  .container {
    padding: 20px 16px;

    .column {
      display: flex;
      margin-top: 24px;

      .avatar {
        width: 100px;
        padding: 11px 0;
        font-size: 0;
        text-align: center;
        border-right: 1px solid #eaeaeb;
      }

      dl {
        flex: 1;
        margin: 0;
        padding-left: 20px;

        dt {
          height: 28px;
          font-size: 18px;
          font-weight: 600;
          line-height: 28px;
        }

        dd {
          margin: 0;
          font-size: 16px;
          color: #666;
          line-height: 25px;
          overflow: hidden;

          span {
            float: left;
            margin: 5px 16px 0 0;
            cursor: pointer;
            user-select: none;

            &:hover {
              color: var(--primaryColor);
            }
          }
        }
      }

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>