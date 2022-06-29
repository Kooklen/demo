<!--
    description： 企业服务 - 服务信息 - 添加/编辑 企业
-->
<template>
  <IviewModal
    v-model="visible"
    :title="`${dialogTitle}企业`"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
  >
    <div class="form_container">
      <Form ref="form_container" :rules="ruleValidate" :model="formParams">
        <FormItem
          :prop="item.prop"
          :label="item.label + '：'"
          v-for="(item, itemIndex) in formList"
          :key="item.name"
          :required="item.required || false"
        >
          <template v-if="item.tagType === 'input'">
            <IviewInput
              v-model="formParams[item.prop]"
              :type="item.type || 'text'"
              :disabled="item.disabled || false"
            ></IviewInput>
          </template>
          <template v-else-if="item.tagType === 'select'">
            <IviewSelect
              v-model="formParams[item.prop]"
              :optionList="item.optionList"
              :disabled="item.disabled || false"
            ></IviewSelect>
          </template>
          <template v-else-if="item.tagType === 'radio'">
            <IviewRadioGroup
              v-model="formParams[item.prop]"
              :radioList="item.optionList"
              :disabled="item.disabled || false"
              @on-change="
                (e) => {
                  radioOnchange(e, item, itemIndex);
                }
              "
            ></IviewRadioGroup>
          </template>
          <template v-else-if="item.tagType === 'check'">
            <IviewCheckboxGroup
              v-model="formParams[item.prop]"
              :optionList="item.optionList"
              :disabled="item.disabled || false"
            ></IviewCheckboxGroup>
          </template>
          <template v-else-if="item.tagType === 'date'">
            <IviewDatePicker
              v-model="formParams[item.prop]"
              :disabled="item.disabled || false"
              :type="item.type || 'date'"
              :inputWidth="'long'"
              @on-change="
                (e) => {
                  dateTimeOnChange(e, item, itemIndex);
                }
              "
            ></IviewDatePicker>
          </template>
          <template v-else-if="item.tagType === 'upload'">
            <UploadBox
              ref="uploadBox"
              @fileOnChange="fileOnChange"
              @delFileChange="handleDelete"
              :fileQueryParams="fileQueryParams"
            ></UploadBox>
          </template>
          <template v-else-if="item.tagType === 'cascader'">
            <IviewCascader
              v-model="formParams[item.prop]"
              :data="item.optionList"
              :load-data="loadData"
              filterable
            ></IviewCascader>
          </template>
          <template v-if="item.tip">
            <div class="form-item-tip">
              <Icon type="ios-alert" />{{ item.tip }}
            </div>
          </template>
        </FormItem>
      </Form>
    </div>
  </IviewModal>
</template>

<script>
import UploadBox from "_c/common/UploadBox";
import getWant from "@/datadict/baseData.js";
import { handleAreaQuest } from "@/mixin";
import {
  uploadFileByInput,
  getFileInfoByParams,
  delFile,
} from "_u/file-manager";

