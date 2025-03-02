import { Q as QInput } from "./QInput-C7E9Be89.js";
import { G as defineComponent, r as ref, ac as useRoute, n as watch, ad as useRouter, ae as Notify, _ as _export_sfc, V as createElementBlock, I as openBlock, M as createBaseVNode, P as toDisplayString, L as createVNode, H as createBlock, a1 as createCommentVNode, U as normalizeClass, J as withCtx, T as QBtn, X as Fragment, Y as renderList, S as createTextVNode, w as withDirectives, R as Ripple } from "./index-DiEwj2lb.js";
import { Q as QItem, a as QItemSection } from "./QItem-CCDSUG9A.js";
import { Q as QList } from "./QList-H00wgHxr.js";
import { Q as QTooltip } from "./use-id-CSkcFI3i.js";
import { a as WorkoutPlan, W as Workout, E as Exercise } from "./models-i8VR3keN.js";
import { a as windowWidth, w as workoutCount, i as isMobile } from "./state-DHIPeIG6.js";
import "./use-dark-D3vguVup.js";
import "./scroll-DGwSptOL.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkoutForm",
  setup(__props, { expose: __expose }) {
    __expose();
    const route = useRoute();
    const router = useRouter();
    const title = ref("Edit workout plan");
    const flexDirection = ref(windowWidth.value < 600 ? "col" : "row");
    const planDetails = ref(WorkoutPlan.get(Number.parseInt(route.params.id)));
    if (!planDetails.value) {
      planDetails.value = WorkoutPlan.create(void 0, false);
      title.value = "create workout plan";
    } else {
      planDetails.value = WorkoutPlan.create(planDetails.value, false);
    }
    const workouts = ref(planDetails.value.includedWorkouts.map(
      (workout) => Workout.create({ ...workout }, false)
    ));
    function saveWorkout() {
      planDetails.value.includedWorkouts = workouts.value;
      planDetails.value.insert();
      if (title.value == "create workout plan") workoutCount.value += 1;
      router.go(-1);
    }
    function addWorkout(id) {
      workouts.value.push(
        Workout.create({ exerciseId: id })
      );
    }
    function deleteWorkout(workout) {
      workouts.value.splice(workouts.value.indexOf(workout), 1);
    }
    watch(windowWidth, () => {
      flexDirection.value = windowWidth.value < 700 ? "col" : "row";
    });
    function deleteSelf() {
      planDetails.value.delete();
      Notify.create("Deleted workout.");
      workoutCount.value -= 1;
      router.go(-1);
    }
    const __returned__ = { route, router, title, flexDirection, planDetails, workouts, saveWorkout, addWorkout, deleteWorkout, deleteSelf, get Exercise() {
      return Exercise;
    }, get isMobile() {
      return isMobile;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "text-h4" };
const _hoisted_2 = { class: "q-gutted-md q-card--bordered q-layout-padding" };
const _hoisted_3 = { class: "col reverse-wrap" };
const _hoisted_4 = { class: "col" };
const _hoisted_5 = {
  key: 0,
  class: "row q-gutter-md"
};
const _hoisted_6 = {
  key: 1,
  class: "row q-gutter-md"
};
const _hoisted_7 = { class: "col" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1, toDisplayString($setup.title), 1),
    createBaseVNode("form", _hoisted_2, [
      createVNode(QInput, {
        modelValue: $setup.planDetails.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.planDetails.name = $event),
        label: "Title",
        style: { "padding-bottom": "1rem" },
        "stack-label": "",
        placeholder: "E.G: Tuesday pull"
      }, null, 8, ["modelValue"]),
      createBaseVNode("div", {
        class: normalizeClass([$setup.flexDirection, "q-gutter-md"]),
        style: { "padding-bottom": "1rem" }
      }, [
        createBaseVNode("section", _hoisted_3, [
          _cache[3] || (_cache[3] = createBaseVNode("h2", { class: "text-h6" }, "Added workouts", -1)),
          $setup.workouts.length ? (openBlock(), createBlock(QList, {
            key: 0,
            bordered: "",
            separator: ""
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.workouts, (workout) => {
                return openBlock(), createBlock(QItem, {
                  key: workout.id
                }, {
                  default: withCtx(() => [
                    createBaseVNode("section", {
                      class: normalizeClass([$setup.flexDirection, "q-gutter-md items-center"]),
                      style: { "padding-top": "1rem" }
                    }, [
                      createBaseVNode("span", _hoisted_4, toDisplayString(workout.exercise().name), 1),
                      $setup.isMobile ? (openBlock(), createElementBlock("div", _hoisted_5, [
                        createVNode(QInput, {
                          class: "col",
                          filled: "",
                          modelValue: workout.reps,
                          "onUpdate:modelValue": ($event) => workout.reps = $event,
                          label: "reps",
                          dense: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(QInput, {
                          class: "col",
                          filled: "",
                          modelValue: workout.sets,
                          "onUpdate:modelValue": ($event) => workout.sets = $event,
                          label: "sets",
                          dense: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(QBtn, {
                          onClick: () => $setup.deleteWorkout(workout),
                          class: "col-auto",
                          icon: "delete"
                        }, null, 8, ["onClick"])
                      ])) : (openBlock(), createElementBlock("div", _hoisted_6, [
                        createVNode(QInput, {
                          class: "col",
                          filled: "",
                          modelValue: workout.reps,
                          "onUpdate:modelValue": ($event) => workout.reps = $event,
                          label: "reps",
                          dense: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(QInput, {
                          class: "col",
                          filled: "",
                          modelValue: workout.sets,
                          "onUpdate:modelValue": ($event) => workout.sets = $event,
                          label: "sets",
                          dense: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(QBtn, {
                          onClick: () => $setup.deleteWorkout(workout),
                          class: "col-auto",
                          icon: "delete"
                        }, null, 8, ["onClick"])
                      ]))
                    ], 2)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          })) : (openBlock(), createBlock(QList, {
            key: 1,
            bordered: "",
            separator: ""
          }, {
            default: withCtx(() => [
              createVNode(QItem, null, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode(" No exercises added. "),
                  createBaseVNode("br", null, null, -1),
                  createTextVNode(" Click a created workout to add one ")
                ])),
                _: 1
              })
            ]),
            _: 1
          }))
        ]),
        createBaseVNode("section", _hoisted_7, [
          _cache[6] || (_cache[6] = createBaseVNode("h2", { class: "text-h6" }, "Created Workouts", -1)),
          $setup.Exercise.all().length ? (openBlock(), createBlock(QList, {
            key: 0,
            bordered: "",
            separator: ""
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.Exercise.all(), (exercise) => {
                return withDirectives((openBlock(), createBlock(QItem, {
                  onClick: () => $setup.addWorkout(exercise.id),
                  key: exercise.id,
                  clickable: ""
                }, {
                  default: withCtx(() => [
                    createVNode(QItemSection, { class: "text-black" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(exercise.name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(QTooltip, null, {
                      default: withCtx(() => _cache[4] || (_cache[4] = [
                        createTextVNode(" Click to add ")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 2
                }, 1032, ["onClick"])), [
                  [Ripple]
                ]);
              }), 128))
            ]),
            _: 1
          })) : (openBlock(), createBlock(QList, { key: 1 }, {
            default: withCtx(() => _cache[5] || (_cache[5] = [
              createTextVNode(" No exercises exist yet. "),
              createBaseVNode("br", null, null, -1),
              createTextVNode(" Make one ")
            ])),
            _: 1
          }))
        ])
      ], 2),
      createVNode(QBtn, {
        onClick: $setup.saveWorkout,
        color: "accent"
      }, {
        default: withCtx(() => _cache[7] || (_cache[7] = [
          createTextVNode("save")
        ])),
        _: 1
      }),
      createVNode(QBtn, {
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.router.go(-1))
      }, {
        default: withCtx(() => _cache[8] || (_cache[8] = [
          createTextVNode("cancel")
        ])),
        _: 1
      }),
      $setup.title == "Edit workout plan" ? (openBlock(), createBlock(QBtn, {
        key: 0,
        onClick: $setup.deleteSelf
      }, {
        default: withCtx(() => _cache[9] || (_cache[9] = [
          createTextVNode("delete")
        ])),
        _: 1
      })) : createCommentVNode("", true)
    ])
  ], 64);
}
const WorkoutForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e80cbd40"], ["__file", "WorkoutForm.vue"]]);
export {
  WorkoutForm as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya291dEZvcm0tQ0Z6U002TjQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9wbGFucy9Xb3Jrb3V0Rm9ybS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gJ3F1YXNhcic7XG5pbXBvcnQgeyBFeGVyY2lzZSwgV29ya291dCwgV29ya291dFBsYW4gfSBmcm9tICdzcmMvY29tcG9uZW50cy9tb2RlbHMnO1xuaW1wb3J0IHsgcmVmLCB3YXRjaCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZSwgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgeyB3aW5kb3dXaWR0aCwgd29ya291dENvdW50LCBpc01vYmlsZSB9IGZyb20gJ3NyYy9jb21wb25lbnRzL3N0YXRlJztcblxuXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKClcbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbmNvbnN0IHRpdGxlID0gcmVmKCdFZGl0IHdvcmtvdXQgcGxhbicpXG5cbmNvbnN0IGZsZXhEaXJlY3Rpb24gPSByZWYod2luZG93V2lkdGgudmFsdWUgPCA2MDAgPyAnY29sJyA6ICdyb3cnKVxuXG5jb25zdCBwbGFuRGV0YWlscyA9IHJlZihXb3Jrb3V0UGxhbi5nZXQoTnVtYmVyLnBhcnNlSW50KHJvdXRlLnBhcmFtcy5pZCBhcyBzdHJpbmcpKSlcblxuaWYgKCFwbGFuRGV0YWlscy52YWx1ZSkge1xuICBwbGFuRGV0YWlscy52YWx1ZSA9IFdvcmtvdXRQbGFuLmNyZWF0ZSh1bmRlZmluZWQsIGZhbHNlKVxuICB0aXRsZS52YWx1ZSA9ICdjcmVhdGUgd29ya291dCBwbGFuJ1xufSBlbHNlIHtcbiAgcGxhbkRldGFpbHMudmFsdWUgPSBXb3Jrb3V0UGxhbi5jcmVhdGUocGxhbkRldGFpbHMudmFsdWUsIGZhbHNlKVxufVxuXG5jb25zdCB3b3Jrb3V0cyA9IHJlZihwbGFuRGV0YWlscy52YWx1ZS5pbmNsdWRlZFdvcmtvdXRzLm1hcCh3b3Jrb3V0ID0+XG4gIFdvcmtvdXQuY3JlYXRlKHsgLi4ud29ya291dCB9LCBmYWxzZSlcbikpO1xuXG5mdW5jdGlvbiBzYXZlV29ya291dCgpIHtcbiAgcGxhbkRldGFpbHMudmFsdWUhLmluY2x1ZGVkV29ya291dHMgPSB3b3Jrb3V0cy52YWx1ZVxuICBwbGFuRGV0YWlscy52YWx1ZSEuaW5zZXJ0KClcbiAgaWYgKHRpdGxlLnZhbHVlID09ICdjcmVhdGUgd29ya291dCBwbGFuJykgd29ya291dENvdW50LnZhbHVlICs9IDFcbiAgcm91dGVyLmdvKC0xKVxufVxuXG5mdW5jdGlvbiBhZGRXb3Jrb3V0KGlkOiBudW1iZXIpIHtcbiAgd29ya291dHMudmFsdWUucHVzaChcbiAgICBXb3Jrb3V0LmNyZWF0ZSh7IGV4ZXJjaXNlSWQ6IGlkIH0pXG4gIClcbn1cblxuZnVuY3Rpb24gZGVsZXRlV29ya291dCh3b3Jrb3V0OiBXb3Jrb3V0KSB7XG4gIHdvcmtvdXRzLnZhbHVlLnNwbGljZSh3b3Jrb3V0cy52YWx1ZS5pbmRleE9mKHdvcmtvdXQpLCAxKVxufVxuXG53YXRjaCh3aW5kb3dXaWR0aCwgKCkgPT4ge1xuICBmbGV4RGlyZWN0aW9uLnZhbHVlID0gd2luZG93V2lkdGgudmFsdWUgPCA3MDAgPyAnY29sJyA6ICdyb3cnXG59KVxuXG5mdW5jdGlvbiBkZWxldGVTZWxmKCkge1xuICBwbGFuRGV0YWlscy52YWx1ZSEuZGVsZXRlKClcbiAgTm90aWZ5LmNyZWF0ZSgnRGVsZXRlZCB3b3Jrb3V0LicpXG4gIHdvcmtvdXRDb3VudC52YWx1ZSAtPSAxXG4gIHJvdXRlci5nbygtMSlcbn1cbjwvc2NyaXB0PlxuPHRlbXBsYXRlPlxuICA8aDEgY2xhc3M9XCJ0ZXh0LWg0XCI+e3sgdGl0bGUgfX08L2gxPlxuICA8Zm9ybSBjbGFzcz1cIiBxLWd1dHRlZC1tZCBxLWNhcmQtLWJvcmRlcmVkIHEtbGF5b3V0LXBhZGRpbmdcIj5cbiAgICA8cS1pbnB1dCB2LW1vZGVsPVwicGxhbkRldGFpbHMhLm5hbWVcIiBsYWJlbD1cIlRpdGxlXCIgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTogMXJlbTtcIiBzdGFjay1sYWJlbFxuICAgICAgcGxhY2Vob2xkZXI9XCJFLkc6IFR1ZXNkYXkgcHVsbFwiIC8+XG4gICAgPGRpdiA6Y2xhc3M9XCJmbGV4RGlyZWN0aW9uXCIgY2xhc3M9XCJxLWd1dHRlci1tZFwiIHN0eWxlPVwicGFkZGluZy1ib3R0b206IDFyZW07XCI+XG4gICAgICA8c2VjdGlvbiBjbGFzcz1cIiBjb2wgcmV2ZXJzZS13cmFwXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cInRleHQtaDZcIj5BZGRlZCB3b3Jrb3V0czwvaDI+XG4gICAgICAgIDxxLWxpc3QgYm9yZGVyZWQgc2VwYXJhdG9yIHYtaWY9XCJ3b3Jrb3V0cy5sZW5ndGhcIj5cbiAgICAgICAgICA8cS1pdGVtIHYtZm9yPVwid29ya291dCBpbiB3b3Jrb3V0c1wiIDprZXk9XCJ3b3Jrb3V0LmlkIGFzIG51bWJlclwiPlxuICAgICAgICAgICAgPHNlY3Rpb24gOmNsYXNzPVwiZmxleERpcmVjdGlvblwiIHN0eWxlPVwicGFkZGluZy10b3A6IDFyZW07XCIgY2xhc3M9XCJxLWd1dHRlci1tZCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICB7eyB3b3Jrb3V0LmV4ZXJjaXNlKCkubmFtZSB9fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgdi1pZj1cImlzTW9iaWxlXCIgY2xhc3M9XCJyb3cgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgICAgICA8cS1pbnB1dCBjbGFzcz1cImNvbFwiIGZpbGxlZCB2LW1vZGVsPVwid29ya291dC5yZXBzXCIgbGFiZWw9XCJyZXBzXCIgOmRlbnNlPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXQgY2xhc3M9XCJjb2xcIiBmaWxsZWQgdi1tb2RlbD1cIndvcmtvdXQuc2V0c1wiIGxhYmVsPVwic2V0c1wiIDpkZW5zZT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgIDxxLWJ0biBAY2xpY2s9XCIoKSA9PiBkZWxldGVXb3Jrb3V0KHdvcmtvdXQpXCIgY2xhc3M9XCJjb2wtYXV0b1wiIGljb249XCJkZWxldGVcIiAvPlxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInJvdyBxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgICAgIDxxLWlucHV0IGNsYXNzPVwiY29sXCIgZmlsbGVkIHYtbW9kZWw9XCJ3b3Jrb3V0LnJlcHNcIiBsYWJlbD1cInJlcHNcIiA6ZGVuc2U9XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICA8cS1pbnB1dCBjbGFzcz1cImNvbFwiIGZpbGxlZCB2LW1vZGVsPVwid29ya291dC5zZXRzXCIgbGFiZWw9XCJzZXRzXCIgOmRlbnNlPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgPHEtYnRuIEBjbGljaz1cIigpID0+IGRlbGV0ZVdvcmtvdXQod29ya291dClcIiBjbGFzcz1cImNvbC1hdXRvXCIgaWNvbj1cImRlbGV0ZVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBzZXBhcmF0b3Igdi1lbHNlPlxuICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICBObyBleGVyY2lzZXMgYWRkZWQuIDxicj5cbiAgICAgICAgICAgIENsaWNrIGEgY3JlYXRlZCB3b3Jrb3V0IHRvIGFkZCBvbmVcbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cInRleHQtaDZcIj5DcmVhdGVkIFdvcmtvdXRzPC9oMj5cbiAgICAgICAgPHEtbGlzdCB2LWlmPVwiRXhlcmNpc2UuYWxsKCkubGVuZ3RoXCIgYm9yZGVyZWQgc2VwYXJhdG9yPlxuICAgICAgICAgIDxxLWl0ZW0gQGNsaWNrPVwiKCkgPT4gYWRkV29ya291dChleGVyY2lzZS5pZCEpXCIgdi1mb3I9XCJleGVyY2lzZSBpbiBFeGVyY2lzZS5hbGwoKVwiIDprZXk9XCJleGVyY2lzZS5pZCFcIlxuICAgICAgICAgICAgY2xpY2thYmxlIHYtcmlwcGxlPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGV4dC1ibGFja1wiPlxuICAgICAgICAgICAgICB7eyBleGVyY2lzZS5uYW1lIH19XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtdG9vbHRpcD5cbiAgICAgICAgICAgICAgQ2xpY2sgdG8gYWRkXG4gICAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgIDxxLWxpc3Qgdi1lbHNlPlxuICAgICAgICAgIE5vIGV4ZXJjaXNlcyBleGlzdCB5ZXQuIDxicj4gTWFrZSBvbmVcbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG5cbiAgICA8cS1idG4gQGNsaWNrPVwic2F2ZVdvcmtvdXRcIiBjb2xvcj1cImFjY2VudFwiPnNhdmU8L3EtYnRuPlxuICAgIDxxLWJ0biBAY2xpY2s9XCJyb3V0ZXIuZ28oLTEpXCI+Y2FuY2VsPC9xLWJ0bj5cbiAgICA8cS1idG4gdi1pZj1cInRpdGxlID09ICdFZGl0IHdvcmtvdXQgcGxhbidcIiBAY2xpY2s9XCJkZWxldGVTZWxmXCI+ZGVsZXRlPC9xLWJ0bj5cbiAgPC9mb3JtPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxuKiB7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZVZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZUJsb2NrIiwiX3JlbmRlckxpc3QiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfd2l0aERpcmVjdGl2ZXMiLCJfY3JlYXRlQ29tbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUEsVUFBTSxRQUFRLFNBQVM7QUFDdkIsVUFBTSxTQUFTLFVBQVU7QUFFbkIsVUFBQSxRQUFRLElBQUksbUJBQW1CO0FBRXJDLFVBQU0sZ0JBQWdCLElBQUksWUFBWSxRQUFRLE1BQU0sUUFBUSxLQUFLO0FBRTNELFVBQUEsY0FBYyxJQUFJLFlBQVksSUFBSSxPQUFPLFNBQVMsTUFBTSxPQUFPLEVBQVksQ0FBQyxDQUFDO0FBRS9FLFFBQUEsQ0FBQyxZQUFZLE9BQU87QUFDdEIsa0JBQVksUUFBUSxZQUFZLE9BQU8sUUFBVyxLQUFLO0FBQ3ZELFlBQU0sUUFBUTtBQUFBLElBQUEsT0FDVDtBQUNMLGtCQUFZLFFBQVEsWUFBWSxPQUFPLFlBQVksT0FBTyxLQUFLO0FBQUEsSUFBQTtBQUdqRSxVQUFNLFdBQVcsSUFBSSxZQUFZLE1BQU0saUJBQWlCO0FBQUEsTUFBSSxhQUMxRCxRQUFRLE9BQU8sRUFBRSxHQUFHLFdBQVcsS0FBSztBQUFBLElBQUEsQ0FDckM7QUFFRCxhQUFTLGNBQWM7QUFDVCxrQkFBQSxNQUFPLG1CQUFtQixTQUFTO0FBQy9DLGtCQUFZLE1BQU8sT0FBTztBQUMxQixVQUFJLE1BQU0sU0FBUyxzQkFBdUIsY0FBYSxTQUFTO0FBQ2hFLGFBQU8sR0FBRyxFQUFFO0FBQUEsSUFBQTtBQUdkLGFBQVMsV0FBVyxJQUFZO0FBQzlCLGVBQVMsTUFBTTtBQUFBLFFBQ2IsUUFBUSxP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
