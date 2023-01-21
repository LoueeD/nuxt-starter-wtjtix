<script setup lang="ts">
import { BrowserQRCodeReader } from '@zxing/library';
const codeReader = new BrowserQRCodeReader();

const video = ref<HTMLElement>();
const selectedDeviceId = ref('');
const decodedQRCodes = ref([]);

function decodeContinuously() {
  codeReader.decodeFromInputVideoDeviceContinuously(
    selectedDeviceId.value,
    'video',
    (result, err) => {
      if (result) {
        console.log('Found QR code!', result);
        decodedQRCodes.value.push(result);
      }
      if (err) {
        console.log(err);
      }
    }
  );
}

onMounted(() => {
  if (navigator.mediaDevices.getUserMedia) {
    const successCallback = function (stream) {
      video.value.srcObject = stream;
    };
    const errorCallback = function (error) {
      console.log(error);
    };
    codeReader.getVideoInputDevices().then((videoInputDevices) => {
      selectedDeviceId.value = videoInputDevices[0].deviceId;
      decodeContinuously();
    });
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
    <video id="video" ref="video" playsinline muted autoplay></video>
    <div class="button">SCANNING</div>
    <div class="results">
      <pre>{{ decodedQRCodes.map((item) => item.text) }}</pre>
    </div>
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