var option1 = [...getWant("companyLicensesType")];
const CATEGORY = "serveInformation";
const ENTITYTYPE = "enterpriseServe";
export default {
  name: "addCenter",
  components: { UploadBox },
  mixins: [handleAreaQuest()],
  data() {
    return {
      visible: true,
      formParams: {
        subCenterId: "",
        companyType: "",
        companyName: "",
        area: [],
        detailAddress: "",
        contactName: "",
        contactTel: "",
        email: "",
        contactIdentityCardNum: "",
        manageRange: 1,
        companyLicensesType: 2,
        cooperation: [],
        cooperationType: 1,
        fileList: [],
      },
      ruleValidate: {},
      formList: [
        {
          //0
          label: "所属分中心",
          prop: "subCenterId",
          value: "",
          tagType: "select",
          required: true,
          optionList: [],
        },
        {
          label: "企业类型",
          prop: "companyType",
          value: "",
          tagType: "select",
          required: true,
          optionList: [],
        },
        {
          label: "企业名称",
          prop: "companyName",
          value: "",
          tagType: "input",
          required: true,
        },
        {
          label: "所在区域",
          prop: "area",
          value: [],
          tagType: "cascader",
          required: true,
          optionList: [],
        },
        {
          label: "详细地址",
          prop: "detailAddress",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
        },
        {
          //5
          label: "企业联系人",
          prop: "contactName",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
        },
        {
          label: "联系人手机号",
          prop: "contactTel",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
          tip: "（联系人手机号将成为登录账号，请如实填写）",
        },
        {
          label: "邮箱",
          prop: "email",
          value: "",
          tagType: "input",
          required: true,
        },
        {
          label: "联系人身份证",
          prop: "contactIdentityCardNum",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
        },
        {
          label: "管理范围",
          prop: "manageRange",
          value: "",
          tagType: "radio",
          required: true,
          optionList: [],
        },
        {
          //10
          label: "合作类型",
          prop: "cooperationType",
          value: "1",
          tagType: "radio",
          required: true,
          optionList: [],
        },
        {
          label: "起始日期",
          prop: "cooperation",
          value: ["", ""],
          tagType: "date",
          type: "daterange",
          required: true,
        },
        {
          label: "企业证照类型",
          prop: "companyLicensesType",
          value: "1",
          tagType: "radio",
          required: true,
          onChange: this.zhizTypeOnchange,
        },
        {
          label: "营业执照上传",
          prop: "fileList",
          value: "",
          tagType: "upload",
          required: false,
        },
      ],
      // formList: [],
      // formList_tempalate
      // 上传相关
      fileQueryParams: {},
      delImgList: [],
      addImgList: [],
    };
  },
  props: {
    handleItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    handleItem: {
      handler(n) {
        console.log(n, "watch");
        if (n.id) {
          Object.keys(this.formParams).forEach((key) => {
            if (n[key]) {
              this.formParams[key] = n[key];
            }
          });
          let {
            cooperationStartDate,
            cooperationEndDate,
            county,
            province,
            city,
          } = n;
          this.formParams.cooperation = [
            cooperationStartDate,
            cooperationEndDate,
          ];
          this.formParams.area = [province, city, county];
          // if (province) {
          // }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    dialogTitle() {
      return this.handleItem.id ? "编辑" : "新增";
    },
  },
  created() {
    this.optionInit();
    this.ruleValidate = this.$u.ruleValidateInit(this.formList, this);
  },
  mounted() {},
  methods: {
    // 保存
    save() {
      this.$refs["form_container"].validate(async (valid) => {
        if (valid) {
          let { cooperation, area, fileList } = this.formParams;
          let { id } = this.handleItem;
          let queryParams = {
            ...this.formParams,
            province: area[0],
            city: area[1],
            county: area[2],
            status: 1,
          };
          delete queryParams.area;
          delete queryParams.cooperation;
          delete queryParams.fileList;
          queryParams.cooperationStartDate = this.$u.getDate(
            cooperation[0],
            "yyyymmdd"
          );
          queryParams.cooperationEndDate = this.$u.getDate(
            cooperation[1],
            "yyyymmdd"
          );

          console.log(queryParams, "queryParams", fileList);

          this.$loading();
          if (id) {
            queryParams.id = id;
            let editRes = await this.$api.enterpriseServe.sfEditCompany(
              queryParams
            );
            console.log(editRes, "编辑成功");
            if (editRes) {
              this.$Message.success("编辑成功");

              // 删除图片
              if (this.delImgList.length > 0) {
                this.handleSaveImgEditing();
              }

              // 新增图片
              let addArr = fileList.filter((item) => {
                return !item.fileTicket;
              });
              if (addArr.length > 0) {
                let fileRes = await uploadFileByInput({
                  category: CATEGORY, // 服务信息
                  entityId: id, // 专家意见
                  entityType: ENTITYTYPE, // 企业服务
                  fileList: addArr,
                  resourceOwnerId: id,
                  resourceOwnerName: "superCloud",
                });
                console.log("fileRes", fileRes);
              }
            }
          } else {
            let addRes = await this.$api.enterpriseServe.sfAddCompany(
              queryParams
            );
            // console.log(addRes, "新增");
            if (addRes.status === 200) {
              this.$Message.success("新增成功");
              let fileRes = await uploadFileByInput({
                category: CATEGORY, // 服务信息
                entityId: addRes.data.data.id, // 专家意见
                entityType: ENTITYTYPE, // 企业服务
                fileList,
                resourceOwnerId: addRes.data.data.id,
                resourceOwnerName: "superCloud",
              });
              // console.log("fileRes", fileRes);
              if (fileRes.status === 200) {
                this.$Message.success("图片上传成功");
              }
            }
          }
          this.close();
        }
      });
    },
    close() {
      this.$emit("close");
    },
    radioOnchange(e, item) {
      if (item.onChange) {
        item.onChange(e, item);
      }
    },
    zhizTypeOnchange(e, item) {
      console.log(e, item, "zhizTypeOnchange");
      // 获取要改变的项的label
      this.formList[11].label = option1[this.formParams[item.prop] - 1].label;
    },
    addIndexToFormList(arr) {
      return arr.map((item, index) => {
        return {
          ...item,
          _index: index,
        };
      });
    },
    findSomeFromArr(arr, key, value) {
      let _index = arr.findIndex((item) => {
        return item[key] === value;
      });
      console.log(_index, "_index");
      return _index;
    },
    async optionInit() {
      this.$loading();
      let { city, province, county, id } = this.handleItem;
      this.formList[1].optionList = this.$parent.optionList; // 区域
      this.formList[9].optionList = [...getWant("manageRange")]; // 管辖范围
      this.formList[10].optionList = [...getWant("cooperationType")]; // 合作类型
      this.formList[12].optionList = [...getWant("companyLicensesType")]; // 企业证件照类型

      // 如果处于编辑状态
      if (id) {
        // 获取文件信息
        // this.fileListInit(id);
        this.fileQueryParams = {
          entityType: "enterpriseServe",
          entityId: id,
          category: "serveInformation",
          id,
        };
      }

      // 如果区域信息不存在则重新请求
      let areaRes = localStorage.getItem("area");
      if (!areaRes) {
        this.$Spin.show();
        areaRes = await this.$api.common.dictGetAreaTree();
        localStorage.setItem("area", JSON.stringify(areaRes));
        this.$Spin.hide();
      } else {
        areaRes = JSON.parse(areaRes);
      }

      let [centerRes,
      //  areaRes
       ] = await this.$api.$axios.all([
        this.$api.subcenterManage.scGetSubCenterList({
          pageCurrent: 1,
          pageSize: 999,
        }),
        // this.$api.common.dictGetAreaTree(),
      ]);
      console.log(centerRes, areaRes, "allRes");

      // 所属分中心下拉初始化
      this.formList[0].optionList = this.$u.array.arrToSelect(
        centerRes.data.data.records,
        "subCenterName",
        "id"
      );

      // 区域下拉初始化 - 省
      let provinceIndex = "";
      let cityIndex = "";
      this.formList[3].optionList = areaRes.data.data.map((item, index) => {
        if (province && province.split(",")[0] == item.id) {
          provinceIndex = index;
        }
        return {
          value: item.id + "," + item.provinceName,
          label: item.provinceName,
          loading: false,
          children: [],
          type: "provinces",
          id: item.id,
        };
      });

      // 区域下拉初始化 - 市
      if (city) {
        let cityRes = await this.$api.common.dictGetCities({
          provinceId: province.split(",")[0],
        });
        // console.log(cityRes, "cityRes", provinceIndex);
        this.formList[3].optionList[provinceIndex].children =
          cityRes.data.data.map((item, index) => {
            if (city.split(",")[0] == item.id) {
              cityIndex = index;
            }
            return {
              value: item.id + "," + item.cityName,
              label: item.cityName,
              loading: false,
              children: [],
              type: "city",
              id: item.id,
            };
          });
      }

      // 区域下拉初始化 - 区
      if (county) {
        let countyRes = await this.$api.common.dictGetAreas({
          cityId: city.split(",")[0],
        });
        // console.log(countyRes, "countyRes");
        this.formList[3].optionList[provinceIndex].children[
          cityIndex
        ].children = countyRes.data.data.map((item) => {
          return {
            value: item.id + "," + item.areaName,
            label: item.areaName,
            type: "area",
            id: item.id,
          };
        });
      }

      // this.formList = this.addIndexToFormList(this.formList_tempalate);
      this.$hide();
    },
    async fileListInit(id) {
      let fileRes = await getFileInfoByParams({
        entityType: "enterpriseServe",
        entityId: id,
        category: "serveInformation",
      });
      console.log(fileRes, "fileRes");

      this.$nextTick(() => {
        // this.$refs.uploadBox[0].uploadSetting.fileList = fileRes;
        this.formParams.fileList = fileRes;
      });
    },
    dateTimeOnChange(e) {
      console.log(e, "dateTimeOnChange", this.formParams);
      // this.formParams
    },
    async queryArea() {
      let res = await this.$api.common.dictGetAreaTree();
      return res;
    },
    fileOnChange() {
      this.formParams.fileList = [
        ...this.$refs.uploadBox[0].uploadSetting.fileList,
      ];
    },
    handleDelete({ file, fileIndex }) {
      this.formParams.fileList.splice(fileIndex, 1);

      if (file.fileTicket) {
        this.delImgList.push(file);
        console.log(this.delImgList, "handleDelete", fileIndex);
      }
    },
    // 删除附件
    async handleSaveImgEditing() {
      // 删除图片
      await this.delImgList.forEach((img) => {
        delFile(img.fileTicket);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.iviewModal {
  .form_container();
}
</style>