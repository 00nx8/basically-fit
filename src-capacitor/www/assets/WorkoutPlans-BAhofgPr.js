import { c as createComponent, a as computed, h, b as hSlot, o as onBeforeUnmount, Z as Transition, $ as shallowReactive, u as useRouterLinkProps, g as getCurrentInstance, r as ref, n as watch, w as withDirectives, a0 as vShow, Q as QIcon, k as stopAndPrevent, G as defineComponent, _ as _export_sfc, H as createBlock, I as openBlock, J as withCtx, L as createVNode, M as createBaseVNode, T as QBtn, S as createTextVNode, P as toDisplayString, V as createElementBlock, Y as renderList, a1 as createCommentVNode, X as Fragment } from "./index-DiEwj2lb.js";
import { W as Workout, a as WorkoutPlan } from "./models-i8VR3keN.js";
import { Q as QCardSection, a as QCard } from "./QCard-DsWasmUw.js";
import { u as useModelToggleEmits, a as useModelToggleProps, b as useId, c as useModelToggle, Q as QTooltip } from "./use-id-CSkcFI3i.js";
import { Q as QItem, a as QItemSection } from "./QItem-CCDSUG9A.js";
import { Q as QSeparator } from "./QSeparator-p9o6WyME.js";
import { u as useDarkProps, a as useDark } from "./use-dark-D3vguVup.js";
import { u as uid } from "./scroll-DGwSptOL.js";
import { Q as QList } from "./QList-H00wgHxr.js";
import { w as workoutCount, i as isMobile } from "./state-DHIPeIG6.js";
const QItemLabel = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(
      () => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : "")
    );
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
const QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer = null, timerFallback = null, animListener, lastEvent;
    function cleanup() {
      doneFn && doneFn();
      doneFn = null;
      animating = false;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (timerFallback !== null) {
        clearTimeout(timerFallback);
        timerFallback = null;
      }
      element !== void 0 && element.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
        el.style.overflowY = "hidden";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = `${el.scrollHeight}px`;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        el.style.overflowY = "hidden";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = 0;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);
