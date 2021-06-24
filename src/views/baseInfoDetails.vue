<template>
  <base-page>
    <template #details="details">
        <el-page-header
          icon="el-icon-arrow-left"
          :content="details.title"
        ></el-page-header>
    </template>
  </base-page>
</template>


<script lang='ts'>
import api from "@/api/api";
import { defineComponent, onMounted, ref } from "vue";
import basePage from "./base.vue";
export default defineComponent({
  name: "baseInfo",
  components: {
    basePage,
  },
  setup() {
    const title = ref("");
    const isClose = ref(false);
    const trueClose = () => {
      isClose.value = true;
    };
    const falseClose = () => {
      isClose.value = false;
    };
    return {
      title,
      isClose,
      trueClose,
      falseClose,
    };
  },
});
</script>

<style>
</style>