<template>
  <div class="i-form-modal">
    <IviewModal
      :title="title"
      v-model="showModal"
      @on-ok="onSubmit"
      @on-cancel="onCancel"
      @on-visible-change="close"
    >
      <Form
        class="form_container"
        :ref="refName"
        :model="formData.fieldList"
        :rules="formData.formRules">
        <FormItem
          class="form_item"
          :label-colon="true"
          :label-width="labelWidth"
          v-for="(item, i) in formData.formList"
          :key="i"
          :required="item.required"
          :prop="item.prop"
          :label="item.label + ' :'">
          <IviewInput
            v-if="item.type.includes('input')"
            :type="item.type.includes('-') ? item.type.split('-')[1] : 'text'"
            :password="item.type.includes('password')"
            :disabled="item.disabled"
            v-model="formData.fieldList[item.prop]"
          ></IviewInput>
          <IviewInput
            v-if="item.type == 'textarea'"
            :type="item.type"
            :rows="item.rows"
            :disabled="item.disabled"
            v-model="formData.fieldList[item.prop]"></IviewInput>
          <InputNumber v-model="formData.fieldList[item.prop]"
                       v-if="item.type == 'number'"
                       :min="1"></InputNumber>
          <IviewRadioGroup
            v-if="item.type == 'radio'"
            @on-change="changeRadio($event, item.prop)"
            v-model="formData.fieldList[item.prop]"
            :radioList="item.data"></IviewRadioGroup>
          <IviewRadioGroup
            v-if="item.type == 'radio2'"
            type="button"
            @on-change="changeRadio($event, item.prop)"
            v-model="formData.fieldList[item.prop]"
            :radioList="item.data"></IviewRadioGroup>
          <IviewSelect :optionList="item.data" v-if="item.type == 'select'"
                       v-model="formData.fieldList[item.prop]"
                       @on-change="changeSelect($event, item.prop)"></IviewSelect>
          <div class="select-tag"
               v-if="item.type == 'select-tag'">
            <IviewSelect :optionList="item.data"
                         v-model="formData.fieldList[item.prop]"
                         @on-change="changeSelect($event, item.prop)"></IviewSelect>
          </div>
          <BAceEditor v-if="item.type == 'editor'"
                      height="220"
                      v-model="formData.fieldList[item.prop]"></BAceEditor>
          <div class="radio-group"
               v-if="item.type == 'radioGroup'">
            <IviewRadioGroup
              @on-change="changeRadio($event, item.prop)"
              v-model="formData.fieldList[item.prop]"
              :radioList="item.data"></IviewRadioGroup>
            <IviewRadioGroup
              type="button"
              v-model="formData.fieldList[item.childProp]"
              :radioList="item.childData"></IviewRadioGroup>
          </div>
          <div class="radio-select"
               v-if="item.type == 'radio-select'">
            <IviewRadioGroup
              v-model="formData.fieldList[item.radioProp]"
              :radioList="item.data"></IviewRadioGroup>
            <IviewSelect :optionList="item.list"
                         v-model="formData.fieldList[item.prop]"
                         @on-change="changeSelect($event, item.prop)"></IviewSelect>
          </div>
          <div class="select-select"
               v-if="item.type == 'select-select'">
            <IviewSelect :optionList="item.data"
                         v-model="formData.fieldList[item.prop]"
                         @on-change="changeSelect($event, item.prop)"></IviewSelect>
            <IviewSelect :optionList="item.childData"
                         v-model="formData.fieldList[item.prop]"
                         @on-change="changeSelect($event, item.prop)"></IviewSelect>
          </div>
          <div class="number-checkbox"
               v-if="item.type == 'number-checkbox'">
            <InputNumber v-model="formData.fieldList[item.prop]" :min="1"></InputNumber>
            <IviewCheckboxGroup v-model="formData.fieldList[item.childProp]" :optionList="item.data">
            </IviewCheckboxGroup>
          </div>
          <div class="table"
               v-if="item.type == 'table'">
            <IviewButton cus-type="plain" dis disabled>新增</IviewButton>
          </div>
          <div class="uploadBox uploadImg"
               v-if="item.type == 'upload'">
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="formData.fieldList[item.prop]"
              :format="item.format"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :before-upload="handleBeforeUpload"
              multiple
              action="">
              <IviewButton cusType="upload"
              >
                上传
              </IviewButton>
              <div class="downLoad btn"
                   v-if="item.downloadBtn && formData.fieldList[item.pProp] == 2">
                {{ item.downloadBtn }}
              </div>
            </Upload>
            <div class="upload-list">
              <div class="upload-item" v-for="(child, j) in formData.fieldList[item.prop]" :key="j">
                <template v-if="child.status === 'finished'">
                  <img :src="child.url">
                  <!--              <div class="demo-upload-list-cover">-->
                  <!--                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
                  <!--                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>-->
                  <!--              </div>-->
                </template>
                <template v-else>
                  <Progress v-if="child.showProgress" :percent="child.percentage" hide-info></Progress>
                </template>
              </div>
            </div>
          </div>
          <div class="btn" v-if="item.btnName" @click="btnFun">
            {{ item.btnName }}
          </div>
        </FormItem>
      </Form>
    </IviewModal>
  </div>
