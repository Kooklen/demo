<!--
    description： AI服务 - 项目详情 - 数据处理 - 训练设置
-->
<template>
  <IviewModal
    v-model="visible"
    :title="`${dialogTitle}分中心信息`"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
  >
    <div class="form_container">
      <Form ref="form_container" :rules="ruleValidate" :model="formParams">
        <template>
          <FormItem
            :prop="item.prop"
            :label="item.label + '：'"
            v-for="(item, itemIndex) in formList"
            :key="`${item.name}${itemIndex}`"
            :required="item.required"
            v-show="item.show === undefined ? true : item.show"
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
                :max-tag-count="item.maxTagCount || 0"
                :multiple="item.multiple || false"
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
        </template>
      </Form>
    </div>
  </IviewModal>
</template>

<script>
import getWant from "@/datadict/baseData.js";
import { handleAreaQuest } from "@/mixin";

export default {
  name: "addCenter",
  mixins: [handleAreaQuest()],
  data() {
    return {
      visible: true,
      formParams: {
        subCenterName: "",
        area: [],
        detailAddress: "",
        contactName: "",
        contactTel: "",
        contactIdentityCardNum: "",
        platformIds: [],
        manageRange: 1,
        managedSubCenterIds: [],
      },
      ruleValidate: {},
      formList: [
        {
          //0
          label: "分中心名称",
          prop: "subCenterName",
          value: "",
          tagType: "input",
          required: true,
        },
        {
          label: "所在区域",
          prop: "area",
          value: "",
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
          label: "中心联系人",
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
          //5
          label: "联系人身份证",
          prop: "contactIdentityCardNum",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
        },
        {
          label: "选择系统",
          prop: "platformIds",
          value: [],
          tagType: "check",
          required: true,
          optionList: [],
        },
        {
          label: "管理范围",
          prop: "manageRange",
          value: "",
          tagType: "radio",
          required: true,
          optionList: [...getWant("manageRangeCenter")],
          onChange: this.manageRangeOnchange,
        },
        {
          label: "特定分中心",
          prop: "managedSubCenterIds",
          value: "",
          tagType: "select",
          required: false,
          maxTagCount: 1,
          multiple: true,
          optionList: [],
          show: false,
        },
      ],
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
        if (n.id) {
          Object.keys(this.formParams).forEach((key) => {
            if (n[key]) {
              this.formParams[key] = n[key];
            }
          });
          let { county, province, city, manageRange } = n;
          this.formParams.area = [province, city, county];
          this.formList[8].show = manageRange == 2;
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
  methods: {
    save() {
      console.log(this.formParams, "formParams");
      this.$refs["form_container"].validate(async (valid) => {
        console.log(valid, "valid");
        if (valid) {
          let { id } = this.handleItem;
          let { area, platformIds } = this.formParams;

          let queryParams = {
            ...this.formParams,
            province: area[0],
            city: area[1],
            county: area[2],
            status: 1,
            platformIds: platformIds.map((item) => item * 1),
          };
          delete queryParams.area;

          console.log(queryParams, "queryParams");
          this.$loading();
          if (id) {
            let editRes = await this.$api.subcenterManage.scEditSubCenter({
              ...queryParams,
              id,
            });
            console.log(editRes, "editRes");

            if (editRes.status === 200) {
              this.$Message.success("编辑成功");
            }
          } else {
            let addRes = await this.$api.subcenterManage.scAddSubCenter(
              queryParams
            );

            if (addRes.status === 200) {
              this.$Message.success("新增成功");
            }
          }

          this.close();
          // this.$Spin.hide();
        }
      });
    },
    manageRangeOnchange(e, item, index) {
      console.log(e, "manageRangeOnchange", index);
      this.formList[8].show = e === 2 ? true : false;
      this.formList[8].required = e === 2 ? true : false;
    },
    close() {
      this.$emit("close");
    },
    async optionInit() {
      let { id } = this.handleItem;

      this.$loading();

      this.formList[8].optionList = this.$parent.tableData.map((item) => {
        return {
          label: item.subCenterName,
          value: item.id,
        };
      });

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
      //  areaRes, 
       sysRes] = await this.$api.$axios.all([
        this.$api.enterpriseServe.sfGetCompanyList({
          pageCurrent: 1,
          pageSize: 999,
        }),
        // this.$api.common.dictGetAreaTree(), // 区域树
        this.$api.common.dictGetConfigs({ configType: 5 }), // 选择系统
      ]);
      console.log(centerRes, "centerRes", sysRes, id);

      this.formList[6].optionList = sysRes.data.data.map((item) => {
        return {
          value: item.id,
          label: item.configName,
        };
      });
    
      // 区域下拉初始化 - 省
      this.formList[1].optionList = areaRes.data.data.map((item) => {
        // if (id && province && province.split(",")[0] == item.id) {
        //   provinceIndex = index;
        // }
        return {
          value: item.id + "," + item.provinceName,
          label: item.provinceName,
          loading: false,
          children: [],
          type: "provinces",
          id: item.id,
        };
      });

      this.$hide();
    },
    // 规则初始化
    ruleValidateInit(formArr) {
      let obj = {};
      formArr.map((item) => {
        this.$set(obj, item.prop, [
          {
            type: "any",
            required: true,
            message: `${item.label}不能为空`,
            trigger: "blur",
            validator: (rule, value) => {
              let typeStr = this.$u.typeOf(value);
              if (typeStr === "string" || typeStr === "number") {
                return value !== "" && value !== undefined && value !== null;
              } else if (typeStr === "array") {
                if (item.prop === "area") {
                  return value.every((ele) => {
                    return ele !== "" && ele !== undefined && ele !== null;
                  });
                } else {
                  return value.length > 0;
                }
              }
            },
          },
        ]);
      });
      return obj;
    },
    radioOnchange(e, item, index) {
      if (item.onChange) {
        item.onChange(e, item, index);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.iviewModal {
  .form_container();

  /deep/.ivu-form {
    height: 100%;
  }
}
</style>