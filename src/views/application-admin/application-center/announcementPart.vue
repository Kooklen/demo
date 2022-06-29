<template>
  <div class="announcement">
    <div class="announcement-bar">
      <div class="flex-row">
        <img src="~_img/common/horn.webp" class="announcement-horn" />
        <span class="announcement-word">公告</span>
      </div>

      <div class="announcement-more">
        <span>查看更多 >></span>
      </div>
    </div>
    <div class="wrap">
       <div class="announcement-message">
      <div v-for="(item, i) in unreadList" :key="item.date" class="announcement-message-unread">
        <div class="flex-row message-list" :class="[i > 4 && 'read-message']">
          <div class="unread-dot"></div>
          <div class="inform">{{ item.message }}</div>
        </div>
        <div class="date">
          {{ item.date }}
        </div>
      </div>
    </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "announcementPart",
  data() {
    return {
      unreadList: new Array(10).fill({
        message: "关于系统更新的通知",
        date: "2021-12-11"
      })
    }
  }
}
</script>

<style lang="less" scoped>
.announcement {
  width: 439px;
  height: 392px;
  background: #ffffff;
  box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
  border-radius: 4px;
  margin-left: 23px;
  padding: 30px 0;
}

.announcement-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 19px;
  padding: 0 30px;
}

.announcement-word {
  width: 40px;
  height: 26px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  line-height: 26px;
}

.announcement-horn {
  width: 26px;
  height: 26px;
}

.announcement-more {
  text-align: center;
  height: 26px;
  font-size: 12px;
  color: #0f7fff;
  line-height: 26px;
}

.wrap{
  overflow: auto;
  padding: 0 30px;
  .announcement-message{
    height: 310px;
  }
}

.announcement-message-unread {
  display: flex;
  justify-content: space-between;
}

.unread-dot {
  margin: 4px;
  width: 10px;
  height: 10px;
  line-height: 10px;
  background: linear-gradient(180deg, #f9d572 0%, #f2b50d 100%);
  border-radius: 50%;
  box-shadow: -2px 0px 4px 0px #f9d572;
}

.message-list {
  margin-bottom: 20px;
}

.inform {
  height: 19px;
  font-size: 14px;
  color: #333333;
  line-height: 19px;
}

.read-message {
  .unread-dot {
    margin: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(180deg, #d8d8d8 0%, #949494 100%);
    box-shadow: none;
  }
  .inform {
    height: 19px;
    font-size: 14px;
    color: #949494;
    line-height: 19px;
  }
}

.date {
  /*width: 71px;*/
  height: 16px;
  font-size: 14px;
  font-family: ArialMT;
  color: #949494;
  line-height: 16px;
}
</style>
