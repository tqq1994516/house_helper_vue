<template>
  <base-page> <template v-slot:main> 111</template></base-page>
</template>


<script lang='ts'>
import { defineComponent, ref } from "vue";
import basePage from "./base.vue";
export default defineComponent({
  name: "message",
  components: {
    basePage,
  },
  setup() {
    const currentPage4 = ref(4);
    const isClose = ref(false);
    const pageSizes = ref([10, 20, 30, 40, 50]);
    const currentPageSize = ref(10);
    const total = ref(0);
    const tableData = ref([]);
    const handleSizeChange = (val: any) => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = (val: any) => {
      console.log(`当前页: ${val}`);
    };
    // resetDateFilter() {
    //   this.$refs.filterTable.clearFilter('date');
    // },
    // clearFilter() {
    //   this.$refs.filterTable.clearFilter();
    // },
    const formatter = (row: any, column: any) => {
      return row.address;
    };
    const filterTag = (value: any, row: any) => {
      return row.tag === value;
    };
    const filterHandler = (value: any, row: any, column: any) => {
      const property = column["property"];
      return row[property] === value;
    };
    const trueClose = () => {
      isClose.value = true;
    };
    const falseClose = () => {
      isClose.value = false;
    };
    return {
      currentPage4,
      isClose,
      pageSizes,
      currentPageSize,
      total,
      tableData,
      trueClose,
      falseClose,
      formatter,
      filterTag,
      filterHandler,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style>
</style>