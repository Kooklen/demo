<template>
  <div class="upload">
    <div class="upload_tip">
      <!--      （支持文件格式：jpg、png，文件大小不超过500kb）-->
    </div>
    <div class="upload_box">
      <Upload
          ref="upload"
          :show-upload-list="true"
          :before-upload="handleBeforeUpload"
          multiple
          action=""
          :format="uploadSetting.format"
          :accept="uploadSetting.accept"
          v-if="isDisplay"
      >
        <div class="btnbox">
          <div class="circle">
            <Icon type="md-add"/>
          </div>
          <p>添加图片</p>
        </div>
      </Upload>
      <div
          class="list_item"
          v-for="(item, index) in uploadSetting.fileList"
          :key="index"
      >
        <img :src="item.url" alt=""/>
        <Icon
            class="close"
            type="md-close-circle"
            @click="handleDelete(item, index)"
        />

        <div class="list_item_cover">
          <Icon type="ios-eye-outline"></Icon>
          <Icon type="ios-trash-outline"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from "_u/tool";
import {getFileInfoByParams} from "_u/file-manager";

export default {
  name: "UploadBox",
  props: {
    uploadType: {
      type: String,
      default: "1",
    },
    fileQueryParams: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {

    return {
      isDisplay: true,
      radioList2: [
        {
          value: "1",
          label: "图片",
        },
        // {
        //   value: "2",
        //   label: "压缩包",
        // },
      ],
      fileFilter: new Map([
        [
          "1",
          {
            type: "photo",
            textTip: "（仅支持jpg、png格式图片）",
            fileList: [],
            format: [],
            accept: "image/jpeg,image/jpeg,image/png",
            sizeLimit: "",
            extPreset: "img",
          },
        ]
      ]),
      // 后缀名 - 预设
      presetDict: {
        img: ["png", "jpg", "jpeg"],
        // zip: ["zip"],
      },
      uploadSetting: {
        type: "photo",
        textTip: "（仅支持jpg、png格式图片）",
        fileList: [
          // {url:"https://dev-file.iviewui.com/ll7neXYI7fzKv1SjjOl77vpfkDbJpbDB/large"}
        ],
      },
      fileList: [],
      photoMd5: ""
    };
  },
  watch: {

    uploadSetting: function (newVal, oldVal) {
      console.log(this.uploadSetting.fileList)
      if (this.uploadSetting.fileList != null) {
        console.log(1111)
      } else {
        // this.isDisplay=false
        console.log(222);
      }
      console.log(newVal);
      console.log(oldVal);
    },

    uploadType: {
      handler() {
        // var actions = this.fileFilter.get(n);
        // this.uploadSetting = JSON.parse(JSON.stringify(actions));
        // this.fileListOnChange();
      },
      immediate: true,
    },
    fileQueryParams: {
      handler(n) {
        // console.log(n, "fileQueryParams");
        if (n.id) {
          this.fileListInit(n);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {},
  mounted() {
    // if (this.uploadSetting.fileList != "") {
    //   this.isDisplay = true
    // }else{
    //   this.isDisplay= false
    // }
  },
  methods: {
    handleSuccess() {
    },
    handleBeforeUpload(file, a, b) {
      console.log(file);
      // this.photoMd5
      // this.$emit("photomd5","123")
      // console.log(222)
      this.photoMd5 = file;
      console.log(this.photoMd5.name);
      // console.log(this.photoMd5);
      let {size, name} = file;
      let {sizeLimit, extPreset} = this.uploadSetting;
      // console.log(file, "file");

      if (this.uploadSetting.fileList.length >= 1) {
        this.$Message.warning("图片上传单次不能超过1张!");
        return false;
      }

      // 文件大小判断
      if (sizeLimit && size > sizeLimit * 1024 * 1024) {
        this.$Message.warning(`文件大小限制：${sizeLimit}MB`);
        return false;
      }

      // 文件类型判断
      if (extPreset) {
        let ext = [...(this.presetDict[extPreset] || [])];

        let fileExt = name.split(".").pop();

        if (!ext.includes(fileExt.toLowerCase())) {
          this.$Message.warning(`请上传以下文件格式：${ext}`);
          return false;
        }
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        file.url = reader.result;
        // console.log(file, "--file");
        if (this.uploadSetting.fileList.length >= 1) {
          this.$Message.warning("图片上传单次不能超过1张!");
        } else {
          this.uploadSetting.fileList.push(file);
          this.$emit("fileOnChange", file);
        }
      };
      this.fileListOnChange();

      return false;
    },
    handleDelete(file, fileIndex) {
      this.uploadSetting.fileList.splice(fileIndex, 1);
      this.fileListOnChange();
      this.$emit("delFileChange", {file, fileIndex});
    },
    // 这个事件传的是总的list 待验证
    fileListOnChange: debounce(function () {
      // console.log("innn", this.uploadSetting);
      this.$emit("fileListOnChange", this.uploadSetting);
    }, 500),
    async fileListInit(queryParams) {
      let fileRes = await getFileInfoByParams({
        ...queryParams,
      });
      if (fileRes && fileRes.length > 0) {
        console.log(fileRes, "fileRes - upload");
        this.uploadSetting.fileList = fileRes;
        this.$emit("fileOnChange", fileRes);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.upload {
  min-width: 350px;

  .upload_tip {
  }

  .upload_box {
    height: 300px;
    width: 300px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    /deep/ .ivu-upload {
      width: 120px;
      height: 130px;
      margin-right: 15px;
      margin-bottom: 10px;
      background: #edeff2;
      border-radius: 4px;
      border: 1px dashed #d2d4d6;

      .ivu-upload-select {
        // width: 100%;
      }

      .tip {
        // position: absolute;
        // bottom: -50px;
        border-bottom: 1px dashed rgba(236, 238, 240, 1);
        padding-bottom: 5px;
        margin: 0;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #595b5f;
        line-height: 22px;
      }

      .btnbox {
        position: relative;
        width: 100%;
        height: 100%;
        .flex-column(center, center);
        cursor: pointer;

        .circle {
          width: 32px;
          height: 32px;
          background: #ffffff;
          box-shadow: 0px 1px 4px 0px #cfd1d4;
          border-radius: 50%;
          margin-bottom: 5px;
          .flex-column(center, center);

          i {
            font-size: 16px;
            color: #1a45b8;
          }
        }

        p {
          font-size: 14px;
          color: rgba(51, 51, 51, 0.5);
          line-height: 22px;
        }
      }
    }

    .list_item {
      width: 120px;
      height: 130px;
      border-radius: 4px;
      flex-shrink: 0;
      margin-right: 15px;
      margin-bottom: 10px;
      position: relative;
      cursor: pointer;
      .flex-center();
      border: 1px solid #d2d4d6;

      img {
        max-width: 100%;
        max-height: 100%;
      }

      .close {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 20px;
        cursor: pointer;
        color: #9a9cbe;
        z-index: 10;
      }

      .list_item_cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
      }

      &:hover {
        .list_item_cover {
          .flex-center();
        }
      }
    }
  }
}

.tip {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595b5f;
  line-height: 22px;
  margin: 15px 0;
}
</style>