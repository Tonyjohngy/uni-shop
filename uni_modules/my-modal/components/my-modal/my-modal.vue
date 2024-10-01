<template>
  <view v-if="visible" class="custom-modal">
    <view class="modal-content">
      <view class="modal-header">
        <text class="modal-title">{{ title }}</text>
      </view>
      <view class="modal-body">
        <img :src="qrCodeImageUrl" alt="微信支付二维码" class="qr-code-image">
      </view>
      <view class="modal-footer">
        <button @click="closeModal">关闭</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '提示'
      },
      qrCodeImageUrl: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
</script>

<style scoped lang="scss">
  .custom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-content {
    background-color: #fff;
    border-radius: 10px;
    width: 80%;
    max-width: 300px;
    overflow: hidden;
  }

  .modal-header {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
  }

  .modal-title {
    font-size: 18px;
    font-weight: bold;
  }

  .modal-body {
    padding: 15px;
    text-align: center;
  }

  .qr-code-image {
    width: 100%;
    max-width: 200px;
  }

  .modal-footer {
    padding: 15px;
    text-align: center;
    border-top: 1px solid #e5e5e5;
  }

  button {
    background-color: #c00000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
  }
</style>