<template>
  <IviewModal
    v-model="visible"
    title="修改应用信息"
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
        <!--        <img :src="form.applicationIcon" alt=""> -->
        <UploadBox
          ref="UploadBox"
          :fileQueryParams="fileQueryParams"
          v-on:photomd5="photo"
          accept="image/jpeg,image/jpeg,image/png"
        ></UploadBox>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用名称：</span>

        <iview-input placeholder="请输入应用名称" v-model="form.applicationName"></iview-input>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用分类：</span>
        <iview-cascader v-model="value" :data="optionsT.children" change-on-select></iview-cascader>

        <!--        {{ value }}-->
        <!--        <el-cascader-->
        <!--            :options="optionsT.children"-->
        <!--            :props="{ checkStrictly: true }"-->
        <!--            v-model="value"-->
        <!--            clearable></el-cascader>-->
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>接入类型：</span>
        <IviewSelect v-model="form.appType" :optionList="option1" />
      </div>

      <div class="appName" v-if="form.appType == 0">
        <span class="important">*</span>
        <span>跳转方式：</span>
        <IviewRadioGroup v-model="form.applicationSource" :radioList="option4" />
      </div>

      <div class="appName" v-if="form.applicationSource == 1">
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
        <iview-input
          placeholder="请输入文本内容"
          class="inputText"
          v-model="form.applicationIntroduce"
          maxlength="200"
          type="textarea"
          :autosize="true"
          size="large"
        >
        </iview-input>
      </div>

      <div class="appName flex-row mb80">
        <span class="important">*</span>
        <span>应用介绍：</span>
        <div class="editor">
          <quill-editor ref="editor"></quill-editor>
          <!--          {{form.applicationIntroduction}}-->
        </div>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用类型：</span>
        <RadioGroup v-model="form.applicationType">
          <Radio label="1">私有</Radio>
          <Radio label="2">共享到应用市场</Radio>
        </RadioGroup>
      </div>

      <div class="appName">
        <span class="important">*</span>
        <span>应用状态：</span>
        <RadioGroup v-model="form.applicationStatus">
          <Radio label="0">停用</Radio>
          <Radio label="1">启用</Radio>
        </RadioGroup>
      </div>
    </div>
  </IviewModal>
</template>

<script>
import UploadBox from "_cc/UploadBox"
import IviewInput from "_c/iview/IviewInput"
import quillEditor from "_cc/quillEditor"
import IviewCascader from "_c/iview/IviewCascader"

export default {
  name: "editeAPP",
  components: { IviewCascader, IviewInput, UploadBox, quillEditor },
  data() {
    return {
      imgUrl: "",
      value: [],
      optionsT: [],
      visible: true,
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
        applicationName: "",
        applicationSource: "",
        createrType: "",
        usage: "",
        redirectUrl: ""
      }
    }
  },
  created() {
    this.getApplicationClassifyId()
    let app = JSON.parse(sessionStorage.getItem("app"))
    this.form=app
    if(app.applicationSource==1||app.applicationSource==2||!this.form.applicationSource){
      this.form.appType=0
    }else{
      this.form.appType=this.form.applicationSource
    }
    this.form.applicationName = app.applicationName
    this.form.applicationIntroduction = app.applicationIntroduction
    this.form.applicationIntroduce = app.applicationIntroduce
    this.form.id = app.id
    this.form.applicationClassifyId = app.applicationClassifyId
    this.form.applicationStatus = "" + app.applicationStatus
    
    if (app.applicationType == 1) {
      this.form.applicationType = "1"
    } else {
      this.form.applicationType = "2"
    }

    this.form.applicationIcon = app.applicationIcon
  },
  mounted() {

    this.$refs.editor.content = this.form.applicationIntroduction
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


        function findP(value, list = [], result = []) {
          for (let i = 0; i < list.length; i += 1) {
            const item = list[i]
            if (item.value === value) {
              result.push(item.value)
              if (result.length === 1) return result
              return true
            }
            if (item.children) {
              result.push(item.value)
              const find = findP(value, item.children, result)
              if (find) {
                return result
              }
              result.pop()
            }
          }
          return false
        }

        let id = this.form.applicationClassifyId
        let value = findP(id, [this.optionsT])
        if (value.length > 2) {
          this.value = value.splice(1, 2)
        } else {
          this.value = value
        }
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
      this.form.applicationIcon = this.$refs.UploadBox.uploadSetting.fileList[0].url
    },
    handleEditor() {
      this.form.applicationIntroduction = this.$refs["editor"].content
    },
    save() {
      this.handleEditor()
      this.handelStrData()
      this.form.applicationClassifyId = this.value.pop()
      if (this.form.appType != 0) this.form.applicationSource = this.form.appType
      this.$api.subcenterManage
        .SubCenterModifiedAPP({
          ...this.form
        })
        .then(res => {
          if (res.data != null) {
            this.$Message.success("成功修改")
          }
        })
      this.close()
    },
    close() {
      this.handelStrData
      this.handleEditor()

      this.$emit("close", "close")
      this.visible = false
      console.log(this.value)
    }
  }
}
</script>

<style lang="less" scoped>
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
