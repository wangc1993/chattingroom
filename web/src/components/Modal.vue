<template>
<transition name="slide">
  <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancle')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType === 1" @click="$emit('submit')">{{confirmText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType === 2" @click="$emit('cancle')">{{cancleText}}</a>
          <div class="btn-group" v-if="btnType === 3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{confirmText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('submit')">{{cancleText}}</a>
          </div>
        </div>
      </div>
    </div>
   </transition>
</template>

<script>
export default {
  props: {
    // 弹框标题
    title: {
      type: String,
      default: "标题"
    },
    // 按钮类型： 1：确定按钮 2：取消按钮 3：确定取消
    btnType: {
      type: Number,
      default: 3
    },
    // 按钮文本
    confirmText: {
      type: String,
      default: "确定"
    },
    cancleText: {
      type: String,
      default: "取消"
    },
    showModal: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.slide-enter-active {
    top: 0;
  }
  &.slide-leave-active {
    top: -100%;
  }
  &.slide-enter {
    top: -100%;
  }
  transition: top 0.5s;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.5;
  }
  .modal-dialog {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 560px;
    height: auto;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    .modal-header {
      height: 60px;
      background-color: #F5F5F5;
      padding: 0 25px;
      line-height: 60px;
      font-size: 16px;
      .icon-close {
        position: absolute;
        top: 23px;
        right: 25px;
        width: 14px;
        height: 14px;
        background: url("../assets/close.png") no-repeat center;
        background-size: contain;
      }
    }
    .modal-body {
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .modal-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: #F5F5F5;
    }
  }
}
</style>