<template>
  <base-page>
    <template v-slot:details>
      
    </template
  ></base-page>
</template>


<script lang='ts'>
import api from "@/api/api";
import { defineComponent, onMounted, reactive, ref } from "vue";
import basePage from "./base.vue";
export default defineComponent({
  name: "baseInfo",
  components: {
    basePage,
  },
  setup() {
    const currentPage = ref(1);
    const isClose = ref(false);
    const pageSizes = ref([10, 20, 30, 40, 50]);
    const currentPageSize = ref(10);
    const total = ref(0);
    const tableData = ref();
    const page_total = ref(0);
    const tagSet = ref<any[]>();
    const handleView = (id: any) => {};
    const handleEdit = (id: any) => {};
    const handleSizeChange = (val: any) => {
      api.baseInfo.baseInfo({ params: { size: val } }).then((res: any) => {
        const data = eval(res.data);
        tableData.value = data.results;
        total.value = data.total;
        page_total.value = data.page_total;
        setTag();
      });
    };
    const handleCurrentChange = (val: any) => {
      api.baseInfo
        .baseInfo({ params: { size: currentPageSize.value, page: val } })
        .then((res: any) => {
          const data = eval(res.data);
          tableData.value = data.results;
          total.value = data.total;
          page_total.value = data.page_total;
          setTag();
        });
    };
    const setTag = () => {
      for (let i in tableData.value) {
        // tagSet.value.length = 0
        const params = tableData.value[i].id;
        api.tag
          .tag({ params: { customer_name_id: params } })
          .then((res: any) => {
            const data = eval(res.data);
            const tagList: any[] = [];
            for (let i in data.results) {
              tagList.push(data.results[i].tag_name);
            }
            for (let i in tableData.value){
              if (tableData.value[i].id == params){
                tableData.value[i].tag = tagList
              }
            }
            console.log(tableData.value)
          });
      }
    };
    const handleAdd = () => {
      
    }
    // resetDateFilter() {
    //   this.$refs.filterTable.clearFilter('date');
    // },
    // clearFilter() {
    //   this.$refs.filterTable.clearFilter();
    // },
    const trueClose = () => {
      isClose.value = true;
    };
    const falseClose = () => {
      isClose.value = false;
    };
    onMounted(() => {
      (async () =>
        await api.baseInfo
          .baseInfo({ params: { size: currentPageSize.value } })
          .then((res: any) => {
            const data = eval(res.data);
            tableData.value = data.results;
            total.value = data.total;
            page_total.value = data.page_total;
            setTag();
          }))();
    });
    return {
      currentPage,
      isClose,
      pageSizes,
      currentPageSize,
      total,
      tableData,
      tagSet,
      trueClose,
      falseClose,
      handleSizeChange,
      handleCurrentChange,
      handleView,
      handleEdit,
      handleAdd,
    };
  },
});
</script>

<style>
</style>