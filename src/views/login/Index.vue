<template>
  <div class="login" v-if="showornow">
    <div class="left">
      <img src="~_img/common/superCloudPlatformName.png" alt="">
      <div class="authorization">统一认证 · 一次登录，全平台畅行</div>
      <div class="based">超算云平台是依托国家超级计算广州中心世界领先的算力、智力、人才资源，为地方产业量身订造的，具有高性能计算资源和一站式应用服务能力的专属平台。</div>
    </div>
    <div class="login-box">
      <div class="con-form">
        <div class="platform flex-row">
<!--          <div class="line"></div>-->
<!--          <div>统一认证平台</div>-->
          <div class='authPlat'>您好，欢迎登录！</div>
        </div>
        <div class="tabList">
          <div class='aP'>统一认证平台</div>

<!--          <div-->
<!--              v-for="(item, index) in tabList"-->
<!--              :key="index"-->
<!--              :class="[tabIndex === index ? 'active' : '']"-->
<!--              @click="handleTabClick(item.value)"-->
<!--          >-->
<!--            {{ item.name }}-->
<!--          </div>-->
        </div>
        <div class="form">
          <Form ref="form_container" :model="queryParams" :rules="ruleValidate">
            <FormItem prop="username">
              <IviewInput
                  v-model="queryParams.username"
                  :placeholder="'请输入账号'"
              >
                <div class="prefix" slot="prefix">
                  <img :src="require('_img/login/icon-user.png')" alt=""/>
                </div>
              </IviewInput>
            </FormItem>
            <FormItem prop="password" v-if="tabIndex === 0">
              <IviewInput
                  v-model="queryParams.password"
                  type="password"
                  :placeholder="'请输入密码'"
              >
                <div class="prefix" slot="prefix" @click="sendMsg">
                  <img :src="require('_img/login/icon-password.png')" alt=""/>
                </div>
              </IviewInput>
            </FormItem>

            <FormItem prop="verification" v-else>
              <IviewInput
                  v-model="queryParams.verification"
                  :placeholder="'请输入验证码'"
              >
                <div class="prefix" slot="prefix" @click="sendMsg">
                  <img :src="require('_img/login/icon-password.png')" alt=""/>
                </div>
                <div slot="suffix">发送验证码</div>
              </IviewInput>
            </FormItem>
          </Form>
          <IviewButton @click="login">登录</IviewButton>

<!--          <div class="registration" @click="register">注册账号>></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "login",
  data() {
    return {
      showornow: true,
      queryParams: {
        // operation!@#$%^admin
        username: "",
        password: "",
        verification: "",
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
      tabList: [
        {
          name: "密码登录",
          value: 0,
        },
        // {
        //   name: "短信登录",
        //   value: 1,
        // },
      ],
      tabIndex: 0,
    };
  },
  created() {
    // this.login()
    let logout = sessionStorage.getItem("islogout")
    if (logout == undefined) {
      let windowtoken = window.name
      // 登录成功之后，在sessionStorage上保存用户登录信息
      sessionStorage.setItem("dG9rZW4=", windowtoken)
      sessionStorage.setItem('expiresIn', "1800");
      this.showornow = false
      router.push('/application/application-information')
      setTimeout(() => window.location.reload(), 300)
    }

    if (sessionStorage.getItem("dG9rZW4=") != null) {
      this.showornow = false
      router.push('/application/application-information')
      setTimeout(() => window.location.reload(), 300)
    }
  },

  methods: {
    login() {
      this.$refs["form_container"].validate(async (valid) => {
        if (valid) {
          // this.$Spin.hide();
          if (this.tabIndex === 0) {
            let {username, password} = this.queryParams;
            this.$auth.login(username, password);
          }
        }
      });

      // this.$api.organ
      //     .getOrganTree2({
      //
      //     })
      //     .then((res) => {
      //   console.log(111111);
      //   console.log(res);
      // });
    }

    ,
    handleTabClick(index) {
      this.tabIndex = index;
    }
    ,
    sendMsg() {
      console.log("sendMsg");
    }
    ,
    register() {
      this.$router.push("/register");
    }
    ,
  }
  ,
}
;
</script>

<style lang="less" scoped>
.left {
  position: absolute;
  top: 229px;
  //margin: 261px;
  margin-left: 261px;
  //background-color: pink;
  .authorization {
    height: 31px;
    font-size: 32px;
    font-weight: bold;
    color: #30333B;
    line-height: 27px;
    margin-top: 74px;
    text-shadow: 3px 3px 0px #FFFFFF;
  }

  .based {
    width: 526px;
    height: 84px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #3C4252;
    line-height: 32px;
    text-shadow: 2px 2px 0px #FFFFFF;
    margin-top: 23px;
  }
}

