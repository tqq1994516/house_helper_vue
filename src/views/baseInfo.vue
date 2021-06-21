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
        :stripe="stripe"
        :cell-style="{maxHeight: '10px', overflow: 'hidden'}"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
          column-key="date"
          :filters="[
            { text: '2016-05-01', value: '2016-05-01' },
            { text: '2016-05-02', value: '2016-05-02' },
            { text: '2016-05-03', value: '2016-05-03' },
            { text: '2016-05-04', value: '2016-05-04' },
          ]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[
            { text: '家', value: '家' },
            { text: '公司', value: '公司' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              :closable="isClose"
              @mouseenter="trueClose"
              @mouseleave="falseClose"
              >{{ scope.row.tag }}</el-tag
            >
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
    const stripe = ref(true);
    const tableData = ref([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        tag: "家",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
        tag: "公司",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
        tag: "家",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
        tag: "公司",
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
      stripe,
      trueClose,
      falseClose,
      formatter,
      filterTag,
      filterHandler,
      handleSizeChange,
      handleCurrentChange
    };
  },
});
</script>

<style>
</style>