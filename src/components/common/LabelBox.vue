<template>
  <div class="label-box">
    <!-- S 标签栏 -->
    <div class="all-label">
      <div class="title">
        <span class="name" v-if="!add && !addGroup">标签栏</span>
        <div class="right-btn-box" v-if="!add && !addGroup">
          <div class="btn add-label" @click="handleAddLabel">添加标签</div>
          <div class="btn">
            <Dropdown placement="bottom-end" @on-click="addLabelGroup">
              <Icon type="ios-arrow-down"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem>添加标签组</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="add-box edit" v-if="add">
          <ColorPicker
            v-model="color"
            v-if="type"
            @on-active-change="handleChangeColor"
            transfer
            :colors="colors"
          />
          <IviewInput v-model="label"></IviewInput>
          <div class="opera-box">
            <span class="checkmark" @click="addLabel"></span>
            <span class="close" @click="cancelAdd"></span>
          </div>
        </div>
        <div class="add-group" v-if="addGroup">
          <Dropdown
            trigger="custom"
            placement="bottom-end"
            @on-click="clickItem"
            :visible="visible"
          >
            <div class="a-g-box" @click="clickItem(visible)">
              <span
                >{{ labelGroupObj.groupName
                }}{{
                  !isNaN(labelGroupObj.labelNum)
                    ? `(${labelGroupObj.labelNum})`
                    : ""
                }}</span
              >
              <span><Icon type="ios-arrow-down" size="18"></Icon></span>
            </div>
            <DropdownMenu slot="list">
              <div class="list">
                <DropdownItem
                  :class="[
                    'group-item',
                    { act: labelGroupObj.groupId == item.groupId },
                  ]"
                  :name="item.groupId"
                  v-for="(item, i) in groupList"
                  :key="i"
                >
                  {{ item.groupName }}({{ item.labelNum }})
                </DropdownItem>
                <!--                <div :class="['group-item', {'act': labelGroupObj.id == item.groupId}]" v-for="(item, i) in groupList" :key="i" @click.native="labelGroupObj = item">-->
                <!--                  {{ item.groupName }}({{ item.labelNum }})-->
                <!--                </div>-->
              </div>
              <div class="btn-box">
                <IviewButton class="cancel" @click="addGroup = false"
                  >取消</IviewButton
                >
                <IviewButton class="submit" @click="handleAddGroup"
                  >确定</IviewButton
                >
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="search">
        <IviewInput
          v-model="labelName"
          @on-change="search"
          placeholder="搜索或创建标签"
        ></IviewInput>
      </div>

      <div class="label-list">
        <div
          :class="[
            'label-item',
            { edit: item.edit, act: actLabelList.includes(item.id) },
          ]"
          v-for="(item, i) in listData"
          :key="i"
          @mouseenter="showItemBtn(item, i, 1)"
          @mouseleave="showItemBtn(item, i, 0)"
          @click="setLabel(item)"
        >
          <div v-if="!item.edit">
            <span
              v-if="type"
              class="color"
              :style="{ background: item.colorNumber }"
            ></span>
            <span class="label-name">{{ item.labelName }}</span>
          </div>
          <div v-if="item.edit">
            <ColorPicker
              v-model="color"
              v-if="type"
              transfer
              :colors="colors"
            />
            <IviewInput v-model="label"></IviewInput>
          </div>
          <div class="opera-box key" v-if="!item.showBtn && !item.edit">
            快捷键
            <div class="key">
              {{ item.keyword }}
            </div>
          </div>
          <div class="opera-box" v-if="item.showBtn && !item.edit">
            <span class="edit" @click="changeEdit(item, i)"></span>
            <span class="to-top" @click="labelToTop(item)"></span>
            <span class="del" @click="delLabel(item)"></span>
          </div>
          <div class="opera-box" v-if="item.edit">
            <span class="checkmark" @click="editLabel(item)"></span>
            <span class="close" @click="changeEdit(item, i, 1)"></span>
          </div>
        </div>
      </div>

      <div class="add-btn-box" v-if="labelName && !listData.length">
        <div @click="handleAddLabel(labelName)">
          <Icon type="md-add" />创建标签“{{ labelName }}”
        </div>
      </div>
    </div>
    <!-- E 标签栏 -->

    <!-- S 全部文件标注结果 -->
    <div class="annot-result">
      <div class="title">
        <span class="name">全部文件标注结果</span>
      </div>
      <div class="label-list">
        <div class="header">
          <span>标签名称</span>
          <span>标签数量</span>
          <span>样本数量</span>
          <span>操作</span>
        </div>
        <div class="body">
          <div
            :class="['row', { act: row.label == item.label }]"
            @click="handleClickRow(item)"
            v-for="(item, i) in tableData"
            :key="i"
          >
            <div class="cell">
              <span
                class="color"
                :style="{ background: item.colorNumber }"
                v-if="item.colorNumber && type"
              ></span>
              <span>{{ item.label }}</span>
            </div>
            <div class="cell">
              <span>{{ item.annotationNum }}</span>
            </div>
            <div class="cell">
              {{ item.itemNum }}
            </div>
            <div class="cell">
              <Tooltip content="清除标记结果">
                <Icon
                  type="ios-remove-circle-outline"
                  @click="delLabelResult(item)"
                  size="18"
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <!--        <IviewTable-->
        <!--          :border="false"-->
        <!--          label-->
        <!--          highlight-row-->
        <!--          @on-current-change="changeCurrentRow"-->
        <!--          :data="tableData"-->
        <!--          :columns="tableCol"-->
        <!--        ></IviewTable>-->
        <!--        <div class="label-item" v-for="(item, i) in labelList" :key="i">-->
        <!--          {{item.id}}-->
        <!--        </div>-->
      </div>
    </div>
    <!-- E 全部文件标注结果 -->

    <IviewModal
      title="提示"
      type="confirm"
      v-model="showCheckModal"
      :confirmText1="checkTitle"
      :confirmText2="checkCon"
      @on-ok="checkOk"
      @on-cancel="showCheckModal = false"
    >
    </IviewModal>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex"; // mapState