</template>

<script>
  export default {
    name: "IviewFormModal",
    props: {
      title: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      },
      refName: {
        type: String,
        default: 'form'
      },
      labelWidth: {
        type: [Number, String],
        default: 100
      },
      formInfo: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        formData: this.formInfo,
        showModal: this.show
      }
    },
    watch: {
      formInfo: {
        handler(n) {
          this.formData = n;
        },
        deep: true
      },
      show(n) {
        this.showModal = n;
        if (n) {
          this.$refs.form.resetFields();
        }
      },
      formData: {
        handler() {
          // n.formList.map(item => {
          //   if (item.type.includes('radio')) {
          //     item.childData && item.childData.length ? n.fieldList[item.childProp] = item.childData[0].value : ''
          //   }
          // })
        },
        deep: true
      }
    },
    methods: {
      changeRadio(e, prop) {
        this.$emit('change', prop, e);
      },
      changeSelect(e, prop) {
        this.$emit('change', prop, e);
      },
      handleBeforeUpload(e) {
        console.log(e, 'e')
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess(res, file) {
        console.log(res, file, this.formInfo.fieldList)
      },
      onSubmit() {
        this.$refs[this.refName].validate((valid) => {
          valid && this.$emit('on-ok', this.formData.fieldList);
        })
      },
      onCancel() {
        this.$emit('on-cancel');
        this.$refs[this.refName].resetFields();
      },
      close(e) {
        this.$emit('close', e);
        if (e) {
          this.$refs[this.refName].resetFields();
          setTimeout(() => {
            this.$nextTick(function () {
              this.$refs[this.refName].resetFields();
            })
          },50)
        }
      },
      btnFun() {
        this.$emit('btnFun')
      }
    },
    mounted() {
      // console.log(this.formInfo)
    }
  }
</script>

<style lang="less" scoped>
  .i-form-modal {
    //.flex-center();

    /deep/ .ivu-modal {
      .ivu-modal-body {
        .flex-center();
        align-items: flex-start;
      }
    }

    /deep/ .ivu-form {
      padding-top: 40px;

      .ivu-form-item {
        width: 100% !important;
        &.ivu-form-item-error {
          .bin-ace-editor {
            border-color: #f5222d !important;
          }
        }

        .ivu-form-item-content {
          height: 100%;
          max-width: 450px;
          .flex-center();
          justify-content: flex-start;
          flex-wrap: wrap;

          /deep/.ivu-input-number {
            width: 100%;
          }

          .radio-group,
          .radio-select,
          .select-select {
            width: 100%;
            height: auto;
            .flex-column();

            .i-radio-group,
            .i-select {
              margin-bottom: 10px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }

          .number-checkbox {
            .flex-center();

            & > div:first-child {
              margin-right: 10px;
            }
          }

          .i-radio-group {
            margin-bottom: 10px;

            .ivu-radio-group {
              max-width: 350px;
              flex-wrap: wrap;

              &.ivu-radio-group-button {
                .ivu-radio-wrapper {
                  margin-bottom: 10px;
                }
              }
            }
          }

          .btn {
            margin-left: 14px;
            color: #2C46B5;
            font-weight: 400;
            cursor: pointer;
            text-decoration: underline;

            &:hover {
              color: #515CF3;
            }
          }

          .uploadBox {
            width: 100%;
            .flex-column();

            .ivu-upload {
              .flex-center();
            }

            .upload-list {
              margin-top: 8px;
              width: 100%;
              height: 200px;
              .flex-center();
              flex-wrap: wrap;

              .upload-item {
                width: 90px;
                height: 63px;
                /*background: rgba(0, 0, 0, 0.6);*/
                border-radius: 4px;
              }
            }

            &.uploadImg {

            }
          }
        }
      }
    }
  }
</style>