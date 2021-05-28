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
          :default-active="activeindex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          ref="asideMenu"
        >
          <template v-for="value in lv1_menus_results" :key="value.id">
            <template v-if="value.hierarchy==1||!value.have_child">
              <el-menu-item :index="value.id">
                <i :class="value.icon"></i>
                <template #title>{{ value.name }}
                  </template>
              </el-menu-item>
            </template>
            <template v-else-if="value.hierarchy==1||value.have_child">
              <el-submenu :index="value.id">
                <template #title>
                  <i :class="value.icon"></i>
                  <span>{{ value.name }}</span>
                </template>
                <template v-for="val in lv2_menus_results" :key="val.id">
                  <template v-if="val.parent_id==value.id||val.hierarchy==2||!val.have_child">
                    <el-menu-item :index="val.id">
                      {{ vla.name }}
                    </el-menu-item>
                  </template>
                  <template v-else-if="val.parent_id==value.id||val.hierarchy==2||val.have_child">
                    <el-submenu :index="val.id">
                      <template #title>{{ val.name }}</template>
                      <template v-for="v in lv3_menus_results" :key="v.id">
                        <template v-if="v.parent_id==val.id||v.hierarchy==3">
                          <el-menu-it :index="v.id">
                            {{ v.name }}
                          </el-menu-it>
                        </template>
                      </template>
                    </el-submenu>
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
</template>

<script lang="ts">
import menus from "@/api/menus";
import { ref, defineComponent, reactive } from "vue";
export default defineComponent({
  name: "index",
  components: {},
  data() {
    return {
      isCollapse: false,
      lv1_menus_count: null,
      lv1_menus_results: null,
      activeindex: 1,
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