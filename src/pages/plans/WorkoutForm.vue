<script setup lang="ts">
import { Notify } from 'quasar';
import { Exercise, Workout, WorkoutPlan } from 'src/components/models';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { windowWidth, workoutCount, isMobile } from 'src/components/state';


const route = useRoute()
const router = useRouter()

const title = ref('Edit workout plan')

const flexDirection = ref(windowWidth.value < 600 ? 'col' : 'row')

const planDetails = ref(WorkoutPlan.get(Number.parseInt(route.params.id as string)))

if (!planDetails.value) {
  planDetails.value = WorkoutPlan.create(undefined, false)
  title.value = 'create workout plan'
} else {
  planDetails.value = WorkoutPlan.create(planDetails.value, false)
}

const workouts = ref(planDetails.value.includedWorkouts.map(workout =>
  Workout.create({ ...workout }, false)
));

function saveWorkout() {
  planDetails.value!.includedWorkouts = workouts.value
  planDetails.value!.insert()
  if (title.value == 'create workout plan') workoutCount.value += 1
  router.go(-1)
}

function addWorkout(id: number) {
  workouts.value.push(
    Workout.create({ exerciseId: id })
  )
}

function deleteWorkout(workout: Workout) {
  workouts.value.splice(workouts.value.indexOf(workout), 1)
}

watch(windowWidth, () => {
  flexDirection.value = windowWidth.value < 700 ? 'col' : 'row'
})

function deleteSelf() {
  planDetails.value!.delete()
  Notify.create('Deleted workout.')
  workoutCount.value -= 1
  router.go(-1)
}
</script>
<template>
  <h1 class="text-h4">{{ title }}</h1>
  <form class=" q-gutted-md q-card--bordered q-layout-padding">
    <q-input v-model="planDetails!.name" label="Title" style="padding-bottom: 1rem;" stack-label
      placeholder="E.G: Tuesday pull" />
    <div :class="flexDirection" class="q-gutter-md" style="padding-bottom: 1rem;">
      <section class=" col reverse-wrap">
        <h2 class="text-h6">Added workouts</h2>
        <q-list bordered separator v-if="workouts.length">
          <q-item v-for="workout in workouts" :key="workout.id as number">
            <section :class="flexDirection" style="padding-top: 1rem;" class="q-gutter-md items-center">
              <span class="col">
                {{ workout.exercise().name }}
              </span>
              <div v-if="isMobile" class="row q-gutter-md">
                <q-input class="col" filled v-model="workout.reps" label="reps" :dense="true" />
                <q-input class="col" filled v-model="workout.sets" label="sets" :dense="true" />
                <q-btn @click="() => deleteWorkout(workout)" class="col-auto" icon="delete" />

              </div>
              <div v-else class="row q-gutter-md">
                <q-input class="col" filled v-model="workout.reps" label="reps" :dense="true" />
                <q-input class="col" filled v-model="workout.sets" label="sets" :dense="true" />
                <q-btn @click="() => deleteWorkout(workout)" class="col-auto" icon="delete" />
              </div>
            </section>
          </q-item>
        </q-list>
        <q-list bordered separator v-else>
          <q-item>
            No exercises added. <br>
            Click a created workout to add one
          </q-item>
        </q-list>
      </section>

      <section class="col">
        <h2 class="text-h6">Created Workouts</h2>
        <q-list v-if="Exercise.all().length" bordered separator>
          <q-item @click="() => addWorkout(exercise.id!)" v-for="exercise in Exercise.all()" :key="exercise.id!"
            clickable v-ripple>
            <q-item-section class="text-black">
              {{ exercise.name }}
            </q-item-section>
            <q-tooltip>
              Click to add
            </q-tooltip>
          </q-item>
        </q-list>
        <q-list v-else>
          No exercises exist yet. <br> Make one
        </q-list>
      </section>
    </div>

    <q-btn @click="saveWorkout" color="accent">save</q-btn>
    <q-btn @click="router.go(-1)">cancel</q-btn>
    <q-btn v-if="title == 'Edit workout plan'" @click="deleteSelf">delete</q-btn>
  </form>
</template>

<style scoped lang="scss">
* {
  user-select: none;
}
</style>
