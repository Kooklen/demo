<template>
  <IviewModal
    v-model="visible"
    title="创建应用"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
    okText="提交"
  >
    <div class="container">
      <div class="comeFrom">所属分中心：越秀分中心</div>

      <div class="icon flex-row">
        <div class="word">
          <span class="important">*</span>
          <span>应用图标：</span>
        </div>
        <UploadBox
          ref="uploadBox"
          :fileQueryParams="fileQueryParams"
          v-on:photomd5="photo"
          accept="image/jpeg,image/jpeg,image/png"
        ></UploadBox>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用名称：</span>
        <iview-input placeholder="请输入应用名称" v-model="form.applicationName" maxlength="10"></iview-input>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用分类：</span>
        <iview-cascader v-model="value" :data="optionsT.children" change-on-select> </iview-cascader>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>接入类型：</span>
        <IviewSelect v-model="form.appType" :optionList="option1" />
      </div>

      <div class="appName" v-if="form.appType==0">
        <span class="important">*</span>
        <span>跳转方式：</span>
        <IviewRadioGroup v-model="form.applicationSource" :radioList="option4" />
      </div>

      <div class="appName" v-if="form.applicationSource==1">
        <span class="important">*</span>
        <span>跳转链接：</span>
        <IviewInput v-model="form.redirectUrl" />
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用来源：</span>
        <IviewSelect v-model="form.createrType" :optionList="option2" />
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>使用方式：</span>
        <IviewSelect v-model="form.usage" :optionList="option3" />
      </div>
      
      <div class="appName">
        <span class="important">*</span>
        <span>应用简介：</span>
        <IviewInput
          placeholder="请输入文本内容"
          class="inputText"
          v-model="form.applicationIntroduce"
          maxlength="200"
          type="textarea"
          :autosize="true"
          size="large"
        >
        </IviewInput>
      </div>

      <div class="appName flex-row mb80">
        <span class="important">*</span>
        <span>应用介绍：</span>
        <div class="editor">
          <quill-editor v-model="form.applicationIntroduction" ref="editor"></quill-editor>
        </div>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用类型：</span>
        <RadioGroup v-model="form.applicationType">
          <Radio label="1">私有</Radio>
          <Radio label="2">共享到应用市场</Radio>
        </RadioGroup>
        <!--        <iview-input placeholder="请输入文本内容" class="inputText" v-model="form.applicationIntroduce"></iview-input>-->
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用状态：</span>
        <RadioGroup v-model="form.applicationStatus">
          <Radio label="0">停用</Radio>
          <Radio label="1">启用</Radio>
        </RadioGroup>
        <!--        <iview-input placeholder="请输入文本内容" class="inputText" v-model="form.applicationIntroduce"></iview-input>-->
      </div>
    </div>
  </IviewModal>
</template>

<script>
import UploadBox from "_cc/UploadBox"
import quillEditor from "_cc/quillEditor"
import IviewCascader from "_c/iview/IviewCascader"

export default {
  name: "createApp",
  components: { IviewCascader, UploadBox, quillEditor },
  data() {
    return {
      value: "",
      optionsT: [],
      visible: true,
      // 上传相关
      fileQueryParams: {},
      delImgList: [],
      addImgList: [],
      option1: [
        { label: "第三方系统应用", value: 0 },
        { label: "DOCKER应用", value: 3 },
        { label: "HPC应用", value: 4 }
      ],
      option4: [
        { label: "直接跳转", value: 1 },
        { label: "单点登录", value: 2 }
      ],
      option2: [
        { label: "分中心建立应用", value: 1 },
        { label: "企业自建应用", value: 2 }
      ],
      option3: [
        { label: "桌面操作", value: 1 },
        { label: "Web操作", value: 2 },
        { label: "接口调用", value: 3 },
        { label: "命令行操作", value: 4 }
      ],
      form: {
        applicationClassifyId: "",
        applicationIcon: "",
        applicationIntroduction: "", //介绍
        applicationIntroduce: "", //简介
        applicationName: "",
        applicationStatus: "", //0停用 1启用
        applicationType: "", //1私有 2共享
        applicationSource:'',
        createrType:'',
        usage:'',
        redirectUrl:''
      }
    }
  },
  created() {
    this.getApplicationClassifyId()
  },
  methods: {
    getApplicationClassifyId() {
      this.$api.common.classifytree({}).then(res => {
        this.optionsT = res.data
        this.optionsT = JSON.parse(
          JSON.stringify(this.optionsT)
            .replace(/applicationClassifyName/g, "label")
            .replace(/id/g, "value")
            .replace(/classifyChild/g, "children")
        )
        this.optionsT = this.formatData([this.optionsT[0]])
        console.log(this.optionsT)
      })
    },
    formatData(data) {
      return data.map(_ => {
        if (!_.children.length) {
          _.children = null
        } else if (_.children && _.children.length) {
          _.children = this.formatData(_.children)
        }
        return _
      })
    },

    photo: function (data) {
    },
    handelStrData() {
      this.form.applicationIcon = this.$refs["uploadBox"].uploadSetting.fileList[0].url
    },
    handleEditor() {
      this.form.applicationIntroduction = this.$refs["editor"].content
    },
    save() {
      this.handleEditor()
      this.handelStrData()
      this.form.applicationClassifyId = this.value.pop()
      if(this.form.appType!=0) this.form.applicationSource=this.form.appType
      this.$api.subcenterManage
        .SubCenterAppCreateApp({
          ...this.form
        })
        .then(res => {
          // console.log(this.form)
          // console.log(res);
          if (res.data != null) {
            this.$Message.success("成功创建")
            this.$router.go(0)
          }
        })
      this.close()
    },
    close() {
      this.handelStrData
      // // console.log(this.form.applicationIntroduction)
      this.handleEditor()
      // console.log(11)

      this.$emit("close", "close")
      this.visible = false
      // this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ivu-input-wrapper-large {
  width: 400px;
}

.mb80 {
  margin-bottom: 105px;
}

.container {
  font-size: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  margin: 21px 47px;
}

.important {
  width: 8px;
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #b8321a;
  line-height: 22px;
}

.icon {
  height: 130px;
  margin-top: 25px;

  .word {
    padding-top: 30px;
  }
}

.appName {
  margin-top: 30px;
}

/deep/ .ivu-input {
  height: 68px;
}

.editor {
  height: 130px;
}
</style>
