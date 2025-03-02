const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-BHbuHpwN.js","./index-DiEwj2lb.js","./index-DIdGMIfO.css"])))=>i.map(i=>d[i]);
import { a as QCard, Q as QCardSection } from "./QCard-DsWasmUw.js";
import { Q as QItem, a as QItemSection } from "./QItem-CCDSUG9A.js";
import { Q as QList } from "./QList-H00wgHxr.js";
import { au as registerPlugin, av as __vitePreload, G as defineComponent, r as ref, ac as useRoute, n as watch, _ as _export_sfc, V as createElementBlock, I as openBlock, M as createBaseVNode, L as createVNode, H as createBlock, a1 as createCommentVNode, J as withCtx, T as QBtn, X as Fragment, S as createTextVNode, P as toDisplayString, Y as renderList } from "./index-DiEwj2lb.js";
import { a as WorkoutPlan, W as Workout } from "./models-i8VR3keN.js";
import { A as AudioPlayer } from "./AudioPlayer-_tKvSXvp.js";
import "./use-dark-D3vguVup.js";
const Geolocation = registerPlugin("Geolocation", {
  web: () => __vitePreload(() => import("./web-BHbuHpwN.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).then((m) => new m.GeolocationWeb())
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkoutView",
  setup(__props, { expose: __expose }) {
    __expose();
    const printView = ref(false);
    const route = useRoute();
    const workoutPlan = WorkoutPlan.create(WorkoutPlan.get(Number.parseInt(route.params.id)), false);
    const workouts = workoutPlan.includedWorkouts.map(
      (workout) => Workout.create(workout, false)
    );
    const currentLocation = ref(workoutPlan.location);
    const getCurrentLocation = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      currentLocation.value.lon = coordinates.coords.longitude;
      currentLocation.value.lat = coordinates.coords.latitude;
      workoutPlan.location = currentLocation.value;
    };
    watch(currentLocation.value, () => {
      WorkoutPlan.create(workoutPlan, true);
    });
    const __returned__ = { printView, route, workoutPlan, workouts, currentLocation, getCurrentLocation, AudioPlayer };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "col justify-center items-center q-gutter-md" };
const _hoisted_2 = { class: "q-gutter-md" };
const _hoisted_3 = ["src"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("section", _hoisted_1, [
      createVNode(QCard, {
        class: "my-card text-white",
        style: { "height": "fit-content", "background": "radial-gradient(circle, #009c82 0%, #38383c 100%)", "width": "100%", "max-width": "732px", "position": "relative" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.workoutPlan.name), 1)
            ]),
            _: 1
          }),
          createVNode(QCardSection, { class: "q-pt-none" }, {
            default: withCtx(() => [
              $setup.workoutPlan.includedWorkouts.length ? (openBlock(), createBlock(QList, {
                key: 0,
                dark: "",
                bordered: "",
                separator: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.workouts, (workout) => {
                    return openBlock(), createBlock(QItem, {
                      key: workout.id
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(workout.exercise().name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "text-no-wrap",
                          style: { "width": "max-content", "flex": "unset" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Repetitions: " + toDisplayString(workout.reps), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "text-no-wrap",
                          style: { "width": "max-content", "flex": "unset" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" | Sets: " + toDisplayString(workout.sets), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })) : (openBlock(), createBlock(QCardSection, { key: 1 }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode(" There are no exercises attached to this workout.. ")
                ])),
                _: 1
              }))
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      $setup.workoutPlan.includedWorkouts.length ? (openBlock(), createBlock(QCard, {
        key: 0,
        class: "my-card text-white",
        style: { "background": "radial-gradient(circle, #009c82 0%, #38383c 100%)", "max-width": "732px", "width": "100%", "position": "relative" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => _cache[3] || (_cache[3] = [
              createTextVNode(" Descriptions ")
            ])),
            _: 1
          }),
          createVNode(QCardSection, { class: "q-pt-none" }, {
            default: withCtx(() => [
              createVNode(QList, {
                dark: "",
                bordered: "",
                separator: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.workouts, (workout) => {
                    return openBlock(), createBlock(QItem, {
                      key: workout.id
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          class: "col-2",
                          style: { "align-self": "flex-start", "min-width": "2rem" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(workout.exercise().name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "col",
                          style: { "max-width": "618px", "justify-self": "flex-end" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(workout.exercise().description), 1)
                          ]),
                          _: 2
                        }, 1024),
                        workout.exercise().voiceNote?.recordDataBase64 && !$setup.printView ? (openBlock(), createBlock(QItemSection, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode($setup["AudioPlayer"], {
                              "is-display": true,
                              "voice-note": workout.exercise().voiceNote
                            }, null, 8, ["voice-note"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("section", null, [
          _cache[5] || (_cache[5] = createBaseVNode("p", null, "You can now record your current location for the workout!", -1)),
          createVNode(QBtn, {
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.getCurrentLocation())
          }, {
            default: withCtx(() => _cache[4] || (_cache[4] = [
              createTextVNode("Record current location")
            ])),
            _: 1
          })
        ]),
        $setup.currentLocation.lat ? (openBlock(), createElementBlock("iframe", {
          key: 0,
          width: "300",
          height: "170",
          frameborder: "0",
          scrolling: "no",
          marginheight: "0",
          marginwidth: "0",
          src: `https://maps.google.com/maps?q=${$setup.currentLocation.lat},${$setup.currentLocation.lon}&z=14&output=embed`
        }, null, 8, _hoisted_3)) : createCommentVNode("", true)
      ])
    ]),
    createVNode(QBtn, {
      style: { "position": "fixed", "right": "1rem", "bottom": "1rem" },
      onClick: _cache[1] || (_cache[1] = ($event) => $setup.printView = $setup.printView == true ? false : true),
      color: "warning"
    }, {
      default: withCtx(() => _cache[6] || (_cache[6] = [
        createTextVNode("toggle print view")
      ])),
      _: 1
    })
  ], 64);
}
const WorkoutView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "WorkoutView.vue"]]);
export {
  WorkoutView as default
};


//# sourceMappingURL=data:application/json;base64,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LHdCQUFDRCxZQUFBO0FBQUE7QUFBQSwwQkEzRTFDLE9BNEUyQztBQUFBO0FBQUE7NEJBNUUzQ0UsZ0JBQUFDLGdCQUFBO0FBQUE7QUFBQSwwQkErRVk7QUFBQSwyQkFBZ0IsSUFBSztBQUFBLHdCQUFPSCxZQUFBO0FBQUE7QUFBQSwwQkEvRXhDLE9BZ0ZrRDtBQUFBO0FBQUE7NEJBaEZsREUsZ0JBQUFDLGdCQUFBO0FBQUE7QUFBQSwwQkFrRmtDO0FBQUE7QUFBQSx3QkFsRmxDLDhCQW9GMkYsc0RBQUFDLFlBQUE7QUFBQSxtQ0FBL0RILFFBQVksTUFBSTtBQUFBLDRCQUFHRCxZQUFBLE9BQVksYUFBZ0IsR0FBRztBQUFBO0FBQUE7NEJBcEY5RTtBQUFBO0FBQUE7QUFBQSxvQ0FBQU0sbUJBQUE7QUFBQTtBQUFBOztrQkFBQTtBQUFBO0FBQUE7Y0FBQTtBQUFBO0FBQUE7VUFBQTtBQUFBO0FBQUE7QUFBQSxZQStGTUEsbUJBR1U7QUFBQSxNQUZSUCxnQkFBQTtBQUFBLFFBQ29FQSxnQkFBQTtBQUFBLFVBQTVELGNBQUssaUNBQUUsTUFBa0I7QUFBQSxVQUFBQyxZQUFBO0FBQUEsWUFqR3pDLFNBaUdvRTtBQUFBO0FBQUE7Y0FqR3BFRSxnQkFBQTtBQUFBO0FBQUE7VUFtR29CO0FBQUE7QUFBQSxRQW5HcEIsOEJBQUFOLFVBQUEsR0FtR29EQyxtQkFBQTtBQUFBLFVBQUM7QUFBQSxVQUFhO0FBQUEsVUFBZ0I7QUFBQSxVQUFlLGFBQVk7QUFBQSxVQUNyRyxXQUFXO0FBQUEsVUFDVixjQUFHO0FBQUEsVUFyR1o7QUFBQTtBQUFBLG1DQUFBUyxtQkFBQTtBQUFBLE1BeUdFO0FBQUE7QUFBQSxJQUErRE4sWUFBQTtBQUFBLE1BQzdELE9BQU0sRUFBUztBQUFBO0FBQUEsTUExR25CO0FBQUE7QUFBQTtRQUFBRSxnQkFBQTtBQUFBO0FBQUEiLCJuYW1lcyI6WyJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUJsb2NrIiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlQ29tbWVudFZOb2RlIl0sImlnbm9yZUxpc3QiOlswXSwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9nZW9sb2NhdGlvbi9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9wYWdlcy9wbGFucy9Xb3Jrb3V0Vmlldy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuY29uc3QgR2VvbG9jYXRpb24gPSByZWdpc3RlclBsdWdpbignR2VvbG9jYXRpb24nLCB7XG4gICAgd2ViOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbihtID0+IG5ldyBtLkdlb2xvY2F0aW9uV2ViKCkpLFxufSk7XG5leHBvcnQgKiBmcm9tICcuL2RlZmluaXRpb25zJztcbmV4cG9ydCB7IEdlb2xvY2F0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgV29ya291dFBsYW4sIFdvcmtvdXQgfSBmcm9tICdzcmMvY29tcG9uZW50cy9tb2RlbHMnO1xuaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb24gfSBmcm9tICdAY2FwYWNpdG9yL2dlb2xvY2F0aW9uJztcbmltcG9ydCBBdWRpb1BsYXllciBmcm9tICdzcmMvY29tcG9uZW50cy9BdWRpb1BsYXllci52dWUnO1xuXG5jb25zdCBwcmludFZpZXcgPSByZWYoZmFsc2UpXG5cbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKVxuY29uc3Qgd29ya291dFBsYW4gPSBXb3Jrb3V0UGxhbi5jcmVhdGUoV29ya291dFBsYW4uZ2V0KE51bWJlci5wYXJzZUludChyb3V0ZS5wYXJhbXMuaWQgYXMgc3RyaW5nKSksIGZhbHNlKVxuXG5jb25zdCB3b3Jrb3V0cyA9IHdvcmtvdXRQbGFuLmluY2x1ZGVkV29ya291dHMubWFwKHdvcmtvdXQgPT5cbiAgV29ya291dC5jcmVhdGUod29ya291dCwgZmFsc2UpXG4pO1xuXG5jb25zdCBjdXJyZW50TG9jYXRpb24gPSByZWYod29ya291dFBsYW4ubG9jYXRpb24pXG5cbmNvbnN0IGdldEN1cnJlbnRMb2NhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBhd2FpdCBHZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKTtcbiAgY3VycmVudExvY2F0aW9uLnZhbHVlLmxvbiA9IGNvb3JkaW5hdGVzLmNvb3Jkcy5sb25naXR1ZGVcbiAgY3VycmVudExvY2F0aW9uLnZhbHVlLmxhdCA9IGNvb3JkaW5hdGVzLmNvb3Jkcy5sYXRpdHVkZVxuICB3b3Jrb3V0UGxhbi5sb2NhdGlvbiA9IGN1cnJlbnRMb2NhdGlvbi52YWx1ZVxufTtcblxud2F0Y2goY3VycmVudExvY2F0aW9uLnZhbHVlLCAoKSA9PiB7XG4gIFdvcmtvdXRQbGFuLmNyZWF0ZSh3b3Jrb3V0UGxhbiwgdHJ1ZSlcbn0pXG5cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzZWN0aW9uIGNsYXNzPVwiY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBxLWd1dHRlci1tZFwiPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJteS1jYXJkIHRleHQtd2hpdGVcIlxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IGZpdC1jb250ZW50OyBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCAjMDA5YzgyIDAlLCAjMzgzODNjIDEwMCUpOyB3aWR0aDoxMDAlOyBtYXgtd2lkdGg6IDczMnB4OyBwb3NpdGlvbjogcmVsYXRpdmU7XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIHt7IHdvcmtvdXRQbGFuLm5hbWUgfX1cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgICA8cS1saXN0IHYtaWY9XCJ3b3Jrb3V0UGxhbi5pbmNsdWRlZFdvcmtvdXRzLmxlbmd0aFwiIGRhcmsgYm9yZGVyZWQgc2VwYXJhdG9yPlxuICAgICAgICAgIDxxLWl0ZW0gdi1mb3I9XCJ3b3Jrb3V0IGluIHdvcmtvdXRzXCIgOmtleT1cIndvcmtvdXQuaWQhXCI+XG5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAge3sgd29ya291dC5leGVyY2lzZSgpLm5hbWUgfX1cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInRleHQtbm8td3JhcFwiIHN0eWxlPVwid2lkdGg6IG1heC1jb250ZW50OyBmbGV4OiB1bnNldDtcIj5cbiAgICAgICAgICAgICAgUmVwZXRpdGlvbnM6XG4gICAgICAgICAgICAgIHt7IHdvcmtvdXQucmVwcyB9fVxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGV4dC1uby13cmFwXCIgc3R5bGU9XCJ3aWR0aDogbWF4LWNvbnRlbnQ7IGZsZXg6IHVuc2V0O1wiPlxuICAgICAgICAgICAgICB8IFNldHM6XG4gICAgICAgICAgICAgIHt7IHdvcmtvdXQuc2V0cyB9fVxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC9xLWxpc3Q+XG5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIHYtZWxzZT5cbiAgICAgICAgICBUaGVyZSBhcmUgbm8gZXhlcmNpc2VzIGF0dGFjaGVkIHRvIHRoaXMgd29ya291dC4uXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgPC9xLWNhcmQ+XG5cbiAgICA8cS1jYXJkIHYtaWY9XCJ3b3Jrb3V0UGxhbi5pbmNsdWRlZFdvcmtvdXRzLmxlbmd0aFwiIGNsYXNzPVwibXktY2FyZCB0ZXh0LXdoaXRlXCJcbiAgICAgIHN0eWxlPVwiYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgIzAwOWM4MiAwJSwgIzM4MzgzYyAxMDAlKTsgbWF4LXdpZHRoOiA3MzJweDsgd2lkdGg6IDEwMCU7IHBvc2l0aW9uOiByZWxhdGl2ZTsgXCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIERlc2NyaXB0aW9uc1xuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgIDxxLWxpc3QgZGFyayBib3JkZXJlZCBzZXBhcmF0b3I+XG4gICAgICAgICAgPHEtaXRlbSB2LWZvcj1cIndvcmtvdXQgaW4gd29ya291dHNcIiA6a2V5PVwid29ya291dC5pZCFcIj5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cImNvbC0yXCIgc3R5bGU9XCJhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0OyBtaW4td2lkdGg6IDJyZW07XCI+XG4gICAgICAgICAgICAgIHt7IHdvcmtvdXQuZXhlcmNpc2UoKS5uYW1lIH19XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJjb2xcIiBzdHlsZT1cIm1heC13aWR0aDogNjE4cHg7IGp1c3RpZnktc2VsZjogZmxleC1lbmQ7XCI+XG4gICAgICAgICAgICAgIHt7IHdvcmtvdXQuZXhlcmNpc2UoKS5kZXNjcmlwdGlvbiB9fVxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiB2LWlmPVwid29ya291dC5leGVyY2lzZSgpLnZvaWNlTm90ZT8ucmVjb3JkRGF0YUJhc2U2NCAmJiAhcHJpbnRWaWV3XCI+XG5cbiAgICAgICAgICAgICAgPEF1ZGlvUGxheWVyIDppcy1kaXNwbGF5PVwidHJ1ZVwiIDp2b2ljZS1ub3RlPVwid29ya291dC5leGVyY2lzZSgpLnZvaWNlTm90ZVwiIC8+XG5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG5cblxuICAgICAgICA8L3EtbGlzdD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG5cbiAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8cD5Zb3UgY2FuIG5vdyByZWNvcmQgeW91ciBjdXJyZW50IGxvY2F0aW9uIGZvciB0aGUgd29ya291dCE8L3A+XG4gICAgICAgIDxxLWJ0biBAY2xpY2s9XCJnZXRDdXJyZW50TG9jYXRpb24oKVwiPlJlY29yZCBjdXJyZW50IGxvY2F0aW9uPC9xLWJ0bj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxpZnJhbWUgdi1pZj1cImN1cnJlbnRMb2NhdGlvbi5sYXRcIiB3aWR0aD1cIjMwMFwiIGhlaWdodD1cIjE3MFwiIGZyYW1lYm9yZGVyPVwiMFwiIHNjcm9sbGluZz1cIm5vXCIgbWFyZ2luaGVpZ2h0PVwiMFwiXG4gICAgICAgIG1hcmdpbndpZHRoPVwiMFwiXG4gICAgICAgIDpzcmM9XCJgaHR0cHM6Ly9tYXBzLmdvb2dsZS5jb20vbWFwcz9xPSR7Y3VycmVudExvY2F0aW9uLmxhdH0sJHtjdXJyZW50TG9jYXRpb24ubG9ufSZ6PTE0Jm91dHB1dD1lbWJlZGBcIiAvPlxuICAgIDwvZGl2PlxuICA8L3NlY3Rpb24+XG5cbiAgPHEtYnRuIHN0eWxlPVwicG9zaXRpb246Zml4ZWQ7IHJpZ2h0OjFyZW07IGJvdHRvbTogMXJlbTtcIiBAY2xpY2s9XCJwcmludFZpZXcgPSBwcmludFZpZXcgPT0gdHJ1ZSA/IGZhbHNlIDogdHJ1ZVwiXG4gICAgY29sb3I9XCJ3YXJuaW5nXCI+dG9nZ2xlIHByaW50IHZpZXc8L3EtYnRuPlxuXG48L3RlbXBsYXRlPlxuIl0sImZpbGUiOiJhc3NldHMvV29ya291dFZpZXctUEZjX2lPY2guanMifQ==