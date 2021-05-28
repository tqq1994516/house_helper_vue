<template>
  <el-container>
    <el-header>
      <el-row :gutter="10" justify="center" align="middle">
        <el-col :span="2">
          <img src="" alt="" />
          <p>房产助手</p>
        </el-col>
        <el-col :span="2" :offset="18">
          <img src="" alt="" />
          <p>
            usernmae
            <i class="el-icon-arrow-down"></i>
          </p>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside>
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false" v-show="isCollapse" :>
            <i class="el-icon-d-arrow-right"></i>
          </el-radio-button>
          <el-radio-button :label="true" v-show="!isCollapse">
            <i class="el-icon-d-arrow-left"></i>
          </el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template #title>选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <template #title>导航二</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <template #title>导航三</template>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <template #title>导航四</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
export default {
  name: "index",
  components: {},
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath);
    },
    handleClose(key: string, keyPath: string) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>