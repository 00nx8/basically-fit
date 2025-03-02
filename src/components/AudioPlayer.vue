<script setup lang="ts">
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Notify } from 'quasar';
import { ref } from 'vue';

const isRecording = ref(false)
const emit = defineEmits(['audioRecorded'])
const props = defineProps(['voiceNote', 'isDisplay'])

function recordAudio() {
  Notify.create('recording....')
  VoiceRecorder.startRecording()
    .catch(error => Notify.create(error));
  isRecording.value = true
}
function stopRecording() {
  VoiceRecorder.stopRecording()
    .then((result) => {
      isRecording.value = false
      emit('audioRecorded', result.value)
    })
    .catch(error => console.log(error));
}

function playRecording() {
  console.log('supposed to be playing audio')

  const audioRef = new Audio(`data:${props.voiceNote?.mimeType};base64,${props.voiceNote?.recordDataBase64}`);

  audioRef.onloadeddata = () => {
    audioRef.play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch(err => {
        console.error('Error playing audio:', err);
      });
  };

  audioRef.load();
}

</script>

<template>
  <q-btn color="secondary" v-if="props.voiceNote" @click="playRecording">
    {{ !props.isDisplay ? 'play existing recording' : 'play voice explanation' }}
  </q-btn>
  <div v-if="!props.isDisplay">
    <q-btn color="secondary" v-if="!isRecording" @click="recordAudio">Record</q-btn>
    <q-btn color="secondary" v-if="isRecording" @click="stopRecording">Stop</q-btn>
  </div>
</template>
