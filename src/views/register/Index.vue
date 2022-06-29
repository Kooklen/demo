<template>
  <div class="register">
    <div class="register-box">
      <div class="title">
        欢迎注册超算云
        <div class="back">
          已有账号， <span @click="backToLogin">去登录>></span>
        </div>
      </div>

      <!-- S 表单 -->
      <div class="con-form">
        <Form ref="form_container" :rules="ruleValidate" :model="formParams">
          <!-- <FormItem :prop="'qymc'" :label="'企业名称'" required>
            <IviewInput v-model="formParams.qymc"></IviewInput>
          </FormItem>

          <FormItem :prop="'qymc'" :label="'营业执照上传'" required>
            <UploadBox ref="Upload"></UploadBox>
          </FormItem> -->
          <template>
            <FormItem
              :prop="item.prop"
              :label="item.label + '：'"
              v-for="(item, itemIndex) in formList"
              :key="item.name"
              :required="item.required || true"
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
                ></IviewDatePicker>
              </template>
              <template v-else-if="item.tagType === 'upload'">
                <UploadBox ref="Upload"></UploadBox>
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
      <!-- E 表单 -->

      <!--  -->
      <div class="footer">
        <div class="rule">
          <IviewCheckbox v-model="single"></IviewCheckbox>已阅读并同意遵守
          <span>《超算云服务条款》</span>
        </div>
        <IviewButton>注册</IviewButton>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import UploadBox from "_c/common/UploadBox";

var radioList = [
  {
    label: "仅本分中心",
    value: "1",
  },
  {
    label: "特定分中心",
    value: "2",
  },
];
var selectList = [
  {
    value: 1,
    label: "企业1",
  },
  {
    value: 2,
    label: "企业2",
  },
];

var option1 = [
  {
    label: "营业执照",
    value: 1,
  },
  {
    label: "非营业执照",
    value: 2,
  },
];
export default {
  name: "register",
  components: { UploadBox },
  data() {
    return {
      formParams: {
        qymc: "",
        area: "",
        address: "",
        connectPerson: "",
        phone: "",
        idNumber: "",
        range: "1",
        sys: [],
        zhizType: "1",
      },
      radioList,

      ruleValidate: {
        type: [
          {
            required: true,
            message: "企业类型不能为空",
            trigger: "blur",
          },
        ],
      },
      formList_tempalate: [
        {
          label: "企业名称",
          prop: "name",
          value: "",
          tagType: "input",
          required: true,
        },
        {
          label: "企业类型",
          prop: "type",
          value: "",
          tagType: "select",
          required: true,
          optionList: selectList,
        },
        {
          label: "所在区域",
          prop: "area",
          value: "",
          tagType: "select",
          required: true,
          optionList: selectList,
        },
        {
          label: "详细地址",
          prop: "address",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
        },
        {
          label: "企业联系人",
          prop: "connectPerson",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
        },
        {
          label: "联系人手机号",
          prop: "phone",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
          tip: "（联系人手机号将成为登录账号，请如实填写）",
        },
        {
          label: "联系人身份证",
          prop: "idNumber",
          value: "",
          tagType: "input",
          type: "tel",
          required: true,
        },
        {
          label: "企业证照类型",
          prop: "zhizType",
          value: "1",
          tagType: "radio",
          required: true,
          optionList: option1,
          onChange: this.zhizTypeOnchange,
        },
        {
          label: "营业执照上传",
          prop: "range",
          value: "",
          tagType: "upload",
          required: true,
          optionList: radioList,
        },
      ],
      formList: [],
      single: "",
    };
  },
  created() {
    this.formList = this.addIndexToFormList(this.formList_tempalate);
  },
  methods: {
    radioOnchange(e, item) {
      // console.log(e, item, "radioOnchange");

      // item.onChange(e, item);
      item.onChange(e, item);
    },
    zhizTypeOnchange(e, item) {
      // console.log(e, item, "zhizTypeOnchange");
      // 获取要改变的项的label
      // let _index = this.findSomeFromArr(this.formList, "label", "营业执照上传");
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
    backToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background: url("~_img/login/register-bg.png") no-repeat center center;
  background-size: 100% 100%;
  .flex-center();

  .register-box {
    width: 1300px;
    height: 900px;
    background: #ffffff;
    box-shadow: 0px 2px 20px 0px rgba(201, 208, 228, 0.58),
      0px 4px 4px 0px rgba(62, 101, 178, 0.19);
    border-radius: 6px;
    border: 2px solid;
    border-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 1)
      )
      2 2;
    backdrop-filter: blur(6px);
    padding: 30px;

    .title {
      height: 64px;
      font-size: 48px;
      font-family: MicrosoftYaHei;
      color: #22252e;
      line-height: 64px;
      letter-spacing: 6px;
      text-align: center;
      position: relative;
      margin-bottom: 20px;
      .back {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
        letter-spacing: 0px;

        span {
          color: #1a45b8;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    .con-form {
      height: 650px !important;
      overflow: hidden;
      .form_container();

      .ivu-form {
        padding-top: 0px;
      }
      /deep/.upload {
        min-width: 0;
      }

      /deep/.ivu-form-item-label {
        flex-basis: 150px;
        flex-shrink: 0;
      }

      /deep/.ivu-form-item {
        padding-left: 80px;
      }

      /deep/.form-item-tip {
        right: -20rem !important;
      }
    }

    /*底部栏*/
    .footer {
      .flex-column(center,center);

      .rule {
        margin: 15px 0px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
        span {
          color: #1a45b8;
          cursor: pointer;
        }
      }

      /deep/.ivu-btn {
        width: 374px;
        height: 56px;
      }
    }
  }
}
</style>