.login {
  width: 100%;
  height: 100%;
  background: url("~_img/login/login-bg.png") no-repeat center center;
  background-size: 100% 100%;
  .flex-center();
  justify-content: flex-start;

  .login-box {
    margin-left: 1123px;
    //.flex-column();
    // align-items: center;


    .con-form {
      margin: 0px 0px;

      width: 540px;
      height: 596px;
      background: rgba(255, 255, 255);
      box-shadow: 0px 2px 20px 0px rgba(201, 208, 228, 0.58),
      0px 4px 4px 0px rgba(62, 101, 178, 0.19);
      border-radius: 24px;
      border: 2px solid #fff;

      .tabList {
        display: flex;
        height: 79px;
        width: 100%;


        .aP{
          width: 419px;
          height: 59px;
          font-size: 44px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: #22252E;
          line-height: 59px;
          letter-spacing: 5px;
          margin-left: 63px;
        }
        //> div {
        //  flex: 1;
        //  font-size: 24px;
        //  font-family: MicrosoftYaHei;
        //  color: #333333;
        //  line-height: 79px;
        //  text-align: center;
        //  border-top: 1px solid #e9e9e9;
        //  border-bottom: 1px solid #e9e9e9;
        //  cursor: pointer;
        //  margin-top: 5px;
        //
        //  &.active {
        //    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        //    font-weight: bold;
        //    color: #5572bf;
        //  }
        //}

        //> div:first-child {
        //  position: relative;
        //
        //  //&::after {
        //  //  content: "";
        //  //  position: absolute;
        //  //  width: 0;
        //  //  height: 23px;
        //  //  border: 0.5px dashed rgba(51, 51, 51, 0.4);
        //  //  right: 0;
        //  //  top: 50%;
        //  //  transform: translate(0, -50%);
        //  //}
        //}
      }

      .form {
        padding: 40px 60px;
        .flex-column(center, flex-start);

        .ivu-form {
          width: 100%;
          .flex-column(center, flex-start);

          .ivu-form-item {
            width: 374px;
            .flex-center();
          }
        }

        /deep/ .ivu-form-item-content {
          width: 374px;
        }

        /deep/ .i-input {
          margin: 15px 0;

          .ivu-input-wrapper {
            width: 374px;

            .ivu-input {
              width: 374px;
              height: 56px;
              border-radius: 2px;
              opacity: 0.55;
              border: 1px solid #b3cce6;
              padding-left: 56px;
              // &:hover {
              //   box-shadow: 0 0 3px 1px rgba(145, 153, 255, 0.7);
              // }
            }
          }
        }

        /deep/ .ivu-input-prefix {
          width: 56px;
          .flex-center();

          img {
            margin-top: 4px;
          }
        }

        /deep/ .ivu-input-suffix {
          right: 10px;
          .flex-center();
          width: 84px;
          font-size: 16px;
          font-weight: 500;
          color: #1a45b8;
          line-height: 100%;
          cursor: pointer;
        }

        /deep/ .i-button {
          margin-top: 40px;

          .ivu-btn {
            width: 374px;
            height: 56px;
            font-size: 18px;
            background: #456bd1;
            // box-shadow: 1px 1px 2px 0px #9cb6fa, inset 2px 2px 6px 0px #6d8ce0,
            //   inset -1px -1px 6px 0px #355cc4;
            border: 1px solid #f2f6ff;
          }
        }

        /deep/ .ivu-form-item-content {
        }

        .registration {
          margin-top: 40px;
          height: 22px;
          font-size: 16px;
          font-weight: 500;
          color: #1a45b8;
          line-height: 22px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}

.platform {
  padding: 25px;
  height: 70px;
  font-size: 24px;
  font-weight: bolder;

  div:last-child {
    margin-bottom: 1px;
  }
}

.line {
  width: 5px;
  height: 30px;
  background: linear-gradient(270deg, #97BBEF 0%, #5572BF 100%);
  box-shadow: 1px 1px 1px 0px rgba(77, 138, 234, 0.28);
  border-radius: 2px;
  margin-right: 14px;
}

.authPlat{
  width: 192px;
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #22252E;
  line-height: 33px;
  margin-left: 36px;
}


</style>