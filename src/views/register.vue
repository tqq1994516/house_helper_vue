<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" align="middle">
        <el-col span=12 offset=6>
          <el-form
            ref="registerRef"
            :model="registerForm"
            :rules="registerRules"
            label-width="80px"
            style="
              margin-top: 40%;
              border: 1px solid #ebebeb;
              border-radius: 3px;
              padding: 50px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            "
            :show-message="true"
            :status-icon="true"
            size="medium"
            validate-on-rule-change
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input
                type="password"
                v-model="registerForm.password2"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓" prop="first_name">
              <el-input
                v-model="registerForm.first_name"
                placeholder="请输入姓"
              ></el-input>
            </el-form-item>
            <el-form-item label="名" prop="last_name">
              <el-input
                v-model="registerForm.last_name"
                placeholder="请输入名"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="registerForm.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile_phone">
              <el-input
                v-model="registerForm.mobile_phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="registerForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-col :span="24">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="registerForm.birthday"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onRegister"
                :disabled="register_button"
                :loading="register_loading"
                >注册</el-button
              >
              <el-button type="warning" @click="toLogin">返回登录</el-button>
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
  name: "register",
  setup(){
    const router = useRouter();
    const reg_chinese = /[\u4e00-\u9fa5]/;
    const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const reg_mobile_phone = /^1[356789]\d{9}$/;
    const register_button = ref(false)
    const message = ref("")
    const register_loading = ref(false)
    const register_btn_true = () => {
      register_button.value = true;
    }
    const register_btn_false = () => {
      register_button.value = false;
    }

    const checkUsername = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入用户名"));
        register_btn_true();
      } else if (value.length < 3 || value.length > 20) {
        callback(new Error("长度在 3 到 20 个字符"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };

    const checkPassword = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入密码"));
        register_btn_true();
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("长度在 6 到 20 个字符"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const checkPassword2 = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
        register_btn_true();
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("长度在 6 到 20 个字符"));
        register_btn_true();
      } else if (registerForm.password != value) {
        callback(new Error("两次输入密码不一致"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const checkFirstName = (rule: any, value: any, callback: any) => {
      if (!reg_chinese.test(value)) {
        callback(new Error("请输入中文"));
        register_btn_true();
      } else if (value.length < 1 || value.length > 10) {
        callback(new Error("长度在 1 到 10 个字符"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const checkLastName = (rule: any, value: any, callback: any) => {
      if (!reg_chinese.test(value)) {
        callback(new Error("请输入中文"));
        register_btn_true();
      } else if (value.length < 1 || value.length > 10) {
        callback(new Error("长度在 1 到 10 个字符"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const checkEmail = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
        register_btn_true();
      } else if (!reg_email.test(value)) {
        callback(new Error("请输入正确的邮箱格式"));
        register_btn_true();
      } else if (value.length < 1 || value.length > 30) {
        callback(new Error("长度在 1 到 30 个字符"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const checkSex = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请选择性别"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const checkMobliePhone = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入手机号"));
        register_btn_true();
      } else if (!reg_mobile_phone.test(value)) {
        callback(new Error("请输入正确的手机号格式"));
        register_btn_true();
      } else if (value.length != 11) {
        callback(new Error("请输入正确的手机号格式"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const checkBirthday = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请选择出生日期"));
        register_btn_true();
      } else {
        callback();
        register_btn_false();
      }
    };
    const onRegister = () => {
      unref(registerRef).validate((valid: any) => {
        if (valid) {
          var dateFormat = require("dateformat");
          registerForm.birthday = dateFormat(registerForm.birthday, "isoDate");
          api.register
            .register({
              username: registerForm.username,
              password: registerForm.password,
              password2: registerForm.password2,
              first_name: registerForm.first_name,
              last_name: registerForm.last_name,
              email: registerForm.email,
              mobile_phone: registerForm.mobile_phone,
              sex: registerForm.sex,
              birthday: registerForm.birthday,
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
        } else {
          register_btn_true();
        }
      });
    }
    const toLogin = () => {
      router.push({ name: "Login" });
    }
    const sucessTip = () => {
      ElMessage.success({
        message: message.value,
        type: "success",
        center: true,
        onClose: toLogin,
      });
    }
    const failTip = () => {
      ElMessage.error({
        message: message.value,
        type: "error",
        center: true,
      });
    }

    const registerRef = ref()
    const registerForm = reactive({
      username: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
      email: "",
      mobile_phone: "",
      sex: "1",
      birthday: ""
    })
    const registerRules = ref({
        username: [
          {
            validator: checkUsername,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: checkPassword,
            trigger: "blur",
          },
        ],
        password2: [
          {
            validator: checkPassword2,
            trigger: "blur",
          },
        ],
        first_name: [
          {
            validator: checkFirstName,
            trigger: "blur",
          },
        ],
        last_name: [{ validator: checkLastName, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        sex: [{ validator: checkSex, trigger: "blur" }],
        mobile_phone: [{ validator: checkMobliePhone, trigger: "blur" }],
        birthday: [{ validator: checkBirthday, trigger: "blur" }],
    })
    onMounted(() => {
      (async () =>
      await api.register.register_form(null).then((res: any) => {
        const data = eval(res);
        registerForm.username = data.username;
        registerForm.password = data.password;
        registerForm.first_name = data.first_name;
        registerForm.last_name = data.last_name;
        registerForm.email = data.email;
        registerForm.sex = data.sex;
        registerForm.mobile_phone = data.mobile_phone;
        registerForm.birthday = data.birthday;
      }))();
    })
    return {
      registerForm,
      registerRef,
      message,
      register_button,
      register_loading,
      registerRules,
      onRegister,
      toLogin
    }
  },
});
</script>

<style>
</style>