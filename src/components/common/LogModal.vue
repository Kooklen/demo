<template>
  <div class="log-modal">
    <IviewModal
      :title="title + '日志'"
      v-model="showModal"
      size="large"
      footer-hide
      @on-visible-change="close"
    >
      <div class="log-data">
        <div class="log-con" v-html="logData"></div>
      </div>
    </IviewModal>
  </div>
</template>

<script>
  export default {
    name: "LogModal",
    props: {
      title: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        showModal: this.show,
        logData: '',
        timer: null,
        finished: false,
      }
    },
    watch: {
      show(n) {
        this.showModal = n;
        if (n) {
          this.getLogData();
        } else {
          this.clear();
        }
      }
    },
    methods: {
      getLogData() {
        let id = this.data.id,
          model = this.data.modelName,
          fun = this.data.funName;
        if (!id) return;
        this.finished = false;

        this.$api[model][fun]({
          id
        }).then(res => {
          if (this.logData == res.data.data) {
            this.finished = true;
          }
          this.logData = res.data.data;
          if (this.logData && !this.finished) {
            let div = document.getElementsByClassName('log-data')[0],
              con = document.getElementsByClassName('log-con')[0];
            setTimeout(() => {
              div.scrollTop = con.scrollHeight;
            }, 200)
          }
        });

        if (!this.timer) {
          this.timer = setInterval(() => {
            this.getLogData();
          }, 3000)
        }
      },
      close(e) {
        this.$emit('close', e)
      },
      clear() {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    beforeDestroy() {
      this.clear();
    }
  }
</script>

<style lang="less" scoped>
.log-modal {
  /deep/.ivu-modal {
    .log-data {
      width: 100%;
      height: 100%;
      background: #FAFAFA;
      margin: -10px -20px;
      padding: 20px;
      .show-scroll();
      transition: all .3s;

      div {
        color: #333333;
        transition: all .3s;
      }
    }
  }
}
</style>