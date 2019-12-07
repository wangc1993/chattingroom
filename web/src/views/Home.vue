<template>
  <div :class="(shakingVisible ? 'main shaking' : 'main')">
    <div class="header">
      <div class="left">
        <img src="../assets/room.jpg" />
        欢迎来到解压聊天室
      </div>
      <div class="right">
        <span @click="logOut">登出</span>
      </div>
    </div>
    <div class="container">
      <div class="conversation">
        <!-- 内容列表 -->
        <ul class="messages" ref="messages">
          <li v-for="(message, index) in messageList" :key="index">
            <ChatMessage :message="message"></ChatMessage>
          </li>
        </ul>
        <!-- 操作栏 -->
        <div class="extra">
          <div class="emoji" @mouseover="emojiVisibleChange(true)" @mouseleave="emojiVisibleChange(false)">
            <img src="../assets/smile.svg" alt="">
            <div :class="(showEmoji ? 'emoji-container' : 'emoji-container hide')">
              <div class="emoji-img" v-for='(value, key, index) in emojiList' :key="index">
                <img :title="value" :src="require(`../assets/emoji/${key}`)" :alt="value" @click="chooseEmoji(key, value)"/>
              </div>
            </div>
          </div>
          <div class="shake" @click="shaking">
            <img src="../assets/light.svg" alt="">
          </div>
          <div class="pic" @click="showUploadPicModal">
            <img src="../assets/picture.svg" alt="">
          </div>
        </div>
        <div class="textarea" ref="textarea" contenteditable="true" @keyup="checkSend"></div>
        <div class="action">
          <button class="btn send" @click="send">发送</button>
          <button class="btn" @click="cancel">取消</button>
        </div>
      </div>
      <div class="contacts">
        <h1>
          当前在线
          <span id="num">({{onlineUserList.length}})</span>
        </h1>
        <div class="users">
          <div v-for="(user, index) in onlineUserList" :key="index" class="user" >
            <img
              :src="baseServerUrl + '/' + (user.avatar ? user.avatar : 'default.jpg')"
              :alt="user.username"
            />
            <span :title="user.username" @click="showUploadModal(index)">{{user.username}}</span>
          </div>
        </div>
        <p v-show="onlineUserList.length > 0 ? false : true">当前无人在线哟~</p>
      </div>
    </div>
    <ModifyUserAvatarDialog v-show="$store.state.showUploadVisible"/>
    <UploadPictureDialog v-show="$store.state.showUploadPicVisible"/>
  </div>
</template>