const colors = [
  "#515CF3",
  "#323DD9",
  "#1924BF",
  "#66A3FE",
  "#4585E6",
  "#296ACC",
  "#48CFBE",
  "#2DB5A4",
  "#179C8B",
  "#CF4848",
  "#B52D2D",
  "#9C1717",
];
/*
  this.$bus.$emit('setLabel'); // 为图片设置标签 - 绘制区域绑定标签
  this.$bus.$emit('updateAnnotCount') // 更新标注数量
  this.$bus.$emit('updateClassList') // 图片设置标签更新
  this.$bus.$emit('keyDown');
  this.$bus.$emit('changeRectLabel') // 标签修改后同步修改已选中区域颜色
  this.$bus.$emit('updateImgList')
  this.$bus.$emit('labelBox_editLabel') // 编辑标签 - 通知图像分类修改
  */
export default {
  name: "LabelBox",
  props: {
    dataSetId: {
      type: [String, Number],
      default: "",
    },
    dataSetHistoryId: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: Number,
      default: 1, // 1 目标检测，0 目标分类
    },
    isBatchOperation: {
      type: Boolean,
      default: false,
    },
  },
  //   dataSetHistoryId: {
  //     type: [String, Number],
  //     default: "",
  //   },
  //   type: {
  //     type: Number,
  //     default: 1, // 1 目标检测，0 目标分类
  //   },
  // },
  data() {
    return {
      colors,
      add: false, // 添加标签
      addGroup: false, // 添加标签组
      labelName: "", // 搜索框
      // 所有标签列表
      listData: [],
      color: "",
      label: "",
      // 标注结果数据
      tableData: [],
      tableCol: [
        {
          key: "label",
          title: "标签名称",
          render: (h, p) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "align-items": "center",
                },
              },
              [
                p.row.colorNumber && this.type
                  ? h("span", {
                      style: {
                        width: "8px",
                        height: "16px",
                        background: p.row.colorNumber,
                        "border-radius": "1px",
                        "margin-right": "15px",
                      },
                    })
                  : "",
                h("span", {}, p.row.label ? p.row.label : "-"),
              ]
            );
          },
        },
        {
          key: "annotationNum",
          align: "center",
          title: "标注数量",
        },
        {
          key: "itemNum",
          align: "center",
          title: "样本数量",
        },
        {
          title: "操作",
          align: "center",
          render: (h, p) => {
            let len = p.row.annotationNum || p.row.itemNum;
            return h(
              "icon",
              {
                props: {
                  type: "ios-remove-circle-outline",
                  size: 18,
                },
                on: {
                  click: () => {
                    this.delLabelResult(p.row);
                  },
                },
                style: {
                  color: len ? "#515CF3" : "#bbb",
                  fontWeight: "bold",
                  cursor: "pointer",
                },
              },
              ""
            );
          },
        },
      ],
      row: {}, // 当前选中标注结果
      // 确认弹窗
      showCheckModal: false,
      checkTitle: "确认",
      checkCon: "",
      // 当前标签
      labelItem: {},
      annotLabelItem: {},
      // 标签组数据
      groupList: [],
      labelGroupObj: {},
      // 分类 - 选中标签列表
      actLabelList: [],
    };
  },
  watch: {
    dataSetId: {
      handler() {
        this.getAllList();
      },
      deep: true,
    },
  },
  computed: {
    // ...mapGetters("autoLearn", ["labelBox_currentList"]),
  },
  methods: {
    // ...mapActions("autoLearn", ["Action_updateClassList"]),
    busOn() {
      this.$bus.$on("updateAnnotList", () => {
        this.getAnnotList("updateAnnotList");
      });

      this.$bus.$on("addClassLabel", (item) => {
        this.setLabel(item);
      });

      this.$bus.$on("updateLabelList", (list) => {
        this.actLabelList = list.map((item) => {
          let data = this.listData.filter(
            (child) => child.labelName == item.labelName
          );
          // console.log(data, item, this.listData, "data");
          return data[0] ? data[0].id : "";
        });
        // console.log(this.actLabelList, list, "list");
      });
    },
    // 给图片加上标签
    setLabel(item) {
      if (this.isBatchOperation && this.type) {
        this.$Message.warning("目标检测不支持批量标注");
        return;
      }

      this.$bus.$emit("setLabel", item);
      if (this.type || item.edit) return;
      // if (this.actLabelList.includes(item.id)) {
      //   let i = this.actLabelList.indexOf(item.id);
      //   this.actLabelList.splice(i, 1);
      // } else {
      //   this.actLabelList.push(item.id);
      // }
      let list = [];
      if (this.actLabelList[0] == item.id) {
        this.actLabelList = [];
      } else {
        this.actLabelList[0] = item.id;
        list = this.listData.filter((item) =>
          this.actLabelList.includes(item.id)
        );
      }
      // this.Action_updateClassList(list);
      this.$bus.$emit("updateClassList", list);
    },
    keyDown(e) {
      if (e.path[0].tagName == "INPUT" || e.path[0].tagName == "TEXTAREA")
        return;
      this.$bus.$emit("keyDown", e);
    },
    handleChangeColor(e) {
      this.color = e;
    },
    handleAddLabel(name) {
      if (name) {
        this.label = this.labelName;
      }
      if (this.hasEdit()) {
        this.add = true;
        let i = parseInt(Math.random() * 12, 10);
        this.color = this.colors[i];
      }
    },
    // 添加标签
    addLabel() {
      if (this.color && this.label) {
        this.$api.dataset
          .addLabel({
            dataSetId: Number(this.dataSetId),
            dataSetHistoryId: this.dataSetHistoryId,
            colorNumber: this.color,
            labelName: this.label,
          })
          .then(() => {
            this.cancelAdd();
            this.updateList();
          });
      }
    },
    cancelAdd() {
      this.add = false;
      this.color = "";
      this.label = "";
    },
    showItemBtn(item, i, show) {
      item.showBtn = show;
      this.$forceUpdate();
    },
    addLabelGroup() {
      this.add = false;
      this.addGroup = true;
      this.visible = true;
    },
    clickItem(e) {
      if (typeof e == "boolean") {
        this.visible = !this.visible;
        this.$forceUpdate();
      } else {
        this.labelGroupObj = this.groupList.filter(
          (item) => item.groupId == e
        )[0];
      }
    },
    // 添加标签组
    handleAddGroup() {
      if (!this.labelGroupObj.groupId) {
        this.$Message.warning("请选择需要导入的标签组！");
        return;
      }
      if (!this.labelGroupObj.labelNum) {
        this.$Message.warning("请选择标签数量大于0的标签组进行导入！");
        return;
      }
      this.$api.dataset
        .copyLabelGroup({
          dataSetId: this.dataSetId,
          dataSetHistoryId: this.dataSetHistoryId,
          groupId: this.labelGroupObj.groupId,
        })
        .then((res) => {
          let data = res.data.data;
          if (data.length) {
            let str = data.join("、");
            this.$Message.warning(`${str}标签已存在，仅导入不重复标签！`);
          }
          this.updateList();
          this.addGroup = false;
          this.labelGroupObj = {};
        });
    },
    hasEdit() {
      let edit = this.listData.filter((item) => item.edit)[0];
      if (edit) {
        this.$Message.warning("请先保存当前修改标签再进行下一步操作！");
        return false;
      } else {
        return true;
      }
    },
    changeEdit(item, i, close) {
      event.stopPropagation();
      this.add = false;
      if (close) {
        item.edit = false;
        // item.templabelName = item.labelName
        // this.$set(item, "templabelName", item.labelName);
        this.$forceUpdate();
        this.cancelAdd();
        return;
      }
      if (this.hasEdit()) {
        item.edit = true;
        this.color = item.colorNumber;
        this.label = item.labelName;
        this.$forceUpdate();
      }
    },
    editLabel(item) {
      event.stopPropagation();
      if (this.color && this.label) {
        this.$api.dataset
          .editLabel(
            {
              dataSetId: Number(this.dataSetId),
              dataSetHistoryId: this.dataSetHistoryId,
              id: item.id,
              colorNumber: this.color,
              labelName: this.label,
            },
            [item.id]
          )
          .then(() => {
            if (this.type) {
              this.$bus.$emit("changeRectLabel", {
                id: item.id,
                color: this.color,
                label: this.label,
                templabelName: item.templabelName,
              });
            } else {
              this.$bus.$emit("labelBox_editLabel", {
                id: item.id,
                color: this.color,
                label: this.label,
              });
            }

            console.log(this.row, this.row.label);
            this.$bus.$emit("updateImgList", {
              labelName: this.row && this.row.label ? this.row.label : "",
            });
            this.cancelAdd();
            this.updateList();
          });
      }
    },
    // 顺序置顶
    labelToTop(item) {
      event.stopPropagation();
      this.$api.dataset
        .labelToTop(null, [item.id], { tipShow: false })
        .then(() => {
          this.$Message.success("标签置顶成功");
          this.updateList();
        });
    },
    // 删除标签
    delLabel(item) {
      event.stopPropagation();
      item.allow = 0;
      this.labelItem = item;
      // console.log(item, this.tableData, "--item");
      this.checkCon = `确认删除标签 ${item.labelName}？`;
      // if (this.tableData.length) {
      //   this.tableData.map(item => {
      //     if (item.label == this.labelItem.labelName) {
      //       this.checkCon = '该标签已有标注，继续删除将删除含该标签的所有标注结果，是否继续?'
      //     }
      //   })
      // }
      this.showCheckModal = true;
    },
    checkOk() {
      if (this.checkCon.includes("清除标注结果")) {
        this.$api.dataset
          .delAnnotLabel(
            {
              label: this.annotLabelItem.label,
            },
            [this.dataSetId, this.dataSetHistoryId]
          )
          .then(() => {
            this.showCheckModal = false;
            this.updateList();
            this.$bus.$emit("updateImgList");
          });
      } else if (this.labelItem.id) {
        let id = this.labelItem.id;
        this.$api.dataset
          .delLabel(
            {
              allow: this.labelItem.allow,
            },
            [id],
            {
              showLoading: true,
              tipShow: false,
            }
          )
          .then((res) => {
            if (res.data.data) {
              this.checkCon = res.data.data;
              this.labelItem.allow = 1;
            } else {
              this.$Message.success("删除成功！");
              if (this.actLabelList.length) {
                this.actLabelList[0] == this.labelItem.id
                  ? this.$bus.$emit("updateClassList", [])
                  : "";
              }
              this.showCheckModal = false;
              this.labelItem = null;
              this.updateList();
              this.$bus.$emit("updateImgList");
            }
          });
      }
    },
    handleClickRow(row) {
      if (this.row && this.row.label == row.label) {
        this.row = {};
      } else {
        this.row = row;
      }
      this.$bus.$emit("updateImgList", {
        labelName: this.row.label ? this.row.label : "",
      });
    },
    delLabelResult(row) {
      event.stopPropagation();
      this.showCheckModal = true;
      this.checkTitle = `是否清除标签“${row.label}"的标注结果？`;
      this.checkCon = `清除标注结果后，图片标注为“${row.label}”的标注结果将清除，图片仍保留`;
      this.annotLabelItem = row;
    },
    updateList() {
      this.$bus.$emit("updateList");
      this.getAllList();
      this.getAnnotList();
    },
    search() {
      this.getAllList({
        labelName: this.labelName,
      });
    },
    getAllList(params) {
      if (!this.dataSetId || !this.dataSetHistoryId) return;
      this.$api.dataset
        .getAllLabelList({
          dataSetId: this.dataSetId,
          dataSetHistoryId: this.dataSetHistoryId,
          labelName: this.labelName,
          ...params,
        })
        .then((res) => {
          this.listData = res.data.data.map((item) => {
            item.showBtn = false;
            item.edit = false;
            item.templabelName = item.labelName;
            return item;
          });
        });
    },
    getAnnotList(type = "") {
      if (!this.dataSetId || !this.dataSetHistoryId) return;
      this.$api.dataset
        .getAnnotLabelList(null, [this.dataSetId, this.dataSetHistoryId])
        .then((res) => {
          this.tableData = res.data.data.labelStat.filter(
            (item) => item.annotationNum || item.itemNum
          );

          // type为空则为内部操作影响; 不为空则为外部组件影响list
          if (!type) {
            this.$bus.$emit("updateAnnotCount", res.data.data.itemStat);
          }
        });
    },
    getGroupList() {
      this.$api.label.labelGroupNum().then((res) => {
        this.groupList = res.data.data;
      });
    },
  },
  mounted() {
    this.busOn();
    this.getAllList();
    this.getAnnotList();
    this.getGroupList();

    document.onkeypress = this.keyDown;
  },
  destroyed() {
    this.$bus.$off("updateAnnotList");
    this.$bus.$off("addClassLabel");
    this.$bus.$off("updateLabelList");
  },
};
</script>

