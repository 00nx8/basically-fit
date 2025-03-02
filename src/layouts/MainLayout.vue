<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="logo flex">
          <span>Basically Fit</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/workout-plans" :label="workoutLabel" />
        <q-route-tab to="/exercise-library" :label="exerciseLabel" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<style scoped lang="scss">
.q-page-container {
  margin: 5%;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { exerciseCount, workoutCount } from 'src/components/state';

const workoutLabel = ref(`workout plans (${workoutCount.value})`)
const exerciseLabel = ref(`exercises (${exerciseCount.value})`)

watch(workoutCount, () => {
  workoutLabel.value = `workout plans (${workoutCount.value})`
})

watch(exerciseCount, () => {
  exerciseLabel.value = `exercises (${exerciseCount.value})`
})
</script>

