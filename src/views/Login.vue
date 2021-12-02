<template>
  <div class="layout">
    <div class="container">
      <n-form
        ref="loginForm"
        label-placement="left"
        :model="form"
        :rules="rules"
      >
        <n-form-item path="organization">
          <n-input placeholder="企业编号" v-model:value="form.organization">
            <template #prefix>
              <n-icon>
                <business-outline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="account">
          <n-input placeholder="用户名" v-model:value="form.account">
            <template #prefix>
              <n-icon>
                <person-outline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            type="password"
            placeholder="密码"
            v-model:value="form.password"
          >
            <template #prefix>
              <n-icon>
                <lock-closed-outline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="code">
          <n-input placeholder="验证码" v-model:value="form.code" @keyup.enter="login">
            <template #prefix>
              <n-icon>
                <image-outline />
              </n-icon>
            </template>
            <template #suffix>
              <img class="code" :src="verifyCode" @click="fetchVerifyCode" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>
      <n-button block :loading="loadingLogin" type="primary" @click="login"
        >登 录</n-button
      >
    </div>
  </div>
</template>

<script>
import {
  BusinessOutline,
  PersonOutline,
  LockClosedOutline,
  ImageOutline,
} from "@vicons/ionicons5";
export default {
  name: "Login",
  data() {
    return {
      form: {},
      rules: {
        organization: {
          required: true,
          trigger: "input",
          message: "企业编号不能为空",
        },
        account: {
          required: true,
          trigger: "input",
          message: "用户名不能为空",
        },
        password: {
          required: true,
          trigger: "input",
          message: "密码不能为空",
        },
        code: {
          required: true,
          trigger: "input",
          message: "验证码不能为空",
        },
      },
      verifyCode: undefined,
      loadingLogin: false,
    };
  },
  components: {
    BusinessOutline,
    PersonOutline,
    LockClosedOutline,
    ImageOutline,
  },
  created() {
    const organization = localStorage.getItem("organization");
    if (organization) {
      this.form.organization = organization;
    }
    this.fetchVerifyCode();
  },
  methods: {
    fetchVerifyCode() {
      // 获取验证码
      const arr = [];
      const hexDigits = "0123456789abcdef";
      let verifyKey;
      for (let i = 0; i < 36; i++) {
        arr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      arr[14] = "4";
      arr[19] = hexDigits.substr((arr[19] & 0x3) | 0x8, 1);
      arr[8] = arr[13] = arr[18] = arr[23] = "-";
      verifyKey = arr.join("");
      this.$http({
        url: `/api/oauth/anno/captcha?key=${verifyKey}`,
        method: "GET",
        responseType: "blob",
      }).then((res) => {
        this.verifyKey = verifyKey;
        this.verifyCode = URL.createObjectURL(res);
      });
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          const tenantValue = window.btoa(
            encodeURIComponent(this.form.organization)
          );
          const params = {
            ...this.form,
            key: this.verifyKey,
            tenant: tenantValue,
            grantType: "captcha",
          };
          delete params.organization;
          sessionStorage.setItem("tenant", tenantValue);
          this.loadingLogin = true;
          this.$http({
            url: "/api/oauth/noToken/login",
            data: params,
          }).then((res) => {
            if (res.code === 0) {
              // 缓存企业编号
              localStorage.setItem("organization", this.form.organization);
              // 缓存登录信息
              sessionStorage.setItem("account", res.data.account);
              sessionStorage.setItem("userName", res.data.name);
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem("refreshToken", res.data.refreshToken);
              // 缓存连锁信息
              // 0:单店版  1:连锁版
              sessionStorage.setItem(
                "chain",
                res.extra ? res.extra.chainFlag || "0" : "0"
              );
              this.userInfo = res.data;
              // 请求路由
              this.fetchRouter();
              this.fetchUserInfo();
            } else {
              this.form.code = "";
              this.loadingLogin = false;
              this.fetchVerifyCode();
            }
          });
        }
      });
    },
    fetchRouter() {
      this.loadingRouter = true;
      this.$http({
        url: `/api/oauth/menu/router?ts=${new Date().getTime()}`,
        method: "GET",
      }).then((res) => {
        if (res.code === 0) {
          this.loadingRouter = false;
          // 缓存路由信息
          sessionStorage.setItem("router", JSON.stringify(res.data));
          this.linkRouter();
        }
      });
    },
    fetchUserInfo() {
      this.loadingUserInfo = true;
      this.$http({
        url: ` /api/authority/user/queryUserDetailById/${this.userInfo.userId}`,
        method: "GET",
      }).then((res) => {
        if (res.code === 0) {
          const { org } = res.data.baseUser;
          this.loadingUserInfo = false;
          // 缓存登录信息
          sessionStorage.setItem("branchNo", org.orgNo);
          sessionStorage.setItem("branchName", org.orgName);
          this.linkRouter();
        }
      });
    },
    linkRouter() {
      if (!this.loadingRouter && !this.loadingUserInfo) {
        this.loadingLogin = false;
        this.$store.commit("router/updateSideKeys", "/welcome");
        this.$store.commit("router/updateTabKeys", "/welcome");
        this.$store.commit("router/updateTabList", {
          path: "/welcome",
          name: "工作台",
        });
        this.$router.push("/welcome");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  position: relative;
  height: 100vh;
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .container {
    position: absolute;
    top: 50%;
    right: 10%;
    width: 360px;
    padding: 20px;
    border-radius: 6px;
    background-color: #fff;
    transform: translateY(-50%);

    .code {
      display: block;
      height: 32px;
      cursor: pointer;
    }
  }
}
</style>