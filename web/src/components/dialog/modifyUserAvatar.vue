<template>
  <div class="dialog">
    <!-- 外层的遮罩 -->
    <div class="dialog-cover"></div>
    <div class="dialog-container">
      <div class="dialog-header">
          <div class="title">
              修改用户头像
          </div>
      </div>
      <div class="dialog-body">
        <label for="avatar">上传头像</label>
        <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg, image/jpeg" @change="avatarChange" style="display: none"/>
      </div>
      <div class="dialog-footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      avatarChange: (e) => {
          console.log(e.target.files[0])
      }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
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
    height: 200px;
    margin-left: -200px;
    margin-top: -100px;
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
}
</style>