<style lang="less" scoped>
.label-box {
  max-width: 437px;
  height: 100%;
  // max-height: 82vh;
  background: #fafafc;
  border-radius: 0 8px 8px 0;
  border-left: 1px solid #ebecf2;
  .flex-column();
  padding: 10px 15px;
  padding-right: 30px;
  // height: 200px;
  overflow: hidden;

  & > div {
    width: 100%;

    .title {
      .flex-center();
      justify-content: space-between;

      .name {
        font-size: 20px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #636363;
        line-height: 26px;
        margin: 10px 0;
        .flex-center();

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

      .add-box,
      .add-group {
        width: 100%;
        height: 50px;
        .flex-center();
        position: relative;

        .ivu-dropdown,
        .ivu-select-dropdown {
          width: 100%;
          position: absolute;
          right: 0;
        }
      }
    }

    &.all-label {
      height: 60%;
      position: relative;

      .right-btn-box {
        .flex-center();
        justify-content: flex-end;

        .btn {
          min-width: 24px;
          min-height: 24px;
          border: 1px solid #515cf3;
          font-size: 12px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #515cf3;
          background: #ffffff;
          border-radius: 2px;
          .flex-center();
          margin-left: 4px;
          cursor: pointer;
        }

        .add-label {
          width: 80px;
          height: 24px;
          cursor: pointer;
        }
      }

      .add-box {
        height: 52px;
        background: #ffffff;
        box-shadow: 0 4px 8px 0 rgba(54, 61, 163, 0.49);
        border-radius: 2px;
        border: 1px solid #515cf3;
      }

      .add-group {
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px 0 rgba(218, 218, 218, 0.5);

        /deep/.ivu-dropdown-rel {
          width: 100%;
          height: 30px;
          color: #515cf3;
          padding-right: 10px;
          .flex-center();
          cursor: pointer;
        }

        /deep/.ivu-select-dropdown {
          box-shadow: 0 5px 15px 0 rgba(218, 218, 218, 0.5);
          color: rgba(0, 0, 0, 0.65);

          .list {
            .group-item {
              height: 29px;
              padding: 0 16px;
              display: flex;
              align-items: center;

              &.act {
                color: #515cf3;
              }

              &:hover {
                background: #f6f7ff;
              }
            }
          }

          .btn-box {
            padding: 0 20px;
            .flex-center();
            justify-content: flex-end;
            margin-bottom: 5px;

            .cancel .ivu-btn {
              background: transparent;
              color: #515cf3;
            }

            .i-button {
              margin-left: 10px;
            }

            .ivu-btn {
              min-width: 48px;
              /*height: 25px;*/
              border-radius: 3px;
              border: 1px solid #515cf3;
              font-weight: 400;
              .flex-center();
            }
          }
        }

        .a-g-box {
          width: 100%;
          padding: 0 10px;
          .flex-center();
          justify-content: space-between;
        }
      }

      .edit {
        transition: all 0.3s;
        /deep/.ivu-color-picker .ivu-input,
        /deep/.i-input input {
          border: 0;
          background: transparent;
          box-shadow: none;
        }

        .ivu-color-picker {
          /*height: 100%;*/
          position: relative;
          .flex-center();
          &:after {
            content: "";
            display: inline-block;
            width: 1px;
            height: calc(100% + 20px);
            background: #515cf3;
            position: absolute;
            right: 0;
          }
        }
      }

      .search {
        margin: 10px 0 7px;

        /deep/.i-input {
          width: 100%;

          .ivu-input-wrapper {
            width: 100%;
            border-radius: 2px;
          }
        }
      }

      .add-btn-box {
        position: absolute;
        bottom: 10px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #515cf3;
        line-height: 22px;
        margin-left: 50px;

        div {
          .flex-center();
        }
      }

      .label-list {
        height: calc(100% - 100px);
        .show-scroll();
        padding-right: 5px;
        margin-right: -15px;
      }

      .label-item {
        height: 52px;
        background: #fafafc;
        border-radius: 2px;
        border: 1px solid #ebecf2;
        margin: 5px 0;
        padding: 0 10px;
        .flex-center();
        justify-content: flex-start;
        cursor: pointer;
        justify-content: space-between;

        &.act,
        &.edit,
        &:hover {
          background: #ffffff;
          box-shadow: 0 4px 8px 0 rgba(54, 61, 163, 0.49);
          border: 1px solid #515cf3;
        }

        &.act {
          background: linear-gradient(180deg, #f4f4f7 0%, #ffffff 100%);
        }

        & > div {
          .flex-center();
        }

        .color {
          width: 8px;
          height: 32px;
          border-radius: 1px;
          margin-right: 12px;
        }
      }

      .opera-box {
        .flex-center();
        justify-content: flex-end;
        padding-left: 20px;
        position: relative;

        span:first-child {
          margin: 0;
          &:before {
            content: "";
            display: inline-block;
            width: 1px;
            height: 13px;
            background: #d7d7d7;
            margin-right: 20px;
            position: absolute;
            left: 0;
          }
        }

        &.key {
          font-size: 14px;
          color: #d7d7d7;
          line-height: 22px;
        }

        .key {
          width: 18px;
          height: 18px;
          border-radius: 2px;
          border: 1px solid #d7d7d7;
          .flex-center();
          margin: 0 4px;
        }

        span {
          width: 16px;
          height: 16px;
          background-size: 100% 100% !important;
          margin-left: 20px;

          &:last-child {
            margin-left: 16px;
          }

          // &.edit {
          //   background: url("~_img/annotation/edit.png") no-repeat;
          // }


        }
      }
    }

    &.annot-result {
      height: 40%;
      border-top: 1px solid #ebecf2;

      /deep/.i-table {
        .ivu-table-body {
          max-height: 230px !important;
        }
      }

      .label-list {
        height: 230px;

        .header {
          height: 40px;
          .flex-center();
          border-bottom: 1px solid #c9cfff;
          position: relative;

          &:after {
            content: "";
            width: 100%;
            height: 1px;
            background: #a1beff;
            position: absolute;
            bottom: 0;
          }

          span {
            flex: 1;
            .flex-center();
            font-size: 14px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #2c46b5;
            line-height: 22px;
          }
        }

        .body {
          height: 160px;
          .show-scroll();

          .row {
            width: 100%;
            height: 36px;
            background: #f5f7ff;
            border-radius: 2px;
            border: 1px solid #d8e1f7;
            margin-top: 10px;
            .flex-center();

            &.act {
              background: linear-gradient(180deg, #f4f4f7 0%, #ffffff 100%);
              box-shadow: 0px 4px 8px 0px rgba(54, 61, 163, 0.49);
              border-radius: 2px;
              border: 1px solid #515cf3;
            }

            &:hover {
              background: #f5f7ff;
              border-radius: 2px;
              border: 1px solid #515cf3;
            }

            .cell {
              flex: 1;
              max-width: 25%;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #2c3542;
              line-height: 22px;
              .flex-center();
              .ellipsis();

              &:first-child {
                padding-left: 20px;
                justify-content: flex-start;
              }

              &:last-child {
                /deep/.ivu-icon {
                  color: #515cf3;
                  font-weight: bold;
                  cursor: pointer;
                }
              }

              span {
                .ellipsis();
              }

              span.color {
                min-width: 8px;
                height: 16px;
                border-radius: 1px;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>