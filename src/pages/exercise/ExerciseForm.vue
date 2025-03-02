<script setup lang="ts">
import { Notify } from 'quasar';
import { Exercise, type VoiceNote } from 'src/components/models';
import { exerciseCount } from 'src/components/state';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AudioPlayer from 'src/components/AudioPlayer.vue';

const route = useRoute()
const router = useRouter()
const submitted = ref(false)

let exerciseDetails = Exercise.get(Number.parseInt(route.params.id as string))

const formDetails = ref({ ...exerciseDetails })

const title = ref('Edit exercise')

if (!exerciseDetails) {
  exerciseDetails = Exercise.create(undefined, false)
  title.value = 'Create exercise'
} else {
  exerciseDetails = Exercise.create(exerciseDetails)
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '');
}

function saveExercise() {
  submitted.value = true
  if (!validateForm()) {
    Notify.create('Form cannot be validated. please double check all required fields')
    return
  }
  formDetails.value.description = stripHtml(formDetails.value.description!)
  if (recordedAudio.value) formDetails.value.voiceNote = recordedAudio.value
  Exercise.create(formDetails.value)
  Notify.create('Saved successfully')
  if (title.value != 'Edit exercise') exerciseCount.value += 1
  router.go(-1)
}


function validateForm() {
  return !!formDetails.value.name && !!stripHtml(formDetails.value.description as string)
}

function deleteExercise() {
  exerciseDetails!.delete()
  Notify.create('Exercise deleted')
  exerciseCount.value -= 1
  router.go(-1)
}


if (!formDetails.value.description!) formDetails.value.description = ''

function decodeHtmlEntities(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
const recordedAudio = ref<VoiceNote>()
recordedAudio.value = exerciseDetails.voiceNote

function saveAudio(audio: VoiceNote) {
  recordedAudio.value = audio
}
</script>

<template>
  <h1>{{ title }}</h1>
  <form class="q-gutted-md q-card--bordered q-layout-padding ">
    <q-input v-model="formDetails!.name" label="Name" stack-label required :rules="[val => !!val || 'Name is required']"
      :error="submitted && !formDetails?.name" />

    <div class="q-mt-md">
      <label class="text-caption">Description *</label>
      <q-editor :model-value="decodeHtmlEntities(formDetails!.description!)"
        @update:model-value="(val) => formDetails!.description = val" class="q-mt-xs"
        :class="{ 'q-editor-error': submitted && !formDetails?.description }" style="white-space: pre-wrap;" />
      <div v-if="submitted && !formDetails?.description" class="text-negative q-mt-xs">
        Description is required
      </div>
    </div>

    <div class="q-mt-md">
      <p>Record a voice explanation:</p>
      <AudioPlayer :voice-note="recordedAudio" @audio-recorded="saveAudio" />
    </div>


    <div class="q-mt-lg">
      <q-btn @click="saveExercise" color="accent">Save</q-btn>
      <q-btn @click="router.go(-1), Notify.create('No changes were made.')" class="q-ml-sm">Cancel</q-btn>
      <q-btn v-if="title == 'Edit exercise'" @click="deleteExercise">DELETE</q-btn>
    </div>
  </form>
</template>

<style>
.q-editor-error {
  border: 1px solid #C10015;
  border-radius: 4px;
}
</style>
