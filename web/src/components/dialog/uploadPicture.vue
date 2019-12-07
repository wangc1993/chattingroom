<template>
  <div class="dialog">
    <!-- 外层的遮罩 -->
    <div class="dialog-cover" @click="hideUploadModal"></div>
    <div class="dialog-container">
      <div class="dialog-header">
          <div class="title">
              上传图片
          </div>
      </div>
      <div class="dialog-body">
        <div class="show">
          <span>当前图片：</span>
          <span :title="currentPicName">{{currentPicName ? currentPicName : '暂无'}}</span>
        </div>
        <div>
          <label class="choose" for="pic">上传</label>
          <input id="pic" type="file" name="pic" accept="image/png, image/jpeg, image/jpeg" @change="picChange" style="display: none"/>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="action">
          <div class="cancel" @click="hideUploadModal">
            取消
          </div>
          <div class="upload" @click="upload">
            确定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPicName: '',
      file: ''
    };
  },
  methods: {
      picChange: function(e) {
        if(e.target.files.length > 0){
          if(e.target.files[0].size <= 2048000){
            this.currentPicName = e.target.files[0].name;
            this.file = e.target.files[0];
          }else{
            console.log("图片不能大于2000kb");
          }
        }
      },
      upload: function(){
        if(this.file){
          const that = this;
          const reader = new FileReader();
          reader.readAsDataURL(that.file); // 读出 base64
          reader.onloadend = function () {
            //后台分发
            that.$store.state.socket.emit("chatting", {
              username: that.$store.state.username,
              fileNameExt: that.file.name.split('.').pop(),
              pic: reader.result,// 图片的 base64 格式, 可以直接当成 img 的 src 属性值
              infoType: 2
            });
            that.$store.commit("setUploadPicModal", false);
          };
        }
      },
      hideUploadModal(){
        this.$store.commit("setUploadPicModal", false);
      }
  }
};
</script>

<style lang="scss" scoped>
@keyframes apper {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.dialog {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  animation: apper 0.5s;
  .dialog-cover {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(49, 74, 99, 0.62);
  }
  .dialog-container {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    width: 400px;
    height: 160px;
    margin-left: -200px;
    margin-top: -80px;
    border-radius: 4px;
    background-color: #fff;
  }
  .dialog-header{
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #ddd;
      .title{
          font-size: 20px;
          font-weight: 600;
      }
  }
  .dialog-body{
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .show{
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .choose{
      &:hover{
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
  .dialog-footer{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    border-top: 1px solid #ddd;
    .action{
      display: flex;
      width: 20%;
      justify-content: space-between;
      .upload, .cancel{
      &:hover{
        font-weight: 600;
        cursor: pointer;
      }
    }
    }
  }
}
</style>