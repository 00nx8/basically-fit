<script setup lang="ts">
import { Workout, WorkoutPlan } from './models';
import { isMobile, workoutCount } from './state';
const props = defineProps<{
  workoutPlan: WorkoutPlan
}>()

function deleteExercise() {
  WorkoutPlan.get(props.workoutPlan.id as number)?.delete()
  workoutCount.value -= 1
}

const workouts = props.workoutPlan.includedWorkouts.map(workout =>
  Workout.create(workout, false)
);

</script>



<template>
  <q-card class="my-card text-white"
    style="background: radial-gradient(circle, #009c82 0%, #38383c 100%);  position: relative; padding-bottom: 3rem; width: 100%;">
    <q-card-section>
      <q-btn :to="{ name: 'workoutView', params: { id: props.workoutPlan.id! } }" flat class="text-h6">{{
        props.workoutPlan.name ? props.workoutPlan.name : 'no title' }}</q-btn>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-list v-if="props.workoutPlan.includedWorkouts.length" dark bordered separator>
        <q-item v-for="workout in workouts" :key="workout.id!">
          <q-tooltip v-if="isMobile">
            {{ workout.exercise().description }}
          </q-tooltip>
          <q-item-section>
            {{ workout.exercise().name }}
          </q-item-section>

          <q-item-section v-if="!isMobile" style="max-width: 15rem;">
            <q-expansion-item popup label="Description">
              <q-card>
                <q-card-section style="background-color: #38383c;">
                  {{ workout.exercise().description }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-item-section>

          <q-item-section class="text-no-wrap" style="width: max-content; flex: unset;">
            Repetitions:
            {{ workout.reps }}
          </q-item-section>


          <q-item-section class="text-no-wrap" style="width: max-content; flex: unset;">
            | Sets:
            {{ workout.sets }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-section v-else>
        There are no exercises attached to this workout..
      </q-card-section>

    </q-card-section>
    <div style="position:absolute; right: 1rem;">
      <q-btn flat :to="{ name: 'editPlan', params: { id: props.workoutPlan.id } }">edit</q-btn>
      <q-btn flat @click="deleteExercise">delete</q-btn>
    </div>
  </q-card>
</template>
