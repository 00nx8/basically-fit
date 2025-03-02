<script setup lang="ts">
import { Exercise, Workout, WorkoutPlan } from 'src/components/models';
import { exerciseCount } from './state';


interface proppedExercise {
  id?: number | undefined,
  name?: string,
  description?: string
}

const props = defineProps<{
  exercise: Partial<proppedExercise>
}>()

function deleteExercise() {
  Workout.all().find(workout => workout.exerciseId == props.exercise.id)?.delete()
  Exercise.get(props.exercise.id as number)?.delete()
  WorkoutPlan.all().forEach(workout => workout.cleanseWorkouts())
  exerciseCount.value -= 1
}
</script>


<template>
    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ props.exercise.name }}</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ props.exercise?.description }}
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn :to="{name: 'editExercise', params : {id: props.exercise.id}}" flat>Edit</q-btn>
        <q-btn flat @click="deleteExercise" >Delete</q-btn>
      </q-card-actions>
    </q-card>
</template>

