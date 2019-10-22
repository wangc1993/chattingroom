<template>
  <div class="main">
    <div class="header">
      <img src="../assets/room.jpg" />
      欢迎来到解压聊天室
    </div>
    <div class="container">
      <div class="conversation">
        <!-- 内容列表 -->
        <ul class="messages"></ul>
        <!-- 操作栏 -->
        <div class="extra">
          <div class="emoji"></div>
          <div class="shake"></div>
          <div class="pic"></div>
        </div>
        <!-- autocomplete禁用自动完成功能 -->
        <textarea class="m" autofocus></textarea>
        <div class="action">
          <button class="btn send">发送</button>
          <button class="btn">关闭</button>
        </div>
      </div>
      <div class="contacts">
        <h1>
          在线人员(
          <span id="num">0</span>)
        </h1>
        <ul id="users"></ul>
        <p>当前无人在线哟~{{username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username: this.$store.state.username
    }
  }
};
</script>
<style lang="scss" scoped>
.shaking {
    animation: run 0.2s infinite;
}
@keyframes run {
    0% {
        left: 0;
    }
    25% {
        left: -7px;
    }
    50% {
        left: 7px;
    }
    100% {
        left: 0;
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
    border-bottom: 2px solid #eee;
    font-size: 23px;
    color: #555;
    img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        vertical-align: middle;
     }
  }
  .container {
    height: 471px;
    display: flex;
    .conversation {
      width: 490px;
    }
    .extra{
      height: 30px;
      width: 100%;
      border-top: 1px solid #eee;
    }
    .messages {
      height: 350px;
      padding: 10px 10px 0px 10px;
      overflow-y: auto;

      &::-webkit-scrollbar{
        /*滚动条整体样式*/
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-thumb{
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
    .action{
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
    .contacts{
      width: 210px;
      height: 100%;
      padding: 6px;
      border-left: 2px #eee solid;
      h1 {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      ul {
        width: 100%;
        li {
          display: inline-block;
          width: 23%;
          margin-right: 2%;
          height: 65px;
          text-align: center;
          margin-bottom: 5px;
          img {
              width: 100%;
              height: 45.5px;
            }
        }
      }
      li > span {
        display: inline-block;
        width: 100%;
        font-size: 13px;
        line-height: 20px;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      p {
        text-align: center;
        margin-top: 70px;
        color: #555;
      }
    }
  }
}

textarea {
  display: block;
  width: 100%;
  height: 55px;
  padding-left: 5px;
  padding-top: 5px;
  resize: none;
  font-size: 16px;
  background: none;
  border: none;
  font-family: "微软雅黑";
}
textarea:focus,
.btn:focus,
.name input:focus,
.name button:focus {
  outline: none;
}
/*滚动条样式*/
textarea::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
textarea::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
textarea::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
