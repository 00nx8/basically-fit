import { ak as Platform, g as getCurrentInstance, r as ref, a8 as prevent, al as addEvt, v as nextTick, j as isKeyCode, n as watch, d as onMounted, o as onBeforeUnmount, am as cleanEvt, x as listenOpts, a9 as vmHasRouter, an as getParentProxy, c as createComponent, F as onUnmounted, ai as injectProp, h, ao as Teleport, ap as createGlobalNode, aq as removeGlobalNode, a as computed, a2 as client, Z as Transition, b as hSlot, k as stopAndPrevent, p as isRuntimeSsrPreHydration } from "./index-DiEwj2lb.js";
import { e as getScrollbarWidth, s as scrollTargetProp, a as useTick, b as useTimeout, g as getScrollTarget, u as uid } from "./scroll-DGwSptOL.js";
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
const useAnchorStaticProps = {
  /* SSR does not know about Element */
  target: {
    type: [Boolean, String, Element],
    default: true
  },
  noParentEvent: Boolean
};
const useAnchorProps = {
  ...useAnchorStaticProps,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  // required for QPopupProxy (true)
  configureAnchorEl
  // optional
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer = null;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) return;
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) return;
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  // optional
  hideOnRouteChange,
  // optional
  handleShow,
  // optional
  handleHide,
  // optional
  processOnMount
  // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) return;
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) return;
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length !== 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
const portalProxyList = [];
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
const QPortal = createComponent({
  name: "QPortal",
  setup(_, { slots }) {
    return () => slots.default();
  }
});
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) return;
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, h(QPortal, renderPortalContent))] : void 0
  };
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) return;
  let portalIndex = portalProxyList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$;
    if (proxy.type.name === "QTooltip") {
      portalIndex--;
      continue;
    }
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) return;
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index !== -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();
  top += absoluteOffset.top;
  left += absoluteOffset.left;
  if (offset !== void 0) {
    top += offset[1];
    left += offset[0];
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top
  };
}
function getTargetProps(width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  };
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
    left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal]
  };
}
function setPosition(cfg, retryNumber = 0) {
  if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) return;
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return;
  }
  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  const { scrollLeft, scrollTop } = targetEl;
  const anchorProps = absoluteOffset === void 0 ? getAnchorProps(anchorEl, cover === true ? [0, 0] : offset) : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth,
    maxHeight,
    visibility: "visible"
  });
  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight } : { elWidth: origElWidth, elHeight: origElHeight };
  let elStyle = { maxWidth, maxHeight };
  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(targetEl.style, elStyle);
  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  } else {
    const { top, left } = props;
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    let hasChanged = false;
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[1];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[0];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(targetEl.style, elStyle);
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
const QTooltip = createComponent({
  name: "QTooltip",
  inheritAttrs: false,
  props: {
    ...useAnchorStaticProps,
    ...useModelToggleProps,
    ...useTransitionProps,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    transitionShow: {
      ...useTransitionProps.transitionShow,
      default: "jump-down"
    },
    transitionHide: {
      ...useTransitionProps.transitionHide,
      default: "jump-up"
    },
    anchor: {
      type: String,
      default: "bottom middle",
      validator: validatePosition
    },
    self: {
      type: String,
      default: "top middle",
      validator: validatePosition
    },
    offset: {
      type: Array,
      default: () => [14, 14],
      validator: validateOffset
    },
    scrollTarget: scrollTargetProp,
    delay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    persistent: Boolean
  },
  emits: [
    ...useModelToggleEmits
  ],
  setup(props, { slots, emit, attrs }) {
    let unwatchPosition, observer;
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const innerRef = ref(null);
    const showing = ref(false);
    const anchorOrigin = computed(() => parsePosition(props.anchor, $q.lang.rtl));
    const selfOrigin = computed(() => parsePosition(props.self, $q.lang.rtl));
    const hideOnRouteChange = computed(() => props.persistent !== true);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow, anchorEvents } = useAnchor({ showing, configureAnchorEl });
    const { show, hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    Object.assign(anchorEvents, { delayShow, delayHide });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "tooltip");
    if ($q.platform.is.mobile === true) {
      const clickOutsideProps = {
        anchorEl,
        innerRef,
        onClickOutside(e) {
          hide(e);
          if (e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      };
      const hasClickOutside = computed(
        () => (
          // it doesn't has external model
          // (null is the default value)
          props.modelValue === null && props.persistent !== true && showing.value === true
        )
      );
      watch(hasClickOutside, (val) => {
        const fn = val === true ? addClickOutside : removeClickOutside;
        fn(clickOutsideProps);
      });
      onBeforeUnmount(() => {
        removeClickOutside(clickOutsideProps);
      });
    }
    function handleShow(evt) {
      showPortal();
      registerTick(() => {
        observer = new MutationObserver(() => updatePosition());
        observer.observe(innerRef.value, { attributes: false, childList: true, characterData: true, subtree: true });
        updatePosition();
        configureScrollTarget();
      });
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      registerTimeout(() => {
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup();
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup() {
      if (observer !== void 0) {
        observer.disconnect();
        observer = void 0;
      }
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      unconfigureScrollTarget();
      cleanEvt(anchorEvents, "tooltipTemp");
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function delayShow(evt) {
      if ($q.platform.is.mobile === true) {
        clearSelection();
        document.body.classList.add("non-selectable");
        const target = anchorEl.value;
        const evts = ["touchmove", "touchcancel", "touchend", "click"].map((e) => [target, e, "delayHide", "passiveCapture"]);
        addEvt(anchorEvents, "tooltipTemp", evts);
      }
      registerTimeout(() => {
        show(evt);
      }, props.delay);
    }
    function delayHide(evt) {
      if ($q.platform.is.mobile === true) {
        cleanEvt(anchorEvents, "tooltipTemp");
        clearSelection();
        setTimeout(() => {
          document.body.classList.remove("non-selectable");
        }, 10);
      }
      registerTimeout(() => {
        hide(evt);
      }, props.hideDelay);
    }
    function configureAnchorEl() {
      if (props.noParentEvent === true || anchorEl.value === null) return;
      const evts = $q.platform.is.mobile === true ? [
        [anchorEl.value, "touchstart", "delayShow", "passive"]
      ] : [
        [anchorEl.value, "mouseenter", "delayShow", "passive"],
        [anchorEl.value, "mouseleave", "delayHide", "passive"]
      ];
      addEvt(anchorEvents, "anchor", evts);
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        const fn = props.noParentEvent === true ? updatePosition : hide;
        changeScrollEvent(localScrollTarget.value, fn);
      }
    }
    function getTooltipContent() {
      return showing.value === true ? h("div", {
        ...attrs,
        ref: innerRef,
        class: [
          "q-tooltip q-tooltip--style q-position-engine no-pointer-events",
          attrs.class
        ],
        style: [
          attrs.style,
          transitionStyle.value
        ],
        role: "tooltip"
      }, hSlot(slots.default)) : null;
    }
    function renderPortalContent() {
      return h(Transition, transitionProps.value, getTooltipContent);
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(vm.proxy, { updatePosition });
    return renderPortal;
  }
});
function parseValue(val) {
  return val === void 0 || val === null ? null : val;
}
function getId(val, required) {
  return val === void 0 || val === null ? required === true ? `f_${uid()}` : null : val;
}
function useId({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0 ? ref(parseValue(getValue())) : ref(null);
    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${uid()}`;
      });
    }
    if (getValue !== void 0) {
      watch(getValue, (newId) => {
        id.value = getId(newId, required);
      });
    }
    return id;
  }
  return getValue !== void 0 ? computed(() => getId(getValue(), required)) : ref(`f_${uid()}`);
}
export {
  QTooltip as Q,
  useModelToggleProps as a,
  useId as b,
  useModelToggle as c,
  validatePosition as d,
  useTransitionProps as e,
  useAnchorProps as f,
  useTransition as g,
  useScrollTarget as h,
  useAnchor as i,
  usePortal as j,
  addClickOutside as k,
  closePortalMenus as l,
  addFocusFn as m,
  removeFocusFn as n,
  parsePosition as p,
  removeClickOutside as r,
  setPosition as s,
  useModelToggleEmits as u,
  validateOffset as v
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWlkLUNTa2NGSTNpLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNjcm9sbC10YXJnZXQvdXNlLXNjcm9sbC10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdHJhbnNpdGlvbi91c2UtdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUuY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5wb3NpdGlvbi1lbmdpbmUvcG9zaXRpb24tZW5naW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sdGlwL1FUb29sdGlwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWlkL3VzZS1pZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdGZvcm0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uICgpIHtcbiAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIGlmIChzZWxlY3Rpb24uZW1wdHkgIT09IHZvaWQgMCkge1xuICAgICAgc2VsZWN0aW9uLmVtcHR5KClcbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcyAhPT0gdm9pZCAwKSB7XG4gICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgIFBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSAmJiBzZWxlY3Rpb24uYWRkUmFuZ2UoZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKSlcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKVxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMnXG5pbXBvcnQgeyBhZGRFdnQsIGNsZWFuRXZ0LCBwcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmtleWJvYXJkL2tleS1jb21wb3NpdGlvbi5qcydcblxuZXhwb3J0IGNvbnN0IHVzZUFuY2hvclN0YXRpY1Byb3BzID0ge1xuICAvKiBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBFbGVtZW50ICovXG4gIHRhcmdldDogX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gICAgPyB7IGRlZmF1bHQ6IHRydWUgfVxuICAgIDoge1xuICAgICAgICB0eXBlOiBbIEJvb2xlYW4sIFN0cmluZywgRWxlbWVudCBdLFxuICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICB9LFxuXG4gIG5vUGFyZW50RXZlbnQ6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUFuY2hvclByb3BzID0ge1xuICAuLi51c2VBbmNob3JTdGF0aWNQcm9wcyxcbiAgY29udGV4dE1lbnU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgYXZvaWRFbWl0LCAvLyByZXF1aXJlZCBmb3IgUVBvcHVwUHJveHkgKHRydWUpXG4gIGNvbmZpZ3VyZUFuY2hvckVsIC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5LCBlbWl0IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGFuY2hvckVsID0gcmVmKG51bGwpXG5cbiAgbGV0IHRvdWNoVGltZXIgPSBudWxsXG5cbiAgZnVuY3Rpb24gY2FuU2hvdyAoZXZ0KSB7XG4gICAgLy8gYWJvcnQgd2l0aCBubyBwYXJlbnQgY29uZmlndXJlZCBvciBvbiBtdWx0aS10b3VjaFxuICAgIHJldHVybiBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgPyBmYWxzZVxuICAgICAgOiAoZXZ0ID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMgPT09IHZvaWQgMCB8fCBldnQudG91Y2hlcy5sZW5ndGggPD0gMSlcbiAgfVxuXG4gIGNvbnN0IGFuY2hvckV2ZW50cyA9IHt9XG5cbiAgaWYgKGNvbmZpZ3VyZUFuY2hvckVsID09PSB2b2lkIDApIHtcbiAgICAvLyBkZWZhdWx0IGNvbmZpZ3VyZUFuY2hvckVsIGlzIGRlc2lnbmVkIGZvclxuICAgIC8vIFFNZW51ICYgUVBvcHVwUHJveHkgKHdoaWNoIGlzIHdoeSBpdCdzIGhhbmRsZWQgaGVyZSlcblxuICAgIE9iamVjdC5hc3NpZ24oYW5jaG9yRXZlbnRzLCB7XG4gICAgICBoaWRlIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGUgKGV2dCkge1xuICAgICAgICBwcm94eS50b2dnbGUoZXZ0KVxuICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGVLZXkgKGV2dCkge1xuICAgICAgICBpc0tleUNvZGUoZXZ0LCAxMykgPT09IHRydWUgJiYgYW5jaG9yRXZlbnRzLnRvZ2dsZShldnQpXG4gICAgICB9LFxuXG4gICAgICBjb250ZXh0Q2xpY2sgKGV2dCkge1xuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgcHJldmVudChldnQpXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBwcmV2ZW50LFxuXG4gICAgICBtb2JpbGVUb3VjaCAoZXZ0KSB7XG4gICAgICAgIGFuY2hvckV2ZW50cy5tb2JpbGVDbGVhbnVwKGV2dClcblxuICAgICAgICBpZiAoY2FuU2hvdyhldnQpICE9PSB0cnVlKSByZXR1cm5cblxuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgYW5jaG9yRWwudmFsdWUuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgICAgYWRkRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicsIFtcbiAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NvbnRleHRtZW51JywgJ3ByZXZlbnQnLCAnbm90UGFzc2l2ZScgXVxuICAgICAgICBdKVxuXG4gICAgICAgIHRvdWNoVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0b3VjaFRpbWVyID0gbnVsbFxuICAgICAgICAgIHByb3h5LnNob3coZXZ0KVxuICAgICAgICAgIGV2dC5xQW5jaG9ySGFuZGxlZCA9IHRydWVcbiAgICAgICAgfSwgMzAwKVxuICAgICAgfSxcblxuICAgICAgbW9iaWxlQ2xlYW51cCAoZXZ0KSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBpZiAodG91Y2hUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0b3VjaFRpbWVyKVxuICAgICAgICAgIHRvdWNoVGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBldnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25maWd1cmVBbmNob3JFbCA9IGZ1bmN0aW9uIChjb250ZXh0ID0gcHJvcHMuY29udGV4dE1lbnUpIHtcbiAgICAgIGlmIChwcm9wcy5ub1BhcmVudEV2ZW50ID09PSB0cnVlIHx8IGFuY2hvckVsLnZhbHVlID09PSBudWxsKSByZXR1cm5cblxuICAgICAgbGV0IGV2dHNcblxuICAgICAgaWYgKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHByb3h5LiRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAndG91Y2hzdGFydCcsICdtb2JpbGVUb3VjaCcsICdwYXNzaXZlJyBdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnbW91c2Vkb3duJywgJ2hpZGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdjb250ZXh0Q2xpY2snLCAnbm90UGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NsaWNrJywgJ3RvZ2dsZScsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdrZXl1cCcsICd0b2dnbGVLZXknLCAncGFzc2l2ZScgXVxuICAgICAgICBdXG4gICAgICB9XG5cbiAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBldnRzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuY29uZmlndXJlQW5jaG9yRWwgKCkge1xuICAgIGNsZWFuRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicpXG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbmNob3JFbCAoZWwpIHtcbiAgICBhbmNob3JFbC52YWx1ZSA9IGVsXG4gICAgd2hpbGUgKGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5jb250YWlucygncS1hbmNob3ItLXNraXAnKSkge1xuICAgICAgYW5jaG9yRWwudmFsdWUgPSBhbmNob3JFbC52YWx1ZS5wYXJlbnROb2RlXG4gICAgfVxuICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2tBbmNob3JFbCAoKSB7XG4gICAgaWYgKHByb3BzLnRhcmdldCA9PT0gZmFsc2UgfHwgcHJvcHMudGFyZ2V0ID09PSAnJyB8fCBwcm94eS4kZWwucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgYW5jaG9yRWwudmFsdWUgPSBudWxsXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnRhcmdldCA9PT0gdHJ1ZSkge1xuICAgICAgc2V0QW5jaG9yRWwocHJveHkuJGVsLnBhcmVudE5vZGUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IGVsID0gcHJvcHMudGFyZ2V0XG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMudGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwcm9wcy50YXJnZXQpXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgIGVsID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVsICE9PSB2b2lkIDAgJiYgZWwgIT09IG51bGwpIHtcbiAgICAgICAgYW5jaG9yRWwudmFsdWUgPSBlbC4kZWwgfHwgZWxcbiAgICAgICAgY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgICAgICBjb25zb2xlLmVycm9yKGBBbmNob3I6IHRhcmdldCBcIiR7IHByb3BzLnRhcmdldCB9XCIgbm90IGZvdW5kYClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5jb250ZXh0TWVudSwgdmFsID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgY29uZmlndXJlQW5jaG9yRWwodmFsKVxuICAgIH1cbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy50YXJnZXQsICgpID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgIH1cblxuICAgIHBpY2tBbmNob3JFbCgpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgdmFsID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHBpY2tBbmNob3JFbCgpXG5cbiAgICBpZiAoYXZvaWRFbWl0ICE9PSB0cnVlICYmIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgYW5jaG9yRWwudmFsdWUgPT09IG51bGwpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgfVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgdG91Y2hUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodG91Y2hUaW1lcilcbiAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGFuY2hvckVsLFxuICAgIGNhblNob3csXG4gICAgYW5jaG9yRXZlbnRzXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgbGlzdGVuT3B0cyB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCkge1xuICBjb25zdCBsb2NhbFNjcm9sbFRhcmdldCA9IHJlZihudWxsKVxuICBsZXQgc2Nyb2xsRm5cblxuICBmdW5jdGlvbiBjaGFuZ2VTY3JvbGxFdmVudCAoc2Nyb2xsVGFyZ2V0LCBmbikge1xuICAgIGNvbnN0IGZuUHJvcCA9IGAkeyBmbiAhPT0gdm9pZCAwID8gJ2FkZCcgOiAncmVtb3ZlJyB9RXZlbnRMaXN0ZW5lcmBcbiAgICBjb25zdCBmbkhhbmRsZXIgPSBmbiAhPT0gdm9pZCAwID8gZm4gOiBzY3JvbGxGblxuXG4gICAgaWYgKHNjcm9sbFRhcmdldCAhPT0gd2luZG93KSB7XG4gICAgICBzY3JvbGxUYXJnZXRbIGZuUHJvcCBdKCdzY3JvbGwnLCBmbkhhbmRsZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICB9XG5cbiAgICB3aW5kb3dbIGZuUHJvcCBdKCdzY3JvbGwnLCBmbkhhbmRsZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcblxuICAgIHNjcm9sbEZuID0gZm5cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICBpZiAobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGNoYW5nZVNjcm9sbEV2ZW50KGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlKVxuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgbm9QYXJlbnRFdmVudFdhdGNoZXIgPSB3YXRjaCgoKSA9PiBwcm9wcy5ub1BhcmVudEV2ZW50LCAoKSA9PiB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQobm9QYXJlbnRFdmVudFdhdGNoZXIpXG5cbiAgcmV0dXJuIHtcbiAgICBsb2NhbFNjcm9sbFRhcmdldCxcbiAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCxcbiAgICBjaGFuZ2VTY3JvbGxFdmVudFxuICB9XG59XG4iLCJpbXBvcnQgeyB3YXRjaCwgbmV4dFRpY2ssIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUhhc1JvdXRlciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG5cbiAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG59XG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZUVtaXRzID0gW1xuICAnYmVmb3JlU2hvdycsICdzaG93JywgJ2JlZm9yZUhpZGUnLCAnaGlkZSdcbl1cblxuLy8gaGFuZGxlU2hvdy9oYW5kbGVIaWRlIC0+IHJlbW92ZVRpY2soKSwgc2VsZiAoJiBlbWl0IHNob3cpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGNhblNob3csIC8vIG9wdGlvbmFsXG4gIGhpZGVPblJvdXRlQ2hhbmdlLCAvLyBvcHRpb25hbFxuICBoYW5kbGVTaG93LCAvLyBvcHRpb25hbFxuICBoYW5kbGVIaWRlLCAvLyBvcHRpb25hbFxuICBwcm9jZXNzT25Nb3VudCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuXG4gIGxldCBwYXlsb2FkXG5cbiAgZnVuY3Rpb24gdG9nZ2xlIChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2hvdyhldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdyAoZXZ0KSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgKGV2dCAhPT0gdm9pZCAwICYmIGV2dC5xQW5jaG9ySGFuZGxlZCA9PT0gdHJ1ZSlcbiAgICAgIHx8IChjYW5TaG93ICE9PSB2b2lkIDAgJiYgY2FuU2hvdyhldnQpICE9PSB0cnVlKVxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc1Nob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTaG93IChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICBzaG93aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgZW1pdCgnYmVmb3JlU2hvdycsIGV2dClcblxuICAgIGlmIChoYW5kbGVTaG93ICE9PSB2b2lkIDApIHtcbiAgICAgIGhhbmRsZVNob3coZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZSAoZXZ0KSB7XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyB8fCBwcm9wcy5kaXNhYmxlID09PSB0cnVlKSByZXR1cm5cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gdHJ1ZSAmJiBfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc0hpZGUoZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NIaWRlIChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG5cbiAgICBlbWl0KCdiZWZvcmVIaWRlJywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZUhpZGUgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlSGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzTW9kZWxDaGFuZ2UgKHZhbCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2YWwgPT09IHRydWUpICE9PSBzaG93aW5nLnZhbHVlKSB7XG4gICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IHByb2Nlc3NTaG93IDogcHJvY2Vzc0hpZGVcbiAgICAgIGZuKHBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgcHJvY2Vzc01vZGVsQ2hhbmdlKVxuXG4gIGlmIChoaWRlT25Sb3V0ZUNoYW5nZSAhPT0gdm9pZCAwICYmIHZtSGFzUm91dGVyKHZtKSA9PT0gdHJ1ZSkge1xuICAgIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgICAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByb2Nlc3NPbk1vdW50ID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvY2Vzc01vZGVsQ2hhbmdlKHByb3BzLm1vZGVsVmFsdWUpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIGNvbnN0IHB1YmxpY01ldGhvZHMgPSB7IHNob3csIGhpZGUsIHRvZ2dsZSB9XG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHB1YmxpY01ldGhvZHMpXG5cbiAgcmV0dXJuIHB1YmxpY01ldGhvZHNcbn1cbiIsImxldCBxdWV1ZSA9IFtdXG5sZXQgd2FpdEZsYWdzID0gW11cblxuZnVuY3Rpb24gY2xlYXJGbGFnIChmbGFnKSB7XG4gIHdhaXRGbGFncyA9IHdhaXRGbGFncy5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuICB3YWl0RmxhZ3MucHVzaChmbGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNXYWl0RmxhZyAoZmxhZykge1xuICBjbGVhckZsYWcoZmxhZylcblxuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCAmJiBxdWV1ZS5sZW5ndGggIT09IDApIHtcbiAgICAvLyBvbmx5IGNhbGwgbGFzdCBmb2N1cyBoYW5kbGVyIChjYW4ndCBmb2N1cyBtdWx0aXBsZSB0aGluZ3MgYXQgb25jZSlcbiAgICBxdWV1ZVsgcXVldWUubGVuZ3RoIC0gMSBdKClcbiAgICBxdWV1ZSA9IFtdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzRm4gKGZuKSB7XG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgZm4oKVxuICB9XG4gIGVsc2Uge1xuICAgIHF1ZXVlLnB1c2goZm4pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZvY3VzRm4gKGZuKSB7XG4gIHF1ZXVlID0gcXVldWUuZmlsdGVyKGVudHJ5ID0+IGVudHJ5ICE9PSBmbilcbn1cbiIsImltcG9ydCB7IGdldFBhcmVudFByb3h5IH0gZnJvbSAnLi4vcHJpdmF0ZS52bS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHBvcnRhbFByb3h5TGlzdCA9IFtdXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb3J0YWxQcm94eSAoZWwpIHtcbiAgcmV0dXJuIHBvcnRhbFByb3h5TGlzdC5maW5kKHByb3h5ID0+XG4gICAgcHJveHkuY29udGVudEVsICE9PSBudWxsXG4gICAgJiYgcHJveHkuY29udGVudEVsLmNvbnRhaW5zKGVsKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVBvcnRhbE1lbnVzIChwcm94eSwgZXZ0KSB7XG4gIGRvIHtcbiAgICBpZiAocHJveHkuJG9wdGlvbnMubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgcHJveHkuaGlkZShldnQpXG5cbiAgICAgIC8vIGlzIHRoaXMgYSBwb2ludCBvZiBzZXBhcmF0aW9uP1xuICAgICAgaWYgKHByb3h5LiRwcm9wcy5zZXBhcmF0ZUNsb3NlUG9wdXAgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcmVudFByb3h5KHByb3h5KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm94eS5fX3FQb3J0YWwgPT09IHRydWUpIHtcbiAgICAgIC8vIHRyZWF0IGl0IGFzIHBvaW50IG9mIHNlcGFyYXRpb24gaWYgcGFyZW50IGlzIFFQb3B1cFByb3h5XG4gICAgICAvLyAoc28gbW9iaWxlIG1hdGNoZXMgZGVza3RvcCBiZWhhdmlvcilcbiAgICAgIC8vIGFuZCBoaWRlIGl0IHRvb1xuICAgICAgY29uc3QgcGFyZW50ID0gZ2V0UGFyZW50UHJveHkocHJveHkpXG5cbiAgICAgIGlmIChwYXJlbnQgIT09IHZvaWQgMCAmJiBwYXJlbnQuJG9wdGlvbnMubmFtZSA9PT0gJ1FQb3B1cFByb3h5Jykge1xuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm94eVxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3h5ID0gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gIH0gd2hpbGUgKHByb3h5ICE9PSB2b2lkIDAgJiYgcHJveHkgIT09IG51bGwpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVBvcnRhbHMgKHByb3h5LCBldnQsIGRlcHRoKSB7XG4gIHdoaWxlIChkZXB0aCAhPT0gMCAmJiBwcm94eSAhPT0gdm9pZCAwICYmIHByb3h5ICE9PSBudWxsKSB7XG4gICAgaWYgKHByb3h5Ll9fcVBvcnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgZGVwdGgtLVxuXG4gICAgICBpZiAocHJveHkuJG9wdGlvbnMubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgICBwcm94eSA9IGNsb3NlUG9ydGFsTWVudXMocHJveHksIGV2dClcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgfVxuXG4gICAgcHJveHkgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBvblVubW91bnRlZCwgVGVsZXBvcnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzV2FpdEZsYWcsIHJlbW92ZUZvY3VzV2FpdEZsYWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBjcmVhdGVHbG9iYWxOb2RlLCByZW1vdmVHbG9iYWxOb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jb25maWcvbm9kZXMuanMnXG5pbXBvcnQgeyBwb3J0YWxQcm94eUxpc3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnBvcnRhbC9wb3J0YWwuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5pbmplY3Qtb2JqLXByb3AvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG4vKipcbiAqIE5vb3AgaW50ZXJuYWwgY29tcG9uZW50IHRvIGVhc2UgdGVzdGluZ1xuICogb2YgdGhlIHRlbGVwb3J0ZWQgY29udGVudC5cbiAqXG4gKiBjb25zdCB3cmFwcGVyID0gbW91bnQoUURpYWxvZywgeyAuLi4gfSlcbiAqIGNvbnN0IHRlbGVwb3J0ZWRXcmFwcGVyID0gd3JhcHBlci5maW5kQ29tcG9uZW50KHsgbmFtZTogJ1FQb3J0YWwnIH0pXG4gKi9cbmNvbnN0IFFQb3J0YWwgPSBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBvcnRhbCcsXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gc2xvdHMuZGVmYXVsdCgpXG4gIH1cbn0pXG5cbmZ1bmN0aW9uIGlzT25HbG9iYWxEaWFsb2cgKHZtKSB7XG4gIHZtID0gdm0ucGFyZW50XG5cbiAgd2hpbGUgKHZtICE9PSB2b2lkIDAgJiYgdm0gIT09IG51bGwpIHtcbiAgICBpZiAodm0udHlwZS5uYW1lID09PSAnUUdsb2JhbERpYWxvZycpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRRGlhbG9nJyB8fCB2bS50eXBlLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHZtID0gdm0ucGFyZW50XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLy8gV2FybmluZyFcbi8vIFlvdSBNVVNUIHNwZWNpZnkgXCJpbmhlcml0QXR0cnM6IGZhbHNlXCIgaW4geW91ciBjb21wb25lbnRcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgdHlwZSkge1xuICAvLyBzaG93aW5nLCBpbmNsdWRpbmcgd2hpbGUgaW4gc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY3RpdmUgPSByZWYoZmFsc2UpXG5cbiAgLy8gc2hvd2luZyAmIG5vdCBpbiBhbnkgc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY2Nlc3NpYmxlID0gcmVmKGZhbHNlKVxuXG4gIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUsXG5cbiAgICAgIHNob3dQb3J0YWw6IG5vb3AsXG4gICAgICBoaWRlUG9ydGFsOiBub29wLFxuICAgICAgcmVuZGVyUG9ydGFsOiBub29wXG4gICAgfVxuICB9XG5cbiAgbGV0IHBvcnRhbEVsID0gbnVsbFxuICBjb25zdCBmb2N1c09iaiA9IHt9XG4gIGNvbnN0IG9uR2xvYmFsRGlhbG9nID0gdHlwZSA9PT0gJ2RpYWxvZycgJiYgaXNPbkdsb2JhbERpYWxvZyh2bSlcblxuICBmdW5jdGlvbiBzaG93UG9ydGFsIChpc1JlYWR5KSB7XG4gICAgaWYgKGlzUmVhZHkgPT09IHRydWUpIHtcbiAgICAgIHJlbW92ZUZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSB0cnVlXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgaWYgKG9uR2xvYmFsRGlhbG9nID09PSBmYWxzZSAmJiBwb3J0YWxFbCA9PT0gbnVsbCkge1xuICAgICAgICBwb3J0YWxFbCA9IGNyZWF0ZUdsb2JhbE5vZGUoZmFsc2UsIHR5cGUpXG4gICAgICB9XG5cbiAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gdHJ1ZVxuXG4gICAgICAvLyByZWdpc3RlciBwb3J0YWxcbiAgICAgIHBvcnRhbFByb3h5TGlzdC5wdXNoKHZtLnByb3h5KVxuXG4gICAgICBhZGRGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKGlzUmVhZHkgIT09IHRydWUpIHJldHVyblxuXG4gICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9IGZhbHNlXG5cbiAgICAvLyB1bnJlZ2lzdGVyIHBvcnRhbFxuICAgIGNvbnN0IGluZGV4ID0gcG9ydGFsUHJveHlMaXN0LmluZGV4T2Yodm0ucHJveHkpXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgcG9ydGFsUHJveHlMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICB9XG5cbiAgICBpZiAocG9ydGFsRWwgIT09IG51bGwpIHtcbiAgICAgIHJlbW92ZUdsb2JhbE5vZGUocG9ydGFsRWwpXG4gICAgICBwb3J0YWxFbCA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvblVubW91bnRlZCgoKSA9PiB7IGhpZGVQb3J0YWwodHJ1ZSkgfSlcblxuICAvLyBuZWVkZWQgZm9yIHBvcnRhbCB2bSBkZXRlY3Rpb25cbiAgdm0ucHJveHkuX19xUG9ydGFsID0gdHJ1ZVxuXG4gIC8vIHB1YmxpYyB3YXkgb2YgYWNjZXNzaW5nIHRoZSByZW5kZXJlZCBjb250ZW50XG4gIGluamVjdFByb3Aodm0ucHJveHksICdjb250ZW50RWwnLCAoKSA9PiBpbm5lclJlZi52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIHNob3dQb3J0YWwsXG4gICAgaGlkZVBvcnRhbCxcblxuICAgIHBvcnRhbElzQWN0aXZlLFxuICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgIHJlbmRlclBvcnRhbDogKCkgPT4gKFxuICAgICAgb25HbG9iYWxEaWFsb2cgPT09IHRydWVcbiAgICAgICAgPyByZW5kZXJQb3J0YWxDb250ZW50KClcbiAgICAgICAgOiAoXG4gICAgICAgICAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IFsgaChUZWxlcG9ydCwgeyB0bzogcG9ydGFsRWwgfSwgaChRUG9ydGFsLCByZW5kZXJQb3J0YWxDb250ZW50KSkgXVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlVHJhbnNpdGlvblByb3BzID0ge1xuICB0cmFuc2l0aW9uU2hvdzoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uSGlkZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogMzAwXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBkZWZhdWx0U2hvd0ZuID0gKCkgPT4ge30sIGRlZmF1bHRIaWRlRm4gPSAoKSA9PiB7fSkge1xuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb25Qcm9wczogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IGBxLXRyYW5zaXRpb24tLSR7IHByb3BzLnRyYW5zaXRpb25TaG93IHx8IGRlZmF1bHRTaG93Rm4oKSB9YFxuICAgICAgY29uc3QgaGlkZSA9IGBxLXRyYW5zaXRpb24tLSR7IHByb3BzLnRyYW5zaXRpb25IaWRlIHx8IGRlZmF1bHRIaWRlRm4oKSB9YFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhcHBlYXI6IHRydWUsXG5cbiAgICAgICAgZW50ZXJGcm9tQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItZnJvbWAsXG4gICAgICAgIGVudGVyQWN0aXZlQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItYWN0aXZlYCxcbiAgICAgICAgZW50ZXJUb0NsYXNzOiBgJHsgc2hvdyB9LWVudGVyLXRvYCxcblxuICAgICAgICBsZWF2ZUZyb21DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS1mcm9tYCxcbiAgICAgICAgbGVhdmVBY3RpdmVDbGFzczogYCR7IGhpZGUgfS1sZWF2ZS1hY3RpdmVgLFxuICAgICAgICBsZWF2ZVRvQ2xhc3M6IGAkeyBoaWRlIH0tbGVhdmUtdG9gXG4gICAgICB9XG4gICAgfSksXG5cbiAgICB0cmFuc2l0aW9uU3R5bGU6IGNvbXB1dGVkKCgpID0+IGAtLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHsgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uIH1tc2ApXG4gIH1cbn1cbiIsImltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcblxubGV0IHRpbWVyID0gbnVsbFxuXG5jb25zdFxuICB7IG5vdFBhc3NpdmVDYXB0dXJlIH0gPSBsaXN0ZW5PcHRzLFxuICByZWdpc3RlcmVkTGlzdCA9IFtdXG5cbmZ1bmN0aW9uIGdsb2JhbEhhbmRsZXIgKGV2dCkge1xuICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgdGltZXIgPSBudWxsXG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gdm9pZCAwXG4gICAgfHwgdGFyZ2V0Lm5vZGVUeXBlID09PSA4XG4gICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcG9pbnRlci1ldmVudHMnKSA9PT0gdHJ1ZVxuICApIHJldHVyblxuXG4gIC8vIGNoZWNrIGxhc3QgcG9ydGFsIHZtIGlmIGl0J3NcbiAgLy8gYSBRRGlhbG9nIGFuZCBub3QgaW4gc2VhbWxlc3MgbW9kZVxuICBsZXQgcG9ydGFsSW5kZXggPSBwb3J0YWxQcm94eUxpc3QubGVuZ3RoIC0gMVxuXG4gIHdoaWxlIChwb3J0YWxJbmRleCA+PSAwKSB7XG4gICAgY29uc3QgcHJveHkgPSBwb3J0YWxQcm94eUxpc3RbIHBvcnRhbEluZGV4IF0uJFxuXG4gICAgLy8gc2tpcCBRVG9vbHRpcCBwb3J0YWxzXG4gICAgaWYgKHByb3h5LnR5cGUubmFtZSA9PT0gJ1FUb29sdGlwJykge1xuICAgICAgcG9ydGFsSW5kZXgtLVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAocHJveHkudHlwZS5uYW1lICE9PSAnUURpYWxvZycpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKHByb3h5LnByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSByZXR1cm5cblxuICAgIHBvcnRhbEluZGV4LS1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSByZWdpc3RlcmVkTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHN0YXRlID0gcmVnaXN0ZXJlZExpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICBzdGF0ZS5hbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgICB8fCBzdGF0ZS5hbmNob3JFbC52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgKVxuICAgICAgJiYgKFxuICAgICAgICB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICAgfHwgKFxuICAgICAgICAgIHN0YXRlLmlubmVyUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgc3RhdGUuaW5uZXJSZWYudmFsdWUuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkge1xuICAgICAgLy8gbWFyayB0aGUgZXZlbnQgYXMgYmVpbmcgcHJvY2Vzc2VkIGJ5IGNsaWNrT3V0c2lkZVxuICAgICAgLy8gdXNlZCB0byBwcmV2ZW50IHJlZm9jdXMgYWZ0ZXIgbWVudSBjbG9zZVxuICAgICAgZXZ0LnFDbGlja091dHNpZGUgPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNsaWNrT3V0c2lkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIHJlZ2lzdGVyZWRMaXN0LnB1c2goY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xpY2tPdXRzaWRlIChjbGlja091dHNpZGVQcm9wcykge1xuICBjb25zdCBpbmRleCA9IHJlZ2lzdGVyZWRMaXN0LmZpbmRJbmRleChoID0+IGggPT09IGNsaWNrT3V0c2lkZVByb3BzKVxuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZWdpc3RlcmVkTGlzdC5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5sZXQgdnBMZWZ0LCB2cFRvcFxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVQb3NpdGlvbiAocG9zKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbScgXS5pbmNsdWRlcyhwYXJ0c1sgMCBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3Qgc3RhcnQgd2l0aCBvbmUgb2YgdG9wL2NlbnRlci9ib3R0b20nKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcsICdzdGFydCcsICdlbmQnIF0uaW5jbHVkZXMocGFydHNbIDEgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IGVuZCB3aXRoIG9uZSBvZiBsZWZ0L21pZGRsZS9yaWdodC9zdGFydC9lbmQnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9mZnNldCAodmFsKSB7XG4gIGlmICghdmFsKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKHZhbC5sZW5ndGggIT09IDIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHR5cGVvZiB2YWxbIDAgXSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbFsgMSBdICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IGhvcml6b250YWxQb3MgPSB7XG4gICdzdGFydCNsdHInOiAnbGVmdCcsXG4gICdzdGFydCNydGwnOiAncmlnaHQnLFxuICAnZW5kI2x0cic6ICdyaWdodCcsXG4gICdlbmQjcnRsJzogJ2xlZnQnXG59XG5cbjtbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXS5mb3JFYWNoKHBvcyA9PiB7XG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNsdHJgIF0gPSBwb3NcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I3J0bGAgXSA9IHBvc1xufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUG9zaXRpb24gKHBvcywgcnRsKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgcmV0dXJuIHtcbiAgICB2ZXJ0aWNhbDogcGFydHNbIDAgXSxcbiAgICBob3Jpem9udGFsOiBob3Jpem9udGFsUG9zWyBgJHsgcGFydHNbIDEgXSB9IyR7IHJ0bCA9PT0gdHJ1ZSA/ICdydGwnIDogJ2x0cicgfWAgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNob3JQcm9wcyAoZWwsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgaWYgKG9mZnNldCAhPT0gdm9pZCAwKSB7XG4gICAgdG9wIC09IG9mZnNldFsgMSBdXG4gICAgbGVmdCAtPSBvZmZzZXRbIDAgXVxuICAgIGJvdHRvbSArPSBvZmZzZXRbIDEgXVxuICAgIHJpZ2h0ICs9IG9mZnNldFsgMCBdXG5cbiAgICB3aWR0aCArPSBvZmZzZXRbIDAgXVxuICAgIGhlaWdodCArPSBvZmZzZXRbIDEgXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3AsIGJvdHRvbSwgaGVpZ2h0LFxuICAgIGxlZnQsIHJpZ2h0LCB3aWR0aCxcbiAgICBtaWRkbGU6IGxlZnQgKyAocmlnaHQgLSBsZWZ0KSAvIDIsXG4gICAgY2VudGVyOiB0b3AgKyAoYm90dG9tIC0gdG9wKSAvIDJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzIChlbCwgYWJzb2x1dGVPZmZzZXQsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgdG9wICs9IGFic29sdXRlT2Zmc2V0LnRvcFxuICBsZWZ0ICs9IGFic29sdXRlT2Zmc2V0LmxlZnRcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgKz0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0ICs9IG9mZnNldFsgMCBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCwgYm90dG9tOiB0b3AgKyAxLCBoZWlnaHQ6IDEsXG4gICAgbGVmdCwgcmlnaHQ6IGxlZnQgKyAxLCB3aWR0aDogMSxcbiAgICBtaWRkbGU6IGxlZnQsXG4gICAgY2VudGVyOiB0b3BcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUYXJnZXRQcm9wcyAod2lkdGgsIGhlaWdodCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICBjZW50ZXI6IGhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBoZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICBtaWRkbGU6IHdpZHRoIC8gMixcbiAgICByaWdodDogd2lkdGhcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUb3BMZWZ0UHJvcHMgKGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gLSB0YXJnZXRQcm9wc1sgc2VsZk9yaWdpbi52ZXJ0aWNhbCBdLFxuICAgIGxlZnQ6IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdIC0gdGFyZ2V0UHJvcHNbIHNlbGZPcmlnaW4uaG9yaXpvbnRhbCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFBvc2l0aW9uIChjZmcsIHJldHJ5TnVtYmVyID0gMCkge1xuICBpZiAoXG4gICAgY2ZnLnRhcmdldEVsID09PSBudWxsXG4gICAgfHwgY2ZnLmFuY2hvckVsID09PSBudWxsXG4gICAgfHwgcmV0cnlOdW1iZXIgPiA1IC8vIHdlIHNob3VsZCB0cnkgb25seSBhIGZldyB0aW1lc1xuICApIHJldHVyblxuXG4gIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IHplcm8gaGVpZ2h0IG9yIHdpZHRoIGJlY2F1c2VcbiAgLy8gd2UgYXJlIHRyeWluZyB0b28gZWFybHkgdG8gZ2V0IHRoZXNlIGRpbWVuc2lvbnNcbiAgaWYgKGNmZy50YXJnZXRFbC5vZmZzZXRIZWlnaHQgPT09IDAgfHwgY2ZnLnRhcmdldEVsLm9mZnNldFdpZHRoID09PSAwKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRQb3NpdGlvbihjZmcsIHJldHJ5TnVtYmVyICsgMSlcbiAgICB9LCAxMClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB0YXJnZXRFbCxcbiAgICBvZmZzZXQsXG4gICAgYW5jaG9yRWwsXG4gICAgYW5jaG9yT3JpZ2luLFxuICAgIHNlbGZPcmlnaW4sXG4gICAgYWJzb2x1dGVPZmZzZXQsXG4gICAgZml0LFxuICAgIGNvdmVyLFxuICAgIG1heEhlaWdodCxcbiAgICBtYXhXaWR0aFxuICB9ID0gY2ZnXG5cbiAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDApIHtcbiAgICAvLyB1c2VzIHRoZSBxLXBvc2l0aW9uLWVuZ2luZSBDU1MgY2xhc3NcblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYm9keS5zdHlsZVxuICAgIGNvbnN0IHsgb2Zmc2V0TGVmdDogbGVmdCwgb2Zmc2V0VG9wOiB0b3AgfSA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydFxuXG4gICAgaWYgKGxlZnQgIT09IHZwTGVmdCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS1sZWZ0JywgbGVmdCArICdweCcpXG4gICAgICB2cExlZnQgPSBsZWZ0XG4gICAgfVxuICAgIGlmICh0b3AgIT09IHZwVG9wKSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLXRvcCcsIHRvcCArICdweCcpXG4gICAgICB2cFRvcCA9IHRvcFxuICAgIH1cbiAgfVxuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBtaWdodCBjaGFuZ2VcbiAgLy8gaWYgbWF4LWhlaWdodC8td2lkdGggY2hhbmdlcywgc28gd2VcbiAgLy8gbmVlZCB0byByZXN0b3JlIGl0IGFmdGVyIHdlIGNhbGN1bGF0ZVxuICAvLyB0aGUgbmV3IHBvc2l0aW9uaW5nXG4gIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0gPSB0YXJnZXRFbFxuXG4gIGNvbnN0IGFuY2hvclByb3BzID0gYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMFxuICAgID8gZ2V0QW5jaG9yUHJvcHMoYW5jaG9yRWwsIGNvdmVyID09PSB0cnVlID8gWyAwLCAwIF0gOiBvZmZzZXQpXG4gICAgOiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzKGFuY2hvckVsLCBhYnNvbHV0ZU9mZnNldCwgb2Zmc2V0KVxuXG4gIC8qKlxuICAgKiBXZSBcInJlc2V0XCIgdGhlIGNyaXRpY2FsIENTUyBwcm9wZXJ0aWVzXG4gICAqIHNvIHdlIGNhbiB0YWtlIGFuIGFjY3VyYXRlIG1lYXN1cmVtZW50LlxuICAgKlxuICAgKiBFbnN1cmUgdGhhdCB0YXJnZXRFbCBoYXMgYSBtYXgtd2lkdGggJiBtYXgtaGVpZ2h0XG4gICAqIHNldCBpbiBDU1MgYW5kIHRoYXQgdGhlIHZhbHVlIGRvZXMgTk9UIGV4Y2VlZHMgMTAwdncvdmguXG4gICAqIEFsbCB1c2VycyBvZiB0aGUgcG9zaXRpb24tZW5naW5lIChjdXJyZW50bHkgUU1lbnUgJiBRVG9vbHRpcClcbiAgICogaGF2ZSBDU1MgZm9yIHRoaXMuXG4gICAqL1xuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCB7XG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgbWluV2lkdGg6IG51bGwsXG4gICAgbWluSGVpZ2h0OiBudWxsLFxuICAgIG1heFdpZHRoLFxuICAgIG1heEhlaWdodCxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgfSlcblxuICBjb25zdCB7IG9mZnNldFdpZHRoOiBvcmlnRWxXaWR0aCwgb2Zmc2V0SGVpZ2h0OiBvcmlnRWxIZWlnaHQgfSA9IHRhcmdldEVsXG4gIGNvbnN0IHsgZWxXaWR0aCwgZWxIZWlnaHQgfSA9IGZpdCA9PT0gdHJ1ZSB8fCBjb3ZlciA9PT0gdHJ1ZVxuICAgID8geyBlbFdpZHRoOiBNYXRoLm1heChhbmNob3JQcm9wcy53aWR0aCwgb3JpZ0VsV2lkdGgpLCBlbEhlaWdodDogY292ZXIgPT09IHRydWUgPyBNYXRoLm1heChhbmNob3JQcm9wcy5oZWlnaHQsIG9yaWdFbEhlaWdodCkgOiBvcmlnRWxIZWlnaHQgfVxuICAgIDogeyBlbFdpZHRoOiBvcmlnRWxXaWR0aCwgZWxIZWlnaHQ6IG9yaWdFbEhlaWdodCB9XG5cbiAgbGV0IGVsU3R5bGUgPSB7IG1heFdpZHRoLCBtYXhIZWlnaHQgfVxuXG4gIGlmIChmaXQgPT09IHRydWUgfHwgY292ZXIgPT09IHRydWUpIHtcbiAgICBlbFN0eWxlLm1pbldpZHRoID0gYW5jaG9yUHJvcHMud2lkdGggKyAncHgnXG4gICAgaWYgKGNvdmVyID09PSB0cnVlKSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGFuY2hvclByb3BzLmhlaWdodCArICdweCdcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIGNvbnN0IHRhcmdldFByb3BzID0gZ2V0VGFyZ2V0UHJvcHMoZWxXaWR0aCwgZWxIZWlnaHQpXG4gIGxldCBwcm9wcyA9IGdldFRvcExlZnRQcm9wcyhhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcblxuICBpZiAoYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMCB8fCBvZmZzZXQgPT09IHZvaWQgMCkge1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG4gIH1cbiAgZWxzZSB7IC8vIHdlIGhhdmUgdG91Y2ggcG9zaXRpb24gb3IgY29udGV4dCBtZW51IHdpdGggb2Zmc2V0XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHByb3BzIC8vIGNhY2hlIGluaXRpYWwgdmFsdWVzXG5cbiAgICAvLyBhcHBseSBpbml0aWFsIGJvdW5kYXJpZXNcbiAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuXG4gICAgbGV0IGhhc0NoYW5nZWQgPSBmYWxzZVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgdmVydGljYWxseT9cbiAgICBpZiAocHJvcHMudG9wICE9PSB0b3ApIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlXG4gICAgICBjb25zdCBvZmZzZXRZID0gMiAqIG9mZnNldFsgMSBdXG4gICAgICBhbmNob3JQcm9wcy5jZW50ZXIgPSBhbmNob3JQcm9wcy50b3AgLT0gb2Zmc2V0WVxuICAgICAgYW5jaG9yUHJvcHMuYm90dG9tIC09IG9mZnNldFkgKyAyXG4gICAgfVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgaG9yaXpvbnRhbGx5P1xuICAgIGlmIChwcm9wcy5sZWZ0ICE9PSBsZWZ0KSB7XG4gICAgICBoYXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgY29uc3Qgb2Zmc2V0WCA9IDIgKiBvZmZzZXRbIDAgXVxuICAgICAgYW5jaG9yUHJvcHMubWlkZGxlID0gYW5jaG9yUHJvcHMubGVmdCAtPSBvZmZzZXRYXG4gICAgICBhbmNob3JQcm9wcy5yaWdodCAtPSBvZmZzZXRYICsgMlxuICAgIH1cblxuICAgIGlmIChoYXNDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyByZS1jYWxjdWxhdGUgcHJvcHMgd2l0aCB0aGUgbmV3IGFuY2hvclxuICAgICAgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG5cbiAgICAgIC8vIGFuZCByZS1hcHBseSBib3VuZGFyaWVzXG4gICAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuICAgIH1cbiAgfVxuXG4gIGVsU3R5bGUgPSB7XG4gICAgdG9wOiBwcm9wcy50b3AgKyAncHgnLFxuICAgIGxlZnQ6IHByb3BzLmxlZnQgKyAncHgnXG4gIH1cblxuICBpZiAocHJvcHMubWF4SGVpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heEhlaWdodCA9IHByb3BzLm1heEhlaWdodCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy5oZWlnaHQgPiBwcm9wcy5tYXhIZWlnaHQpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gZWxTdHlsZS5tYXhIZWlnaHRcbiAgICB9XG4gIH1cbiAgaWYgKHByb3BzLm1heFdpZHRoICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heFdpZHRoID0gcHJvcHMubWF4V2lkdGggKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMud2lkdGggPiBwcm9wcy5tYXhXaWR0aCkge1xuICAgICAgZWxTdHlsZS5taW5XaWR0aCA9IGVsU3R5bGUubWF4V2lkdGhcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gIGlmICh0YXJnZXRFbC5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgIHRhcmdldEVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICB9XG4gIGlmICh0YXJnZXRFbC5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0KSB7XG4gICAgdGFyZ2V0RWwuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnRcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvdW5kYXJpZXMgKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbikge1xuICBjb25zdFxuICAgIGN1cnJlbnRIZWlnaHQgPSB0YXJnZXRQcm9wcy5ib3R0b20sXG4gICAgY3VycmVudFdpZHRoID0gdGFyZ2V0UHJvcHMucmlnaHQsXG4gICAgbWFyZ2luID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKSxcbiAgICBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIG1hcmdpbixcbiAgICBpbm5lcldpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuXG4gIGlmIChwcm9wcy50b3AgPCAwIHx8IHByb3BzLnRvcCArIGN1cnJlbnRIZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgIGlmIChzZWxmT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJykge1xuICAgICAgcHJvcHMudG9wID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJIZWlnaHQgLSBjdXJyZW50SGVpZ2h0KVxuICAgICAgICA6IDBcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclkgPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICAgIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLmJvdHRvbSA6IGFuY2hvclByb3BzLnRvcClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGFuY2hvclkpXG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JZIC0gY3VycmVudEhlaWdodClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLnRvcCA6IGFuY2hvclByb3BzLmJvdHRvbSlcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0IC0gcHJvcHMudG9wKVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5sZWZ0IDwgMCB8fCBwcm9wcy5sZWZ0ICsgY3VycmVudFdpZHRoID4gaW5uZXJXaWR0aCkge1xuICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoKVxuICAgIGlmIChzZWxmT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVyV2lkdGggLSBjdXJyZW50V2lkdGgpXG4gICAgICAgIDogMFxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JYID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVyV2lkdGgsXG4gICAgICAgIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLnJpZ2h0IDogYW5jaG9yUHJvcHMubGVmdClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBhbmNob3JYKVxuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvclggLSBwcm9wcy5tYXhXaWR0aClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5sZWZ0IDogYW5jaG9yUHJvcHMucmlnaHQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aCAtIHByb3BzLmxlZnQpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbmNob3IsIHsgdXNlQW5jaG9yU3RhdGljUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcydcbmltcG9ydCB1c2VTY3JvbGxUYXJnZXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2Nyb2xsLXRhcmdldC91c2Utc2Nyb2xsLXRhcmdldC5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVRyYW5zaXRpb24sIHsgdXNlVHJhbnNpdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdHJhbnNpdGlvbi91c2UtdHJhbnNpdGlvbi5qcydcbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCwgc2Nyb2xsVGFyZ2V0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCwgYWRkRXZ0LCBjbGVhbkV2dCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgY2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZENsaWNrT3V0c2lkZSwgcmVtb3ZlQ2xpY2tPdXRzaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuanMnXG5pbXBvcnQge1xuICB2YWxpZGF0ZVBvc2l0aW9uLCB2YWxpZGF0ZU9mZnNldCwgc2V0UG9zaXRpb24sIHBhcnNlUG9zaXRpb25cbn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5wb3NpdGlvbi1lbmdpbmUvcG9zaXRpb24tZW5naW5lLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2x0aXAnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbmNob3JTdGF0aWNQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIG1heEhlaWdodDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgdHJhbnNpdGlvblNob3c6IHtcbiAgICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcy50cmFuc2l0aW9uU2hvdyxcbiAgICAgIGRlZmF1bHQ6ICdqdW1wLWRvd24nXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uSGlkZToge1xuICAgICAgLi4udXNlVHJhbnNpdGlvblByb3BzLnRyYW5zaXRpb25IaWRlLFxuICAgICAgZGVmYXVsdDogJ2p1bXAtdXAnXG4gICAgfSxcblxuICAgIGFuY2hvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2JvdHRvbSBtaWRkbGUnLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBzZWxmOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndG9wIG1pZGRsZScsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbIDE0LCAxNCBdLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU9mZnNldFxuICAgIH0sXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHNjcm9sbFRhcmdldFByb3AsXG5cbiAgICBkZWxheToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBoaWRlRGVsYXk6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgcGVyc2lzdGVudDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0c1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGxldCB1bndhdGNoUG9zaXRpb24sIG9ic2VydmVyXG5cbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSB2bVxuXG4gICAgY29uc3QgaW5uZXJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBzaG93aW5nID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgYW5jaG9yT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VQb3NpdGlvbihwcm9wcy5hbmNob3IsICRxLmxhbmcucnRsKSlcbiAgICBjb25zdCBzZWxmT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VQb3NpdGlvbihwcm9wcy5zZWxmLCAkcS5sYW5nLnJ0bCkpXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlKVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcbiAgICBjb25zdCB7IHRyYW5zaXRpb25Qcm9wcywgdHJhbnNpdGlvblN0eWxlIH0gPSB1c2VUcmFuc2l0aW9uKHByb3BzKVxuICAgIGNvbnN0IHsgbG9jYWxTY3JvbGxUYXJnZXQsIGNoYW5nZVNjcm9sbEV2ZW50LCB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCB9ID0gdXNlU2Nyb2xsVGFyZ2V0KHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpXG5cbiAgICBjb25zdCB7IGFuY2hvckVsLCBjYW5TaG93LCBhbmNob3JFdmVudHMgfSA9IHVzZUFuY2hvcih7IHNob3dpbmcsIGNvbmZpZ3VyZUFuY2hvckVsIH0pXG5cbiAgICBjb25zdCB7IHNob3csIGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsIGNhblNob3csIGhhbmRsZVNob3csIGhhbmRsZUhpZGUsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIHByb2Nlc3NPbk1vdW50OiB0cnVlXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oYW5jaG9yRXZlbnRzLCB7IGRlbGF5U2hvdywgZGVsYXlIaWRlIH0pXG5cbiAgICBjb25zdCB7IHNob3dQb3J0YWwsIGhpZGVQb3J0YWwsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgJ3Rvb2x0aXAnKVxuXG4gICAgLy8gaWYgd2UncmUgb24gbW9iaWxlLCBsZXQncyBpbXByb3ZlIHRoZSBleHBlcmllbmNlXG4gICAgLy8gYnkgY2xvc2luZyBpdCB3aGVuIHVzZXIgdGFwcyBvdXRzaWRlIG9mIGl0XG4gICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgY2xpY2tPdXRzaWRlUHJvcHMgPSB7XG4gICAgICAgIGFuY2hvckVsLFxuICAgICAgICBpbm5lclJlZixcbiAgICAgICAgb25DbGlja091dHNpZGUgKGUpIHtcbiAgICAgICAgICBoaWRlKGUpXG5cbiAgICAgICAgICAvLyBwcmV2ZW50IGNsaWNrIGlmIGl0J3Mgb24gYSBkaWFsb2cgYmFja2Ryb3BcbiAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWRpYWxvZ19fYmFja2Ryb3AnKSkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhhc0NsaWNrT3V0c2lkZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIC8vIGl0IGRvZXNuJ3QgaGFzIGV4dGVybmFsIG1vZGVsXG4gICAgICAgIC8vIChudWxsIGlzIHRoZSBkZWZhdWx0IHZhbHVlKVxuICAgICAgICBwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsXG4gICAgICAgIC8vIGFuZCBpdCdzIG5vdCBwZXJzaXN0ZW50XG4gICAgICAgICYmIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgKVxuXG4gICAgICB3YXRjaChoYXNDbGlja091dHNpZGUsIHZhbCA9PiB7XG4gICAgICAgIGNvbnN0IGZuID0gdmFsID09PSB0cnVlID8gYWRkQ2xpY2tPdXRzaWRlIDogcmVtb3ZlQ2xpY2tPdXRzaWRlXG4gICAgICAgIGZuKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQpIHtcbiAgICAgIHNob3dQb3J0YWwoKVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGljaygpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpY2soKCkgPT4ge1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHVwZGF0ZVBvc2l0aW9uKCkpXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaW5uZXJSZWYudmFsdWUsIHsgYXR0cmlidXRlczogZmFsc2UsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KVxuICAgICAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICB9KVxuXG4gICAgICBpZiAodW53YXRjaFBvc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uID0gd2F0Y2goXG4gICAgICAgICAgKCkgPT4gJHEuc2NyZWVuLndpZHRoICsgJ3wnICsgJHEuc2NyZWVuLmhlaWdodCArICd8JyArIHByb3BzLnNlbGYgKyAnfCcgKyBwcm9wcy5hbmNob3IgKyAnfCcgKyAkcS5sYW5nLnJ0bCxcbiAgICAgICAgICB1cGRhdGVQb3NpdGlvblxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICBoaWRlUG9ydGFsKClcblxuICAgICAgYW5jaG9yQ2xlYW51cCgpXG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGhpZGVQb3J0YWwodHJ1ZSkgLy8gZG9uZSBoaWRpbmcsIG5vdyBkZXN0cm95XG4gICAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5jaG9yQ2xlYW51cCAoKSB7XG4gICAgICBpZiAob2JzZXJ2ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgb2JzZXJ2ZXIgPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbigpXG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICd0b29sdGlwVGVtcCcpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgc2V0UG9zaXRpb24oe1xuICAgICAgICB0YXJnZXRFbDogaW5uZXJSZWYudmFsdWUsXG4gICAgICAgIG9mZnNldDogcHJvcHMub2Zmc2V0LFxuICAgICAgICBhbmNob3JFbDogYW5jaG9yRWwudmFsdWUsXG4gICAgICAgIGFuY2hvck9yaWdpbjogYW5jaG9yT3JpZ2luLnZhbHVlLFxuICAgICAgICBzZWxmT3JpZ2luOiBzZWxmT3JpZ2luLnZhbHVlLFxuICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IHByb3BzLm1heFdpZHRoXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGF5U2hvdyAoZXZ0KSB7XG4gICAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gYW5jaG9yRWwudmFsdWVcbiAgICAgICAgY29uc3QgZXZ0cyA9IFsgJ3RvdWNobW92ZScsICd0b3VjaGNhbmNlbCcsICd0b3VjaGVuZCcsICdjbGljaycgXVxuICAgICAgICAgIC5tYXAoZSA9PiAoWyB0YXJnZXQsIGUsICdkZWxheUhpZGUnLCAncGFzc2l2ZUNhcHR1cmUnIF0pKVxuXG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICd0b29sdGlwVGVtcCcsIGV2dHMpXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IHNob3coZXZ0KSB9LCBwcm9wcy5kZWxheSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxheUhpZGUgKGV2dCkge1xuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICd0b29sdGlwVGVtcCcpXG4gICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgLy8gZGVsYXkgbmVlZGVkIG90aGVyd2lzZSBzZWxlY3Rpb24gc3RpbGwgb2NjdXJzXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuICAgICAgICB9LCAxMClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHsgaGlkZShldnQpIH0sIHByb3BzLmhpZGVEZWxheSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVBbmNob3JFbCAoKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLm5vUGFyZW50RXZlbnQgPT09IHRydWVcbiAgICAgICAgfHwgYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGV2dHMgPSAkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWVcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAndG91Y2hzdGFydCcsICdkZWxheVNob3cnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnbW91c2VlbnRlcicsICdkZWxheVNob3cnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdtb3VzZWxlYXZlJywgJ2RlbGF5SGlkZScsICdwYXNzaXZlJyBdXG4gICAgICAgICAgXVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsIHx8IHByb3BzLnNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gZ2V0U2Nyb2xsVGFyZ2V0KGFuY2hvckVsLnZhbHVlLCBwcm9wcy5zY3JvbGxUYXJnZXQpXG4gICAgICAgIGNvbnN0IGZuID0gcHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZVxuICAgICAgICAgID8gdXBkYXRlUG9zaXRpb25cbiAgICAgICAgICA6IGhpZGVcblxuICAgICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSwgZm4pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9vbHRpcENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgJ3EtdG9vbHRpcCBxLXRvb2x0aXAtLXN0eWxlIHEtcG9zaXRpb24tZW5naW5lIG5vLXBvaW50ZXItZXZlbnRzJyxcbiAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdHlsZTogW1xuICAgICAgICAgICAgYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uU3R5bGUudmFsdWVcbiAgICAgICAgICBdLFxuICAgICAgICAgIHJvbGU6ICd0b29sdGlwJ1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgICAgOiBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydGFsQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gaChUcmFuc2l0aW9uLCB0cmFuc2l0aW9uUHJvcHMudmFsdWUsIGdldFRvb2x0aXBDb250ZW50KVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudChhbmNob3JDbGVhbnVwKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwgeyB1cGRhdGVQb3NpdGlvbiB9KVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5mdW5jdGlvbiBwYXJzZVZhbHVlICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbFxuICAgID8gbnVsbFxuICAgIDogdmFsXG59XG5cbmZ1bmN0aW9uIGdldElkICh2YWwsIHJlcXVpcmVkKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGxcbiAgICA/IChyZXF1aXJlZCA9PT0gdHJ1ZSA/IGBmXyR7IHVpZCgpIH1gIDogbnVsbClcbiAgICA6IHZhbFxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gXCJpZFwiIHdoaWNoIGlzIGEgcmVmKCkgdGhhdCBjYW4gYmUgdXNlZCBhc1xuICogYSB1bmlxdWUgaWRlbnRpZmllciB0byBhcHBseSB0byBhIERPTSBub2RlIGF0dHJpYnV0ZS5cbiAqXG4gKiBPbiBTU1IsIGl0IHRha2VzIGNhcmUgb2YgZ2VuZXJhdGluZyB0aGUgaWQgb24gdGhlIGNsaWVudCBzaWRlIChvbmx5KSB0b1xuICogYXZvaWQgaHlkcmF0aW9uIGVycm9ycy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgZ2V0VmFsdWUsIHJlcXVpcmVkID0gdHJ1ZSB9ID0ge30pIHtcbiAgaWYgKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIGNvbnN0IGlkID0gZ2V0VmFsdWUgIT09IHZvaWQgMFxuICAgICAgPyByZWYocGFyc2VWYWx1ZShnZXRWYWx1ZSgpKSlcbiAgICAgIDogcmVmKG51bGwpXG5cbiAgICBpZiAocmVxdWlyZWQgPT09IHRydWUgJiYgaWQudmFsdWUgPT09IG51bGwpIHtcbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgIGlkLnZhbHVlID0gYGZfJHsgdWlkKCkgfWAgLy8gZ2V0SWQobnVsbCwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGdldFZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgIHdhdGNoKGdldFZhbHVlLCBuZXdJZCA9PiB7XG4gICAgICAgIGlkLnZhbHVlID0gZ2V0SWQobmV3SWQsIHJlcXVpcmVkKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIHJldHVybiBnZXRWYWx1ZSAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBnZXRJZChnZXRWYWx1ZSgpLCByZXF1aXJlZCkpXG4gICAgOiByZWYoYGZfJHsgdWlkKCkgfWApIC8vIGdldElkKG51bGwsIHRydWUpXG59XG4iXSwibmFtZXMiOlsiaCJdLCJtYXBwaW5ncyI6Ijs7QUFFTyxTQUFTLGlCQUFrQjtBQUNoQyxNQUFJLE9BQU8saUJBQWlCLFFBQVE7QUFDbEMsVUFBTSxZQUFZLE9BQU8sYUFBWTtBQUNyQyxRQUFJLFVBQVUsVUFBVSxRQUFRO0FBQzlCLGdCQUFVLE1BQUs7QUFBQSxJQUNyQixXQUNhLFVBQVUsb0JBQW9CLFFBQVE7QUFDN0MsZ0JBQVUsZ0JBQWU7QUFDekIsZUFBUyxHQUFHLFdBQVcsUUFBUSxVQUFVLFNBQVMsU0FBUyxZQUFhLENBQUE7QUFBQSxJQUM5RTtBQUFBLEVBQ0EsV0FDVyxTQUFTLGNBQWMsUUFBUTtBQUN0QyxhQUFTLFVBQVUsTUFBSztBQUFBLEVBQzVCO0FBQ0E7QUNWTyxNQUFNLHVCQUF1QjtBQUFBO0FBQUEsRUFFbEMsUUFFSTtBQUFBLElBQ0UsTUFBTSxDQUFFLFNBQVMsUUFBUSxPQUFRO0FBQUEsSUFDakMsU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUVKLGVBQWU7QUFDakI7QUFFTyxNQUFNLGlCQUFpQjtBQUFBLEVBQzVCLEdBQUc7QUFBQSxFQUNILGFBQWE7QUFDZjtBQUV5QixTQUFBLFVBQUE7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBQ0E7QUFBQTtBQUNGLEdBQUc7QUFDRCxRQUFNLEVBQUUsT0FBTyxPQUFPLEtBQUEsSUFBUyxtQkFBbUI7QUFFNUMsUUFBQSxXQUFXLElBQUksSUFBSTtBQUV6QixNQUFJLGFBQWE7QUFFakIsV0FBUyxRQUFTLEtBQUs7QUFFZCxXQUFBLFNBQVMsVUFBVSxPQUN0QixRQUNDLFFBQVEsVUFBVSxJQUFJLFlBQVksVUFBVSxJQUFJLFFBQVEsVUFBVTtBQUFBLEVBQUE7QUFHekUsUUFBTSxlQUFlLENBQUM7QUFFdEIsTUFBSSxzQkFBc0IsUUFBUTtBQUloQyxXQUFPLE9BQU8sY0FBYztBQUFBLE1B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QUFJLElBQUssQ0FBQSxHQUFJO0FBQzNELE1BQUkseUJBQXlCLFVBQVUsTUFBTTtBQUMzQyxVQUFNLEtBQUssYUFBYSxTQUNwQixJQUFJLFdBQVcsVUFBVSxDQUFDLElBQzFCLElBQUksSUFBSTtBQUVaLFFBQUksYUFBYSxRQUFRLEdBQUcsVUFBVSxNQUFNO0FBQzFDLGdCQUFVLE1BQU07QUFDZCxXQUFHLFFBQVEsS0FBTSxJQUFLLENBQUE7QUFBQSxNQUN2QixDQUFBO0FBQUEsSUFDUDtBQUVJLFFBQUksYUFBYSxRQUFRO0FBQ3ZCLFlBQU0sVUFBVSxXQUFTO0FBQ3ZCLFdBQUcsUUFBUSxNQUFNLE9BQU8sUUFBUTtBQUFBLE1BQ2pDLENBQUE7QUFBQSxJQUNQO0FBRUksV0FBTztBQUFBLEVBQ1g7QUFFRSxTQUFPLGFBQWEsU0FDaEIsU0FBUyxNQUFNLE1BQU0sU0FBUSxHQUFJLFFBQVEsQ0FBQyxJQUMxQyxJQUFJLEtBQU0sSUFBRyxDQUFJLEVBQUM7QUFDeEI7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTFdfQ==
