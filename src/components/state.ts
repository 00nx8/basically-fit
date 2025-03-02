import { ref, watch } from "vue";
import { Exercise, WorkoutPlan } from "./models";

export const exerciseCount = ref(Exercise.all().length)
export const workoutCount = ref(WorkoutPlan.all().length)

export const windowWidth = ref(window.innerWidth)

const updateWidth
  windowWidth.value = window.innerWidth
}

export const isMobile = ref(window.innerWidth < 900)
watch(windowWidth, () => {
  isMobile.value = windowWidth.value < 900
})

window.addEventListener('resize', updateWidth)
window.addEventListener('resize', updateFontsize)

const fontSize = ref(16);


function updateFontsize() {
  if (window.innerWidth > 600 && window.innerWidth < 800) {
    fontSize.value = 14;
  } else if (window.innerWidth > 400&& window.innerWidth < 600) {
    fontSize.value = 12;
  } else if (window.innerWidth < 400) {
    fontSize.value = 10;
  }
}

watch(() => fontSize.value, () => {
  document.documentElement.style.fontSize = `${fontSize.value}px`;
});


