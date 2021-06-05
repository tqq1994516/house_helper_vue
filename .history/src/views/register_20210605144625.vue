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
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                type="password"
                v-model="form.password2"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓">
              <el-input
                v-model="form.first_name"
                placeholder="请输入姓"
              ></el-input>
            </el-form-item>
            <el-form-item label="名">
              <el-input
                v-model="form.last_name"
                placeholder="请输入名"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input
                v-model="form.mobile_phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
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
              <el-button type="primary" @click="onRegister">注册</el-button>
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
import { ElMessage } from "node_modules/element-plus/lib";
export default defineComponent({
  name: "register",
  data() {
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
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      err: Object,
      sex_checked: 0,
    };
  },
  methods: {
    onRegister: function () {
      if (this.form.sex == "男") {
        this.sex_checked = 1;
      } else {
        this.sex_checked = 2;
      }
      var dateFormat = require('dateformat');
      this.form.birthday = dateFormat(this.form.birthday, "isoDate")
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
          this.err = eval(res.data);
        }); 
    },
    toLogin: function () {
      this.$router.push({ path: "/login" });
    },
    sucessT() {
      ElMessage.success
    }
  },
  mounted() {
    (async () =>
      await api.register.register_form(null).then((res: any) => {
        this.form.username = eval(res.data.username);
        this.form.password = eval(res.data.password);
        this.form.first_name = eval(res.data.first_name);
        this.form.last_name = eval(res.data.last_name);
        this.form.email = eval(res.data.email);
        this.form.sex = eval(res.data.sex);
        this.form.mobile_phone = eval(res.data.mobile_phone);
        this.form.birthday = eval(res.data.birthday);
      }))();
  },
});
</script>

<style>
</style>