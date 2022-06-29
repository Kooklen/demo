<template>
  <div>
    <div class="common-bg op_table">
      <!--      <div class="op_table_action">-->
      <div class="flex-row">
        <div class="user">
          <div class="word">
            <div class="flex-col">
              <div class="account">
                <img src="~_img/common/left_dot.webp" class="left_dot">
                用户账号</div>
              <div class="number">13211233221</div>
            </div>
            <div class="flex-col">
              <div class="accountName">
                <img src="~_img/common/left_dot.webp" class="left_dot">
                用户名称</div>
              <div class="name">张*兰</div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="flex-row">
            <div class="flex-col left">
              <span class="section_calculate">
                 <img src="~_img/common/right_dot.webp" class="right_dot">
                计算区</span>
              <span class="section_general">通用专区</span>
            </div>
            <div class="right">
              <div class="right_section flex-row">
                <div class="dot"></div>
                <span>作业运行数</span>
                <span class="right_section_number">32</span>
              </div>
              <div class="right_section flex-row">
                <div class="flex-row">
                  <div class="dot"></div>
                  <div>作业提交数</div>
                </div>
                <span class="right_section_number">32</span>
              </div>
              <div class="right_section flex-row">
                <div class="flex-row">
                  <div class="dot"></div>
                  <span>作业节点数</span>
                  <span class="right_section_number">64</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!--        </div>-->
        <div>

        </div>
      </div>

      <div class="table">
        <IviewTable
            :data="tableData"
            :columns="tableCol"
        ></IviewTable>
<!--        <iview-page class="iview-page"></iview-page>-->

      </div>
    </div>
  </div>
</template>

<script>
import {textBtns} from "_u/table";

export default {
  name: "billingDetail",
  data() {
    return {
      tableData: [
        {
          homework: 'Anaconda-1643278874801',
          application: "pytorch 21.11-py3",
          start_time: '2021-06-04 12:11:22',
          end_time:'2021-06-04 12:11:22',
          price: '26.90'
        },
        {
          homework: 'Anaconda-1643278874801',
          application: "pytorch 21.11-py3",
          start_time: '2021-06-04 12:11:22',
          end_time:'2021-06-04 12:11:22',
          price: '26.90'
        },
        {
          homework: 'Anaconda-1643278874801',
          application: "pytorch 21.11-py3",
          start_time: '2021-06-04 12:11:22',
          end_time:'2021-06-04 12:11:22',
          price: '26.90'
        },
        {
          homework: 'Anaconda-1643278874801',
          application: "pytorch 21.11-py3",
          start_time: '2021-06-04 12:11:22',
          end_time:'2021-06-04 12:11:22',
          price: '26.90'
        },{
          homework: 'Anaconda-1643278874801',
          application: "pytorch 21.11-py3",
          start_time: '2021-06-04 12:11:22',
          end_time:'2021-06-04 12:11:22',
          price: '26.90'
        }

      ],
      tableCol: [
        {
          title: '作业名称',
          key: 'homework'
        },
        {
          title: '应用名称',
          key: 'application'
        },
        {
          title: '开始时间',
          key: 'start_time'
        },
        {
          title: '结束时间',
          key: 'end_time'
        },
        {
          title: '小计（元）',
          key: 'price'
        }
      ],
      pager: {
        current: 1,
        total: 0,
        pageSize: 10,
      }, // 表格页码
      // 弹窗对象
      detail: {
        visible: false,
      },
    }
  }
}
</script>

<style lang="less" scoped>
.table {
  margin-top: 40px;
  width: 1559px;
  //height: 568px;
}

.op_table {
  width: 100%;
  flex: 1;
  padding: 20px;
  .flex-column();

  .op_table_action {
    margin-bottom: 10px;
  }

  .op_table_box {
    width: 100%;
    flex: 1;
  }
}

.user {
  width: 409px;
  height: 170px;
  //background: linear-gradient(180deg, rgba(237, 244, 252, 0.7) 0%, #FFFFFF 19%, #FFFFFF 50%, #FFFFFF 80%, rgba(237, 244, 252, 0.69) 100%);
  //box-shadow: 0px 2px 4px 0px rgba(183, 204, 235, 0.33);
  border-radius: 4px;
  background: url("~_img/common/user_bg.webp") no-repeat;
  background-size: contain;

  .word {
    margin: 24px 0 0 178px;

    .account {
      //width: 64px;
      height: 19px;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 19px;
      letter-spacing: 2px;
      text-shadow: 0px 1px 0px #1A45B8;
      position: relative;
      .left_dot{
        position: absolute;
        left: -8px;
        top: -5px;
      }
    }

    .number {
      //width: 158px;
      height: 30px;
      font-size: 26px;
      font-weight: normal;
      color: #FFFFFF;
      line-height: 31px;
      text-shadow: 0px 2px 0px #0D2C91;
      margin-top: 5px;
    }

    .accountName {
      //width: 64px;
      height: 19px;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 19px;
      letter-spacing: 2px;
      text-shadow: 0px 1px 0px #1A45B8;
      margin-top: 23px;
      position: relative;
      .left_dot{
        position: absolute;
        left: -8px;
        top: -5px;
      }
    }

    .name {
      //width: 60px;
      height: 31px;
      font-size: 24px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 31px;
      text-shadow: 0px 2px 0px #0D2C91;
      margin-top: 3px;
    }
  }
}

.section {
  width: 1100px;
  height: 170px;
  background: #FFFFFF;
  //box-shadow: 0px 6px 16px 0px rgba(141, 148, 165, 0.2), 0px 2px 8px 0px rgba(161, 175, 190, 0.6), inset 0px -3px 4px 0px rgba(150, 159, 188, 0.5);
  border-radius: 4px;
  border: 2px solid #FFFFFF;
  background: url("~_img/common/cloudBgc.webp") no-repeat;
  background-size: contain;
  margin-left: 49px;
  .section_calculate {
    //width: 42px;
    height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    text-shadow: 0px 1px 0px #FFFFFF;
    position: relative;
    .right_dot{
      position: absolute;
      left: -8px;
      top: -5px;
    }
  }

  .section_general {
    //width: 96px;
    height: 31px;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    line-height: 31px;
  }


  .left {
    margin: 24px 308px 0 296px;
  }

  .right {
    margin-top: 36px;

    .right_section {
      margin-top: 10px;
      //width: 200px;
      height: 32.5px;
      border-bottom: 1px solid rgb(198, 215, 239);

      .right_section_number {
        margin-left: 90px;
        color: #333333;
        font-weight: bold;
        font-size: 16px;
        line-height: 21px;
      }

      .dot {
        width: 10px;
        height: 10px;
        margin: 4px;
        border-radius: 50%;
        background: linear-gradient(180deg, #EDF4FC 0%, #B7CCEB 100%);
      }
    }
  }
}
</style>