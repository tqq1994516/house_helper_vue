<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" align="middle">
        <el-col span="12" offset="6 ">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
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
                v-model="form.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input
                type="password"
                v-model="form.password2"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓" prop="first_name">
              <el-input
                v-model="form.first_name"
                placeholder="请输入姓"
              ></el-input>
            </el-form-item>
            <el-form-item label="名" prop="last_name">
              <el-input
                v-model="form.last_name"
                placeholder="请输入名"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile_phone">
              <el-input
                v-model="form.mobile_phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-col :span="24">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.birthday"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onRegister('form')"
                :disabled="register_button"
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
import { defineComponent } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  $refs: {
    validate: HTMLFormElement,
  },
  name: "register",
  data() {
    let reg_chinese = /\u4e00-\u9fa5/;
    let reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let reg_mobile_phone = /^1[356789]\d{9}$/;
    const checkUsername = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入用户名"));
        this.register_btn_true();
      } else if (value.length < 3 || value.length > 20) {
        callback(new Error("长度在 3 到 20 个字符"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkPassword = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入密码"));
        this.register_btn_true();
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("长度在 6 到 20 个字符"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkPassword2 = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
        this.register_btn_true();
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("长度在 6 到 20 个字符"));
        this.register_btn_true();
      } else if (this.password != value) {
        callback(new Error("两次输入密码不一致"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkFirstName = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入姓"));
        this.register_btn_true();
      } else if (!reg_chinese.test(value)) {
        callback(new Error("请输入中文"));
        this.register_btn_true();
      } else if (value.length < 1 || value.length > 10) {
        callback(new Error("长度在 1 到 10 个字符"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkLastName = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入名"));
        this.regeister_btn_true();
      } else if (!reg_chinese.test(value)) {
        callback(new Error("请输入中文"));
        this.register_btn_true();
      } else if (value.length < 1 || value.length > 10) {
        callback(new Error("长度在 1 到 10 个字符"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkEmail = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
        this.register_btn_true();
      } else if (!reg_email.test(value)) {
        callback(new Error("请输入正确的邮箱格式"));
        this.register_btn_true();
      } else if (value.length < 1 || value.length > 30) {
        callback(new Error("长度在 1 到 30 个字符"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkSex = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请选择性别"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkMobliePhone = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请输入手机号入"));
        this.register_btn_true();
      } else if (!reg_mobile_phone.test(value)) {
        callback(new Error("请输入正确的手机号格式"));
        this.register_btn_true();
      } else if (value.length != 11) {
        callback(new Error("请输入正确的手机号格式"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    const checkBirthday = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error("请选择出生日期"));
        this.register_btn_true();
      } else {
        callback();
        this.register_btn_false();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
        email: "",
        sex: "",
        mobile_phone: 0,
        birthday: "",
      },
      rules: {
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
      },
      sex_checked: 0,
      message: "",
      register_button: false,
    };
  },
  methods: {
    onRegister(formName: any) {
      (this.$refs[formName] as HTMLFormElement).validate((valid: any) => {
        if (valid) {
          if (this.form.sex == "男") {
            this.sex_checked = 1;
          } else {
            this.sex_checked = 2;
          }
          var dateFormat = require("dateformat");
          this.form.birthday = dateFormat(this.form.birthday, "isoDate");
          api.register
            .register({
              username: this.form.username,
              password: this.form.password,
              first_name: this.form.first_name,
              last_name: this.form.last_name,
              email: this.form.email,
              mobile_phone: this.form.mobile_phone,
              sex: this.sex_checked,
              birthday: this.form.birthday,
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
        } else {
          this.register_btn_true();
        }
      });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    sucessTip() {
      ElMessage.success({
        message: this.message,
        type: "success",
        center: true,
        onClose: this.toLogin,
      });
    },
    failTip() {
      ElMessage.error({
        message: this.message,
        type: "error",
        center: true,
      });
    },
    register_btn_true() {
      this.register_button = true;
    },
    register_btn_false() {
      this.register_button = false;
    },
  },
  mounted() {
    (async () =>
      await api.register.register_form(null).then((res: any) => {
        const data = eval(res);
        this.form.username = data.username;
        this.form.password = data.password;
        this.form.first_name = data.first_name;
        this.form.last_name = data.last_name;
        this.form.email = data.email;
        this.form.sex = data.sex;
        this.form.mobile_phone = data.mobile_phone;
        this.form.birthday = data.birthday;
      }))();
  },
});
</script>

<style>
</style>