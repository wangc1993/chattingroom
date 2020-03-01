<template>
  <div class="modal-container">
  <modal
    title="小星星"
    confirmText="确定"
    :btnType="3"
    :showModal="showModal"
    @submit="go"
    @cancle="showModal=false"
  >
    <template v-slot:body>
      <p>给个小星星吧</p>
    </template>
  </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: 'TipModal',
  components: {
    Modal
  },
  data() {
    return {
      showModal: true
    };
  },
  methods: {
    go: function(){}
  }
};
</script>

<style lang="scss" scoped>
</style>