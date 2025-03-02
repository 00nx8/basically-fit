import { c as createComponent, N as useAlignProps, O as useAlign, a as computed, h, b as hSlot, G as defineComponent, _ as _export_sfc, H as createBlock, I as openBlock, J as withCtx, L as createVNode, M as createBaseVNode, P as toDisplayString, S as createTextVNode, T as QBtn, U as normalizeClass, V as createElementBlock, X as Fragment, Y as renderList, Q as QIcon } from "./index-DiEwj2lb.js";
import { W as Workout, E as Exercise, a as WorkoutPlan } from "./models-i8VR3keN.js";
import { Q as QCardSection, a as QCard } from "./QCard-DsWasmUw.js";
import { Q as QSeparator } from "./QSeparator-p9o6WyME.js";
import { e as exerciseCount } from "./state-DHIPeIG6.js";
import "./use-dark-D3vguVup.js";
const QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ExercisePreview",
  props: {
    exercise: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    function deleteExercise() {
      Workout.all().find((workout) => workout.exerciseId == props.exercise.id)?.delete();
      Exercise.get(props.exercise.id)?.delete();
      WorkoutPlan.all().forEach((workout) => workout.cleanseWorkouts());
      exerciseCount.value -= 1;
    }
    const __returned__ = { props, deleteExercise };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "row items-center no-wrap" };
