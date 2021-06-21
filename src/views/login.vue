<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" align="middle">
        <el-col span="12" offset="6 ">
          <el-form
            ref="loginRef"
            :model="loginForm"
            :rules="loginRules"
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
                v-model="loginForm.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="请输入密码"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onLogin"
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
import { defineComponent, onMounted, reactive, ref, unref } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "login",
  setup (){
    const router = useRouter();
    const checkUsername = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入用户名"));
        login_btn_true();
      } else if (value.length < 3 || value.length > 20) {
        callback(new Error("长度在 3 到 20 个字符"));
        login_btn_true();
      } else {
        callback();
        login_btn_false();
      }
    };
    const checkPassword = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入密码"));
        login_btn_true();
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("长度在 6 到 20 个字符"));
        login_btn_true();
      } else {
        callback();
        login_btn_false();
      }
    };
    const loginForm = reactive({
      username:"",
      password:"",
    })
    const loginRef = ref()
    const loginRules = ref({
        username: [{ validate: checkUsername, trigger: "blur" }],
        password: [{ validate: checkPassword, trigger: "blur" }],
      })
    const message = ref("")
    const login_button = ref(false)
    const login_loading = ref(false)
    const onLogin = () => {
      unref(loginRef).validate((valid: any) => {
        if (valid) {
          api.login
            .login({
              username: loginForm.username,
              password: loginForm.password,
            })
            .then((res: any) => {
              const data = eval(res);
              message.value = data.data.message;
              sucessTip();
            })
            .catch((res: any) => {
              const data = eval(res);
              message.value = data.data.message;
              failTip();
            });
        }
      });
    }
    const toRegister = () => {
      router.push({ path: "/register" });
    }
    const toIndex = () => {
      login_loading.value = true;
      router.push({ path: "/index" });
    }
    const sucessTip = () => {
      ElMessage.success({
        message: message.value,
        type: "success",
        center: true,
        onClose: toIndex,
      });
    }
    const failTip = () => {
      ElMessage.error({
        message: message.value,
        type: "error",
        center: true,
      });
    }
    const login_btn_true = () => {
      login_button.value = true;
    }
    const login_btn_false = () => {
      login_button.value = false;
    }
    onMounted(() =>{
    (async () =>
      await api.login.login_form(null).then((res: any) => {
        loginForm.username = eval(res.data.username);
        loginForm.password = eval(res.data.password);
      }))();
    },)
  return {
      loginForm,
      rules: 
      message,
      login_button,
      login_loading,
      toRegister,
      toIndex,
      onLogin,
      loginRules,
      loginRef
    };
  },
});
</script>

<style>
</style>