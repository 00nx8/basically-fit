<script setup lang="ts">
import { WorkoutPlan } from 'src/components/models';
import PlanPreview from 'src/components/PlanPreview.vue';
const workoutPlans = WorkoutPlan.all()
</script>


<template>
  <h1 class="text-h3">Workout Plans</h1>
  <section v-if="workoutPlans.length" class="q-gutter-md row" >
    <PlanPreview v-for="plan in workoutPlans" :workoutPlan="WorkoutPlan.create(plan, false)" :key="plan.id!"/>
  </section>

  <p v-else>There are no plans yet, Make one!</p>
  <q-btn :to="{name: 'editPlan', params: {id: 0}}" rounded class="fixed fixed-bottom-right z-marginals" style="right: 1rem; bottom: 1rem;" color="primary">
    <q-icon name="add"></q-icon>
  </q-btn>
</template>
