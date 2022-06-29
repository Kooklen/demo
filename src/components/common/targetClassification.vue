<template>
  <div class="target-classification">
    <div class="config-box">
      <Tooltip :class="{ dis: size >= 2 }" content="放大 (Ctrl + 鼠标滚轮)">
        <span :class="['enlarge']" @click="changeWheel(0.1)"></span>
      </Tooltip>
      <Tooltip :class="{ dis: size <= 1 }" content="缩小 (Ctrl + 鼠标滚轮)">
        <span :class="['narrow']" @click="changeWheel(-0.1)"></span>
      </Tooltip>
      <Tooltip
        :class="[{ act: config.drag && size > 1 }, { dis: size <= 1 }]"
        content="拖拽"
      >
        <span :class="['drag']" @click="changeCon('drag', 1, size <= 1)"></span>
      </Tooltip>
      <Tooltip content="删除图片">
        <span class="del" @click="delImg"></span>
      </Tooltip>
    </div>
    <div class="canvas-box">
      <div id="con" oncontextmenu="return false"></div>
      <div class="btn-box">
        <div class="left-btn" @click="changePage(0)">
          <Icon type="ios-arrow-back" />
        </div>
        <div class="right-btn" @click="changePage(1)">
          <Icon type="ios-arrow-forward" />
        </div>
      </div>
    </div>
    <div class="label-box">
      <div class="title">标注结果</div>
      <div class="list">
        <div class="label-item" v-for="(item, i) in labelList" :key="i">
          {{ item.labelName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Konva from "konva";
import { mapActions, mapState } from "vuex";

/*
  this.$bus.$emit('updateLabelList')
  this.$bus.$emit('addClassLabel');
  this.$bus.$emit('updateImgList')
  this.$bus.$emit('updateAnnotList')
  this.$bus.$emit('piliang')
  */
export default {
  name: "targetClassification",
  props: {
    dataSetId: {
      type: [String, Number],
      default: "",
    },
    dataSetHistoryId: {
      type: [String, Number],
      default: "",
    },
    // 图片数据
    imgData: {
      type: Object,
      default: () => {
        return {
          annotationList: [],
        };
      },
    },
    // 图片路径
    imgSrc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      stage: null, // 画板
      layer: null, // 图层
      img: null, // 当前图片图层
      config: {
        drag: false,
      },
      size: 1, // 缩放大小
      listData: [], // 标签列表
      labelList: [], // 选中标签
    };
  },
  watch: {
    dataSetId: {
      handler() {
        this.getAllList();
      },
      deep: true,
    },
    config: {
      handler(n) {
        this.group.draggable(n.drag);
      },
      deep: true,
    },
    imgData(n) {
      if (n && n.annotationList && n.annotationList.length) {
        this.labelList = n.annotationList.map((item) => {
          return {
            labelName: item.label,
          };
        });
        // console.log(n, this.labelList, "--list");
        setTimeout(() => {
          this.$bus.$emit("updateLabelList", this.labelList);
        }, 200);
      }
    },
    imgSrc(n) {
      if (this.img) {
        this.reset();
        this.img.remove();
      }
      if (this.stage) {
        this.loadImages(n, this.buildStage);
      } else {
        this.setKnova();
      }
    },
    isEditIng(n) {
      this.Action_editTagStatus(n); // 提交到vuex
    },
  },
  computed: {
    ...mapState({
      labelBox_currentList(state) {
        return state.autoLearn.labelBox_currentList;
      },
    }),

    isEditIng() {
      // true 为编辑中 false为未编辑
      let flag = false;
      flag = !this.identicalList();
      return flag;
    },
    imgDataAnnotationList() {
      return this.imgData.annotationList;
    },
  },
  methods: {
    ...mapActions("autoLearn", ["Action_editTagStatus"]),
    busOn() {
      this.$bus.$on("updateClassList", (list) => {
        if (!this.imgSrc) {
          this.$Message.warning("请先导入或选中图片再进行标注！");
          this.$bus.$emit("updateLabelList", this.labelList);
          return;
        }
        this.labelList = list;
        console.log(this.labelList, "updateClassList ==== this.labelList");
      });

      // 更新标签列表数据
      this.$bus.$on("updateList", () => {
        // console.log('updateList')
        this.getAllList();
      });

      this.$bus.$on("keyDown", (e) => {
        this.onKeyDown(e);
      });

      // labelBox修改标签，标注结果回显也改变
      this.$bus.$on("labelBox_editLabel", (obj) => {
        // console.log(this.labelList, obj, "labelBox_editLabel ==== this.labelList");
        if (this.labelList.length > 0) {
          this.labelList.forEach((item) => {
            if (item.id === obj.id) {
              item.labelName = obj.label;
            }
          });
        }
      });
    },
    // 图片切换清空数据
    reset() {
      this.stage.clear();
      this.layer.clear();
      this.group.remove();
      this.size = 1;
      if (this.imgData.annotationList && this.imgData.annotationList.length)
        return;
      this.labelList = [];
      this.$bus.$emit("updateLabelList", this.labelList);
    },
    updateImg(data = {}) {
      this.$bus.$emit("updateImgList", { ...data });
    },
    updateList(data = {}) {
      this.$bus.$emit("updateAnnotList", { ...data });
    },
    delImg() {
      this.$emit("delImg", this.imgData);
    },
    // 缩放事件
    changeWheel(size) {
      // if (dis) {
      //   this.$Message.warning('已在缩放可支持最大/最小范围！');
      //   // this.$Message.warning('当前状态不支持使用此工具！');
      //   return;
      // }

      let x,
        y,
        w = this.img.width(),
        h = this.img.height(),
        // maxW = this.img.image().naturalWidth,
        // maxH = this.img.image().naturalHeight,
        sX = this.group.scaleX(),
        sY = this.group.scaleY();

      sX += size;
      sY += size;
      x = (sX * 100) / 100;
      y = (sY * 100) / 100;

      this.size = sX;

      if (sX > 1) {
        this.changeCon("drag", 1, null, 1);
      }

      if (x < 1 || y < 1) {
        this.$Message.warning("已在缩放可支持最小范围！");
        this.size = 1;
        this.group.setAttrs({
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        });
        return;
      }
      // if (w * sX > maxW || h * sY > maxH) {
      if (sX > 2) {
        this.$Message.warning("已在缩放可支持最大范围！");
        return;
      }
      this.group.scale({ x, y });
      let x1 = w - (w * sX * 100) / 100,
        y1 = h - (h * sY * 100) / 100;
      this.group.setAttrs({
        x: w > h ? x1 / 2 : x1 + x1 / 6,
        y: w > h ? y1 - y1 / 3 : y1 / 2,
      });

      console.log(
        this.group,
        this.img.image().naturalWidth,
        this.img.width(),
        this.stage.width()
      );
    },
    // 快捷键事件
    onKeyDown(e) {
      if (!e) return;
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        let key = e.keyCode - 48;
        if (this.listData.length && this.listData.length >= key) {
          let item = this.listData.filter((item) => item.keyword == key)[0];
          item && item.id ? this.$bus.$emit("addClassLabel", item) : "";
        }
      } else {
        return;
      }
      e.preventDefault();
      this.layer.batchDraw();
    },
    // 工具栏切换事件
    changeCon(type, clear, dis, bool) {
      if (dis) {
        this.$Message.warning("当前状态不支持使用此工具！");
        return;
      }
      if (clear) {
        for (let key in this.config) {
          type != key ? (this.config[key] = false) : "";
        }
      }
      this.config[type] = bool ? true : !this.config[type];
    },
    // 判断标注列表是否改变
    identicalList() {
      let annotArr =
          this.imgData.annotationList && this.imgData.annotationList.length
            ? this.imgData.annotationList.map((item) => item.label)
            : [],
        endArr = this.labelList.map((item) => item.labelName),
        bool = false;
      if (annotArr.length == endArr.length) {
        bool = annotArr.sort().toString() == endArr.sort().toString();
      }
      return bool;
    },
    // 切换事件
    changePage(next, emit) {
      if (this.identicalList() || emit) {
        this.$emit("changeImg", next);
      } else {
        let dataArr = this.beforSaveAction();
        dataArr.length ? this.saveImg(dataArr, 1, next) : "";
      }
    },
    // 保存数据前的操作
    beforSaveAction() {
      let list = this.imgData.annotationList ? this.imgData.annotationList : [];
      let dataArr = (this.labelList = this.labelList.map((item) => {
        let obj = list.filter((child) => child.label == item.labelName)[0];
        item = {
          type: "IMAGE_CLASSIFY",
          label: item.labelName,
          itemId: this.imgData.id,
        };
        obj && obj.id ? (item.id = obj.id) : "";
        return item;
      }));
      let dataIds = dataArr.map((item) => item.id),
        listIds = list.map((item) => item.id);
      if (dataIds && listIds) {
        let ids = listIds.filter((val) => {
          return dataIds.indexOf(val) == -1;
        });
        if (ids.length) {
          this.delAnnot(ids);
        }
      }

      return dataArr;
    },
    delAnnot(ids, axiosConfig = {}) {
      this.$api.dataset
        .delAnnots(null, [ids.join(",")], { ...axiosConfig })
        .then(() => {
          // console.log(this.labelList.length, "this.labelList.length");

          // 单独删除操作的时候
          if (this.labelList.length === 0) {
            this.updateImg({ name: "updateImg", fromAction: "删除" });
            this.updateList({ name: "updateList", fromAction: "删除" });
          }
        });
    },

    saveImg(data, changePage, page) {
      this.$api.dataset.saveAnnot(data, [], { tipShow: false }).then(() => {
        this.$Message.success("保存成功");
        this.updateImg({ name: "updateImg", fromAction: "保存", componentName: 'targetClassification' });
        this.updateList({ name: "updateList", fromAction: "保存", componentName: 'targetClassification' });
        this.$bus.$emit("piliang");
        changePage ? this.changePage(page, 1) : "";
      });
    },
    // 加载图片
    loadImages(src, callback) {
      let images = null;
      images = new Image();
      images.onload = () => {
        callback(images);
      };
      images.src = src;
      this.image = images;
    },
    // 设置图片位置
    getImagePos() {
      let con = document.getElementById("con"),
        image = this.image,
        x,
        y;
      let w = image.width,
        h = image.height,
        wLarge = image.width > con.clientWidth,
        hLarge = image.height > con.clientHeight;
      if (wLarge || hLarge) {
        let maxW = w > h && wLarge;
        let size = maxW ? w / con.clientWidth : h / con.clientHeight;
        image.width = w = maxW ? con.clientWidth : w / size;
        image.height = h = maxW ? h / size : con.clientHeight;
      }
      x = con.clientWidth / 2 - w / 2;
      y = con.clientHeight / 2 - h / 2;
      return { x, y };
    },
    // 创建画板 图层
    buildStage(image) {
      let con = document.getElementById("con");
      let { x, y } = this.getImagePos(image);
      let imgObj = {
        image: image,
        x,
        y,
      };
      let img = new Konva.Image(imgObj);
      // 修改指针样式
      img.off("mouseenter").on("mouseenter", () => {
        this.stage.container().style.cursor = this.config.drag
          ? "pointer"
          : this.config.rect
          ? "crosshair"
          : "default";
      });
      img.off("mousemove").on("mousemove", () => {
        this.stage.container().style.cursor = this.config.drag
          ? "pointer"
          : this.config.rect
          ? "crosshair"
          : "default";
      });
      img.off("mouseleave").on("mouseleave", () => {
        this.stage.container().style.cursor = "default";
      });
      this.img = img;
      let group = new Konva.Group({
        x: 0,
        y: 0,
      });
      group.add(img);
      // 缩放功能 - 未完成
      group.off("wheel").on("wheel", (e) => {
        // console.log(e, this.stage.getPointerPosition(), 'ee')
        e.cancelBubble = true;
        if (this.config.wheel || e.evt.ctrlKey) {
          let scale = this.group.scale(),
            pX = e.evt.clientX,
            pY = e.evt.clientY,
            w = con.clientWidth / 2,
            h = con.clientHeight / 2,
            size = 0.1,
            x = e.evt.wheelDelta > 0 ? scale.x + size : scale.x - size,
            y = e.evt.wheelDelta > 0 ? scale.y + size : scale.y - size;
          // console.log(image.width, image.height)
          x = (x * 100) / 100;
          y = (y * 100) / 100;
          this.size = x;
          if (x < 1 || y < 1) {
            this.changeCon("rect", 1, null, 1);
            this.$Message.warning("已在缩放可支持最小范围！");
            this.size = 1;
            this.group.setAttrs({
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
            });
            return;
          } else {
            this.changeCon("drag", 1, null, 1);
          }
          // if (img.width() * x > img.image().naturalWidth) {
          if (x > 2) {
            this.$Message.warning("已在缩放可支持最大范围！");
            return;
          }
          this.group.scale({ x, y });
          let pCenter = [
            // pX > w ? pX + pX * x : pX - pX * x,
            // pY > h ? pY + pY * y : pY - pY * y,
            pX - pX * x,
            pY - pY * y,
            // (pX - w) / 2 / x,
            // (pY - h) / 2 / y
          ];
          // console.log(w, h)
          pCenter[0] = (pCenter[0] * 100) / 100;
          // console.log(pCenter[0] > w ? w - pCenter[0] : pCenter[0] - w)
          // console.log(pCenter[1] > h ? h - pCenter[1] : pCenter[1] - h)
          this.group.setAttrs({
            // x: pCenter[0] > w ? w - pCenter[0] : pCenter[0] - w,
            // y: pCenter[1] > h ? h - pCenter[1] : pCenter[1] - h,
            x: pCenter[0] < w ? pCenter[0] / 2 : pCenter[0],
            y: pCenter[1] < h ? pCenter[1] / 2 : pCenter[1],
            // offsetX: pCenter[0],
            // offsetY: pCenter[1]
            // x: pCenter[0] - (pCenter[0] * x),
            // y: pCenter[1] - (pCenter[1] * y)
          });
        }
      });
      this.group = group;
      this.layer.add(group);
      // this.layer.add(img);
      this.stage.add(this.layer);

      var container = this.stage.container();

      container.tabIndex = 1;
      container.focus();

      // 选中修改样式 取消区域高亮
      img.off("click").on("click", () => {
        let json = this.group.toObject();
        console.log(this.group.children, this.layerArr, json);
      });

      // 快捷键设置
      container.addEventListener("keydown", (e) => {
        this.onKeyDown(e);
      });
    },
    // 绘制canvas
    setKnova() {
      let div = document.getElementById("con");
      let stage = new Konva.Stage({
        container: "con",
        width: div.clientWidth,
        height: div.clientHeight,
      });
      this.layer = new Konva.Layer();
      this.stage = stage;
      this.loadImages(this.imgSrc, this.buildStage);
      // this.loadImages("https://placekitten.com/408/287", this.buildStage);
    },
    // 画布大小重置
    resizeStage() {
      let div = document.getElementById("con");
      this.stage
        ? this.stage.setAttrs({
            width: div.clientWidth,
            height: div.clientHeight,
          })
        : "";
      this.group.setAttrs({
        width: div.clientWidth,
        height: div.clientHeight,
      });
    },
    // 获取标签列表
    getAllList() {
      this.$api.dataset
        .getAllLabelList({
          dataSetId: this.dataSetId,
          dataSetHistoryId: this.dataSetHistoryId,
        })
        .then((res) => {
          this.listData = res.data.data;
        });
    },
    busEmitObject(name = "", fromAction = "", option) {
      return {
        name,
        fromAction,
        ...option,
      };
    },
  },
  mounted() {
    this.busOn();
    this.setKnova();
    this.getAllList();
    let div = document.getElementById("con");
    div.onresize = () => {
      this.resizeStage();
    };
    div.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        return false;
      }
    });
    window.onresize = () => {
      this.resizeStage();
    };

    // this.identicalList();
  },
  destroyed() {
    this.$bus.$off("updateClassList");
    this.$bus.$off("updateList");
    this.$bus.$off("keyDown");
  },
};
</script>

