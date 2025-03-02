import { E as Exercise, a as WorkoutPlan } from "./models-i8VR3keN.js";
import { r as ref, n as watch } from "./index-DiEwj2lb.js";
const exerciseCount = ref(Exercise.all().length);
const workoutCount = ref(WorkoutPlan.all().length);
const windowWidth = ref(window.innerWidth);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
const isMobile = ref(window.innerWidth < 900);
watch(windowWidth, () => {
  isMobile.value = windowWidth.value < 900;
});
window.addEventListener("resize", updateWidth);
window.addEventListener("resize", updateFontsize);
const fontSize = ref(16);
function updateFontsize() {
  if (window.innerWidth > 600 && window.innerWidth < 800) {
    fontSize.value = 14;
  } else if (window.innerWidth > 400 && window.innerWidth < 600) {
    fontSize.value = 12;
  } else if (window.innerWidth < 400) {
    fontSize.value = 10;
  }
}
watch(() => fontSize.value, () => {
  document.documentElement.style.fontSize = `${fontSize.value}px`;
});
export {
  windowWidth as a,
  exerciseCount as e,
  isMobile as i,
  workoutCount as w
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtREhJUGVJRzYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3N0YXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBFeGVyY2lzZSwgV29ya291dFBsYW4gfSBmcm9tIFwiLi9tb2RlbHNcIjtcblxuZXhwb3J0IGNvbnN0IGV4ZXJjaXNlQ291bnQgPSByZWYoRXhlcmNpc2UuYWxsKCkubGVuZ3RoKVxuZXhwb3J0IGNvbnN0IHdvcmtvdXRDb3VudCA9IHJlZihXb3Jrb3V0UGxhbi5hbGwoKS5sZW5ndGgpXG5cbmV4cG9ydCBjb25zdCB3aW5kb3dXaWR0aCA9IHJlZih3aW5kb3cuaW5uZXJXaWR0aClcblxuY29uc3QgdXBkYXRlV2lkdGggPSAoKSA9PiB7XG4gIHdpbmRvd1dpZHRoLnZhbHVlID0gd2luZG93LmlubmVyV2lkdGhcbn1cblxuZXhwb3J0IGNvbnN0IGlzTW9iaWxlID0gcmVmKHdpbmRvdy5pbm5lcldpZHRoIDwgOTAwKVxud2F0Y2god2luZG93V2lkdGgsICgpID0+IHtcbiAgaXNNb2JpbGUudmFsdWUgPSB3aW5kb3dXaWR0aC52YWx1ZSA8IDkwMFxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVdpZHRoKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZUZvbnRzaXplKVxuXG5jb25zdCBmb250U2l6ZSA9IHJlZigxNik7XG5cblxuZnVuY3Rpb24gdXBkYXRlRm9udHNpemUoKSB7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDYwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8IDgwMCkge1xuICAgIGZvbnRTaXplLnZhbHVlID0gMTQ7XG4gIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPiA0MDAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8IDYwMCkge1xuICAgIGZvbnRTaXplLnZhbHVlID0gMTI7XG4gIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPCA0MDApIHtcbiAgICBmb250U2l6ZS52YWx1ZSA9IDEwO1xuICB9XG59XG5cbndhdGNoKCgpID0+IGZvbnRTaXplLnZhbHVlLCAoKSA9PiB7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplLnZhbHVlfXB4YDtcbn0pO1xuXG5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdPLE1BQU0sZ0JBQWdCLElBQUksU0FBUyxNQUFNLE1BQU07QUFDL0MsTUFBTSxlQUFlLElBQUksWUFBWSxNQUFNLE1BQU07QUFFM0MsTUFBQSxjQUFjLElBQUksT0FBTyxVQUFVO0FBRWhELE1BQU0sY0FBYyxNQUFNO0FBQ3hCLGNBQVksUUFBUSxPQUFPO0FBQzdCO0FBRU8sTUFBTSxXQUFXLElBQUksT0FBTyxhQUFhLEdBQUc7QUFDbkQsTUFBTSxhQUFhLE1BQU07QUFDZCxXQUFBLFFBQVEsWUFBWSxRQUFRO0FBQ3ZDLENBQUM7QUFFRCxPQUFPLGlCQUFpQixVQUFVLFdBQVc7QUFDN0MsT0FBTyxpQkFBaUIsVUFBVSxjQUFjO0FBRWhELE1BQU0sV0FBVyxJQUFJLEVBQUU7QUFHdkIsU0FBUyxpQkFBaUI7QUFDeEIsTUFBSSxPQUFPLGFBQWEsT0FBTyxPQUFPLGFBQWEsS0FBSztBQUN0RCxhQUFTLFFBQVE7QUFBQSxFQUFBLFdBQ1IsT0FBTyxhQUFhLE9BQU0sT0FBTyxhQUFhLEtBQUs7QUFDNUQsYUFBUyxRQUFRO0FBQUEsRUFBQSxXQUNSLE9BQU8sYUFBYSxLQUFLO0FBQ2xDLGFBQVMsUUFBUTtBQUFBLEVBQUE7QUFFckI7QUFFQSxNQUFNLE1BQU0sU0FBUyxPQUFPLE1BQU07QUFDaEMsV0FBUyxnQkFBZ0IsTUFBTSxXQUFXLEdBQUcsU0FBUyxLQUFLO0FBQzdELENBQUM7In0=
