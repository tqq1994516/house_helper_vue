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
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          ref="asideMenu"
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
          <template v-for="(value, key, index) in lv1_menus_results" :key="index">
            <template v-if="value.hierarchy==1&!value.have_child">
              <el-menu-item :index="index">
                <i :class="value.icon"></i>
                <template #title>{{ value.name }}
                  </template>
              </el-menu-item>
            </template>
            <template v-else-if="value.hierarchy==2">
              <el-submenu :index="index">
                <template #title>
                  <i :class="value.icon"></i>
                  <span>{{ value.name }}</span>
                </template>
                <template v-for="(val ,ka, ind) in lv2_menus_results" :key="ind">
                  <template v-if="val.parent_id==index&val.hierarchy==2&!val.have_child">
                    <el-menu-item ></el-menu-item>
                  </template>
                </template>
              </el-submenu>
            </template>
          </template>
        </el-menu>
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false" v-show="isCollapse" ref="controller">
            <i class="el-icon-d-arrow-right"></i>
          </el-radio-button>
          <el-radio-button :label="true" v-show="!isCollapse">
            <i class="el-icon-d-arrow-left"></i>
          </el-radio-button>
        </el-radio-group>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
  count={{ lv1_menus_count }}
  results={{lv1_menus_results}}
</template>

<script lang="ts">
import menus from "@/api/menus";
import { ref, defineComponent, reactive } from "vue";
export default defineComponent({
  name: "index",
  components: {},
  data() {
    return {
      isCollapse: true,
      lv1_menus_count: null,
      lv1_menus_results: null,
    };
  },
  methods: {
    handleOpen(key: string, keyPath: string) {},
    handleClose(key: string, keyPath: string) {},
  },
  mounted() {
    (async () =>
      await menus.lv1_menus().then((res: any) => {
        this.lv1_menus_count = res.data.count;
        this.lv1_menus_results = eval(res.data.results);
      }))();
  },
});
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>