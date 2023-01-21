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
    <video ref="video" playsinline muted autoplay></video>
    <div class="button">SCANNING</div>
  </div>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  display: flex;
  gap: 30px;

  video {
    width: 100%;
    border-radius: 12px;
    background: #000;
  }

  .button {
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    background: #222;
    color: #fff;
  }
}
</style>
