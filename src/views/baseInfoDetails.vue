<template>
  <base-page>
    <template #details>
      <el-row type="flex" justify="center" align="middle">
        <el-col>
          <el-page-header
            icon="el-icon-arrow-left"
            :content="title"
          ></el-page-header>
          <el-divider></el-divider>
        </el-col>
        <el-col>
          <el-form ref="form" :model="baseInfoForm" label-width="100px">
            <el-form-item label="姓名">
              <el-input
                v-model="baseInfoForm.name"
                placeholder="请输入客户姓名"
                style="width: 244px"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="baseInfoForm.email"
                placeholder="请输入客户邮箱"
                style="width: 244px"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="baseInfoForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile_phone">
              <el-input
                v-model="baseInfoForm.mobile_phone"
                placeholder="请输入手机号"
                style="width: 244px"
              ></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-col :span="24">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="baseInfoForm.birthday"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="常住地">
              <!-- <el-select
                v-model="provincial_value"
                filterable
                placeholder="请选择省/直辖市"
                style="margin-right: 5px"
              >
                <el-option
                  v-for="item in provincial_level"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select> -->
              <!-- <el-select
                v-model="city_value"
                filterable
                placeholder="请选择市/直辖市"
                style="margin-right: 5px"
                clearable
                :disabled="city_disable"
              >
                <el-option
                  v-for="item in city_level"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="district_value"
                filterable
                placeholder="请选择区/县"
                style="margin-right: 5px"
                clearable
                value-key="id"
                :disabled="district_disable"
              >
                <el-option
                  v-for="item in district_level"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="subdistrict_value"
                filterable
                placeholder="请选择街道"
                style="margin-right: 5px"
                clearable
                value-key="id"
                :disabled="subdistrict_disable"
              >
                <el-option
                  v-for="item in subdistrict_level"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-input
                placeholder="请输入详细地址"
                style="width: 244px"
                :disabled="details_disable"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="具体地址">
              <el-input
                disabled
                style="width: 1200px"
                v-text="full_address"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col span="12" offset="12">
          <el-button type="primary" @click="onAdd">新增</el-button>
          <el-button @click="toBaseInfo">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </base-page>
</template>


<script lang='ts'>
import api from "@/api/api";
import { defineComponent, onMounted, ref, computed, reactive } from "vue";
import basePage from "./base.vue";
import $store from "../store/index";
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
    const baseInfoForm = reactive({
      true_name: "",
      email: "",
      mobile_phone: "",
      sex: "1",
      birthday: "",
      address: "",
    });
    const provincial_level = ref<any[]>();
    const city_level = ref<any[]>();
    const district_level = ref<any[]>();
    const subdistrict_level = ref<any[]>();
    const provincial_value = ref<any | undefined>();
    const city_value = ref<any[]>();
    const district_value = ref<any[]>();
    const subdistrict_value = ref<any[]>();
    const full_address = ref("");
    const city_disable = ref(true);
    const district_disable = ref(true);
    const subdistrict_disable = ref(true);
    const details_disable = ref(true);
    const provincial = (value: any) => {
      console.log(value);
    };
    const administrativeDivision = () => {
      api.administrativeDivision
        .administrativeDivision({ params: { fid: 0 } })
        .then((res: any) => {
          if (res.data.reason == "success") {
            const data = eval(res.data);
            provincial_level.value = data.result;
          } else {
            provincial_level.value = ["暂无数据"];
          }
        });
    };
    onMounted(() => {
      if ($store.state.type == "add") {
        title.value = "新增";
      } else if ($store.state.type == "view") {
        title.value = "查看";
      } else if ($store.state.type == "edit") {
        title.value = "编辑";
      } else {
        title.value = "默认";
      }
      administrativeDivision();
      console.log(provincial_level.value);
    });
    return {
      provincial_level,
      city_level,
      district_level,
      subdistrict_level,
      provincial_value,
      city_value,
      district_value,
      subdistrict_value,
      full_address,
      title,
      isClose,
      baseInfoForm,
      city_disable,
      district_disable,
      subdistrict_disable,
      details_disable,
      trueClose,
      falseClose,
      provincial,
    };
  },
});
</script>

<style>
</style>