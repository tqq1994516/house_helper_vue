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
          :default-active="activeIndex"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :router="isRouter"
          ref="asideMenu"
        >
          <template v-for="value in menus_list" :key="value.id">
            <template v-if="value.hierarchy == 1 && !value.have_child">
              <el-menu-item :index="value.to_path">
                <i :class="value.icon"></i>
                <template #title>{{ value.name }} </template>
              </el-menu-item>
            </template>
            <template v-else-if="value.hierarchy == 1 && value.have_child">
              <el-submenu :index="value.to_path">
                <template #title>
                  <i :class="value.icon"></i>
                  <span>{{ value.name }}</span>
                </template>
                <template v-for="val in menus_list" :key="val.id">
                  <template
                    v-if="
                      val.parent_id == value.id &&
                      val.hierarchy == 2 &&
                      !val.have_child
                    "
                  >
                    <el-menu-item :index="val.to_path">
                      {{ val.name }}
                    </el-menu-item>
                  </template>
                  <template
                    v-else-if="
                      val.parent_id == value.id &&
                      val.hierarchy == 2 &&
                      val.have_child
                    "
                  >
                    <el-submenu :index="val.to_path">
                      <template #title>{{ val.name }}</template>
                      <template v-for="v in menus_list" :key="v.id">
                        <template
                          v-if="v.parent_id == val.id && v.hierarchy == 3"
                        >
                          <el-menu-it :index="v.to_path">
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
        <el-main>
          <slot name="main"></slot>
        </el-main>
        <el-footer style="text-align: center">**致每一位房产经理人**</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import menus from "@/api/menus";
export default {
  name: "basePage",
  data() {
    return {
      isCollapse: false,
      menus_count: 0,
      menus_list: null,
      activeIndex: "1",
      isRouter: true,
    };
  },
  methods: {
    handleOpen(key: string, keyPath: string) {},
    handleClose(key: string, keyPath: string) {},
  },
  mounted() {
    (async () =>
      await menus
        .menus({ params: { activeIndex: this.activeIndex } })
        .then((res: any) => {
          this.menus_count = res.data.length - 1;
          this.menus_list = eval(res.data);
          this.activeIndex = res.data[res.data.length - 1].activeIndex;
        }))();
  },
};
</script>

<style>
</style>