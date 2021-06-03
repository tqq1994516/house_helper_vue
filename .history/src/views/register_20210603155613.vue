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
              ></el-input>
            </el-form-item>
            <el-form-item label='确认密码'>
              <el-input
                type="password"
                v-model="form.password2"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label='请输入姓'>
              <el-input
                v-model="form.first_name"
                placeholder="姓"
              ></el-input>
            </el-form-item>
            <el-form-item label='名'>
              <el-input
                v-model="form.last_name"
                placeholder="请输入名"
              ></el-input>
            </el-form-item>
            <el-form-item label='邮箱'>
              <el-input
                v-model="form.email"
                placeholder="邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label='邮箱'>
              <el-input
                v-model="form.email"
                placeholder="邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
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
        sex: Number,
        mobile_phone: Number,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      err: Object,
    };
  },
  methods: {
    onLogin: function () {
      api.login
        .login({ username: this.form.username, password: this.form.password })
        .then((res: any) => {
          this.err = eval(res.data);
        });
    },
    toRegister: function () {
      this.$router.push({ path: "" });
    },
  },
  mounted() {
    (async () =>
      await api.register.register_form(null).then((res: any) => {
        this.form.username = eval(res.data.username);
        this.form.password = eval(res.data.password);
        this.form.password2 = eval(res.data.password2);
        this.form.first_name = eval(res.data.first_name);
        this.form.last_name = eval(res.data.last_name);
        this.form.email = eval(res.data.email);
        this.form.sex = eval(res.data.sex);
        this.form.mobile_phone = eval(res.data.mobile_phone);
      }))();
  },
});
</script>

<style>
</style>