const _hoisted_2$1 = { class: "col" };
const _hoisted_3 = { class: "text-h6" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, {
    flat: "",
    bordered: "",
    class: normalizeClass(["my-card", _ctx.$q.dark.isActive ? "bg-grey-9" : "bg-grey-2"])
  }, {
    default: withCtx(() => [
      createVNode(QCardSection, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3, toDisplayString($setup.props.exercise.name), 1)
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(QCardSection, null, {
        default: withCtx(() => [
          createTextVNode(toDisplayString($setup.props.exercise?.description), 1)
        ]),
        _: 1
      }),
      createVNode(QSeparator),
      createVNode(QCardActions, null, {
        default: withCtx(() => [
          createVNode(QBtn, {
            to: { name: "editExercise", params: { id: $setup.props.exercise.id } },
            flat: ""
          }, {
            default: withCtx(() => _cache[0] || (_cache[0] = [
              createTextVNode("Edit")
            ])),
            _: 1
          }, 8, ["to"]),
          createVNode(QBtn, {
            flat: "",
            onClick: $setup.deleteExercise
          }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode("Delete")
            ])),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["class"]);
}
const ExercisePreview = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "ExercisePreview.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExerciseLibrary",
  setup(__props, { expose: __expose }) {
    __expose();
    const exercises = Exercise.all();
    const __returned__ = { exercises, ExercisePreview };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  key: 0,
  class: "col q-gutter-md"
};
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    $setup.exercises.length ? (openBlock(), createElementBlock("section", _hoisted_1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.exercises, (exercise) => {
        return openBlock(), createBlock($setup["ExercisePreview"], {
          exercise,
          key: exercise.id
        }, null, 8, ["exercise"]);
      }), 128))
    ])) : (openBlock(), createElementBlock("p", _hoisted_2, " No exercises yet... Make one !")),
    createVNode(QBtn, {
      to: { name: "editExercise", params: { id: 0 } },
      rounded: "",
      class: "fixed fixed-bottom-right z-marginals",
      style: { "right": "1rem", "bottom": "1rem" },
      color: "primary"
    }, {
      default: withCtx(() => [
        createVNode(QIcon, { name: "add" })
      ]),
      _: 1
    })
  ], 64);
}
const ExerciseLibrary = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ExerciseLibrary.vue"]]);
export {
  ExerciseLibrary as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhlcmNpc2VMaWJyYXJ5LUJ1M1VWVTBULmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NhcmQvUUNhcmRBY3Rpb25zLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRXhlcmNpc2VQcmV2aWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9leGVyY2lzZS9FeGVyY2lzZUxpYnJhcnkudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQWxpZ24sIHsgdXNlQWxpZ25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWFsaWduL3VzZS1hbGlnbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2FyZEFjdGlvbnMnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQWxpZ25Qcm9wcyxcbiAgICB2ZXJ0aWNhbDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgYWxpZ25DbGFzcyA9IHVzZUFsaWduKHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1jYXJkX19hY3Rpb25zICR7IGFsaWduQ2xhc3MudmFsdWUgfWBcbiAgICAgICsgYCBxLWNhcmRfX2FjdGlvbnMtLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3ZlcnQgY29sdW1uJyA6ICdob3JpeiByb3cnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgRXhlcmNpc2UsIFdvcmtvdXQsIFdvcmtvdXRQbGFuIH0gZnJvbSAnc3JjL2NvbXBvbmVudHMvbW9kZWxzJztcbmltcG9ydCB7IGV4ZXJjaXNlQ291bnQgfSBmcm9tICcuL3N0YXRlJztcblxuXG5pbnRlcmZhY2UgcHJvcHBlZEV4ZXJjaXNlIHtcbiAgaWQ/OiBudW1iZXIgfCB1bmRlZmluZWQsXG4gIG5hbWU/OiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nXG59XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBleGVyY2lzZTogUGFydGlhbDxwcm9wcGVkRXhlcmNpc2U+XG59PigpXG5cbmZ1bmN0aW9uIGRlbGV0ZUV4ZXJjaXNlKCkge1xuICBXb3Jrb3V0LmFsbCgpLmZpbmQod29ya291dCA9PiB3b3Jrb3V0LmV4ZXJjaXNlSWQgPT0gcHJvcHMuZXhlcmNpc2UuaWQpPy5kZWxldGUoKVxuICBFeGVyY2lzZS5nZXQocHJvcHMuZXhlcmNpc2UuaWQgYXMgbnVtYmVyKT8uZGVsZXRlKClcbiAgV29ya291dFBsYW4uYWxsKCkuZm9yRWFjaCh3b3Jrb3V0ID0+IHdvcmtvdXQuY2xlYW5zZVdvcmtvdXRzKCkpXG4gIGV4ZXJjaXNlQ291bnQudmFsdWUgLT0gMVxufVxuPC9zY3JpcHQ+XG5cblxuPHRlbXBsYXRlPlxuICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZCBjbGFzcz1cIm15LWNhcmRcIiA6Y2xhc3M9XCIkcS5kYXJrLmlzQWN0aXZlID8gJ2JnLWdyZXktOScgOiAnYmctZ3JleS0yJ1wiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBuby13cmFwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj57eyBwcm9wcy5leGVyY2lzZS5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICB7eyBwcm9wcy5leGVyY2lzZT8uZGVzY3JpcHRpb24gfX1cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciAvPlxuXG4gICAgICA8cS1jYXJkLWFjdGlvbnM+XG4gICAgICAgIDxxLWJ0biA6dG89XCJ7bmFtZTogJ2VkaXRFeGVyY2lzZScsIHBhcmFtcyA6IHtpZDogcHJvcHMuZXhlcmNpc2UuaWR9fVwiIGZsYXQ+RWRpdDwvcS1idG4+XG4gICAgICAgIDxxLWJ0biBmbGF0IEBjbGljaz1cImRlbGV0ZUV4ZXJjaXNlXCIgPkRlbGV0ZTwvcS1idG4+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuIiwiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IEV4ZXJjaXNlIH0gZnJvbSAnc3JjL2NvbXBvbmVudHMvbW9kZWxzJztcbmltcG9ydCBFeGVyY2lzZVByZXZpZXcgZnJvbSAnc3JjL2NvbXBvbmVudHMvRXhlcmNpc2VQcmV2aWV3LnZ1ZSc7XG5cbmNvbnN0IGV4ZXJjaXNlcyA9IEV4ZXJjaXNlLmFsbCgpXG5cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzZWN0aW9uIHYtaWY9XCJleGVyY2lzZXMubGVuZ3RoXCIgY2xhc3M9XCJjb2wgcS1ndXR0ZXItbWRcIj5cbiAgICA8RXhlcmNpc2VQcmV2aWV3IHYtZm9yPVwiZXhlcmNpc2UgaW4gZXhlcmNpc2VzXCIgOmV4ZXJjaXNlPVwiZXhlcmNpc2VcIiA6a2V5PVwiZXhlcmNpc2UuaWQhXCIvPlxuICA8L3NlY3Rpb24+XG4gIDxwIHYtZWxzZT4gTm8gZXhlcmNpc2VzIHlldC4uLiBNYWtlIG9uZSAhPC9wPlxuICA8cS1idG4gOnRvPVwie25hbWU6ICdlZGl0RXhlcmNpc2UnLCBwYXJhbXM6IHtpZDogMH19XCIgcm91bmRlZCBjbGFzcz1cImZpeGVkIGZpeGVkLWJvdHRvbS1yaWdodCB6LW1hcmdpbmFsc1wiIHN0eWxlPVwicmlnaHQ6IDFyZW07IGJvdHRvbTogMXJlbTtcIiBjb2xvcj1cInByaW1hcnlcIj5cbiAgICA8cS1pY29uIG5hbWU9XCJhZGRcIj48L3EtaWNvbj5cbiAgPC9xLWJ0bj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cblxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfaG9pc3RlZF8xIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl9ub3JtYWxpemVDbGFzcyIsIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ob2lzdGVkXzIiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT0EsTUFBQSxlQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILFVBQVU7QUFBQSxFQUNYO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sYUFBYSxTQUFTLEtBQUs7QUFFakMsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixtQkFBb0IsV0FBVyxLQUFPLHFCQUNkLE1BQU0sYUFBYSxPQUFPLGdCQUFnQixXQUFhO0FBQUEsSUFDckY7QUFFSSxXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLFNBQVMsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3hFO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUNkRCxVQUFNLFFBQVE7QUFJZCxh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
