import { g as getCurrentInstance, r as ref, af as onBeforeUpdate, i as inject, ag as formKey, n as watch, d as onMounted, o as onBeforeUnmount, a as computed, ah as debounce, ai as injectProp, k as stopAndPrevent, v as nextTick, y as onDeactivated, z as onActivated, h, a8 as prevent, Q as QIcon, aj as QSpinner, b as hSlot, Z as Transition, s as shouldIgnoreKey, a2 as client, c as createComponent, a7 as stop } from "./index-DiEwj2lb.js";
import { m as addFocusFn, b as useId, n as removeFocusFn } from "./use-id-CSkcFI3i.js";
import { u as useDarkProps, a as useDark } from "./use-dark-D3vguVup.js";
const listenerRE = /^on[A-Z]/;
function useSplitAttrs() {
  const { attrs, vnode } = getCurrentInstance();
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    default: false,
    // statement unneeded but avoids future vue implementation changes
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length !== 0
  );
  const canDebounceValidate = computed(() => props.disable !== true && hasRules.value === true && innerLoading.value === false);
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length !== 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;
    if (canDebounceValidate.value === true && props.lazyRules === false) {
      debouncedValidate();
    }
  });
  function onRulesChange() {
    if (props.lazyRules !== "ondemand" && canDebounceValidate.value === true && isDirtyModel.value === true) {
      debouncedValidate();
    }
  }
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(() => props.lazyRules, onRulesChange);
  watch(focused, (val) => {
    if (val === true) {
      isDirtyModel.value = true;
    } else if (canDebounceValidate.value === true && props.lazyRules !== "ondemand") {
      debouncedValidate();
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (props.disable === true || hasRules.value === false) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String
};
const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur"];
function useFieldState({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });
  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true ? computed(() => props.tag) : { value: "label" },
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(),
    targetUid,
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
    /**
         * user supplied additionals:
    
         * innerValue - computed
         * floatingLabel - computed
         * inputRef - computed
    
         * fieldClass - computed
         * hasShadow - computed
    
         * controlEvents - Object with fn(e)
    
         * getControl - fn
         * getInnerAppend - fn
         * getControlChild - fn
         * getShadowControl - fn
         * showPopup - fn
         */
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length !== 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {};
    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    }
    return acc;
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) return;
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    state.changeEvent === true && emit("change", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }
  function onClearableKeyup(evt) {
    [13, 32].includes(evt.keyCode) && clearValue(evt);
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: "button",
            "aria-hidden": "false",
            "aria-label": $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) return;
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length !== 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length !== 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    if (String(props.modelValue) !== val && (props.modelValue !== null || val !== "")) {
      emitValue(val, true);
    }
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true || e.altKey === true) return;
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
const useFormProps = {
  name: String
};
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return computed(() => {
    if (props.type !== "file") return;
    return getFormDomProps();
  });
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) return;
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
const QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    // override of useFieldProps > modelValue
    modelValue: [String, Number, FileList],
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    // makes a textarea
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(
      props
    );
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState({ changeEvent: true });
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) return;
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) return;
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length !== 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
      // deprecated
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
export {
  QInput as Q,
  useSplitAttrs as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUlucHV0LUM3RTlCZTg5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2Utc3BsaXQtYXR0cnMvdXNlLXNwbGl0LWF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWZvcm0vdXNlLWZvcm0tY2hpbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wYXR0ZXJucy9wYXR0ZXJucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXZhbGlkYXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpZWxkL3VzZS1maWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW5wdXQvdXNlLW1hc2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmlsZS91c2UtZmlsZS1kb20tcHJvcHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1rZXktY29tcG9zaXRpb24vdXNlLWtleS1jb21wb3NpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW5wdXQvUUlucHV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZiwgb25CZWZvcmVVcGRhdGUsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbGlzdGVuZXJSRSA9IC9eb25bQS1aXS9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IGF0dHJzLCB2bm9kZSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhY2MgPSB7XG4gICAgbGlzdGVuZXJzOiByZWYoe30pLFxuICAgIGF0dHJpYnV0ZXM6IHJlZih7fSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHt9XG4gICAgY29uc3QgbGlzdGVuZXJzID0ge31cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgICBpZiAoa2V5ICE9PSAnY2xhc3MnICYmIGtleSAhPT0gJ3N0eWxlJyAmJiBsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYXR0cmlidXRlc1sga2V5IF0gPSBhdHRyc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2bm9kZS5wcm9wcykge1xuICAgICAgaWYgKGxpc3RlbmVyUkUudGVzdChrZXkpID09PSB0cnVlKSB7XG4gICAgICAgIGxpc3RlbmVyc1sga2V5IF0gPSB2bm9kZS5wcm9wc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY2MuYXR0cmlidXRlcy52YWx1ZSA9IGF0dHJpYnV0ZXNcbiAgICBhY2MubGlzdGVuZXJzLnZhbHVlID0gbGlzdGVuZXJzXG4gIH1cblxuICBvbkJlZm9yZVVwZGF0ZSh1cGRhdGUpXG5cbiAgdXBkYXRlKClcblxuICByZXR1cm4gYWNjXG59XG4iLCJpbXBvcnQgeyBpbmplY3QsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBmb3JtS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24sIHJlcXVpcmVzUUZvcm0gfSkge1xuICBjb25zdCAkZm9ybSA9IGluamVjdChmb3JtS2V5LCBmYWxzZSlcblxuICBpZiAoJGZvcm0gIT09IGZhbHNlKSB7XG4gICAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICAvLyBleHBvcnQgcHVibGljIG1ldGhvZCAoc28gaXQgY2FuIGJlIHVzZWQgaW4gUUZvcm0pXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kaXNhYmxlLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB0eXBlb2YgcmVzZXRWYWxpZGF0aW9uID09PSAnZnVuY3Rpb24nICYmIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICAgICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgLy8gcmVnaXN0ZXIgdG8gcGFyZW50IFFGb3JtXG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAvLyB1bi1yZWdpc3RlciBmcm9tIHBhcmVudCBRRm9ybVxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS51bmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgfSlcbiAgfVxuICBlbHNlIGlmIChyZXF1aXJlc1FGb3JtID09PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignUGFyZW50IFFGb3JtIG5vdCBmb3VuZCBvbiB1c2VGb3JtQ2hpbGQoKSEnKVxuICB9XG59XG4iLCIvLyBmaWxlIHJlZmVyZW5jZWQgZnJvbSBkb2NzXG5cbmNvbnN0XG4gIGhleCA9IC9eI1swLTlhLWZBLUZdezN9KFswLTlhLWZBLUZdezN9KT8kLyxcbiAgaGV4YSA9IC9eI1swLTlhLWZBLUZdezR9KFswLTlhLWZBLUZdezR9KT8kLyxcbiAgaGV4T3JIZXhhID0gL14jKFswLTlhLWZBLUZdezN9fFswLTlhLWZBLUZdezR9fFswLTlhLWZBLUZdezZ9fFswLTlhLWZBLUZdezh9KSQvLFxuICByZ2IgPSAvXnJnYlxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pXFwpJC8sXG4gIHJnYmEgPSAvXnJnYmFcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwoMHwwXFwuWzAtOV0rWzEtOV18MFxcLlsxLTldK3wxKVxcKSQvXG5cbi8vIEtlZXAgaW4gc3luYyB3aXRoIHVpL3R5cGVzL2FwaS92YWxpZGF0aW9uLmQudHNcbmV4cG9ydCBjb25zdCB0ZXN0UGF0dGVybiA9IHtcbiAgZGF0ZTogdiA9PiAvXi0/W1xcZF0rXFwvWzAtMV1cXGRcXC9bMC0zXVxcZCQvLnRlc3QodiksXG4gIHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICBmdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZDpbMC01XVxcZCQvLnRlc3QodiksXG4gIHRpbWVPckZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkKDpbMC01XVxcZCk/JC8udGVzdCh2KSxcblxuICAvLyAtLSBSRkMgNTMyMiAtLVxuICAvLyAtLSBBZGRlZCBpbiB2Mi42LjYgLS1cbiAgLy8gVGhpcyBpcyBhIGJhc2ljIGhlbHBlciB2YWxpZGF0aW9uLlxuICAvLyBGb3Igc29tZXRoaW5nIG1vcmUgY29tcGxleCAobGlrZSBSRkMgODIyKSB5b3Ugc2hvdWxkIHdyaXRlIGFuZCB1c2UgeW91ciBvd24gcnVsZS5cbiAgLy8gV2Ugd29uJ3QgYmUgYWNjZXB0aW5nIFBScyB0byBlbmhhbmNlIHRoZSBvbmUgYmVsb3cgYmVjYXVzZSBvZiB0aGUgcmVhc29uIGFib3ZlLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgZW1haWw6IHYgPT4gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8udGVzdCh2KSxcblxuICBoZXhDb2xvcjogdiA9PiBoZXgudGVzdCh2KSxcbiAgaGV4YUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSxcbiAgaGV4T3JIZXhhQ29sb3I6IHYgPT4gaGV4T3JIZXhhLnRlc3QodiksXG5cbiAgcmdiQ29sb3I6IHYgPT4gcmdiLnRlc3QodiksXG4gIHJnYmFDb2xvcjogdiA9PiByZ2JhLnRlc3QodiksXG4gIHJnYk9yUmdiYUNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KSxcblxuICBoZXhPclJnYkNvbG9yOiB2ID0+IGhleC50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpLFxuICBoZXhhT3JSZ2JhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KSxcbiAgYW55Q29sb3I6IHYgPT4gaGV4T3JIZXhhLnRlc3QodikgfHwgcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGVzdFBhdHRlcm5cbn1cbiIsImltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUZvcm1DaGlsZCBmcm9tICcuLi91c2UtZm9ybS91c2UtZm9ybS1jaGlsZC5qcydcbmltcG9ydCB7IHRlc3RQYXR0ZXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcGF0dGVybnMvcGF0dGVybnMuanMnXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UvZGVib3VuY2UuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5pbmplY3Qtb2JqLXByb3AvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5jb25zdCBsYXp5UnVsZXNWYWx1ZXMgPSBbIHRydWUsIGZhbHNlLCAnb25kZW1hbmQnIF1cblxuZXhwb3J0IGNvbnN0IHVzZVZhbGlkYXRlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHt9LFxuXG4gIGVycm9yOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGVycm9yTWVzc2FnZTogU3RyaW5nLFxuICBub0Vycm9ySWNvbjogQm9vbGVhbixcblxuICBydWxlczogQXJyYXksXG4gIHJlYWN0aXZlUnVsZXM6IEJvb2xlYW4sXG4gIGxhenlSdWxlczoge1xuICAgIHR5cGU6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogZmFsc2UsIC8vIHN0YXRlbWVudCB1bm5lZWRlZCBidXQgYXZvaWRzIGZ1dHVyZSB2dWUgaW1wbGVtZW50YXRpb24gY2hhbmdlc1xuICAgIHZhbGlkYXRvcjogdiA9PiBsYXp5UnVsZXNWYWx1ZXMuaW5jbHVkZXModilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZm9jdXNlZCwgaW5uZXJMb2FkaW5nKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlubmVyRXJyb3IgPSByZWYoZmFsc2UpXG4gIGNvbnN0IGlubmVyRXJyb3JNZXNzYWdlID0gcmVmKG51bGwpXG4gIGNvbnN0IGlzRGlydHlNb2RlbCA9IHJlZihmYWxzZSlcblxuICB1c2VGb3JtQ2hpbGQoeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uIH0pXG5cbiAgbGV0IHZhbGlkYXRlSW5kZXggPSAwLCB1bndhdGNoUnVsZXNcblxuICBjb25zdCBoYXNSdWxlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMucnVsZXMgIT09IHZvaWQgMFxuICAgICYmIHByb3BzLnJ1bGVzICE9PSBudWxsXG4gICAgJiYgcHJvcHMucnVsZXMubGVuZ3RoICE9PSAwXG4gIClcblxuICBjb25zdCBjYW5EZWJvdW5jZVZhbGlkYXRlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICAmJiBoYXNSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgIC8vIFNob3VsZCBub3QgaGF2ZSBhIHZhbGlkYXRpb24gaW4gcHJvZ3Jlc3MgYWxyZWFkeTtcbiAgICAvLyBJdCBtaWdodCBtZWFuIHRoYXQgZm9jdXMgc3dpdGNoZWQgdG8gc3VibWl0IGJ0biBhbmRcbiAgICAvLyBRRm9ybSdzIHN1Ym1pdCgpIGhhcyBiZWVuIGNhbGxlZCBhbHJlYWR5IChFTlRFUiBrZXkpXG4gICAgJiYgaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZVxuICApKVxuXG4gIGNvbnN0IGhhc0Vycm9yID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5lcnJvciA9PT0gdHJ1ZSB8fCBpbm5lckVycm9yLnZhbHVlID09PSB0cnVlXG4gIClcblxuICBjb25zdCBlcnJvck1lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgdHlwZW9mIHByb3BzLmVycm9yTWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgcHJvcHMuZXJyb3JNZXNzYWdlLmxlbmd0aCAhPT0gMFxuICAgICAgPyBwcm9wcy5lcnJvck1lc3NhZ2VcbiAgICAgIDogaW5uZXJFcnJvck1lc3NhZ2UudmFsdWVcbiAgKSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCAoKSA9PiB7XG4gICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuXG4gICAgaWYgKFxuICAgICAgY2FuRGVib3VuY2VWYWxpZGF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgLy8gdHJpZ2dlciB2YWxpZGF0aW9uIGlmIG5vdCB1c2luZyBhbnkga2luZCBvZiBsYXp5LXJ1bGVzXG4gICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIG9uUnVsZXNDaGFuZ2UgKCkge1xuICAgIGlmIChcbiAgICAgIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICAgJiYgY2FuRGVib3VuY2VWYWxpZGF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgaXNEaXJ0eU1vZGVsLnZhbHVlID09PSB0cnVlXG4gICAgKSB7XG4gICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMucmVhY3RpdmVSdWxlcywgdmFsID0+IHtcbiAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAodW53YXRjaFJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFJ1bGVzID0gd2F0Y2goKCkgPT4gcHJvcHMucnVsZXMsIG9uUnVsZXNDaGFuZ2UsIHsgaW1tZWRpYXRlOiB0cnVlLCBkZWVwOiB0cnVlIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHVud2F0Y2hSdWxlcyAhPT0gdm9pZCAwKSB7XG4gICAgICB1bndhdGNoUnVsZXMoKVxuICAgICAgdW53YXRjaFJ1bGVzID0gdm9pZCAwXG4gICAgfVxuICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLmxhenlSdWxlcywgb25SdWxlc0NoYW5nZSlcblxuICB3YXRjaChmb2N1c2VkLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWVcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBjYW5EZWJvdW5jZVZhbGlkYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uICgpIHtcbiAgICB2YWxpZGF0ZUluZGV4KytcbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IGZhbHNlXG4gICAgaW5uZXJFcnJvci52YWx1ZSA9IGZhbHNlXG4gICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBudWxsXG4gICAgZGVib3VuY2VkVmFsaWRhdGUuY2FuY2VsKClcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybiB2YWx1ZVxuICAgKiAgIC0gdHJ1ZSAodmFsaWRhdGlvbiBzdWNjZWVkZWQpXG4gICAqICAgLSBmYWxzZSAodmFsaWRhdGlvbiBmYWlsZWQpXG4gICAqICAgLSBQcm9taXNlIChwZW5kaW5nIGFzeW5jIHZhbGlkYXRpb24pXG4gICAqL1xuICBmdW5jdGlvbiB2YWxpZGF0ZSAodmFsID0gcHJvcHMubW9kZWxWYWx1ZSkge1xuICAgIGlmIChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgIHx8IGhhc1J1bGVzLnZhbHVlID09PSBmYWxzZVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgY29uc3Qgc2V0RGlydHkgPSBpbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgID8gKCkgPT4geyBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlIH1cbiAgICAgIDogKCkgPT4ge31cblxuICAgIGNvbnN0IHVwZGF0ZSA9IChlcnIsIG1zZykgPT4ge1xuICAgICAgZXJyID09PSB0cnVlICYmIHNldERpcnR5KClcblxuICAgICAgaW5uZXJFcnJvci52YWx1ZSA9IGVyclxuICAgICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBtc2cgfHwgbnVsbFxuICAgICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBydWxlID0gcHJvcHMucnVsZXNbIGkgXVxuICAgICAgbGV0IHJlc1xuXG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzID0gcnVsZSh2YWwsIHRlc3RQYXR0ZXJuKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnICYmIHRlc3RQYXR0ZXJuWyBydWxlIF0gIT09IHZvaWQgMCkge1xuICAgICAgICByZXMgPSB0ZXN0UGF0dGVyblsgcnVsZSBdKHZhbClcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgdHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdXBkYXRlKHRydWUsIHJlcylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChyZXMgIT09IHRydWUgJiYgcmVzICE9PSB2b2lkIDApIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKGZhbHNlKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSB0cnVlXG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzID09PSB2b2lkIDAgfHwgQXJyYXkuaXNBcnJheShyZXMpID09PSBmYWxzZSB8fCByZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKGZhbHNlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtc2cgPSByZXMuZmluZChyID0+IHIgPT09IGZhbHNlIHx8IHR5cGVvZiByID09PSAnc3RyaW5nJylcbiAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKG1zZyAhPT0gdm9pZCAwLCBtc2cpXG4gICAgICAgIHJldHVybiBtc2cgPT09IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXgpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgdXBkYXRlKHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBjb25zdCBkZWJvdW5jZWRWYWxpZGF0ZSA9IGRlYm91bmNlKHZhbGlkYXRlLCAwKVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgdW53YXRjaFJ1bGVzICE9PSB2b2lkIDAgJiYgdW53YXRjaFJ1bGVzKClcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyAmIHByb3BzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcmVzZXRWYWxpZGF0aW9uLCB2YWxpZGF0ZSB9KVxuICBpbmplY3RQcm9wKHByb3h5LCAnaGFzRXJyb3InLCAoKSA9PiBoYXNFcnJvci52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG5cbiAgICB2YWxpZGF0ZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZUlkIGZyb20gJy4uL3VzZS1pZC91c2UtaWQuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuLi91c2Utc3BsaXQtYXR0cnMvdXNlLXNwbGl0LWF0dHJzLmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi4vcHJpdmF0ZS51c2UtdmFsaWRhdGUvdXNlLXZhbGlkYXRlLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuLCByZW1vdmVGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZmllbGRWYWx1ZUlzRmlsbGVkICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdm9pZCAwXG4gICAgJiYgdmFsICE9PSBudWxsXG4gICAgJiYgKCcnICsgdmFsKS5sZW5ndGggIT09IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZU5vbklucHV0RmllbGRQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VWYWxpZGF0ZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIHN0YWNrTGFiZWw6IEJvb2xlYW4sXG4gIGhpbnQ6IFN0cmluZyxcbiAgaGlkZUhpbnQ6IEJvb2xlYW4sXG4gIHByZWZpeDogU3RyaW5nLFxuICBzdWZmaXg6IFN0cmluZyxcblxuICBsYWJlbENvbG9yOiBTdHJpbmcsXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGJnQ29sb3I6IFN0cmluZyxcblxuICBmaWxsZWQ6IEJvb2xlYW4sXG4gIG91dGxpbmVkOiBCb29sZWFuLFxuICBib3JkZXJsZXNzOiBCb29sZWFuLFxuICBzdGFuZG91dDogWyBCb29sZWFuLCBTdHJpbmcgXSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgbG9hZGluZzogQm9vbGVhbixcblxuICBsYWJlbFNsb3Q6IEJvb2xlYW4sXG5cbiAgYm90dG9tU2xvdHM6IEJvb2xlYW4sXG4gIGhpZGVCb3R0b21TcGFjZTogQm9vbGVhbixcblxuICByb3VuZGVkOiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcbiAgaXRlbUFsaWduZWQ6IEJvb2xlYW4sXG5cbiAgY291bnRlcjogQm9vbGVhbixcblxuICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gIGNsZWFySWNvbjogU3RyaW5nLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuLFxuXG4gIGF1dG9mb2N1czogQm9vbGVhbixcblxuICBmb3I6IFN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRQcm9wcyA9IHtcbiAgLi4udXNlTm9uSW5wdXRGaWVsZFByb3BzLFxuICBtYXhsZW5ndGg6IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2ZvY3VzJywgJ2JsdXInIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpZWxkU3RhdGUgKHsgcmVxdWlyZWRGb3JBdHRyID0gdHJ1ZSwgdGFnUHJvcCwgY2hhbmdlRXZlbnQgPSBmYWxzZSB9ID0ge30pIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG4gIGNvbnN0IHRhcmdldFVpZCA9IHVzZUlkKHtcbiAgICByZXF1aXJlZDogcmVxdWlyZWRGb3JBdHRyLFxuICAgIGdldFZhbHVlOiAoKSA9PiBwcm9wcy5mb3JcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlcXVpcmVkRm9yQXR0cixcbiAgICBjaGFuZ2VFdmVudCxcbiAgICB0YWc6IHRhZ1Byb3AgPT09IHRydWVcbiAgICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMudGFnKVxuICAgICAgOiB7IHZhbHVlOiAnbGFiZWwnIH0sXG5cbiAgICBpc0RhcmssXG5cbiAgICBlZGl0YWJsZTogY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMucmVhZG9ubHkgIT09IHRydWVcbiAgICApLFxuXG4gICAgaW5uZXJMb2FkaW5nOiByZWYoZmFsc2UpLFxuICAgIGZvY3VzZWQ6IHJlZihmYWxzZSksXG4gICAgaGFzUG9wdXBPcGVuOiBmYWxzZSxcblxuICAgIHNwbGl0QXR0cnM6IHVzZVNwbGl0QXR0cnMoKSxcbiAgICB0YXJnZXRVaWQsXG5cbiAgICByb290UmVmOiByZWYobnVsbCksXG4gICAgdGFyZ2V0UmVmOiByZWYobnVsbCksXG4gICAgY29udHJvbFJlZjogcmVmKG51bGwpXG5cbiAgICAvKipcbiAgICAgKiB1c2VyIHN1cHBsaWVkIGFkZGl0aW9uYWxzOlxuXG4gICAgICogaW5uZXJWYWx1ZSAtIGNvbXB1dGVkXG4gICAgICogZmxvYXRpbmdMYWJlbCAtIGNvbXB1dGVkXG4gICAgICogaW5wdXRSZWYgLSBjb21wdXRlZFxuXG4gICAgICogZmllbGRDbGFzcyAtIGNvbXB1dGVkXG4gICAgICogaGFzU2hhZG93IC0gY29tcHV0ZWRcblxuICAgICAqIGNvbnRyb2xFdmVudHMgLSBPYmplY3Qgd2l0aCBmbihlKVxuXG4gICAgICogZ2V0Q29udHJvbCAtIGZuXG4gICAgICogZ2V0SW5uZXJBcHBlbmQgLSBmblxuICAgICAqIGdldENvbnRyb2xDaGlsZCAtIGZuXG4gICAgICogZ2V0U2hhZG93Q29udHJvbCAtIGZuXG4gICAgICogc2hvd1BvcHVwIC0gZm5cbiAgICAgKi9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgc2xvdHMsIGF0dHJzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBsZXQgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICBpZiAoc3RhdGUuaGFzVmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLm1vZGVsVmFsdWUpKVxuICB9XG5cbiAgaWYgKHN0YXRlLmVtaXRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuZW1pdFZhbHVlID0gdmFsdWUgPT4ge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUuY29udHJvbEV2ZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuY29udHJvbEV2ZW50cyA9IHtcbiAgICAgIG9uRm9jdXNpbjogb25Db250cm9sRm9jdXNpbixcbiAgICAgIG9uRm9jdXNvdXQ6IG9uQ29udHJvbEZvY3Vzb3V0XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGNsZWFyVmFsdWUsXG4gICAgb25Db250cm9sRm9jdXNpbixcbiAgICBvbkNvbnRyb2xGb2N1c291dCxcbiAgICBmb2N1c1xuICB9KVxuXG4gIGlmIChzdGF0ZS5jb21wdXRlZENvdW50ZXIgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbXB1dGVkQ291bnRlciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5jb3VudGVyICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBsZW4gPSB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgPyAoJycgKyBwcm9wcy5tb2RlbFZhbHVlKS5sZW5ndGhcbiAgICAgICAgICA6IChBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlID8gcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggOiAwKVxuXG4gICAgICAgIGNvbnN0IG1heCA9IHByb3BzLm1heGxlbmd0aCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBwcm9wcy5tYXhsZW5ndGhcbiAgICAgICAgICA6IHByb3BzLm1heFZhbHVlc1xuXG4gICAgICAgIHJldHVybiBsZW4gKyAobWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdCB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfSA9IHVzZVZhbGlkYXRlKHN0YXRlLmZvY3VzZWQsIHN0YXRlLmlubmVyTG9hZGluZylcblxuICBjb25zdCBmbG9hdGluZ0xhYmVsID0gc3RhdGUuZmxvYXRpbmdMYWJlbCAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICA6IGNvbXB1dGVkKCgpID0+IHByb3BzLnN0YWNrTGFiZWwgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcblxuICBjb25zdCBzaG91bGRSZW5kZXJCb3R0b20gPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmJvdHRvbVNsb3RzID09PSB0cnVlXG4gICAgfHwgcHJvcHMuaGludCAhPT0gdm9pZCAwXG4gICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICB8fCBwcm9wcy5jb3VudGVyID09PSB0cnVlXG4gICAgfHwgcHJvcHMuZXJyb3IgIT09IG51bGxcbiAgKVxuXG4gIGNvbnN0IHN0eWxlVHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuZmlsbGVkID09PSB0cnVlKSB7IHJldHVybiAnZmlsbGVkJyB9XG4gICAgaWYgKHByb3BzLm91dGxpbmVkID09PSB0cnVlKSB7IHJldHVybiAnb3V0bGluZWQnIH1cbiAgICBpZiAocHJvcHMuYm9yZGVybGVzcyA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2JvcmRlcmxlc3MnIH1cbiAgICBpZiAocHJvcHMuc3RhbmRvdXQpIHsgcmV0dXJuICdzdGFuZG91dCcgfVxuICAgIHJldHVybiAnc3RhbmRhcmQnXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYHEtZmllbGQgcm93IG5vLXdyYXAgaXRlbXMtc3RhcnQgcS1maWVsZC0tJHsgc3R5bGVUeXBlLnZhbHVlIH1gXG4gICAgKyAoc3RhdGUuZmllbGRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBzdGF0ZS5maWVsZENsYXNzLnZhbHVlIH1gIDogJycpXG4gICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tcm91bmRlZCcgOiAnJylcbiAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZmllbGQtLXNxdWFyZScgOiAnJylcbiAgICArIChmbG9hdGluZ0xhYmVsLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mbG9hdCcgOiAnJylcbiAgICArIChoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tbGFiZWxlZCcgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGVuc2UnIDogJycpXG4gICAgKyAocHJvcHMuaXRlbUFsaWduZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLWl0ZW0tYWxpZ25lZCBxLWl0ZW0tdHlwZScgOiAnJylcbiAgICArIChzdGF0ZS5pc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWRhcmsnIDogJycpXG4gICAgKyAoc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwID8gJyBxLWZpZWxkLS1hdXRvLWhlaWdodCcgOiAnJylcbiAgICArIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mb2N1c2VkJyA6ICcnKVxuICAgICsgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1lcnJvcicgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1oaWdobGlnaHRlZCcgOiAnJylcbiAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgJiYgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS13aXRoLWJvdHRvbScgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kaXNhYmxlZCcgOiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUgPyAnIHEtZmllbGQtLXJlYWRvbmx5JyA6ICcnKSlcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2NvbnRyb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAnXG4gICAgKyAocHJvcHMuYmdDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5iZ0NvbG9yIH1gIDogJycpXG4gICAgKyAoXG4gICAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICcgdGV4dC1uZWdhdGl2ZSdcbiAgICAgICAgOiAoXG4gICAgICAgICAgICB0eXBlb2YgcHJvcHMuc3RhbmRvdXQgPT09ICdzdHJpbmcnICYmIHByb3BzLnN0YW5kb3V0Lmxlbmd0aCAhPT0gMCAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gYCAkeyBwcm9wcy5zdGFuZG91dCB9YFxuICAgICAgICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICAgKVxuICAgIClcbiAgKVxuXG4gIGNvbnN0IGhhc0xhYmVsID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5sYWJlbFNsb3QgPT09IHRydWUgfHwgcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICApXG5cbiAgY29uc3QgbGFiZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2xhYmVsIG5vLXBvaW50ZXItZXZlbnRzIGFic29sdXRlIGVsbGlwc2lzJ1xuICAgICsgKHByb3BzLmxhYmVsQ29sb3IgIT09IHZvaWQgMCAmJiBoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSA/IGAgdGV4dC0keyBwcm9wcy5sYWJlbENvbG9yIH1gIDogJycpXG4gIClcblxuICBjb25zdCBjb250cm9sU2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgIGVkaXRhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSxcbiAgICBmb2N1c2VkOiBzdGF0ZS5mb2N1c2VkLnZhbHVlLFxuICAgIGZsb2F0aW5nTGFiZWw6IGZsb2F0aW5nTGFiZWwudmFsdWUsXG4gICAgbW9kZWxWYWx1ZTogcHJvcHMubW9kZWxWYWx1ZSxcbiAgICBlbWl0VmFsdWU6IHN0YXRlLmVtaXRWYWx1ZVxuICB9KSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHt9XG5cbiAgICBpZiAoc3RhdGUudGFyZ2V0VWlkLnZhbHVlKSB7XG4gICAgICBhY2MuZm9yID0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgZnVuY3Rpb24gZm9jdXNIYW5kbGVyICgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBsZXQgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0UmVmICE9PSB2b2lkIDAgJiYgc3RhdGUudGFyZ2V0UmVmLnZhbHVlXG5cbiAgICBpZiAodGFyZ2V0ICYmIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKSkge1xuICAgICAgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSA9PT0gdHJ1ZSB8fCAodGFyZ2V0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ1t0YWJpbmRleF0nKSlcbiAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBlbCkge1xuICAgICAgICB0YXJnZXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgIGFkZEZvY3VzRm4oZm9jdXNIYW5kbGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gYmx1ciAoKSB7XG4gICAgcmVtb3ZlRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgaWYgKGVsICE9PSBudWxsICYmIHN0YXRlLnJvb3RSZWYudmFsdWUuY29udGFpbnMoZWwpKSB7XG4gICAgICBlbC5ibHVyKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c2luIChlKSB7XG4gICAgaWYgKGZvY3Vzb3V0VGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICAgICAgZm9jdXNvdXRUaW1lciA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSB0cnVlXG4gICAgICBlbWl0KCdmb2N1cycsIGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db250cm9sRm9jdXNvdXQgKGUsIHRoZW4pIHtcbiAgICBmb2N1c291dFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICAgIGZvY3Vzb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZvY3Vzb3V0VGltZXIgPSBudWxsXG5cbiAgICAgIGlmIChcbiAgICAgICAgZG9jdW1lbnQuaGFzRm9jdXMoKSA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID09PSB0cnVlXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZiA9PT0gdm9pZCAwXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZSA9PT0gbnVsbFxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYudmFsdWUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdibHVyJywgZSlcbiAgICAgIH1cblxuICAgICAgdGhlbiAhPT0gdm9pZCAwICYmIHRoZW4oKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclZhbHVlIChlKSB7XG4gICAgLy8gcHJldmVudCBhY3RpdmF0aW5nIHRoZSBmaWVsZCBidXQga2VlcCBmb2N1cyBvbiBkZXNrdG9wXG4gICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGVsID0gKHN0YXRlLnRhcmdldFJlZiAhPT0gdm9pZCAwICYmIHN0YXRlLnRhcmdldFJlZi52YWx1ZSkgfHwgc3RhdGUucm9vdFJlZi52YWx1ZVxuICAgICAgZWwuZm9jdXMoKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdGF0ZS5yb290UmVmLnZhbHVlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB0cnVlKSB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICAgIH1cblxuICAgIGlmIChwcm9wcy50eXBlID09PSAnZmlsZScpIHtcbiAgICAgIC8vIGRvIG5vdCBsZXQgZm9jdXMgYmUgdHJpZ2dlcmVkXG4gICAgICAvLyBhcyBpdCB3aWxsIG1ha2UgdGhlIG5hdGl2ZSBmaWxlIGRpYWxvZ1xuICAgICAgLy8gYXBwZWFyIGZvciBhbm90aGVyIHNlbGVjdGlvblxuICAgICAgc3RhdGUuaW5wdXRSZWYudmFsdWUudmFsdWUgPSBudWxsXG4gICAgfVxuXG4gICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgIHN0YXRlLmNoYW5nZUV2ZW50ID09PSB0cnVlICYmIGVtaXQoJ2NoYW5nZScsIG51bGwpXG4gICAgZW1pdCgnY2xlYXInLCBwcm9wcy5tb2RlbFZhbHVlKVxuXG4gICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgY29uc3QgaXNEaXJ0eSA9IGlzRGlydHlNb2RlbC52YWx1ZVxuICAgICAgcmVzZXRWYWxpZGF0aW9uKClcbiAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IGlzRGlydHlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25DbGVhcmFibGVLZXl1cCAoZXZ0KSB7XG4gICAgWyAxMywgMzIgXS5pbmNsdWRlcyhldnQua2V5Q29kZSkgJiYgY2xlYXJWYWx1ZShldnQpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHNsb3RzLnByZXBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMucHJlcGVuZCgpKVxuICAgIClcblxuICAgIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb250cm9sLWNvbnRhaW5lciBjb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBnZXRDb250cm9sQ29udGFpbmVyKCkpXG4gICAgKVxuXG4gICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9FcnJvckljb24gPT09IGZhbHNlICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnZXJyb3InLCBbXG4gICAgICAgIGgoUUljb24sIHsgbmFtZTogJHEuaWNvblNldC5maWVsZC5lcnJvciwgY29sb3I6ICduZWdhdGl2ZScgfSlcbiAgICAgIF0pXG4gICAgKVxuXG4gICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgfHwgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZShcbiAgICAgICAgICAnaW5uZXItbG9hZGluZy1hcHBlbmQnLFxuICAgICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgICAgIDogWyBoKFFTcGlubmVyLCB7IGNvbG9yOiBwcm9wcy5jb2xvciB9KSBdXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuY2xlYXJhYmxlID09PSB0cnVlICYmIHN0YXRlLmhhc1ZhbHVlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItY2xlYXJhYmxlLWFwcGVuZCcsIFtcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2ZvY3VzYWJsZS1hY3Rpb24nLFxuICAgICAgICAgICAgbmFtZTogcHJvcHMuY2xlYXJJY29uIHx8ICRxLmljb25TZXQuZmllbGQuY2xlYXIsXG4gICAgICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdidXR0b24nLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ2ZhbHNlJyxcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogJHEubGFuZy5sYWJlbC5jbGVhcixcbiAgICAgICAgICAgIG9uS2V5dXA6IG9uQ2xlYXJhYmxlS2V5dXAsXG4gICAgICAgICAgICBvbkNsaWNrOiBjbGVhclZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBzbG90cy5hcHBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fYXBwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGtleTogJ2FwcGVuZCcsXG4gICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgIH0sIHNsb3RzLmFwcGVuZCgpKVxuICAgIClcblxuICAgIHN0YXRlLmdldElubmVyQXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdpbm5lci1hcHBlbmQnLCBzdGF0ZS5nZXRJbm5lckFwcGVuZCgpKVxuICAgIClcblxuICAgIHN0YXRlLmdldENvbnRyb2xDaGlsZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIHN0YXRlLmdldENvbnRyb2xDaGlsZCgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRyb2xDb250YWluZXIgKCkge1xuICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgcHJvcHMucHJlZml4ICE9PSB2b2lkIDAgJiYgcHJvcHMucHJlZml4ICE9PSBudWxsICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19wcmVmaXggbm8tcG9pbnRlci1ldmVudHMgcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIHByb3BzLnByZWZpeClcbiAgICApXG5cbiAgICBpZiAoc3RhdGUuZ2V0U2hhZG93Q29udHJvbCAhPT0gdm9pZCAwICYmIHN0YXRlLmhhc1NoYWRvdy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBzdGF0ZS5nZXRTaGFkb3dDb250cm9sKClcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZ2V0Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc3RhdGUuZ2V0Q29udHJvbCgpKVxuICAgIH1cbiAgICAvLyBpbnRlcm5hbCB1c2FnZSBvbmx5OlxuICAgIGVsc2UgaWYgKHNsb3RzLnJhd0NvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHNsb3RzLnJhd0NvbnRyb2woKSlcbiAgICB9XG4gICAgZWxzZSBpZiAoc2xvdHMuY29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLnRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cnLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMFxuICAgICAgICB9LCBzbG90cy5jb250cm9sKGNvbnRyb2xTbG90U2NvcGUudmFsdWUpKVxuICAgICAgKVxuICAgIH1cblxuICAgIGhhc0xhYmVsLnZhbHVlID09PSB0cnVlICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGxhYmVsQ2xhc3MudmFsdWVcbiAgICAgIH0sIGhTbG90KHNsb3RzLmxhYmVsLCBwcm9wcy5sYWJlbCkpXG4gICAgKVxuXG4gICAgcHJvcHMuc3VmZml4ICE9PSB2b2lkIDAgJiYgcHJvcHMuc3VmZml4ICE9PSBudWxsICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19zdWZmaXggbm8tcG9pbnRlci1ldmVudHMgcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIHByb3BzLnN1ZmZpeClcbiAgICApXG5cbiAgICByZXR1cm4gbm9kZS5jb25jYXQoaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3R0b20gKCkge1xuICAgIGxldCBtc2csIGtleVxuXG4gICAgaWYgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAoZXJyb3JNZXNzYWdlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgeyByb2xlOiAnYWxlcnQnIH0sIGVycm9yTWVzc2FnZS52YWx1ZSkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1lcnJvci0keyBlcnJvck1lc3NhZ2UudmFsdWUgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5lcnJvcilcbiAgICAgICAga2V5ID0gJ3EtLXNsb3QtZXJyb3InXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmhpZGVIaW50ICE9PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy5oaW50ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbXNnID0gWyBoKCdkaXYnLCBwcm9wcy5oaW50KSBdXG4gICAgICAgIGtleSA9IGBxLS1zbG90LWhpbnQtJHsgcHJvcHMuaGludCB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyA9IGhTbG90KHNsb3RzLmhpbnQpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWhpbnQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ291bnRlciA9IHByb3BzLmNvdW50ZXIgPT09IHRydWUgfHwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwXG5cbiAgICBpZiAoXG4gICAgICBwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWVcbiAgICAgICYmIGhhc0NvdW50ZXIgPT09IGZhbHNlXG4gICAgICAmJiBtc2cgPT09IHZvaWQgMFxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdCBtYWluID0gaCgnZGl2Jywge1xuICAgICAga2V5LFxuICAgICAgY2xhc3M6ICdxLWZpZWxkX19tZXNzYWdlcyBjb2wnXG4gICAgfSwgbXNnKVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fYm90dG9tIHJvdyBpdGVtcy1zdGFydCBxLWZpZWxkX19ib3R0b20tLSdcbiAgICAgICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlID8gJ2FuaW1hdGVkJyA6ICdzdGFsZScpLFxuICAgICAgb25DbGljazogcHJldmVudFxuICAgIH0sIFtcbiAgICAgIHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZVxuICAgICAgICA/IG1haW5cbiAgICAgICAgOiBoKFRyYW5zaXRpb24sIHsgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmllbGQtbWVzc2FnZScgfSwgKCkgPT4gbWFpbiksXG5cbiAgICAgIGhhc0NvdW50ZXIgPT09IHRydWVcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb3VudGVyJ1xuICAgICAgICB9LCBzbG90cy5jb3VudGVyICE9PSB2b2lkIDAgPyBzbG90cy5jb3VudGVyKCkgOiBzdGF0ZS5jb21wdXRlZENvdW50ZXIudmFsdWUpXG4gICAgICAgIDogbnVsbFxuICAgIF0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbm5lckFwcGVuZE5vZGUgKGtleSwgY29udGVudCkge1xuICAgIHJldHVybiBjb250ZW50ID09PSBudWxsXG4gICAgICA/IG51bGxcbiAgICAgIDogaCgnZGl2Jywge1xuICAgICAgICBrZXksXG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fYXBwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCdcbiAgICAgIH0sIGNvbnRlbnQpXG4gIH1cblxuICBsZXQgc2hvdWxkQWN0aXZhdGUgPSBmYWxzZVxuXG4gIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICB9KVxuXG4gIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgcHJveHkuZm9jdXMoKVxuICB9KVxuXG4gIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgZm9jdXMsIGJsdXIgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gcmVuZGVyRmllbGQgKCkge1xuICAgIGNvbnN0IGxhYmVsQXR0cnMgPSBzdGF0ZS5nZXRDb250cm9sID09PSB2b2lkIDAgJiYgc2xvdHMuY29udHJvbCA9PT0gdm9pZCAwXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlXG4gICAgICAgIH1cbiAgICAgIDogYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgcmV0dXJuIGgoc3RhdGUudGFnLnZhbHVlLCB7XG4gICAgICByZWY6IHN0YXRlLnJvb3RSZWYsXG4gICAgICBjbGFzczogW1xuICAgICAgICBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgXSxcbiAgICAgIHN0eWxlOiBhdHRycy5zdHlsZSxcbiAgICAgIC4uLmxhYmVsQXR0cnNcbiAgICB9LCBbXG4gICAgICBzbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2JlZm9yZSBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgICAgfSwgc2xvdHMuYmVmb3JlKCkpXG4gICAgICAgIDogbnVsbCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIGNvbCBzZWxmLXN0cmV0Y2gnXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLmNvbnRyb2xSZWYsXG4gICAgICAgICAgY2xhc3M6IGNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuY29udHJvbEV2ZW50c1xuICAgICAgICB9LCBnZXRDb250ZW50KCkpLFxuXG4gICAgICAgIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gZ2V0Qm90dG9tKClcbiAgICAgICAgICA6IG51bGxcbiAgICAgIF0pLFxuXG4gICAgICBzbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fYWZ0ZXIgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmFmdGVyKCkpXG4gICAgICAgIDogbnVsbFxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgd2F0Y2gsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmtleWJvYXJkL2tleS1jb21wb3NpdGlvbi5qcydcblxuLy8gbGVhdmUgTkFNRURfTUFTS1MgYXQgdG9wIG9mIGZpbGUgKGNvZGUgcmVmZXJlbmNlZCBmcm9tIGRvY3MpXG5jb25zdCBOQU1FRF9NQVNLUyA9IHtcbiAgZGF0ZTogJyMjIyMvIyMvIyMnLFxuICBkYXRldGltZTogJyMjIyMvIyMvIyMgIyM6IyMnLFxuICB0aW1lOiAnIyM6IyMnLFxuICBmdWxsdGltZTogJyMjOiMjOiMjJyxcbiAgcGhvbmU6ICcoIyMjKSAjIyMgLSAjIyMjJyxcbiAgY2FyZDogJyMjIyMgIyMjIyAjIyMjICMjIyMnXG59XG5cbmNvbnN0IFRPS0VOUyA9IHtcbiAgJyMnOiB7IHBhdHRlcm46ICdbXFxcXGRdJywgbmVnYXRlOiAnW15cXFxcZF0nIH0sXG5cbiAgUzogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nIH0sXG4gIE46IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJyB9LFxuXG4gIEE6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVVcHBlckNhc2UoKSB9LFxuICBhOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlTG93ZXJDYXNlKCkgfSxcblxuICBYOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgeDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH1cbn1cblxuY29uc3QgS0VZUyA9IE9iamVjdC5rZXlzKFRPS0VOUylcbktFWVMuZm9yRWFjaChrZXkgPT4ge1xuICBUT0tFTlNbIGtleSBdLnJlZ2V4ID0gbmV3IFJlZ0V4cChUT0tFTlNbIGtleSBdLnBhdHRlcm4pXG59KVxuXG5jb25zdFxuICB0b2tlblJlZ2V4TWFzayA9IG5ldyBSZWdFeHAoJ1xcXFxcXFxcKFteLiorP14ke30oKXwoW1xcXFxdXSl8KFsuKis/XiR7fSgpfFtcXFxcXV0pfChbJyArIEtFWVMuam9pbignJykgKyAnXSl8KC4pJywgJ2cnKSxcbiAgZXNjUmVnZXggPSAvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2dcblxuY29uc3QgTUFSS0VSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgxKVxuXG5leHBvcnQgY29uc3QgdXNlTWFza1Byb3BzID0ge1xuICBtYXNrOiBTdHJpbmcsXG4gIHJldmVyc2VGaWxsTWFzazogQm9vbGVhbixcbiAgZmlsbE1hc2s6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gIHVubWFza2VkVmFsdWU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBlbWl0LCBlbWl0VmFsdWUsIGlucHV0UmVmKSB7XG4gIGxldCBtYXNrTWFya2VkLCBtYXNrUmVwbGFjZWQsIGNvbXB1dGVkTWFzaywgY29tcHV0ZWRVbm1hc2ssIHBhc3RlZFRleHRTdGFydCwgc2VsZWN0aW9uQW5jaG9yXG5cbiAgY29uc3QgaGFzTWFzayA9IHJlZihudWxsKVxuICBjb25zdCBpbm5lclZhbHVlID0gcmVmKGdldEluaXRpYWxNYXNrZWRWYWx1ZSgpKVxuXG4gIGZ1bmN0aW9uIGdldElzVHlwZVRleHQgKCkge1xuICAgIHJldHVybiBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dGFyZWEnLCAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSArIHByb3BzLmF1dG9ncm93LCB1cGRhdGVNYXNrSW50ZXJuYWxzKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1hc2ssIHYgPT4ge1xuICAgIGlmICh2ICE9PSB2b2lkIDApIHtcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHVubWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gICAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbE1hc2sgKyBwcm9wcy5yZXZlcnNlRmlsbE1hc2ssICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnVubWFza2VkVmFsdWUsICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEluaXRpYWxNYXNrZWRWYWx1ZSAoKSB7XG4gICAgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKHByb3BzLm1vZGVsVmFsdWUpKVxuXG4gICAgICByZXR1cm4gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKG1hc2tlZClcbiAgICAgICAgOiBtYXNrZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFkZGVkTWFza01hcmtlZCAoc2l6ZSkge1xuICAgIGlmIChzaXplIDwgbWFza01hcmtlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBtYXNrTWFya2VkLnNsaWNlKC1zaXplKVxuICAgIH1cblxuICAgIGxldCBwYWQgPSAnJywgbG9jYWxNYXNrTWFya2VkID0gbWFza01hcmtlZFxuICAgIGNvbnN0IHBhZFBvcyA9IGxvY2FsTWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGlmIChwYWRQb3MgIT09IC0xKSB7XG4gICAgICBmb3IgKGxldCBpID0gc2l6ZSAtIGxvY2FsTWFza01hcmtlZC5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgcGFkICs9IE1BUktFUlxuICAgICAgfVxuXG4gICAgICBsb2NhbE1hc2tNYXJrZWQgPSBsb2NhbE1hc2tNYXJrZWQuc2xpY2UoMCwgcGFkUG9zKSArIHBhZCArIGxvY2FsTWFza01hcmtlZC5zbGljZShwYWRQb3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsTWFza01hcmtlZFxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFza0ludGVybmFscyAoKSB7XG4gICAgaGFzTWFzay52YWx1ZSA9IHByb3BzLm1hc2sgIT09IHZvaWQgMFxuICAgICAgJiYgcHJvcHMubWFzay5sZW5ndGggIT09IDBcbiAgICAgICYmIGdldElzVHlwZVRleHQoKVxuXG4gICAgaWYgKGhhc01hc2sudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBjb21wdXRlZFVubWFzayA9IHZvaWQgMFxuICAgICAgbWFza01hcmtlZCA9ICcnXG4gICAgICBtYXNrUmVwbGFjZWQgPSAnJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGxvY2FsQ29tcHV0ZWRNYXNrID0gTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSA9PT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMubWFza1xuICAgICAgICA6IE5BTUVEX01BU0tTWyBwcm9wcy5tYXNrIF0sXG4gICAgICBmaWxsQ2hhciA9IHR5cGVvZiBwcm9wcy5maWxsTWFzayA9PT0gJ3N0cmluZycgJiYgcHJvcHMuZmlsbE1hc2subGVuZ3RoICE9PSAwXG4gICAgICAgID8gcHJvcHMuZmlsbE1hc2suc2xpY2UoMCwgMSlcbiAgICAgICAgOiAnXycsXG4gICAgICBmaWxsQ2hhckVzY2FwZWQgPSBmaWxsQ2hhci5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXCQmJyksXG4gICAgICB1bm1hc2sgPSBbXSxcbiAgICAgIGV4dHJhY3QgPSBbXSxcbiAgICAgIG1hc2sgPSBbXVxuXG4gICAgbGV0XG4gICAgICBmaXJzdE1hdGNoID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlLFxuICAgICAgdW5tYXNrQ2hhciA9ICcnLFxuICAgICAgbmVnYXRlQ2hhciA9ICcnXG5cbiAgICBsb2NhbENvbXB1dGVkTWFzay5yZXBsYWNlKHRva2VuUmVnZXhNYXNrLCAoXywgY2hhcjEsIGVzYywgdG9rZW4sIGNoYXIyKSA9PiB7XG4gICAgICBpZiAodG9rZW4gIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBjID0gVE9LRU5TWyB0b2tlbiBdXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICBuZWdhdGVDaGFyID0gYy5uZWdhdGVcbiAgICAgICAgaWYgKGZpcnN0TWF0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICBleHRyYWN0LnB1c2goJyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPycpXG4gICAgICAgICAgZmlyc3RNYXRjaCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcpPycpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlc2MgIT09IHZvaWQgMCkge1xuICAgICAgICB1bm1hc2tDaGFyID0gJ1xcXFwnICsgKGVzYyA9PT0gJ1xcXFwnID8gJycgOiBlc2MpXG4gICAgICAgIG1hc2sucHVzaChlc2MpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgYyA9IGNoYXIxICE9PSB2b2lkIDAgPyBjaGFyMSA6IGNoYXIyXG4gICAgICAgIHVubWFza0NoYXIgPSBjID09PSAnXFxcXCcgPyAnXFxcXFxcXFxcXFxcXFxcXCcgOiBjLnJlcGxhY2UoZXNjUmVnZXgsICdcXFxcXFxcXCQmJylcbiAgICAgICAgbWFzay5wdXNoKGMpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0XG4gICAgICB1bm1hc2tNYXRjaGVyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgJ14nXG4gICAgICAgICsgdW5tYXNrLmpvaW4oJycpXG4gICAgICAgICsgJygnICsgKHVubWFza0NoYXIgPT09ICcnID8gJy4nIDogJ1teJyArIHVubWFza0NoYXIgKyAnXScpICsgJyspPydcbiAgICAgICAgKyAodW5tYXNrQ2hhciA9PT0gJycgPyAnJyA6ICdbJyArIHVubWFza0NoYXIgKyAnXSonKSArICckJ1xuICAgICAgKSxcbiAgICAgIGV4dHJhY3RMYXN0ID0gZXh0cmFjdC5sZW5ndGggLSAxLFxuICAgICAgZXh0cmFjdE1hdGNoZXIgPSBleHRyYWN0Lm1hcCgocmUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBmaWxsQ2hhckVzY2FwZWQgKyAnKicgKyByZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gZXh0cmFjdExhc3QpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeJyArIHJlXG4gICAgICAgICAgICArICcoJyArIChuZWdhdGVDaGFyID09PSAnJyA/ICcuJyA6IG5lZ2F0ZUNoYXIpICsgJyspPydcbiAgICAgICAgICAgICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICckJyA6IGZpbGxDaGFyRXNjYXBlZCArICcqJylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByZSlcbiAgICAgIH0pXG5cbiAgICBjb21wdXRlZE1hc2sgPSBtYXNrXG4gICAgY29tcHV0ZWRVbm1hc2sgPSB2YWwgPT4ge1xuICAgICAgY29uc3QgdW5tYXNrTWF0Y2ggPSB1bm1hc2tNYXRjaGVyLmV4ZWMocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gdmFsIDogdmFsLnNsaWNlKDAsIG1hc2subGVuZ3RoICsgMSkpXG4gICAgICBpZiAodW5tYXNrTWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgdmFsID0gdW5tYXNrTWF0Y2guc2xpY2UoMSkuam9pbignJylcbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgZXh0cmFjdE1hdGNoID0gW10sXG4gICAgICAgIGV4dHJhY3RNYXRjaGVyTGVuZ3RoID0gZXh0cmFjdE1hdGNoZXIubGVuZ3RoXG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBzdHIgPSB2YWw7IGkgPCBleHRyYWN0TWF0Y2hlckxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG0gPSBleHRyYWN0TWF0Y2hlclsgaSBdLmV4ZWMoc3RyKVxuXG4gICAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShtLnNoaWZ0KCkubGVuZ3RoKVxuICAgICAgICBleHRyYWN0TWF0Y2gucHVzaCguLi5tKVxuICAgICAgfVxuICAgICAgaWYgKGV4dHJhY3RNYXRjaC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RNYXRjaC5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuICAgIG1hc2tNYXJrZWQgPSBtYXNrLm1hcCh2ID0+ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyB2IDogTUFSS0VSKSkuam9pbignJylcbiAgICBtYXNrUmVwbGFjZWQgPSBtYXNrTWFya2VkLnNwbGl0KE1BUktFUikuam9pbihmaWxsQ2hhcilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tWYWx1ZSAocmF3VmFsLCB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZywgaW5wdXRUeXBlKSB7XG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZCxcbiAgICAgIGVuZFJldmVyc2UgPSBpbnAudmFsdWUubGVuZ3RoIC0gZW5kLFxuICAgICAgdW5tYXNrZWQgPSB1bm1hc2tWYWx1ZShyYXdWYWwpXG5cbiAgICAvLyBVcGRhdGUgaGVyZSBzbyB1bm1hc2sgdXNlcyB0aGUgb3JpZ2luYWwgZmlsbENoYXJcbiAgICB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZyA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrSW50ZXJuYWxzKClcblxuICAgIGNvbnN0XG4gICAgICBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrZWQpLFxuICAgICAgbWFza2VkID0gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKHByZU1hc2tlZClcbiAgICAgICAgOiBwcmVNYXNrZWQsXG4gICAgICBjaGFuZ2VkID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gbWFza2VkXG5cbiAgICAvLyBXZSB3YW50IHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiIHNvIHdlIHNldCB2YWx1ZSBpbW1lZGlhdGVseVxuICAgIGlucC52YWx1ZSAhPT0gbWFza2VkICYmIChpbnAudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBjaGFuZ2VkID09PSB0cnVlICYmIChpbm5lclZhbHVlLnZhbHVlID0gbWFza2VkKVxuXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wICYmIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGlmIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyBtYXNrUmVwbGFjZWQubGVuZ3RoIDogMFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dFR5cGUgPT09ICdpbnNlcnRGcm9tUGFzdGUnICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXhFbmQgPSBpbnAuc2VsZWN0aW9uRW5kXG4gICAgICAgIGxldCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgIC8vIGVhY2ggbm9uLW1hcmtlciBjaGFyIG1lYW5zIHdlIG1vdmUgb25jZSB0byByaWdodFxuICAgICAgICBmb3IgKGxldCBpID0gcGFzdGVkVGV4dFN0YXJ0OyBpIDw9IGN1cnNvciAmJiBpIDwgbWF4RW5kOyBpKyspIHtcbiAgICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdICE9PSBNQVJLRVIpIHtcbiAgICAgICAgICAgIGN1cnNvcisrXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChbICdkZWxldGVDb250ZW50QmFja3dhcmQnLCAnZGVsZXRlQ29udGVudEZvcndhcmQnIF0uaW5kZXhPZihpbnB1dFR5cGUpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgZW5kID09PSAwXG4gICAgICAgICAgICAgICAgPyAobWFza2VkLmxlbmd0aCA+IHByZU1hc2tlZC5sZW5ndGggPyAxIDogMClcbiAgICAgICAgICAgICAgICA6IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSkgKyAxKSkgKyAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBlbmRcblxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrZWQubGVuZ3RoIC0gKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkID8gMCA6IE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZFJldmVyc2UgKyAxKSkpXG5cbiAgICAgICAgICBpZiAoY3Vyc29yID09PSAxICYmIGVuZCA9PT0gMSkge1xuICAgICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBjdXJzb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IG1hc2tlZC5sZW5ndGggLSBlbmRSZXZlcnNlXG4gICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kKSAtIDEpXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB2YWwgPSBwcm9wcy51bm1hc2tlZFZhbHVlID09PSB0cnVlXG4gICAgICA/IHVubWFza1ZhbHVlKG1hc2tlZClcbiAgICAgIDogbWFza2VkXG5cbiAgICBpZiAoXG4gICAgICBTdHJpbmcocHJvcHMubW9kZWxWYWx1ZSkgIT09IHZhbFxuICAgICAgJiYgKHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGwgfHwgdmFsICE9PSAnJylcbiAgICApIHtcbiAgICAgIGVtaXRWYWx1ZSh2YWwsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUN1cnNvckZvclBhc3RlIChpbnAsIHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrVmFsdWUoaW5wLnZhbHVlKSlcblxuICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgbWFza01hcmtlZC5pbmRleE9mKE1BUktFUiksIE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIHN0YXJ0KSlcbiAgICBwYXN0ZWRUZXh0U3RhcnQgPSBzdGFydFxuXG4gICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQsICdmb3J3YXJkJylcbiAgfVxuXG4gIGNvbnN0IG1vdmVDdXJzb3IgPSB7XG4gICAgbGVmdCAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0IG5vTWFya0JlZm9yZSA9IG1hc2tNYXJrZWQuc2xpY2UoY3Vyc29yIC0gMSkuaW5kZXhPZihNQVJLRVIpID09PSAtMVxuICAgICAgbGV0IGkgPSBNYXRoLm1heCgwLCBjdXJzb3IgLSAxKVxuXG4gICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBjdXJzb3IrK1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpIDwgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodChpbnAsIDApXG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICB9LFxuXG4gICAgcmlnaHQgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdCBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGhcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGN1cnNvciArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdChpbnAsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICB9LFxuXG4gICAgbGVmdFJldmVyc2UgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGlucC52YWx1ZS5sZW5ndGgpXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIGN1cnNvciAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobG9jYWxNYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCAwKVxuICAgICAgfVxuXG4gICAgICBjdXJzb3IgPj0gMCAmJiBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgfSxcblxuICAgIHJpZ2h0UmV2ZXJzZSAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aCxcbiAgICAgICAgbG9jYWxNYXNrTWFya2VkID0gZ2V0UGFkZGVkTWFza01hcmtlZChsaW1pdCksXG4gICAgICAgIG5vTWFya0JlZm9yZSA9IGxvY2FsTWFza01hcmtlZC5zbGljZSgwLCBjdXJzb3IgKyAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWluKGxpbWl0LCBjdXJzb3IgKyAxKVxuXG4gICAgICBmb3IgKDsgaSA8PSBsaW1pdDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBjdXJzb3IgPiAwICYmIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBjdXJzb3ItLVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgLSAxIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdFJldmVyc2UoaW5wLCBsaW1pdClcbiAgICAgIH1cblxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25NYXNrZWRDbGljayAoZSkge1xuICAgIGVtaXQoJ2NsaWNrJywgZSlcblxuICAgIHNlbGVjdGlvbkFuY2hvciA9IHZvaWQgMFxuICB9XG5cbiAgZnVuY3Rpb24gb25NYXNrZWRLZXlkb3duIChlKSB7XG4gICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICBpZiAoXG4gICAgICBzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWVcbiAgICAgIHx8IGUuYWx0S2V5ID09PSB0cnVlIC8vIGxldCBicm93c2VyIGhhbmRsZSB0aGVzZVxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdFxuICAgICAgaW5wID0gaW5wdXRSZWYudmFsdWUsXG4gICAgICBzdGFydCA9IGlucC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZCA9IGlucC5zZWxlY3Rpb25FbmRcblxuICAgIGlmICghZS5zaGlmdEtleSkge1xuICAgICAgc2VsZWN0aW9uQW5jaG9yID0gdm9pZCAwXG4gICAgfVxuXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOSkgeyAvLyBMZWZ0IC8gUmlnaHRcbiAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIHNlbGVjdGlvbkFuY2hvciA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNlbGVjdGlvbkFuY2hvciA9IGlucC5zZWxlY3Rpb25EaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IHN0YXJ0IDogZW5kXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZuID0gbW92ZUN1cnNvclsgKGUua2V5Q29kZSA9PT0gMzkgPyAncmlnaHQnIDogJ2xlZnQnKSArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnUmV2ZXJzZScgOiAnJykgXVxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGZuKGlucCwgc2VsZWN0aW9uQW5jaG9yID09PSBzdGFydCA/IGVuZCA6IHN0YXJ0KVxuXG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBpbnAuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKE1hdGgubWluKHNlbGVjdGlvbkFuY2hvciwgY3Vyc29yKSwgTWF0aC5tYXgoc2VsZWN0aW9uQW5jaG9yLCBjdXJzb3IpLCAnZm9yd2FyZCcpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS5rZXlDb2RlID09PSA4IC8vIEJhY2tzcGFjZVxuICAgICAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlXG4gICAgICAmJiBzdGFydCA9PT0gZW5kXG4gICAgKSB7XG4gICAgICBtb3ZlQ3Vyc29yLmxlZnQoaW5wLCBzdGFydClcbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShpbnAuc2VsZWN0aW9uU3RhcnQsIGVuZCwgJ2JhY2t3YXJkJylcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDQ2IC8vIERlbGV0ZVxuICAgICAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlXG4gICAgICAmJiBzdGFydCA9PT0gZW5kXG4gICAgKSB7XG4gICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIGVuZClcbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShzdGFydCwgaW5wLnNlbGVjdGlvbkVuZCwgJ2ZvcndhcmQnKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hc2tWYWx1ZSAodmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09ICcnKSB7IHJldHVybiAnJyB9XG5cbiAgICBpZiAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbWFza1ZhbHVlUmV2ZXJzZSh2YWwpXG4gICAgfVxuXG4gICAgY29uc3QgbWFzayA9IGNvbXB1dGVkTWFza1xuXG4gICAgbGV0IHZhbEluZGV4ID0gMCwgb3V0cHV0ID0gJydcblxuICAgIGZvciAobGV0IG1hc2tJbmRleCA9IDA7IG1hc2tJbmRleCA8IG1hc2subGVuZ3RoOyBtYXNrSW5kZXgrKykge1xuICAgICAgY29uc3RcbiAgICAgICAgdmFsQ2hhciA9IHZhbFsgdmFsSW5kZXggXSxcbiAgICAgICAgbWFza0RlZiA9IG1hc2tbIG1hc2tJbmRleCBdXG5cbiAgICAgIGlmICh0eXBlb2YgbWFza0RlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWZcbiAgICAgICAgdmFsQ2hhciA9PT0gbWFza0RlZiAmJiB2YWxJbmRleCsrXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh2YWxDaGFyICE9PSB2b2lkIDAgJiYgbWFza0RlZi5yZWdleC50ZXN0KHZhbENoYXIpKSB7XG4gICAgICAgIG91dHB1dCArPSBtYXNrRGVmLnRyYW5zZm9ybSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKVxuICAgICAgICAgIDogdmFsQ2hhclxuICAgICAgICB2YWxJbmRleCsrXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hc2tWYWx1ZVJldmVyc2UgKHZhbCkge1xuICAgIGNvbnN0XG4gICAgICBtYXNrID0gY29tcHV0ZWRNYXNrLFxuICAgICAgZmlyc3RUb2tlbkluZGV4ID0gbWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGxldCB2YWxJbmRleCA9IHZhbC5sZW5ndGggLSAxLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gbWFzay5sZW5ndGggLSAxOyBtYXNrSW5kZXggPj0gMCAmJiB2YWxJbmRleCAhPT0gLTE7IG1hc2tJbmRleC0tKSB7XG4gICAgICBjb25zdCBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgbGV0IHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgPSBtYXNrRGVmICsgb3V0cHV0XG4gICAgICAgIHZhbENoYXIgPT09IG1hc2tEZWYgJiYgdmFsSW5kZXgtLVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb3V0cHV0ID0gKG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKSA6IHZhbENoYXIpICsgb3V0cHV0XG4gICAgICAgICAgdmFsSW5kZXgtLVxuICAgICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgfSB3aGlsZSAoZmlyc3RUb2tlbkluZGV4ID09PSBtYXNrSW5kZXggJiYgdmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXNrVmFsdWUgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAnc3RyaW5nJyB8fCBjb21wdXRlZFVubWFzayA9PT0gdm9pZCAwXG4gICAgICA/ICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGNvbXB1dGVkVW5tYXNrKCcnICsgdmFsKSA6IHZhbClcbiAgICAgIDogY29tcHV0ZWRVbm1hc2sodmFsKVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsbFdpdGhNYXNrICh2YWwpIHtcbiAgICBpZiAobWFza1JlcGxhY2VkLmxlbmd0aCAtIHZhbC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgJiYgdmFsLmxlbmd0aCAhPT0gMFxuICAgICAgPyBtYXNrUmVwbGFjZWQuc2xpY2UoMCwgLXZhbC5sZW5ndGgpICsgdmFsXG4gICAgICA6IHZhbCArIG1hc2tSZXBsYWNlZC5zbGljZSh2YWwubGVuZ3RoKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbm5lclZhbHVlLFxuICAgIGhhc01hc2ssXG4gICAgbW92ZUN1cnNvckZvclBhc3RlLFxuICAgIHVwZGF0ZU1hc2tWYWx1ZSxcbiAgICBvbk1hc2tlZEtleWRvd24sXG4gICAgb25NYXNrZWRDbGlja1xuICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZUZvcm1Qcm9wcyA9IHtcbiAgbmFtZTogU3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtQXR0cnMgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiAoe1xuICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgIG5hbWU6IHByb3BzLm5hbWUsXG4gICAgdmFsdWU6IHByb3BzLm1vZGVsVmFsdWVcbiAgfSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5qZWN0IChmb3JtQXR0cnMgPSB7fSkge1xuICByZXR1cm4gKGNoaWxkLCBhY3Rpb24sIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNoaWxkWyBhY3Rpb24gXShcbiAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICBjbGFzczogJ2hpZGRlbicgKyAoY2xhc3NOYW1lIHx8ICcnKSxcbiAgICAgICAgLi4uZm9ybUF0dHJzLnZhbHVlXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUlucHV0TmFtZUF0dHIgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYW1lIHx8IHByb3BzLmZvcilcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHR5cGVHdWFyZCkge1xuICBmdW5jdGlvbiBnZXRGb3JtRG9tUHJvcHMgKCkge1xuICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGR0ID0gJ0RhdGFUcmFuc2ZlcicgaW4gd2luZG93XG4gICAgICAgID8gbmV3IERhdGFUcmFuc2ZlcigpXG4gICAgICAgIDogKCdDbGlwYm9hcmRFdmVudCcgaW4gd2luZG93XG4gICAgICAgICAgICA/IG5ldyBDbGlwYm9hcmRFdmVudCgnJykuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIGlmIChPYmplY3QobW9kZWwpID09PSBtb2RlbCkge1xuICAgICAgICAoJ2xlbmd0aCcgaW4gbW9kZWxcbiAgICAgICAgICA/IEFycmF5LmZyb20obW9kZWwpXG4gICAgICAgICAgOiBbIG1vZGVsIF1cbiAgICAgICAgKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICAgIGR0Lml0ZW1zLmFkZChmaWxlKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxlczogZHQuZmlsZXNcbiAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZUd1YXJkID09PSB0cnVlXG4gICAgPyBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMudHlwZSAhPT0gJ2ZpbGUnKSByZXR1cm5cbiAgICAgIHJldHVybiBnZXRGb3JtRG9tUHJvcHMoKVxuICAgIH0pXG4gICAgOiBjb21wdXRlZChnZXRGb3JtRG9tUHJvcHMpXG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5jb25zdCBpc0phcGFuZXNlID0gL1tcXHUzMDAwLVxcdTMwM2ZcXHUzMDQwLVxcdTMwOWZcXHUzMGEwLVxcdTMwZmZcXHVmZjAwLVxcdWZmOWZcXHU0ZTAwLVxcdTlmYWZcXHUzNDAwLVxcdTRkYmZdL1xuY29uc3QgaXNDaGluZXNlID0gL1tcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHV7MjAwMDB9LVxcdXsyYTZkZn1cXHV7MmE3MDB9LVxcdXsyYjczZn1cXHV7MmI3NDB9LVxcdXsyYjgxZn1cXHV7MmI4MjB9LVxcdXsyY2VhZn1cXHVmOTAwLVxcdWZhZmZcXHUzMzAwLVxcdTMzZmZcXHVmZTMwLVxcdWZlNGZcXHVmOTAwLVxcdWZhZmZcXHV7MmY4MDB9LVxcdXsyZmExZn1dL3VcbmNvbnN0IGlzS29yZWFuID0gL1tcXHUzMTMxLVxcdTMxNGVcXHUzMTRmLVxcdTMxNjNcXHVhYzAwLVxcdWQ3YTNdL1xuY29uc3QgaXNQbGFpblRleHQgPSAvW2EtejAtOV8gLV0kL2lcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9uSW5wdXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uQ29tcG9zaXRpb24gKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAnY29tcG9zaXRpb25lbmQnIHx8IGUudHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgIGlmIChlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlKSByZXR1cm5cbiAgICAgIGUudGFyZ2V0LnFDb21wb3NpbmcgPSBmYWxzZVxuICAgICAgb25JbnB1dChlKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9udXBkYXRlJ1xuICAgICAgJiYgZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZVxuICAgICAgJiYgdHlwZW9mIGUuZGF0YSA9PT0gJ3N0cmluZydcbiAgICApIHtcbiAgICAgIGNvbnN0IGlzQ29tcG9zaW5nID0gY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWVcbiAgICAgICAgPyBpc1BsYWluVGV4dC50ZXN0KGUuZGF0YSkgPT09IGZhbHNlXG4gICAgICAgIDogaXNKYXBhbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNDaGluZXNlLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZSB8fCBpc0tvcmVhbi50ZXN0KGUuZGF0YSkgPT09IHRydWVcblxuICAgICAgaWYgKGlzQ29tcG9zaW5nID09PSB0cnVlKSB7XG4gICAgICAgIGUudGFyZ2V0LnFDb21wb3NpbmcgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VGaWVsZFByb3BzLCB1c2VGaWVsZEVtaXRzLCBmaWVsZFZhbHVlSXNGaWxsZWQgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWVsZC91c2UtZmllbGQuanMnXG5pbXBvcnQgdXNlTWFzaywgeyB1c2VNYXNrUHJvcHMgfSBmcm9tICcuL3VzZS1tYXNrLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1mb3JtL3ByaXZhdGUudXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWxlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1rZXktY29tcG9zaXRpb24vdXNlLWtleS1jb21wb3NpdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW5wdXQnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuICAgIC4uLnVzZU1hc2tQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgICAvLyBvdmVycmlkZSBvZiB1c2VGaWVsZFByb3BzID4gbW9kZWxWYWx1ZVxuICAgIG1vZGVsVmFsdWU6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgICAgPyB7fSAvLyBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBGaWxlTGlzdFxuICAgICAgOiBbIFN0cmluZywgTnVtYmVyLCBGaWxlTGlzdCBdLFxuXG4gICAgc2hhZG93VGV4dDogU3RyaW5nLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfSxcblxuICAgIGRlYm91bmNlOiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBhdXRvZ3JvdzogQm9vbGVhbiwgLy8gbWFrZXMgYSB0ZXh0YXJlYVxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdwYXN0ZScsICdjaGFuZ2UnLFxuICAgICdrZXlkb3duJywgJ2NsaWNrJywgJ2FuaW1hdGlvbmVuZCdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IHRlbXAgPSB7fVxuICAgIGxldCBlbWl0Q2FjaGVkVmFsdWUgPSBOYU4sIHR5cGVkTnVtYmVyLCBzdG9wVmFsdWVXYXRjaGVyLCBlbWl0VGltZXIgPSBudWxsLCBlbWl0VmFsdWVGblxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJWYWx1ZSxcbiAgICAgIGhhc01hc2ssXG4gICAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgICBvbk1hc2tlZEtleWRvd24sXG4gICAgICBvbk1hc2tlZENsaWNrXG4gICAgfSA9IHVzZU1hc2socHJvcHMsIGVtaXQsIGVtaXRWYWx1ZSwgaW5wdXRSZWYpXG5cbiAgICBjb25zdCBmb3JtRG9tUHJvcHMgPSB1c2VGaWxlRm9ybURvbVByb3BzKHByb3BzLCAvKiB0eXBlIGd1YXJkICovIHRydWUpXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSh7IGNoYW5nZUV2ZW50OiB0cnVlIH0pXG5cbiAgICBjb25zdCBpc1RleHRhcmVhID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnR5cGUgPT09ICd0ZXh0YXJlYScgfHwgcHJvcHMuYXV0b2dyb3cgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBpc1R5cGVUZXh0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWVcbiAgICAgIHx8IFsgJ3RleHQnLCAnc2VhcmNoJywgJ3VybCcsICd0ZWwnLCAncGFzc3dvcmQnIF0uaW5jbHVkZXMocHJvcHMudHlwZSlcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIG9uUGFzdGUsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZSxcbiAgICAgICAgb25CbHVyOiBvbkZpbmlzaEVkaXRpbmcsXG4gICAgICAgIG9uRm9jdXM6IHN0b3BcbiAgICAgIH1cblxuICAgICAgZXZ0Lm9uQ29tcG9zaXRpb25zdGFydCA9IGV2dC5vbkNvbXBvc2l0aW9udXBkYXRlID0gZXZ0Lm9uQ29tcG9zaXRpb25lbmQgPSBvbkNvbXBvc2l0aW9uXG5cbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbktleWRvd24gPSBvbk1hc2tlZEtleWRvd25cbiAgICAgICAgLy8gcmVzZXQgc2VsZWN0aW9uIGFuY2hvciBvbiBwb2ludGVyIHNlbGVjdGlvblxuICAgICAgICBldnQub25DbGljayA9IG9uTWFza2VkQ2xpY2tcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbkFuaW1hdGlvbmVuZCA9IG9uQW5pbWF0aW9uZW5kXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldnRcbiAgICB9KVxuXG4gICAgY29uc3QgaW5wdXRBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgcm93czogcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyA/IDYgOiB2b2lkIDAsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1RleHRhcmVhLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBhdHRycy50eXBlID0gcHJvcHMudHlwZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgYXR0cnMucm93cyA9IDFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIC8vIHNvbWUgYnJvd3NlcnMgbG9zZSB0aGUgbmF0aXZlIGlucHV0IHZhbHVlXG4gICAgLy8gc28gd2UgbmVlZCB0byByZWF0dGFjaCBpdCBkeW5hbWljYWxseVxuICAgIC8vIChsaWtlIHR5cGU9XCJwYXNzd29yZFwiIDwtPiB0eXBlPVwidGV4dFwiOyBzZWUgIzEyMDc4KVxuICAgIHdhdGNoKCgpID0+IHByb3BzLnR5cGUsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdiA9PiB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc3RvcFZhbHVlV2F0Y2hlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuICAgICAgICAgIGlmIChTdHJpbmcodikgPT09IGVtaXRDYWNoZWRWYWx1ZSkgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlubmVyVmFsdWUudmFsdWUgIT09IHYpIHtcbiAgICAgICAgaW5uZXJWYWx1ZS52YWx1ZSA9IHZcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0eXBlZE51bWJlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuYXV0b2dyb3csIHZhbCA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICAgIH1cbiAgICAgIC8vIGlmIGl0IGhhcyBhIG51bWJlciBvZiByb3dzIHNldCByZXNwZWN0IGl0XG4gICAgICBlbHNlIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBhdHRycy5yb3dzID4gMCkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGVuc2UsICgpID0+IHtcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBpbnB1dFJlZi52YWx1ZSAhPT0gZWxcbiAgICAgICAgICAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0ICgpIHtcbiAgICAgIGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGlucHV0UmVmLnZhbHVlLnNlbGVjdCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYXN0ZSAoZSkge1xuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlucCA9IGUudGFyZ2V0XG4gICAgICAgIG1vdmVDdXJzb3JGb3JQYXN0ZShpbnAsIGlucC5zZWxlY3Rpb25TdGFydCwgaW5wLnNlbGVjdGlvbkVuZClcbiAgICAgIH1cblxuICAgICAgZW1pdCgncGFzdGUnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSW5wdXQgKGUpIHtcbiAgICAgIGlmICghZSB8fCAhZS50YXJnZXQpIHJldHVyblxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZS50YXJnZXQuZmlsZXMpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWwgPSBlLnRhcmdldC52YWx1ZVxuXG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodmFsLCBmYWxzZSwgZS5pbnB1dFR5cGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlKHZhbClcblxuICAgICAgICBpZiAoaXNUeXBlVGV4dC52YWx1ZSA9PT0gdHJ1ZSAmJiBlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCB9ID0gZS50YXJnZXRcblxuICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwICYmIHNlbGVjdGlvbkVuZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiB2YWwuaW5kZXhPZihlLnRhcmdldC52YWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHRyaWdnZXIgaXQgaW1tZWRpYXRlbHkgdG9vLFxuICAgICAgLy8gdG8gYXZvaWQgXCJmbGlja2VyaW5nXCJcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BbmltYXRpb25lbmQgKGUpIHtcbiAgICAgIGVtaXQoJ2FuaW1hdGlvbmVuZCcsIGUpXG4gICAgICBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAodmFsLCBzdG9wV2F0Y2hlcikge1xuICAgICAgZW1pdFZhbHVlRm4gPSAoKSA9PiB7XG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXRDYWNoZWRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgICAgZW1pdENhY2hlZFZhbHVlID0gdmFsXG5cbiAgICAgICAgICBzdG9wV2F0Y2hlciA9PT0gdHJ1ZSAmJiAoc3RvcFZhbHVlV2F0Y2hlciA9IHRydWUpXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG5cbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPT09IHZhbCAmJiAoZW1pdENhY2hlZFZhbHVlID0gTmFOKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0VmFsdWVGbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdHlwZWROdW1iZXIgPSB0cnVlXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmRlYm91bmNlICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgICAgZW1pdFRpbWVyID0gc2V0VGltZW91dChlbWl0VmFsdWVGbiwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlRm4oKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICBmdW5jdGlvbiBhZGp1c3RIZWlnaHQgKCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wID0gaW5wdXRSZWYudmFsdWVcbiAgICAgICAgaWYgKGlucCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudFN0eWxlID0gaW5wLnBhcmVudE5vZGUuc3R5bGVcbiAgICAgICAgICAvLyBjaHJvbWUgZG9lcyBub3Qga2VlcCBzY3JvbGwgIzE1NDk4XG4gICAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AgfSA9IGlucFxuICAgICAgICAgIC8vIGNocm9tZSBjYWxjdWxhdGVzIGEgc21hbGxlciBzY3JvbGxIZWlnaHQgd2hlbiBpbiBhIC5jb2x1bW4gY29udGFpbmVyXG4gICAgICAgICAgY29uc3QgeyBvdmVyZmxvd1ksIG1heEhlaWdodCB9ID0gJHEucGxhdGZvcm0uaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyB7fVxuICAgICAgICAgICAgOiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbnApXG4gICAgICAgICAgLy8gb24gZmlyZWZveCBvciBpZiBvdmVyZmxvd1kgaXMgc3BlY2lmaWVkIGFzIHNjcm9sbCAjMTQyNjMsICMxNDM0NFxuICAgICAgICAgIC8vIHdlIGRvbid0IHRvdWNoIG92ZXJmbG93XG4gICAgICAgICAgLy8gZmlyZWZveCBpcyBub3Qgc28gYmFkIGluIHRoZSBlbmRcbiAgICAgICAgICBjb25zdCBjaGFuZ2VPdmVyZmxvdyA9IG92ZXJmbG93WSAhPT0gdm9pZCAwICYmIG92ZXJmbG93WSAhPT0gJ3Njcm9sbCdcblxuICAgICAgICAgIC8vIHJlc2V0IGhlaWdodCBvZiB0ZXh0YXJlYSB0byBhIHNtYWxsIHNpemUgdG8gZGV0ZWN0IHRoZSByZWFsIGhlaWdodFxuICAgICAgICAgIC8vIGJ1dCBrZWVwIHRoZSB0b3RhbCBjb250cm9sIHNpemUgdGhlIHNhbWVcbiAgICAgICAgICBjaGFuZ2VPdmVyZmxvdyA9PT0gdHJ1ZSAmJiAoaW5wLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nKVxuICAgICAgICAgIHBhcmVudFN0eWxlLm1hcmdpbkJvdHRvbSA9IChpbnAuc2Nyb2xsSGVpZ2h0IC0gMSkgKyAncHgnXG4gICAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9ICcxcHgnXG5cbiAgICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gaW5wLnNjcm9sbEhlaWdodCArICdweCdcbiAgICAgICAgICAvLyB3ZSBzaG91bGQgYWxsb3cgc2Nyb2xsYmFycyBvbmx5XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbWF4SGVpZ2h0IGFuZCBjb250ZW50IGlzIHRhbGxlciB0aGFuIG1heEhlaWdodFxuICAgICAgICAgIGNoYW5nZU92ZXJmbG93ID09PSB0cnVlICYmIChpbnAuc3R5bGUub3ZlcmZsb3dZID0gcGFyc2VJbnQobWF4SGVpZ2h0LCAxMCkgPCBpbnAuc2Nyb2xsSGVpZ2h0ID8gJ2F1dG8nIDogJ2hpZGRlbicpXG4gICAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gJydcbiAgICAgICAgICBpbnAuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UgKGUpIHtcbiAgICAgIG9uQ29tcG9zaXRpb24oZSlcblxuICAgICAgaWYgKGVtaXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZUZuICE9PSB2b2lkIDAgJiYgZW1pdFZhbHVlRm4oKVxuXG4gICAgICBlbWl0KCdjaGFuZ2UnLCBlLnRhcmdldC52YWx1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaEVkaXRpbmcgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG5cbiAgICAgIGlmIChlbWl0VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgZW1pdFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbWl0VmFsdWVGbiAhPT0gdm9pZCAwICYmIGVtaXRWYWx1ZUZuKClcblxuICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG4gICAgICBkZWxldGUgdGVtcC52YWx1ZVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHVzZSBzZXRUaW1lb3V0IGluc3RlYWQgb2YgdGhpcy4kbmV4dFRpY2tcbiAgICAgIC8vIHRvIGF2b2lkIGEgYnVnIHdoZXJlIGZvY3Vzb3V0IGlzIG5vdCBlbWl0dGVkIGZvciB0eXBlIGRhdGUvdGltZS93ZWVrLy4uLlxuICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoaW5wdXRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1clZhbHVlICgpIHtcbiAgICAgIHJldHVybiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgID8gdGVtcC52YWx1ZVxuICAgICAgICA6IChpbm5lclZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbm5lclZhbHVlLnZhbHVlIDogJycpXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIG9uRmluaXNoRWRpdGluZygpXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH0pXG5cbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmaWVsZENsYXNzOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBgcS0keyBpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJ3RleHRhcmVhJyA6ICdpbnB1dCcgfWBcbiAgICAgICAgKyAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUgPyAnIHEtdGV4dGFyZWEtLWF1dG9ncm93JyA6ICcnKVxuICAgICAgKSxcblxuICAgICAgaGFzU2hhZG93OiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBwcm9wcy50eXBlICE9PSAnZmlsZSdcbiAgICAgICAgJiYgdHlwZW9mIHByb3BzLnNoYWRvd1RleHQgPT09ICdzdHJpbmcnXG4gICAgICAgICYmIHByb3BzLnNoYWRvd1RleHQubGVuZ3RoICE9PSAwXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcblxuICAgICAgZW1pdFZhbHVlLFxuXG4gICAgICBoYXNWYWx1ZSxcblxuICAgICAgZmxvYXRpbmdMYWJlbDogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKFxuICAgICAgICAgIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgKHByb3BzLnR5cGUgIT09ICdudW1iZXInIHx8IGlzTmFOKGlubmVyVmFsdWUudmFsdWUpID09PSBmYWxzZSlcbiAgICAgICAgKVxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgZ2V0Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJ3RleHRhcmVhJyA6ICdpbnB1dCcsIHtcbiAgICAgICAgICByZWY6IGlucHV0UmVmLFxuICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAncS1maWVsZF9fbmF0aXZlIHEtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgcHJvcHMuaW5wdXRDbGFzc1xuICAgICAgICAgIF0sXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGUsXG4gICAgICAgICAgLi4uaW5wdXRBdHRycy52YWx1ZSxcbiAgICAgICAgICAuLi5vbkV2ZW50cy52YWx1ZSxcbiAgICAgICAgICAuLi4oXG4gICAgICAgICAgICBwcm9wcy50eXBlICE9PSAnZmlsZSdcbiAgICAgICAgICAgICAgPyB7IHZhbHVlOiBnZXRDdXJWYWx1ZSgpIH1cbiAgICAgICAgICAgICAgOiBmb3JtRG9tUHJvcHMudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBnZXRTaGFkb3dDb250cm9sOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcS1maWVsZF9fc2hhZG93IGFic29sdXRlLWJvdHRvbSBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgICAgICsgKGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgdGV4dC1uby13cmFwJylcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAnaW52aXNpYmxlJyB9LCBnZXRDdXJWYWx1ZSgpKSxcbiAgICAgICAgICBoKCdzcGFuJywgcHJvcHMuc2hhZG93VGV4dClcbiAgICAgICAgXSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVuZGVyRm4gPSB1c2VGaWVsZChzdGF0ZSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIGZvY3VzLFxuICAgICAgc2VsZWN0LFxuICAgICAgZ2V0TmF0aXZlRWxlbWVudDogKCkgPT4gaW5wdXRSZWYudmFsdWUgLy8gZGVwcmVjYXRlZFxuICAgIH0pXG5cbiAgICBpbmplY3RQcm9wKHByb3h5LCAnbmF0aXZlRWwnLCAoKSA9PiBpbnB1dFJlZi52YWx1ZSlcblxuICAgIHJldHVybiByZW5kZXJGblxuICB9XG59KVxuIl0sIm5hbWVzIjpbImF0dHJzIl0sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFNLGFBQWE7QUFFSixTQUFBLGdCQUFZO0FBQ3pCLFFBQU0sRUFBRSxPQUFPLE1B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
