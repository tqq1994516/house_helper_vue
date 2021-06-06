<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" align="middle">
        <el-col span="12" offset="6 ">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="60px"
            style="
              margin-top: 40%;
              border: 1px solid #ebebeb;
              border-radius: 3px;
              padding: 50px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            "
            show-message="true"
            status-icon="true"
            size="medium"
          >
            <el-form-item label="用户名">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onLogin('form')"
                :loading="login_loading"
                :disabled="login_button"
                >登录</el-button
              >
              <el-button type="warning" @click="toRegister">注册</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "login",
  data() {
    const checkUsername = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入用户名"));
        this.login_btn_true();
      } else if (value.length < 3 || value.length > 20) {
        callback(new Error("长度在 3 到 20 个字符"));
        this.login_btn_true();
      } else {
        callback();
        this.login_btn_false();
      }
    };
    const checkPassword = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入密码"));
        this.login_btn_true();
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("长度在 6 到 20 个字符"));
        this.login_btn_true();
      } else {
        callback();
        this.login_btn_false();
      }
    };
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validate: checkUsername, trigger: "blur" }],
        password: [{ validate: checkPassword, trigger: "blur" }],
      },
      message: "",
      login_button: false,
      login_loading: false,
    };
  },
  methods: {
    onLogin(formName: any) {
      (this.$refs[formName] as HTMLFormElement).validate((valid: any) => {
        if (valid) {
          api.login
            .login({
              username: this.form.username,
              password: this.form.password,
            })
            .then((res: any) => {
              const data = eval(res);
              this.message = data.data.message;
              this.sucessTip();
            })
            .catch((res: any) => {
              const data = eval(res);
              this.message = data.data.message;
              this.failTip();
            });
        }
      });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    toIndex() {
      this.login_loading = true;
      this.$router.push({ path: "/index" });
    },
    sucessTip() {
      ElMessage.success({
        message: this.message,
        type: "success",
        center: true,
        onClose: this.toIndex,
      });
    },
    failTip() {
      ElMessage.error({
        message: this.message,
        type: "error",
        center: true,
      });
    },
    login_btn_true() {
      this.login_button = true;
    },
    login_btn_false() {
      this.login_button = false;
    },
  },
  mounted() {
    (async () =>
      await api.login.login_form(null).then((res: any) => {
        this.form.username = eval(res.data.username);
        this.form.password = eval(res.data.password);
      }))();
  },
});
</script>

<style>
</style>