<template>
  <div class="audio">
    <audio ref="audio"
           @play="onPlay"
           @pause="onPause"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
    >
<!--      controls-->
      <source :src="item" v-for="(item, i) in srcList" :key="i">
<!--      <source :src="srcList[0].src">-->
      您的浏览器不支持 audio 元素。
    </audio>
    <div class="control">
      <span class="play" @click="play" v-if="!playing">
        <Icon type="ios-play" size="18" />
      </span>
      <span class="pause" @click="pause" v-else>
        <Icon type="ios-pause" size="18" />
      </span>
    </div>
    <div class="progress">
      <Slider v-model="audioPercent" show-tip="never" @on-change="changeProgress"></Slider>
    </div>
    <div class="time">
      {{ time ? time : formatSecond() }} / {{ endTime ? endTime : formatSecond() }}
    </div>
  </div>
</template>

<script>

  export default {
    name: "Audio",
    props: {
      srcList: {
        type: Array,
        default: () => {
          return [
            // require('/public/audio/BlueDucks_FourFlossFiveSix.mp3'),
            // require('/public/audio/BlueDucks_FourFlossFiveSix.ogg'),
            // require('/public/audio/BlueDucks_FourFlossFiveSix.wav')
          ]
        }
      }
    },
    data() {
      return {
        playing: false,
        audioPercent: 0,
        // 音频当前播放时长
        // time: 0,
        currentTime: 0,
        // 音频最大播放时长
        // endTime: 0,
        maxTime: 0
      }
    },
    watch: {
      srcList() {
        this.audioPercent = 0;
        this.currentTime = 0;
        this.maxTime = 0;
        this.playing = false;
        this.$refs.audio.load();
      },
      currentTime(n) {
        this.time = this.realFormatSecond(n);
      },
    },
    computed: {
      endTime() {
        return this.realFormatSecond(this.maxTime);
      }
    },
    methods: {
      // 播放音频
      play () {
        if (this.maxTime) {
          this.playing ? '' : this.$refs.audio.play();
        } else {
          this.$Message.warning('当前无可播放音频！')
        }
      },
      // 暂停音频
      pause () {
        this.playing ? this.$refs.audio.pause() : '';
      },
      // 当音频播放
      onPlay () {
        this.playing = true;
      },
      // 当音频暂停
      onPause () {
        this.playing = false;
      },
      changeProgress(val) {
        if (!this.$refs.audio) {
          this.audioPercent = 0;
          return;
        }
        this.audioPercent = val;
        this.$refs.audio ? this.$refs.audio.currentTime = parseInt(val / 100 * this.maxTime) : '';
        this.$refs.audio ? this.time = this.realFormatSecond(parseInt(val / 100 * this.maxTime)) : '';
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)
        this.currentTime = res.target.currentTime;
        this.audioPercent = parseInt(this.currentTime / this.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        // console.log('loadedmetadata')
        // console.log(res)
        this.maxTime = parseInt(res.target.duration);
      },
      formatSecond(second = 0) {
        return this.realFormatSecond(second)
      },
      realFormatSecond(second) {
        let secondType = typeof second;

        if (secondType === 'number' || secondType === 'string') {
          second = parseInt(second);

          let hours = Math.floor(second / 3600);
          second = second - hours * 3600;
          let mimute = Math.floor(second / 60);
          second = second - mimute * 60;

          return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
          return '0:00:00'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .audio {
    width: 664px;
    height: 74px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(232, 234, 246, 0.03), 0 1px 4px 0 rgba(161, 166, 203, 0.55);
    border-radius: 8px;
    .flex-center();

    .control {
      width: 30px;
      height: 30px;
      background: #515CF3;
      box-shadow: 0 2px 2px 0 rgba(57, 68, 230, 0.95), inset 0 0 1px 0 #C4CEFF;
      border-radius: 50%;
      color: #fff;

      span {
        width: 100%;
        height: 100%;
        .flex-center();
        padding-left: 4px;
        cursor: pointer;
      }
    }
    .progress {
      width: 400px;
      margin: 0 16px 0 10px;
      position: relative;
      .flex-center();

      .btn {
        width: 8px;
        height: 8px;
        background: #515CF3;
        box-shadow: 0 1px 1px 0 rgba(57, 68, 230, 0.4), inset 0 0 1px 0 #C4CEFF;
        border-radius: 50%;
        position: absolute;
        left: -4px;
      }

      /deep/.ivu-slider {
        width: 100%;
      }

      /*/deep/.ivu-progress {*/
      /*  .ivu-progress-inner {*/
      /*    height: 4px;*/
      /*    border-radius: 4px;*/
      /*    background: rgba(241, 242, 246, .7);*/
      /*    border: 1px solid #E0E5EC;*/
      /*  }*/
      /*}*/
    }
    .time {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2C3542;
      line-height: 22px;
    }
  }
</style>