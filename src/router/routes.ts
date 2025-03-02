import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/workout-plans'
      },
      {
        path: '/exercise-library',
        component: () => import('pages/exercise/ExerciseLibrary.vue')
      },
      {
        path: '/workout-plans',
        component: () => import('pages/plans/WorkoutPlans.vue')
      },
      {
        name: 'editExercise',
        path: '/edit-exercise/:id',
        component: () => import('pages/exercise/ExerciseForm.vue')
      },
      {
        name: 'editPlan',
        path: '/edit-plan/:id',
        component: () => import('pages/plans/WorkoutForm.vue')
      },
      {
        name: 'workoutView',
        path: '/view-workout/:id',
        component: () => import('pages/plans/WorkoutView.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
