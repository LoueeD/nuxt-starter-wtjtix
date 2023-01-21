<script setup lang="ts">
import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from '@zxing/library';
const hints = new Map();
const formats = [BarcodeFormat.QR_CODE];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
const reader = new MultiFormatReader();
reader.setHints(hints);

const video = ref<HTMLElement>();

onMounted(() => {
  if (navigator.mediaDevices.getUserMedia) {
    const successCallback = function (stream) {
      video.value.srcObject = stream;
    };
    const errorCallback = function (error) {
      console.log(error);
    };
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: { facingMode: { ideal: 'environment' } }, // prefer rear-facing camera
      })
      .then(successCallback, errorCallback);
  }
});
</script>
<template>
  <div class="page">
    <video ref="video" muted="true" control="false" autoplay="true"></video>
    <div class="button">SCANNING</div>
  </div>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;

  video {
    width: 100%;
    height: 100%;
    background: #000;
  }

  .button {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    text-align: center;
    background: #222;
    color: #fff;
  }
}
</style>
