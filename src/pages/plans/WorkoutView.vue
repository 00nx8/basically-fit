<script setup lang="ts">
import { WorkoutPlan, Workout } from 'src/components/models';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import AudioPlayer from 'src/components/AudioPlayer.vue';

const printView = ref(false)

const route = useRoute()
const workoutPlan = WorkoutPlan.create(WorkoutPlan.get(Number.parseInt(route.params.id as string)), false)

const workouts = workoutPlan.includedWorkouts.map(workout =>
  Workout.create(workout, false)
);

const currentLocation = ref(workoutPlan.location)

const getCurrentLocation = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  currentLocation.value.lon = coordinates.coords.longitude
  currentLocation.value.lat = coordinates.coords.latitude
  workoutPlan.location = currentLocation.value
};

watch(currentLocation.value, () => {
  WorkoutPlan.create(workoutPlan, true)
})

</script>

<template>
  <section class="col justify-center items-center q-gutter-md">
    <q-card class="my-card text-white"
      style="height: fit-content; background: radial-gradient(circle, #009c82 0%, #38383c 100%); width:100%; max-width: 732px; position: relative;">
      <q-card-section>
        {{ workoutPlan.name }}
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list v-if="workoutPlan.includedWorkouts.length" dark bordered separator>
          <q-item v-for="workout in workouts" :key="workout.id!">

            <q-item-section>
              {{ workout.exercise().name }}
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

    </q-card>

    <q-card v-if="workoutPlan.includedWorkouts.length" class="my-card text-white"
      style="background: radial-gradient(circle, #009c82 0%, #38383c 100%); max-width: 732px; width: 100%; position: relative; ">
      <q-card-section>
        Descriptions
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list dark bordered separator>
          <q-item v-for="workout in workouts" :key="workout.id!">
            <q-item-section class="col-2" style="align-self: flex-start; min-width: 2rem;">
              {{ workout.exercise().name }}
            </q-item-section>

            <q-item-section class="col" style="max-width: 618px; justify-self: flex-end;">
              {{ workout.exercise().description }}
            </q-item-section>
            <q-item-section v-if="workout.exercise().voiceNote?.recordDataBase64 && !printView">

              <AudioPlayer :is-display="true" :voice-note="workout.exercise().voiceNote" />

            </q-item-section>
          </q-item>

        </q-list>
      </q-card-section>
    </q-card>

    <div class="q-gutter-md">
      <section>
        <p>You can now record your current location for the workout!</p>
        <q-btn @click="getCurrentLocation()">Record current location</q-btn>
      </section>
      <iframe v-if="currentLocation.lat" width="300" height="170" frameborder="0" scrolling="no" marginheight="0"
        marginwidth="0"
        :src="`https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lon}&z=14&output=embed`" />
    </div>
  </section>

  <q-btn style="position:fixed; right:1rem; bottom: 1rem;" @click="printView = printView == true ? false : true"
    color="warning">toggle print view</q-btn>

</template>
