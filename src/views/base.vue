<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="center" align="middle">
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
          :default-active="this.$route.path"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
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
                          <el-menu-item :index="v.to_path">
                            {{ v.name }}
                          </el-menu-item>
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
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="i in breadcrumbs" :key="i">
              <el-breadcrumb-item :to="{ path: i.to_path }">{{
                i.name
              }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <slot name="main"></slot>
          <slot name="details" :title="title"></slot>
        </el-main>
        <el-footer style="text-align: center">**致每一位房产经理人**</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import api from "@/api/api";
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import $store from "../store/index";
export default defineComponent({
  name: "basePage",
  props: {
    title: { type: String, default: "" },
    details: { type: Object, default: null },
  },
  setup(props, context) {
    let detailsType = computed(() => {
      return $store.state.type
    })
    const route = useRoute();
    const isCollapse = ref(false);
    const title = props.title;
    const menus_count = ref(0);
    const menus_list = ref();
    const handleOpen = (key: string, keyPath: string) => {};
    const handleClose = (key: string, keyPath: string) => {};
    const breadcrumbs = ref();
    const setBreadcrumbs = () => {
      for (let i in menus_list.value) {
        if (menus_list.value[i].to_path == route.path) {
          breadcrumbs.value = [
            {
              id: menus_list.value[i].id,
              name: menus_list.value[i].name,
              path: menus_list.value[i].to_path,
              parent_id: menus_list.value[i].parent_id,
            },
          ];
        }
      }
      for (let x in menus_list.value) {
        for (let y in breadcrumbs.value) {
          if (breadcrumbs.value[y].parent_id == menus_list.value[x].id) {
            breadcrumbs.value.unshift({
              id: menus_list.value[x].id,
              name: menus_list.value[x].name,
              path: menus_list.value[x].to_path,
              parent_id: menus_list.value[x].parent_id,
            });
          }
        }
      }
    };
    onMounted(() => {
      (() =>
        api.menus.menus(null).then((res: any) => {
          menus_count.value = res.data.length - 1;
          menus_list.value = eval(res.data);
          setBreadcrumbs();
        }))();
    });
    return {
      isCollapse,
      menus_count,
      menus_list,
      breadcrumbs,
      title,
    };
  },
});
</script>

<style>
</style>