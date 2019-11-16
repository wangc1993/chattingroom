<template>
  <div class="dialog">
    <!-- 外层的遮罩 -->
    <div class="dialog-cover" @click="hideUploadModal"></div>
    <div class="dialog-container">
      <div class="dialog-header">
          <div class="title">
              修改用户头像
          </div>
      </div>
      <div class="dialog-body">
        <div class="show">
          <span>当前图片：</span>
          <span :title="currentPicName">{{currentPicName ? currentPicName : '暂无'}}</span>
        </div>
        <div>
          <label class="choose" for="avatar">上传头像</label>
          <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg, image/jpeg" @change="avatarChange" style="display: none"/>
        </div>
      </div>
      <div class="dialog-footer">
        <div :class="uploadStatus === 1 ? '' : 'tip'">
          {{uploadStatus === 1 ? '上传成功' : uploadStatus === 2 ? '上传失败' : ''}}
        </div>
        <div class="action">
          <div class="cancel" @click="hideUploadModal">
            取消
          </div>
          <div class="upload" @click="upload">
            上传
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadAvatar } from '../../actions/interface.js';
export default {
  data() {
    return {
      currentPicName: '',
      uploadStatus: 0,//1成功，2失败m
      file: ''
    };
  },
  methods: {
      avatarChange: function(e) {
        if(e.target.files.length > 0){
          if(e.target.files[0].size <= 51200){
            this.currentPicName = e.target.files[0].name;
            this.file = e.target.files[0];
          }else{
            console.log("图片不能大于50kb");
          }
        }
      },
      upload: function(){
        if(this.file){
          let formFile = new FormData()
          formFile.append('file', this.file);
          formFile.append('username', this.$store.state.username);
          uploadAvatar(formFile).then(res => {
            if(res && res.state === 'success'){
              this.uploadStatus = 1;
            }else{
              this.uploadStatus = 2;
              throw new Error(res && res.msg);
            }
          }).catch(e => {
            console.log(e.message)
          })
        }
      },
      hideUploadModal(){
        this.$store.commit("setUploadModal", false);
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
    justify-content: space-between;
    padding: 0 20px;
    border-top: 1px solid #ddd;
    .tip{
      color: red;
    }
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