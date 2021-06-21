<template>
  <base-page>
    <template v-slot:main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table
        row-key="date"
        ref="filterTable"
        :data="tableData"
        style="width: 100%"
        stripe
        fit
      >
        <el-table-column type="index" fixed width="20"></el-table-column>
        <el-table-column
          prop="true_name"
          label="客户姓名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column
          prop="mobile_phone"
          label="手机号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="现住地"
          width="250"
        ></el-table-column>
        <el-table-column prop="tag" label="标签">
          <template #default="scope">
            <template v-for="i in scope.row.tag" :key="i">
              <el-tag
              type="primary"
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ i.name }}</el-tag
            >
            </template>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" type="flex" justify="space-around" align="middle">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
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
import { defineComponent, ref } from "vue";
import basePage from "./base.vue";
export default defineComponent({
  name: "baseInfo",
  components: {
    basePage,
  },
  setup() {
    const currentPage4 = ref(4);
    const isClose = ref(false);
    const pageSizes = ref([10, 20, 30, 40, 50]);
    const currentPageSize = ref(10);
    const total = ref(0);
    const tableData = ref([
      {
        true_name: "",
        email: "",
        sex: "",
        mobile_phone: "",
        birthday: "",
        address: "",
        tag: [],
      },
    ]);
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