<style lang="less" scoped>
.target-classification {
  width: 100%;
  height: 100%;
  position: relative;
  .flex-center();
  margin: auto;
  margin-left: 20px;

  .config-box {
    height: 37px;
    background: linear-gradient(180deg, #fdfdff 0%, #f9faff 100%);
    box-shadow: 2px 2px 7px 0px #e3e6f7;
    border-radius: 3px;
    .flex-center();
    justify-content: space-between;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 2;

    /deep/ .ivu-tooltip {
      width: 40px;
      height: 37px;
      cursor: pointer;

      &.act {
        .ivu-tooltip-rel {
          background: rgba(81, 92, 243, 0.1);

          span.edit {
            background: url("~_img/annotation/edit.png") no-repeat;
          }

          span.drag {
            background: url("~_img/annotation/drag-act.png") no-repeat;
          }
        }
      }

      &.dis {
        .ivu-tooltip-rel {
          opacity: 0.7;
          cursor: no-drop;
        }
      }

      .ivu-tooltip-rel {
        width: 40px;
        height: 37px;
        border-radius: 3px;
        .flex-center();

        &:hover {
          background: rgba(81, 92, 243, 0.1);
        }

        span {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 100% 100% !important;
          opacity: 1;

          &.edit {
            width: 16px;
            height: 16px;
            background: url("~_img/annotation/canvas-edit.png") no-repeat;
          }

          &.enlarge {
            background: url("~_img/annotation/canvas-enlarge.png") no-repeat;
          }

          &.narrow {
            background: url("~_img/annotation/canvas-narrow.png") no-repeat;
          }

          &.drag {
            background: url("~_img/annotation/drag.png") no-repeat;
          }

          &.del {
            background: url("~_img/annotation/canvas-del.png") no-repeat;
          }
        }
      }
    }

    .act {
      /*color: #515CF3;*/
      /*box-shadow: 0 0 2px 0 #A7A9C2, 0 0 10px 0 rgba(81, 92, 243, 0.45) inset;*/
    }
  }

  .canvas-box {
    width: calc(100% - 162px);
    height: 100%;
    position: relative;
    margin-right: 20px;

    .btn-box {
      /*height: 100%;*/
      //.flex-center();
      /*position: absolute;*/
      /*top: 0;*/

      .left-btn,
      .right-btn {
        width: 36px;
        height: 64px;
        background: linear-gradient(180deg, #fdfdff 0%, #f9faff 100%);
        box-shadow: 2px 2px 7px 0px #e3e6f7;
        border-radius: 2px;
        position: absolute;
        top: 48%;
        transform: translate(-50% 0);
        font-size: 20px;
        color: #676f69;
        .flex-center();
        z-index: 2;
        cursor: pointer;

        &.left-btn {
          left: 0;
        }

        &.right-btn {
          right: 0;
        }
      }
    }

    #con {
      min-width: 400px;
      width: calc(100% - 112px);
      height: calc(100% - 47px);
      margin: auto;
      margin-top: 47px;
      outline: none;
    }
  }

  .label-box {
    width: 162px;
    height: 100%;
    border-left: 1px solid #ebecf2;
    padding: 0 16px;

    .title {
      font-size: 20px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #636363;
      line-height: 26px;
      margin: 10px 0;

      &::before {
        content: "";
        display: inline-block;
        width: 14px;
        height: 17px;
        margin-right: 6px;
        background: url("~_img/annotation/right-title-icon.png") no-repeat;
        background-size: 100% 100%;
      }
    }

    .list {
      padding: 10px 26px;

      .label-item {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2c3542;
        line-height: 22px;
      }
    }
  }
}
</style>