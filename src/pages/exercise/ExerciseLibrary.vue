<script setup lang="ts">
import { Exercise } from 'src/components/models';
import ExercisePreview from 'src/components/ExercisePreview.vue';

const exercises = Exercise.all()

</script>

<template>
  <section v-if="exercises.length" class="col q-gutter-md">
    <ExercisePreview v-for="exercise in exercises" :exercise="exercise" :key="exercise.id!"/>
  </section>
  <p v-else> No exercises yet... Make one !</p>
  <q-btn :to="{name: 'editExercise', params: {id: 0}}" rounded class="fixed fixed-bottom-right z-marginals" style="right: 1rem; bottom: 1rem;" color="primary">
    <q-icon name="add"></q-icon>
  </q-btn>
</template>

<style scoped lang="scss">

</style>
