<template>
  <base-page>
    <template #main>
      <el-button
        size="small"
        round
        icon="el-icon-circle-plus-outline"
        type="primary"
        @click="handleAdd"
        style="margin: 10px"
        >新增用户</el-button
      >
      <el-table
        row-key="date"
        ref="filterTable"
        :data="tableData"
        style="width: 100%"
        stripe
        fit
        border
        empty-text="暂无数据"
      >
        <el-table-column
          type="index"
          fixed
          width="50"
          label="序号"
          header-align="center"
          align="center"
          :index="index"
        >
        </el-table-column>
        <el-table-column
          prop="true_name"
          label="客户姓名"
          width="180"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="50"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile_phone"
          label="手机号"
          width="180"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="180"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="现住地"
          width="250"
          header-align="center"
        ></el-table-column>
        <el-table-column prop="tag" label="标签" header-align="center">
          <template #default="scope">
            <template v-for="i in scope.row.tag" :key="i">
              <el-tag type="primary" :closable="isClose">{{ i }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          header-align="center"
          align="center"
        >
          <template #default="scope">
            <el-button
              @click="handleView(scope.row.id)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              @click="handleEdit(scope.row.id)"
              type="text"
              size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div type="flex" justify="space-around" align="middle">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count="page_total"
          :page-sizes="pageSizes"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div> </template
  ></base-page>
</template>


<script lang='ts'>
import api from "@/api/api";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import basePage from "./base.vue";
import $store from "../store/index";
export default defineComponent({
  name: "baseInfo",
  components: {
    basePage,
  },
  setup() {
    const router = useRouter();
    const currentPage = ref(1);
    const isClose = ref(false);
    const pageSizes = ref([10, 20, 30, 40, 50]);
    const currentPageSize = ref(10);
    const total = ref(0);
    const tableData = ref();
    const page_total = ref(0);
    const tagSet = ref<any[]>();
    const handleView = async (id: any) => {
      await $store.dispatch("setType", "view");
      router.push({ name: "BaseInfoDetails", query: { id: id } });
    };
    const handleEdit = async (id: any) => {
      await $store.dispatch("setType", "edit");
      router.push({ name: "BaseInfoDetails", query: { id: id } });
    };
    const handleSizeChange = (val: any) => {
      currentPageSize.value = val;
      api.baseInfo.baseInfo({ params: { size: val } }).then((res: any) => {
        const data = eval(res.data);
        tableData.value = data.results;
        total.value = data.total;
        page_total.value = data.page_total;
        setTag();
      });
    };
    const handleCurrentChange = (val: any) => {
      currentPage.value = val;
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
            for (let i in tableData.value) {
              if (tableData.value[i].id == params) {
                tableData.value[i].tag = tagList;
              }
            }
          });
      }
    };
    const index = (row: any) => {
      const index = (currentPage.value - 1) * currentPageSize.value + row + 1;
      return index;
    };
    const handleAdd = async () => {
      await $store.dispatch("setType", "add");
      router.push({
        name: "BaseInfoDetails",
      });
    };
    const trueClose = () => {
      isClose.value = true;
    };
    const falseClose = () => {
      isClose.value = false;
    };
    onMounted(() => {
      (() =>
        api.baseInfo
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
      index,
    };
  },
});
</script>

<style>
</style>