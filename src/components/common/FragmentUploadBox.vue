<template>
  <div class="fragment-upload-box">
    <uploader :key="uploader_key" :options="options" class="uploader-example"
              ref="uploader"
              :autoStart="false"
              @complete="complete"
              @file-success="onFileSuccess"
              @file-progress="onFileProgress"
              @file-error="onFileError"
              @file-added="filesAdded">
<!--      @files-submitted="filesSubmitted"-->
      <uploader-unsupport></uploader-unsupport>

<!--      <uploader-drop>-->
      <div class="upload-btn">
        <uploader-btn :attrs="attrs">
          上传
        </uploader-btn>
<!--        <div class="u-template">下载模板</div>-->
      </div>
      <div class="upload-tip">
        仅支持上传zip格式文件，文件大小不超过500MB
      </div>
<!--      </uploader-drop>-->
      <uploader-list>
        <div class="u-list" slot-scope="props">
          <div class="u-list-item" v-for="file in props.fileList" :key="file.id">
<!--            <uploader-file :class="'file_' + file.id" ref="files" :file="file">-->
              <div class="file-name">
                <span>{{ file.name }}</span>
                <div class="fail" v-if="file.error || file.allError"></div>
                <div class="success" v-if="file.proPercent == 100"></div>
              </div>
            <div class="file-progress" v-if="file.proPercent && file.proPercent < 100">
              <Progress :percent="Number(file.proPercent)" status="active" :stroke-width="5">
                <span>{{file.proPercent}}%</span>
              </Progress>
            </div>
            <div class="file-del" @click="delFile(file)">
              <Icon type="md-close" v-if="file.proPercent !== 100"/>
              <span class="el-icon-delete" v-else></span>
            </div>
<!--            </uploader-file>-->
          </div>
        </div>
      </uploader-list>
    </uploader>
  </div>
</template>

<script>

  import { Base64 } from 'js-base64';
  const base64token = Base64.encode('token');
  const token = sessionStorage.getItem(base64token);
  import { showFullScreenLoading, tryHideFullScreenLoading } from "_u/loading"

  export default {
    name: "FragmentUploadBox",
    props: {
      api: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        uploader_key: new Date().getTime(),
        attrs: {
          accept: '.zip'
        },
        callBackData: {}
      }
    },
    computed: {
      options() {
        return {
          target: this.api ? this.api : '/api/aimanager/v1/chunk/upload',
          testChunks: false,
          headers: {
            // 'Content-Type' : 'application/json;charset=UTF-8'
            Authorization: 'Bearer ' + token
          },
        }
      },
    },
    methods: {
      complete() {
        this.$emit('callBack', this.callBackData)
      },
      delFile(file) {
        file.cancel();
      },
      onFileProgress(rootFile, file, chunk) {
        file.proPercent = file.progress() * 100;
        file.proPercent = file.proPercent == 100 ? file.proPercent.toFixed(0) : file.proPercent.toFixed(2)
        console.log(file, chunk, `上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
      },
      onFileSuccess: function (rootFile, file, response, chunk) {
        console.log("response == ");
        let resData = JSON.parse(response).data;
        this.callBackData = resData;
        console.log(response, resData, chunk);
      },
      onFileError(rootFile, file, message, chunk) {
        let res = JSON.parse(message),
          str = res.message.split(':')[1];
        this.$Message.warning(`文件${file.name}上传失败` + str);
        this.$emit('callBack')
      },
      computeMD5(file) {
        console.log(file, '---f')
        showFullScreenLoading('正在计算MD5');
        let fileReader = new FileReader();
        let time = new Date().getTime();
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let currentChunk = 0;
        const chunkSize = 10 * 1024 * 1000;
        let chunks = Math.ceil(file.size / chunkSize);
        // let spark = new SparkMD5.ArrayBuffer();
        file.pause();

        loadNext();

        fileReader.onload = (e => {
          // console.log(e, 'e')
          // spark.append(e.target.result);
          if (currentChunk < chunks) {
            currentChunk++;
            loadNext();
            this.$nextTick(() => {
              // console.log('校验MD5 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%')
            })
          } else {
            // let md5 = spark.end();
            let md5 = new Date().getTime();
            tryHideFullScreenLoading();
            this.computeMD5Success(md5, file);
            console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
          }
        });
        fileReader.onerror = function () {
          // this.error(`文件${file.name}读取出错，请检查该文件`);
          tryHideFullScreenLoading();
          file.cancel();
        };

        function loadNext() {
          let start = currentChunk * chunkSize;
          let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
          fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
        }
      },
      computeMD5Success(md5, file) {
        file.uniqueIdentifier = md5;//把md5值作为文件的识别码
        console.log("uniqueIdentifier = ", file.uniqueIdentifier)
        // file.resume();//开始上传
      },
      filesAdded(file, event) {
        console.log(event, this.$refs.uploader, 'event')
        //大小判断
        const isLt500M = file.size / 1024 / 1024 < 500;
        console.log("file.size = ", file.size)
        console.log("isLt500M = ", isLt500M)
        if (!isLt500M) {
          this.$Message.error('文件过大，请上传500MB以内的文件');
          file.cancel();
        } else {
          file.proPercent = 0;
          this.computeMD5(file)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import "~_c/iview/config/index";
  .fragment-upload-box {
    .uploader-example {
      width: 100%;

      .uploader-btn {
        border: 0;
        .btn-upload-f();
        .flex-center();
        width: 68px;
        height: 28px;
        font-size: 16px;
        margin-right: 16px;

        &:hover {
          background: transparent;
        }
      }

      .upload-btn {
        .flex-center();
        justify-content: flex-start;

        .u-template {
          color: #515cf3;
          cursor: pointer;
          text-decoration: underline;
        }
      }

      .upload-tip {
        border-bottom: 1px dashed rgba(236, 238, 240, 1);
        padding-bottom: 5px;
        margin: 0;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #595b5f;
        line-height: 22px;
      }

      .uploader-list {
        height: 200px;
        overflow: auto;
        .show-scroll-common1();
        overflow-x: hidden;
        > ul {
          .uploader-file {
            height: 30px;
            .upload-file-info {
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
          }

          .i-del {
            width: 15px;
            height: 15px;
            background: url("~_img/common/del.png") no-repeat;
            background-size: contain;
            cursor: pointer;
          }

          span {
            font-size: 14px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.65);
            line-height: 20px;
          }
        }

        .u-list-item {
          .flex-center();
          justify-content: space-between;

          .file-name {
            flex: 1;
            .flex-center();
            justify-content: flex-start;
            margin-right: 5px;

            span {
              .ellipsis();
            }

            .success {
              width: 14px;
              height: 14px;
              background: url("~_img/common/upload-success.png") no-repeat;
              background-size: 100% 100%;
              margin-left: 4px;
            }
            .fail {
              .flex-center();
              justify-content: flex-start;
              margin-left: 4px;
              ::before {
                content: '';
                width: 14px;
                height: 14px;
                background-size: 100% 100% !important;
                background: url("~_img/common/upload-fail.png") no-repeat;
              }
            }
          }

          .file-progress {
            flex-basis: 160px;
            overflow: hidden;
            /deep/.ivu-progress {
              width: 160px;
            }
          }

          .file-del {
            flex-basis: 20px;
            .flex-center();
          }
        }
      }
    }
  }

  .uploader-example .uploader-btn {
    margin-right: 4px;
    padding: 4px 0;
  }

  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>