<script>
import { getOnlineUserList } from "../actions/interface.js";
import { sortToTop, delCookie } from "../utils/util";
import ModifyUserAvatarDialog from "../components/dialog/modifyUserAvatar";
import UploadPictureDialog from "../components/dialog/uploadPicture.vue";
import ChatMessage from "../components/chatMessage";
import { emojiList } from '../consistant/emoji.js';
export default {
  components: {
    ModifyUserAvatarDialog,
    ChatMessage,
    UploadPictureDialog
  },
  data() {
    return {
      onlineUserList: [],
      baseServerUrl: "http://localhost:3005",
      shakingVisible: false,
      emojiList,
      showEmoji: false,
      messageList: []
    };
  },
  methods: {
    getOnlineUserList: function() {
      getOnlineUserList()
        .then(res => {
          if (res && res.state === "success") {
            this.onlineUserList = sortToTop(res.data);
          } else {
            throw new Error(res && res.msg);
          }
        })
        .catch(e => {
          alert(e.message);
        });
    },
    showUploadModal: function(index){
      if(index === 0){
        this.$store.commit("setUploadModal", true);
      }
    },
    showUploadPicModal(){
      this.$store.commit("setUploadPicModal", true);
    },
    logOut: function() {
      const username = this.$store.state.username;
      this.$store.commit("setUsername", '');
      this.$store.commit("setToken", '');
      delCookie('username');
      delCookie('token');
      this.$router.push({ name: "login" });
      this.$store.state.socket.emit("logOut", {
        username
      });
    },
    //聊天记录下滚
    messageScroll(){
      const that = this;
      setTimeout(function(){
        that.$refs.messages.scrollTop = that.$refs.messages.scrollHeight - that.$refs.messages.offsetHeight + 100;
      }, 100)
    },
    //发送抖动窗口
    shaking: function(){
      this.$store.state.socket.emit("shaking", {
        username: this.$store.state.username
      });
    },
    //添加表情
    chooseEmoji(key, value) {
      const imgSrc = require(`../assets/emoji/${key}`);
      const imgTag = document.createElement("img");
      imgTag.src = imgSrc;
      imgTag.alt = value;
      this.$refs.textarea.appendChild(imgTag);
    },
    emojiVisibleChange(bool){
      this.showEmoji = bool;
    },
    checkSend(e){
      if (e.keyCode === 13) {
        this.send();
      }
    },
    //发送信息
    send(){
      const info = this.$refs.textarea.innerHTML.replace(/<div><br><\/div>$/g, '');
      if(info && info !== '<div><br></div>'){
        // this.messageList.push({
        //   type: 1,
        //   info: this.$refs.textarea.innerHTML,
        //   ...this.onlineUserList[0],
        //   infoType: 1
        // })
        //后台分发
        this.$store.state.socket.emit("chatting", {
          username: this.$store.state.username,
          info,
          infoType: 1
        });
        this.$refs.textarea.innerHTML = '';
      }else{
        this.$refs.textarea.innerHTML = '';
        alert('内容不能为空')
      }
    },
    cancel(){
      this.$refs.textarea.innerHTML = '';
    }
  },
  mounted() {
    //获取在线用户列表
    this.getOnlineUserList();
    //用户上线
    this.$store.state.socket.on("onlineUserAdd", data => {
      this.onlineUserList = sortToTop(data.userList);
      this.messageList.push({
        type: 0,
        info: data.user.username + ' 进入了聊天室',
        time: data.time
      })
      this.messageScroll();
    });
    //用户下线
    this.$store.state.socket.on("onlineUserReduce", data => {
      if(data.userList.length > 0){
        this.onlineUserList = sortToTop(data.userList);
        this.messageList.push({
          type: 0,
          info: data.user.username + ' 离开了聊天室',
          time: data.time
        })
        this.messageScroll();
      }
    });
    //窗口抖动判断
    this.$store.state.socket.on("shaking", data => {
      const that = this;
      if(data.user.username !== that.$store.state.username){
        that.messageList.push({
          type: 0,
          info: data.user.username + ' 向您发送了一个抖动窗口',
          time: data.time
        })
        that.shakingVisible = true;
        setTimeout(function(){
          that.shakingVisible = false;
        }, 1000)
      }else{
        that.messageList.push({
          type: 0,
          info: '您发送了一个抖动窗口',
          time: data.time
        })
      }
      that.messageScroll();
    });
    //聊天信息
    this.$store.state.socket.on("chatting", data => {
      console.log(data);
      if(data.success){
        if(data.username !== this.$store.state.username){
          this.messageList.push({
            type: 2,
            ...data
          })
        }else{
          this.messageList.push({
            type: 1,
            ...data
          })
        }
      }else{
        alert('信息发送失败')
      }
      this.messageScroll();
    })
  }
};
</script>
<style lang="scss" scoped>
.shaking {
  animation: run 0.2s infinite;
}
@keyframes run {
  0% {
    left: 49%;
  }
  25% {
    left: 50%;
  }
  50% {
    left: 51%;
  }
  100% {
    left: 50%;
  }
}
.main {
  width: 710px;
  height: 556px;
  margin: 0 auto;
  border: 2px #eee solid;
  border-radius: 10px;
  box-shadow: 3px 5px 9px #ccc;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -355px;
  margin-top: -278px;
  overflow: hidden;
  .header {
    height: 85px;
    line-height: 85px;
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid #eee;
    font-size: 23px;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      vertical-align: middle;
    }
    .right{
      span{
        font-size: 16px;
        color: #ddd;
        &:hover{
          cursor: pointer;
          color: #000;
        }
      }
    }
  }
  .container {
    height: 471px;
    display: flex;
    .conversation {
      width: 490px;
    }
    .extra {
      height: 32px;
      width: 100%;
      border-top: 1px solid #eee;
      text-align: left;
      padding-left: 10px;
      display: flex;
      align-items: center;
      div{
        height: 32px;
        line-height: 32px;
        display: flex;
        margin: 0 4px;
        align-items: center;
        img{
          width: 20px;
          height: 20px;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .emoji{
        position: relative;
        .emoji-container{
          position: absolute;
          width: 200px;
          height: 200px;
          display: flex;
          flex-wrap: wrap;
          background: #eee;
          overflow: auto;
          opacity: 0.5;
          top: -200px;
          left: -19px;
          border-radius: 8px;
          align-items: center;
          justify-content: space-between;
          .emoji-img{
            width: 10%;
          }
        }
        .hide{
          display: none;
        }
      }
    }
    .messages {
      height: 350px;
      padding: 10px 10px 0px 10px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .action {
      text-align: right;
      margin-top: 5px;
      .btn {
        width: 72px;
        height: 25px;
        margin-right: 5px;
        background-color: #805b6b;
        border-radius: 3px;
        border: none;
        color: #fff;
        cursor: pointer;
      }
      .send {
        margin-right: 10px;
      }
      .btn:hover {
        background-color: #b495a1;
      }
    }
    .contacts {
      width: 210px;
      height: 100%;
      padding: 6px;
      border-left: 2px #eee solid;
      h1 {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .users {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .user {
          width: 25%;
          height: 70px;
          img {
            width: 100%;
            height: 50px;
            border-radius: 50%;
            padding: 6px;
          }
          span {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
      p {
        text-align: center;
        margin-top: 70px;
        color: #555;
      }
    }
  }
}

.textarea {
  display: block;
  width: 100%;
  height: 55px;
  max-height: 55px;
  padding-left: 5px;
  padding-top: 5px;
  font-size: 16px;
  border: none;
  text-align: left;
  overflow: auto;
}
.textarea:focus, .btn:focus {
  outline: none;
}
</style>