const QExpansionItem = createComponent({
  name: "QExpansionItem",
  props: {
    ...useRouterLinkProps,
    ...useModelToggleProps,
    ...useDarkProps,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: {},
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "afterShow",
    "afterHide"
  ],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const showing = ref(
      props.modelValue !== null ? props.modelValue : props.defaultOpened
    );
    const blurTargetRef = ref(null);
    const targetUid = useId();
    const { show, hide, toggle } = useModelToggle({ showing });
    let uniqueId, exitGroup;
    const classes = computed(
      () => `q-expansion-item q-item-type q-expansion-item--${showing.value === true ? "expanded" : "collapsed"} q-expansion-item--${props.popup === true ? "popup" : "standard"}`
    );
    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: props.contentInsetLevel * 56 + "px"
      };
    });
    const hasLink = computed(
      () => props.disable !== true && (props.href !== void 0 || props.to !== void 0 && props.to !== null && props.to !== "")
    );
    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach((key) => {
        acc[key] = props[key];
      });
      return acc;
    });
    const isClickable = computed(
      () => hasLink.value === true || props.expandIconToggle !== true
    );
    const expansionIcon = computed(() => props.expandedIcon !== void 0 && showing.value === true ? props.expandedIcon : props.expandIcon || $q.iconSet.expansionItem[props.denseToggle === true ? "denseIcon" : "icon"]);
    const activeToggleIcon = computed(
      () => props.disable !== true && (hasLink.value === true || props.expandIconToggle === true)
    );
    const headerSlotScope = computed(() => ({
      expanded: showing.value === true,
      detailsId: targetUid.value,
      toggle,
      show,
      hide
    }));
    const toggleAriaAttrs = computed(() => {
      const toggleAriaLabel = props.toggleAriaLabel !== void 0 ? props.toggleAriaLabel : $q.lang.label[showing.value === true ? "collapse" : "expand"](props.label);
      return {
        role: "button",
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-controls": targetUid.value,
        "aria-label": toggleAriaLabel
      };
    });
    watch(() => props.group, (name) => {
      exitGroup !== void 0 && exitGroup();
      name !== void 0 && enterGroup();
    });
    function onHeaderClick(e) {
      hasLink.value !== true && toggle(e);
      emit("click", e);
    }
    function toggleIconKeyboard(e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }
    function toggleIcon(e, keyboard) {
      keyboard !== true && blurTargetRef.value !== null && blurTargetRef.value.focus();
      toggle(e);
      stopAndPrevent(e);
    }
    function onShow() {
      emit("afterShow");
    }
    function onHide() {
      emit("afterHide");
    }
    function enterGroup() {
      if (uniqueId === void 0) {
        uniqueId = uid();
      }
      if (showing.value === true) {
        itemGroups[props.group] = uniqueId;
      }
      const show2 = watch(showing, (val) => {
        if (val === true) {
          itemGroups[props.group] = uniqueId;
        } else if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
      });
      const group = watch(
        () => itemGroups[props.group],
        (val, oldVal) => {
          if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
            hide();
          }
        }
      );
      exitGroup = () => {
        show2();
        group();
        if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
        exitGroup = void 0;
      };
    }
    function getToggleIcon() {
      const data = {
        class: [
          `q-focusable relative-position cursor-pointer${props.denseToggle === true && props.switchToggleSide === true ? " items-end" : ""}`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };
      const child = [
        h(QIcon, {
          class: "q-expansion-item__toggle-icon" + (props.expandedIcon === void 0 && showing.value === true ? " q-expansion-item__toggle-icon--rotated" : ""),
          name: expansionIcon.value
        })
      ];
      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          ...toggleAriaAttrs.value,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });
        child.unshift(
          h("div", {
            ref: blurTargetRef,
            class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
            tabindex: -1
          })
        );
      }
      return h(QItemSection, data, () => child);
    }
    function getHeaderChild() {
      let child;
      if (slots.header !== void 0) {
        child = [].concat(slots.header(headerSlotScope.value));
      } else {
        child = [
          h(QItemSection, () => [
            h(QItemLabel, { lines: props.labelLines }, () => props.label || ""),
            props.caption ? h(QItemLabel, { lines: props.captionLines, caption: true }, () => props.caption) : null
          ])
        ];
        props.icon && child[props.switchToggleSide === true ? "push" : "unshift"](
          h(QItemSection, {
            side: props.switchToggleSide === true,
            avatar: props.switchToggleSide !== true
          }, () => h(QIcon, { name: props.icon }))
        );
      }
      if (props.disable !== true && props.hideExpandIcon !== true) {
        child[props.switchToggleSide === true ? "unshift" : "push"](
          getToggleIcon()
        );
      }
      return child;
    }
    function getHeader() {
      const data = {
        ref: "item",
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };
      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;
        Object.assign(
          data,
          hasLink.value === true ? linkProps.value : toggleAriaAttrs.value
        );
      }
      return h(QItem, data, getHeaderChild);
    }
    function getTransitionChild() {
      return withDirectives(
        h("div", {
          key: "e-content",
          class: "q-expansion-item__content relative-position",
          style: contentStyle.value,
          id: targetUid.value
        }, hSlot(slots.default)),
        [[
          vShow,
          showing.value
        ]]
      );
    }
    function getContent() {
      const node = [
        getHeader(),
        h(QSlideTransition, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];
      if (props.expandSeparator === true) {
        node.push(
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
            dark: isDark.value
          }),
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
            dark: isDark.value
          })
        );
      }
      return node;
    }
    props.group !== void 0 && enterGroup();
    onBeforeUnmount(() => {
      exitGroup !== void 0 && exitGroup();
    });
    return () => h("div", { class: classes.value }, [
      h("div", { class: "q-expansion-item__container relative-position" }, getContent())
    ]);
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PlanPreview",
  props: {
    workoutPlan: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    function deleteExercise() {
      WorkoutPlan.get(props.workoutPlan.id)?.delete();
      workoutCount.value -= 1;
    }
    const workouts = props.workoutPlan.includedWorkouts.map(
      (workout) => Workout.create(workout, false)
    );
    const __returned__ = { props, deleteExercise, workouts, get isMobile() {
      return isMobile;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { style: { "position": "absolute", "right": "1rem" } };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, {
    class: "my-card text-white",
    style: { "background": "radial-gradient(circle, #009c82 0%, #38383c 100%)", "position": "relative", "padding-bottom": "3rem", "width": "100%" }
  }, {
    default: withCtx(() => [
      createVNode(QCardSection, null, {
        default: withCtx(() => [
          createVNode(QBtn, {
            to: { name: "workoutView", params: { id: $setup.props.workoutPlan.id } },
            flat: "",
            class: "text-h6"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.props.workoutPlan.name ? $setup.props.workoutPlan.name : "no title"), 1)
            ]),
            _: 1
          }, 8, ["to"])
        ]),
        _: 1
      }),
      createVNode(QCardSection, { class: "q-pt-none" }, {
        default: withCtx(() => [
          $setup.props.workoutPlan.includedWorkouts.length ? (openBlock(), createBlock(QList, {
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
                    $setup.isMobile ? (openBlock(), createBlock(QTooltip, { key: 0 }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(workout.exercise().description), 1)
                      ]),
                      _: 2
                    }, 1024)) : createCommentVNode("", true),
                    createVNode(QItemSection, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(workout.exercise().name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    !$setup.isMobile ? (openBlock(), createBlock(QItemSection, {
                      key: 1,
                      style: { "max-width": "15rem" }
                    }, {
                      default: withCtx(() => [
                        createVNode(QExpansionItem, {
                          popup: "",
                          label: "Description"
                        }, {
                          default: withCtx(() => [
                            createVNode(QCard, null, {
                              default: withCtx(() => [
                                createVNode(QCardSection, { style: { "background-color": "#38383c" } }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(workout.exercise().description), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)) : createCommentVNode("", true),
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
            default: withCtx(() => _cache[0] || (_cache[0] = [
              createTextVNode(" There are no exercises attached to this workout.. ")
            ])),
            _: 1
          }))
        ]),
        _: 1
      }),
      createBaseVNode("div", _hoisted_1$1, [
        createVNode(QBtn, {
          flat: "",
          to: { name: "editPlan", params: { id: $setup.props.workoutPlan.id } }
        }, {
          default: withCtx(() => _cache[1] || (_cache[1] = [
            createTextVNode("edit")
          ])),
          _: 1
        }, 8, ["to"]),
        createVNode(QBtn, {
          flat: "",
          onClick: $setup.deleteExercise
        }, {
          default: withCtx(() => _cache[2] || (_cache[2] = [
            createTextVNode("delete")
          ])),
          _: 1
        })
      ])
    ]),
    _: 1
  });
}
const PlanPreview = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "PlanPreview.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkoutPlans",
  setup(__props, { expose: __expose }) {
    __expose();
    const workoutPlans = WorkoutPlan.all();
    const __returned__ = { workoutPlans, get WorkoutPlan() {
      return WorkoutPlan;
    }, PlanPreview };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  key: 0,
  class: "q-gutter-md row"
};
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _cache[0] || (_cache[0] = createBaseVNode("h1", { class: "text-h3" }, "Workout Plans", -1)),
    $setup.workoutPlans.length ? (openBlock(), createElementBlock("section", _hoisted_1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.workoutPlans, (plan) => {
        return openBlock(), createBlock($setup["PlanPreview"], {
          workoutPlan: $setup.WorkoutPlan.create(plan, false),
          key: plan.id
        }, null, 8, ["workoutPlan"]);
      }), 128))
    ])) : (openBlock(), createElementBlock("p", _hoisted_2, "There are no plans yet, Make one!")),
    createVNode(QBtn, {
      to: { name: "editPlan", params: { id: 0 } },
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
const WorkoutPlans = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "WorkoutPlans.vue"]]);
export {
  WorkoutPlans as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya291dFBsYW5zLUJBaG9mZ1ByLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW1MYWJlbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2xpZGUtdHJhbnNpdGlvbi9RU2xpZGVUcmFuc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9leHBhbnNpb24taXRlbS9RRXhwYW5zaW9uSXRlbS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1BsYW5QcmV2aWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9wbGFucy9Xb3Jrb3V0UGxhbnMudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtTGFiZWwnLFxuXG4gIHByb3BzOiB7XG4gICAgb3ZlcmxpbmU6IEJvb2xlYW4sXG4gICAgY2FwdGlvbjogQm9vbGVhbixcbiAgICBoZWFkZXI6IEJvb2xlYW4sXG4gICAgbGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgcGFyc2VkTGluZXMgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5saW5lcywgMTApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtX19sYWJlbCdcbiAgICAgICsgKHByb3BzLm92ZXJsaW5lID09PSB0cnVlID8gJyBxLWl0ZW1fX2xhYmVsLS1vdmVybGluZSB0ZXh0LW92ZXJsaW5lJyA6ICcnKVxuICAgICAgKyAocHJvcHMuY2FwdGlvbiA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19sYWJlbC0tY2FwdGlvbiB0ZXh0LWNhcHRpb24nIDogJycpXG4gICAgICArIChwcm9wcy5oZWFkZXIgPT09IHRydWUgPyAnIHEtaXRlbV9fbGFiZWwtLWhlYWRlcicgOiAnJylcbiAgICAgICsgKHBhcnNlZExpbmVzLnZhbHVlID09PSAxID8gJyBlbGxpcHNpcycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5saW5lcyAhPT0gdm9pZCAwICYmIHBhcnNlZExpbmVzLnZhbHVlID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICctd2Via2l0LWJveCcsXG4gICAgICAgICAgICAnLXdlYmtpdC1ib3gtb3JpZW50JzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgICctd2Via2l0LWxpbmUtY2xhbXAnOiBwYXJzZWRMaW5lcy52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2xpZGVUcmFuc2l0aW9uJyxcblxuICBwcm9wczoge1xuICAgIGFwcGVhcjogQm9vbGVhbixcbiAgICBkdXJhdGlvbjoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdzaG93JywgJ2hpZGUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBsZXQgYW5pbWF0aW5nID0gZmFsc2UsIGRvbmVGbiwgZWxlbWVudFxuICAgIGxldCB0aW1lciA9IG51bGwsIHRpbWVyRmFsbGJhY2sgPSBudWxsLCBhbmltTGlzdGVuZXIsIGxhc3RFdmVudFxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBkb25lRm4gJiYgZG9uZUZuKClcbiAgICAgIGRvbmVGbiA9IG51bGxcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlXG5cbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGltZXJGYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJGYWxsYmFjaylcbiAgICAgICAgdGltZXJGYWxsYmFjayA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCAhPT0gdm9pZCAwICYmIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFuaW1MaXN0ZW5lcilcbiAgICAgIGFuaW1MaXN0ZW5lciA9IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWdpbiAoZWwsIGhlaWdodCwgZG9uZSkge1xuICAgICAgLy8gaGVyZSBvdmVyZmxvd1kgaXMgJ2hpZGRlbidcbiAgICAgIGlmIChoZWlnaHQgIT09IHZvaWQgMCkge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHsgaGVpZ2h0IH1weGBcbiAgICAgIH1cbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBgaGVpZ2h0ICR7IHByb3BzLmR1cmF0aW9uIH1tcyBjdWJpYy1iZXppZXIoLjI1LCAuOCwgLjUwLCAxKWBcblxuICAgICAgYW5pbWF0aW5nID0gdHJ1ZVxuICAgICAgZG9uZUZuID0gZG9uZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZCAoZWwsIGV2ZW50KSB7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSBudWxsXG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBudWxsXG4gICAgICBlbC5zdHlsZS50cmFuc2l0aW9uID0gbnVsbFxuICAgICAgY2xlYW51cCgpXG4gICAgICBldmVudCAhPT0gbGFzdEV2ZW50ICYmIGVtaXQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25FbnRlciAoZWwsIGRvbmUpIHtcbiAgICAgIGxldCBwb3MgPSAwXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgLy8gaWYgYW5pbWF0aW9uZyBvdmVyZmxvd1kgaXMgYWxyZWFkeSAnaGlkZGVuJ1xuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgICAgcG9zID0gZWwub2Zmc2V0SGVpZ2h0ID09PSBlbC5zY3JvbGxIZWlnaHQgPyAwIDogdm9pZCAwXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGFzdEV2ZW50ID0gJ2hpZGUnXG4gICAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHsgZWwuc2Nyb2xsSGVpZ2h0IH1weGBcbiAgICAgICAgYW5pbUxpc3RlbmVyID0gZXZ0ID0+IHtcbiAgICAgICAgICB0aW1lckZhbGxiYWNrID0gbnVsbFxuXG4gICAgICAgICAgaWYgKE9iamVjdChldnQpICE9PSBldnQgfHwgZXZ0LnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVuZChlbCwgJ3Nob3cnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gc2V0VGltZW91dChhbmltTGlzdGVuZXIsIHByb3BzLmR1cmF0aW9uICogMS4xKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGVhdmUgKGVsLCBkb25lKSB7XG4gICAgICBsZXQgcG9zXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnc2hvdydcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzZXQgb3ZlcmZsb3dZICdoaWRkZW4nIGJlZm9yZSBjYWxjdWxhdGluZyB0aGUgaGVpZ2h0XG4gICAgICAgIC8vIG9yIGVsc2Ugd2UgZ2V0IHNtYWxsIGRpZmZlcmVuY2VzXG4gICAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgICAgIHBvcyA9IGVsLnNjcm9sbEhlaWdodFxuICAgICAgfVxuXG4gICAgICBiZWdpbihlbCwgcG9zLCBkb25lKVxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gMFxuICAgICAgICBhbmltTGlzdGVuZXIgPSBldnQgPT4ge1xuICAgICAgICAgIHRpbWVyRmFsbGJhY2sgPSBudWxsXG5cbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnaGlkZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGFuaW1hdGluZyA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoVHJhbnNpdGlvbiwge1xuICAgICAgY3NzOiBmYWxzZSxcbiAgICAgIGFwcGVhcjogcHJvcHMuYXBwZWFyLFxuICAgICAgb25FbnRlcixcbiAgICAgIG9uTGVhdmVcbiAgICB9LCBzbG90cy5kZWZhdWx0KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgc2hhbGxvd1JlYWN0aXZlLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSwgdlNob3csIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNsaWRlVHJhbnNpdGlvbiBmcm9tICcuLi9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMnXG5pbXBvcnQgUVNlcGFyYXRvciBmcm9tICcuLi9zZXBhcmF0b3IvUVNlcGFyYXRvci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VJZCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtaWQvdXNlLWlkLmpzJ1xuaW1wb3J0IHsgdXNlUm91dGVyTGlua1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utcm91dGVyLWxpbmsvdXNlLXJvdXRlci1saW5rLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuXG5jb25zdCBpdGVtR3JvdXBzID0gc2hhbGxvd1JlYWN0aXZlKHt9KVxuY29uc3QgTElOS19QUk9QUyA9IE9iamVjdC5rZXlzKHVzZVJvdXRlckxpbmtQcm9wcylcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FFeHBhbnNpb25JdGVtJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVJvdXRlckxpbmtQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGljb246IFN0cmluZyxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgbGFiZWxMaW5lczogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgY2FwdGlvbjogU3RyaW5nLFxuICAgIGNhcHRpb25MaW5lczogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICB0b2dnbGVBcmlhTGFiZWw6IFN0cmluZyxcbiAgICBleHBhbmRJY29uOiBTdHJpbmcsXG4gICAgZXhwYW5kZWRJY29uOiBTdHJpbmcsXG4gICAgZXhwYW5kSWNvbkNsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGR1cmF0aW9uOiB7fSxcblxuICAgIGhlYWRlckluc2V0TGV2ZWw6IE51bWJlcixcbiAgICBjb250ZW50SW5zZXRMZXZlbDogTnVtYmVyLFxuXG4gICAgZXhwYW5kU2VwYXJhdG9yOiBCb29sZWFuLFxuICAgIGRlZmF1bHRPcGVuZWQ6IEJvb2xlYW4sXG4gICAgaGlkZUV4cGFuZEljb246IEJvb2xlYW4sXG4gICAgZXhwYW5kSWNvblRvZ2dsZTogQm9vbGVhbixcbiAgICBzd2l0Y2hUb2dnbGVTaWRlOiBCb29sZWFuLFxuICAgIGRlbnNlVG9nZ2xlOiBCb29sZWFuLFxuICAgIGdyb3VwOiBTdHJpbmcsXG4gICAgcG9wdXA6IEJvb2xlYW4sXG5cbiAgICBoZWFkZXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBoZWFkZXJDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnY2xpY2snLCAnYWZ0ZXJTaG93JywgJ2FmdGVySGlkZSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoXG4gICAgICBwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsXG4gICAgICAgID8gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgICA6IHByb3BzLmRlZmF1bHRPcGVuZWRcbiAgICApXG5cbiAgICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgdGFyZ2V0VWlkID0gdXNlSWQoKVxuXG4gICAgY29uc3QgeyBzaG93LCBoaWRlLCB0b2dnbGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHsgc2hvd2luZyB9KVxuXG4gICAgbGV0IHVuaXF1ZUlkLCBleGl0R3JvdXBcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZXhwYW5zaW9uLWl0ZW0gcS1pdGVtLXR5cGUnXG4gICAgICArIGAgcS1leHBhbnNpb24taXRlbS0tJHsgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJyB9YFxuICAgICAgKyBgIHEtZXhwYW5zaW9uLWl0ZW0tLSR7IHByb3BzLnBvcHVwID09PSB0cnVlID8gJ3BvcHVwJyA6ICdzdGFuZGFyZCcgfWBcbiAgICApXG5cbiAgICBjb25zdCBjb250ZW50U3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY29udGVudEluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06IChwcm9wcy5jb250ZW50SW5zZXRMZXZlbCAqIDU2KSArICdweCdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgaGFzTGluayA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIChcbiAgICAgICAgcHJvcHMuaHJlZiAhPT0gdm9pZCAwXG4gICAgICAgIHx8IChwcm9wcy50byAhPT0gdm9pZCAwICYmIHByb3BzLnRvICE9PSBudWxsICYmIHByb3BzLnRvICE9PSAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBsaW5rUHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuICAgICAgTElOS19QUk9QUy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGFjY1sga2V5IF0gPSBwcm9wc1sga2V5IF1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGV4cGFuc2lvbkljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5leHBhbmRlZEljb24gIT09IHZvaWQgMCAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuZXhwYW5kZWRJY29uXG4gICAgICAgIDogcHJvcHMuZXhwYW5kSWNvbiB8fCAkcS5pY29uU2V0LmV4cGFuc2lvbkl0ZW1bIHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlID8gJ2RlbnNlSWNvbicgOiAnaWNvbicgXVxuICAgICkpXG5cbiAgICBjb25zdCBhY3RpdmVUb2dnbGVJY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgKGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBoZWFkZXJTbG90U2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgZXhwYW5kZWQ6IHNob3dpbmcudmFsdWUgPT09IHRydWUsXG4gICAgICBkZXRhaWxzSWQ6IHRhcmdldFVpZC52YWx1ZSxcbiAgICAgIHRvZ2dsZSxcbiAgICAgIHNob3csXG4gICAgICBoaWRlXG4gICAgfSkpXG5cbiAgICBjb25zdCB0b2dnbGVBcmlhQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCB0b2dnbGVBcmlhTGFiZWwgPSBwcm9wcy50b2dnbGVBcmlhTGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLnRvZ2dsZUFyaWFMYWJlbFxuICAgICAgICA6ICRxLmxhbmcubGFiZWxbIHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnY29sbGFwc2UnIDogJ2V4cGFuZCcgXShwcm9wcy5sYWJlbClcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm9sZTogJ2J1dHRvbicsXG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWNvbnRyb2xzJzogdGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHRvZ2dsZUFyaWFMYWJlbFxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5ncm91cCwgbmFtZSA9PiB7XG4gICAgICBleGl0R3JvdXAgIT09IHZvaWQgMCAmJiBleGl0R3JvdXAoKVxuICAgICAgbmFtZSAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkhlYWRlckNsaWNrIChlKSB7XG4gICAgICBoYXNMaW5rLnZhbHVlICE9PSB0cnVlICYmIHRvZ2dsZShlKVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUljb25LZXlib2FyZCAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiB0b2dnbGVJY29uKGUsIHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSWNvbiAoZSwga2V5Ym9hcmQpIHtcbiAgICAgIGtleWJvYXJkICE9PSB0cnVlICYmIGJsdXJUYXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgYmx1clRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB0b2dnbGUoZSlcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TaG93ICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVyU2hvdycpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25IaWRlICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVySGlkZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW50ZXJHcm91cCAoKSB7XG4gICAgICBpZiAodW5pcXVlSWQgPT09IHZvaWQgMCkge1xuICAgICAgICB1bmlxdWVJZCA9IHVpZCgpXG4gICAgICB9XG5cbiAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPSB1bmlxdWVJZFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzaG93ID0gd2F0Y2goc2hvd2luZywgdmFsID0+IHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPSB1bmlxdWVJZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgZGVsZXRlIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgY29uc3QgZ3JvdXAgPSB3YXRjaChcbiAgICAgICAgKCkgPT4gaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSxcbiAgICAgICAgKHZhbCwgb2xkVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG9sZFZhbCA9PT0gdW5pcXVlSWQgJiYgdmFsICE9PSB2b2lkIDAgJiYgdmFsICE9PSB1bmlxdWVJZCkge1xuICAgICAgICAgICAgaGlkZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGV4aXRHcm91cCA9ICgpID0+IHtcbiAgICAgICAgc2hvdygpXG4gICAgICAgIGdyb3VwKClcblxuICAgICAgICBpZiAoaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9PT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXVxuICAgICAgICB9XG5cbiAgICAgICAgZXhpdEdyb3VwID0gdm9pZCAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9nZ2xlSWNvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogW1xuICAgICAgICAgICdxLWZvY3VzYWJsZSByZWxhdGl2ZS1wb3NpdGlvbiBjdXJzb3ItcG9pbnRlcidcbiAgICAgICAgICAgICsgYCR7IHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlICYmIHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUgPyAnIGl0ZW1zLWVuZCcgOiAnJyB9YCxcbiAgICAgICAgICBwcm9wcy5leHBhbmRJY29uQ2xhc3NcbiAgICAgICAgXSxcbiAgICAgICAgc2lkZTogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSAhPT0gdHJ1ZSxcbiAgICAgICAgYXZhdGFyOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX190b2dnbGUtaWNvbidcbiAgICAgICAgICAgICsgKHByb3BzLmV4cGFuZGVkSWNvbiA9PT0gdm9pZCAwICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyAnIHEtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1pY29uLS1yb3RhdGVkJ1xuICAgICAgICAgICAgICA6ICcnKSxcbiAgICAgICAgICBuYW1lOiBleHBhbnNpb25JY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIGlmIChhY3RpdmVUb2dnbGVJY29uLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAgIC4uLnRvZ2dsZUFyaWFBdHRycy52YWx1ZSxcbiAgICAgICAgICBvbkNsaWNrOiB0b2dnbGVJY29uLFxuICAgICAgICAgIG9uS2V5dXA6IHRvZ2dsZUljb25LZXlib2FyZFxuICAgICAgICB9KVxuXG4gICAgICAgIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgcmVmOiBibHVyVGFyZ2V0UmVmLFxuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX190b2dnbGUtZm9jdXMgcS1pY29uIHEtZm9jdXMtaGVscGVyIHEtZm9jdXMtaGVscGVyLS1yb3VuZGVkJyxcbiAgICAgICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW1TZWN0aW9uLCBkYXRhLCAoKSA9PiBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXJDaGlsZCAoKSB7XG4gICAgICBsZXQgY2hpbGRcblxuICAgICAgaWYgKHNsb3RzLmhlYWRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkID0gW10uY29uY2F0KHNsb3RzLmhlYWRlcihoZWFkZXJTbG90U2NvcGUudmFsdWUpKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNoaWxkID0gW1xuICAgICAgICAgIGgoUUl0ZW1TZWN0aW9uLCAoKSA9PiBbXG4gICAgICAgICAgICBoKFFJdGVtTGFiZWwsIHsgbGluZXM6IHByb3BzLmxhYmVsTGluZXMgfSwgKCkgPT4gcHJvcHMubGFiZWwgfHwgJycpLFxuXG4gICAgICAgICAgICBwcm9wcy5jYXB0aW9uXG4gICAgICAgICAgICAgID8gaChRSXRlbUxhYmVsLCB7IGxpbmVzOiBwcm9wcy5jYXB0aW9uTGluZXMsIGNhcHRpb246IHRydWUgfSwgKCkgPT4gcHJvcHMuY2FwdGlvbilcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuXG4gICAgICAgIHByb3BzLmljb24gJiYgY2hpbGRbIHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUgPyAncHVzaCcgOiAndW5zaGlmdCcgXShcbiAgICAgICAgICBoKFFJdGVtU2VjdGlvbiwge1xuICAgICAgICAgICAgc2lkZTogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgIGF2YXRhcjogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSAhPT0gdHJ1ZVxuICAgICAgICAgIH0sICgpID0+IGgoUUljb24sIHsgbmFtZTogcHJvcHMuaWNvbiB9KSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oaWRlRXhwYW5kSWNvbiAhPT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZFsgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJyBdKFxuICAgICAgICAgIGdldFRvZ2dsZUljb24oKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlciAoKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6ICdpdGVtJyxcbiAgICAgICAgc3R5bGU6IHByb3BzLmhlYWRlclN0eWxlLFxuICAgICAgICBjbGFzczogcHJvcHMuaGVhZGVyQ2xhc3MsXG4gICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSxcbiAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICBpbnNldExldmVsOiBwcm9wcy5oZWFkZXJJbnNldExldmVsXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLmNsaWNrYWJsZSA9IHRydWVcbiAgICAgICAgZGF0YS5vbkNsaWNrID0gb25IZWFkZXJDbGlja1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICBoYXNMaW5rLnZhbHVlID09PSB0cnVlID8gbGlua1Byb3BzLnZhbHVlIDogdG9nZ2xlQXJpYUF0dHJzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW0sIGRhdGEsIGdldEhlYWRlckNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25DaGlsZCAoKSB7XG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdlLWNvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fY29udGVudCByZWxhdGl2ZS1wb3NpdGlvbicsXG4gICAgICAgICAgc3R5bGU6IGNvbnRlbnRTdHlsZS52YWx1ZSxcbiAgICAgICAgICBpZDogdGFyZ2V0VWlkLnZhbHVlXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKSxcbiAgICAgICAgWyBbXG4gICAgICAgICAgdlNob3csXG4gICAgICAgICAgc2hvd2luZy52YWx1ZVxuICAgICAgICBdIF1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBbXG4gICAgICAgIGdldEhlYWRlcigpLFxuXG4gICAgICAgIGgoUVNsaWRlVHJhbnNpdGlvbiwge1xuICAgICAgICAgIGR1cmF0aW9uOiBwcm9wcy5kdXJhdGlvbixcbiAgICAgICAgICBvblNob3csXG4gICAgICAgICAgb25IaWRlXG4gICAgICAgIH0sIGdldFRyYW5zaXRpb25DaGlsZClcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmV4cGFuZFNlcGFyYXRvciA9PT0gdHJ1ZSkge1xuICAgICAgICBub2RlLnB1c2goXG4gICAgICAgICAgaChRU2VwYXJhdG9yLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlciBxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXItLXRvcCBhYnNvbHV0ZS10b3AnLFxuICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlXG4gICAgICAgICAgfSksXG4gICAgICAgICAgaChRU2VwYXJhdG9yLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlciBxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXItLWJvdHRvbSBhYnNvbHV0ZS1ib3R0b20nLFxuICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZVxuICAgIH1cblxuICAgIHByb3BzLmdyb3VwICE9PSB2b2lkIDAgJiYgZW50ZXJHcm91cCgpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgZXhpdEdyb3VwICE9PSB2b2lkIDAgJiYgZXhpdEdyb3VwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgW1xuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2NvbnRhaW5lciByZWxhdGl2ZS1wb3NpdGlvbicgfSwgZ2V0Q29udGVudCgpKVxuICAgIF0pXG4gIH1cbn0pXG4iLCI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgV29ya291dCwgV29ya291dFBsYW4gfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBpc01vYmlsZSwgd29ya291dENvdW50IH0gZnJvbSAnLi9zdGF0ZSc7XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgd29ya291dFBsYW46IFdvcmtvdXRQbGFuXG59PigpXG5cbmZ1bmN0aW9uIGRlbGV0ZUV4ZXJjaXNlKCkge1xuICBXb3Jrb3V0UGxhbi5nZXQocHJvcHMud29ya291dFBsYW4uaWQgYXMgbnVtYmVyKT8uZGVsZXRlKClcbiAgd29ya291dENvdW50LnZhbHVlIC09IDFcbn1cblxuY29uc3Qgd29ya291dHMgPSBwcm9wcy53b3Jrb3V0UGxhbi5pbmNsdWRlZFdvcmtvdXRzLm1hcCh3b3Jrb3V0ID0+XG4gIFdvcmtvdXQuY3JlYXRlKHdvcmtvdXQsIGZhbHNlKVxuKTtcblxuPC9zY3JpcHQ+XG5cblxuXG48dGVtcGxhdGU+XG4gIDxxLWNhcmQgY2xhc3M9XCJteS1jYXJkIHRleHQtd2hpdGVcIlxuICAgIHN0eWxlPVwiYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgIzAwOWM4MiAwJSwgIzM4MzgzYyAxMDAlKTsgIHBvc2l0aW9uOiByZWxhdGl2ZTsgcGFkZGluZy1ib3R0b206IDNyZW07IHdpZHRoOiAxMDAlO1wiPlxuICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWJ0biA6dG89XCJ7IG5hbWU6ICd3b3Jrb3V0VmlldycsIHBhcmFtczogeyBpZDogcHJvcHMud29ya291dFBsYW4uaWQhIH0gfVwiIGZsYXQgY2xhc3M9XCJ0ZXh0LWg2XCI+e3tcbiAgICAgICAgcHJvcHMud29ya291dFBsYW4ubmFtZSA/IHByb3BzLndvcmtvdXRQbGFuLm5hbWUgOiAnbm8gdGl0bGUnIH19PC9xLWJ0bj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgPHEtbGlzdCB2LWlmPVwicHJvcHMud29ya291dFBsYW4uaW5jbHVkZWRXb3Jrb3V0cy5sZW5ndGhcIiBkYXJrIGJvcmRlcmVkIHNlcGFyYXRvcj5cbiAgICAgICAgPHEtaXRlbSB2LWZvcj1cIndvcmtvdXQgaW4gd29ya291dHNcIiA6a2V5PVwid29ya291dC5pZCFcIj5cbiAgICAgICAgICA8cS10b29sdGlwIHYtaWY9XCJpc01vYmlsZVwiPlxuICAgICAgICAgICAge3sgd29ya291dC5leGVyY2lzZSgpLmRlc2NyaXB0aW9uIH19XG4gICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAge3sgd29ya291dC5leGVyY2lzZSgpLm5hbWUgfX1cbiAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHYtaWY9XCIhaXNNb2JpbGVcIiBzdHlsZT1cIm1heC13aWR0aDogMTVyZW07XCI+XG4gICAgICAgICAgICA8cS1leHBhbnNpb24taXRlbSBwb3B1cCBsYWJlbD1cIkRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzM4MzgzYztcIj5cbiAgICAgICAgICAgICAgICAgIHt7IHdvcmtvdXQuZXhlcmNpc2UoKS5kZXNjcmlwdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgPC9xLWV4cGFuc2lvbi1pdGVtPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LW5vLXdyYXBcIiBzdHlsZT1cIndpZHRoOiBtYXgtY29udGVudDsgZmxleDogdW5zZXQ7XCI+XG4gICAgICAgICAgICBSZXBldGl0aW9uczpcbiAgICAgICAgICAgIHt7IHdvcmtvdXQucmVwcyB9fVxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cblxuICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInRleHQtbm8td3JhcFwiIHN0eWxlPVwid2lkdGg6IG1heC1jb250ZW50OyBmbGV4OiB1bnNldDtcIj5cbiAgICAgICAgICAgIHwgU2V0czpcbiAgICAgICAgICAgIHt7IHdvcmtvdXQuc2V0cyB9fVxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgIDwvcS1pdGVtPlxuICAgICAgPC9xLWxpc3Q+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiB2LWVsc2U+XG4gICAgICAgIFRoZXJlIGFyZSBubyBleGVyY2lzZXMgYXR0YWNoZWQgdG8gdGhpcyB3b3Jrb3V0Li5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTsgcmlnaHQ6IDFyZW07XCI+XG4gICAgICA8cS1idG4gZmxhdCA6dG89XCJ7IG5hbWU6ICdlZGl0UGxhbicsIHBhcmFtczogeyBpZDogcHJvcHMud29ya291dFBsYW4uaWQgfSB9XCI+ZWRpdDwvcS1idG4+XG4gICAgICA8cS1idG4gZmxhdCBAY2xpY2s9XCJkZWxldGVFeGVyY2lzZVwiPmRlbGV0ZTwvcS1idG4+XG4gICAgPC9kaXY+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cbiIsIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBXb3Jrb3V0UGxhbiB9IGZyb20gJ3NyYy9jb21wb25lbnRzL21vZGVscyc7XG5pbXBvcnQgUGxhblByZXZpZXcgZnJvbSAnc3JjL2NvbXBvbmVudHMvUGxhblByZXZpZXcudnVlJztcbmNvbnN0IHdvcmtvdXRQbGFucyA9IFdvcmtvdXRQbGFuLmFsbCgpXG48L3NjcmlwdD5cblxuXG48dGVtcGxhdGU+XG4gIDxoMSBjbGFzcz1cInRleHQtaDNcIj5Xb3Jrb3V0IFBsYW5zPC9oMT5cbiAgPHNlY3Rpb24gdi1pZj1cIndvcmtvdXRQbGFucy5sZW5ndGhcIiBjbGFzcz1cInEtZ3V0dGVyLW1kIHJvd1wiID5cbiAgICA8UGxhblByZXZpZXcgdi1mb3I9XCJwbGFuIGluIHdvcmtvdXRQbGFuc1wiIDp3b3Jrb3V0UGxhbj1cIldvcmtvdXRQbGFuLmNyZWF0ZShwbGFuLCBmYWxzZSlcIiA6a2V5PVwicGxhbi5pZCFcIi8+XG4gIDwvc2VjdGlvbj5cblxuICA8cCB2LWVsc2U+VGhlcmUgYXJlIG5vIHBsYW5zIHlldCwgTWFrZSBvbmUhPC9wPlxuICA8cS1idG4gOnRvPVwie25hbWU6ICdlZGl0UGxhbicsIHBhcmFtczoge2lkOiAwfX1cIiByb3VuZGVkIGNsYXNzPVwiZml4ZWQgZml4ZWQtYm90dG9tLXJpZ2h0IHotbWFyZ2luYWxzXCIgc3R5bGU9XCJyaWdodDogMXJlbTsgYm90dG9tOiAxcmVtO1wiIGNvbG9yPVwicHJpbWFyeVwiPlxuICAgIDxxLWljb24gbmFtZT1cImFkZFwiPjwvcS1pY29uPlxuICA8L3EtYnRuPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJzaG93IiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ob2lzdGVkXzEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxNQUFBLGFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsVUFBVTtBQUFBLElBQ1YsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsT0FBTyxDQUFFLFFBQVEsTUFBTTtBQUFBLEVBQ3hCO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sY0FBYyxTQUFTLE1BQU0sU0FBUyxNQUFNLE9BQU8sRUFBRSxDQUFDO0FBRTVELFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsbUJBQ0csTUFBTSxhQUFhLE9BQU8sMkNB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
