import { u as useSplitAttrs, Q as QInput } from "./QInput-C7E9Be89.js";
import { q as noop, c as createComponent, a as computed, h, b as hSlot, a2 as client, j as isKeyCode, g as getCurrentInstance, r as ref, n as watch, a3 as position, Z as Transition, o as onBeforeUnmount, a4 as childHasFocus, k as stopAndPrevent, a5 as nonRoundBtnProps, a6 as getBtnDesignAttr, d as onMounted, Q as QIcon, T as QBtn, a7 as stop, s as shouldIgnoreKey, a8 as prevent, a9 as vmHasRouter, aa as History, ab as onBeforeMount, v as nextTick, G as defineComponent, ac as useRoute, ad as useRouter, ae as Notify, _ as _export_sfc, V as createElementBlock, I as openBlock, M as createBaseVNode, P as toDisplayString, L as createVNode, a1 as createCommentVNode, U as normalizeClass, H as createBlock, J as withCtx, X as Fragment, S as createTextVNode } from "./index-DiEwj2lb.js";
import { u as useModelToggleEmits, v as validateOffset, d as validatePosition, e as useTransitionProps, a as useModelToggleProps, f as useAnchorProps, g as useTransition, h as useScrollTarget, i as useAnchor, c as useModelToggle, j as usePortal, p as parsePosition, k as addClickOutside, r as removeClickOutside, l as closePortalMenus, s as setPosition, m as addFocusFn, b as useId, Q as QTooltip } from "./use-id-CSkcFI3i.js";
import { u as useDarkProps, a as useDark } from "./use-dark-D3vguVup.js";
import { s as scrollTargetProp, a as useTick, b as useTimeout, g as getScrollTarget } from "./scroll-DGwSptOL.js";
import { a as QItemSection, Q as QItem } from "./QItem-CCDSUG9A.js";
import { E as Exercise } from "./models-i8VR3keN.js";
import { e as exerciseCount } from "./state-DHIPeIG6.js";
import { A as AudioPlayer } from "./AudioPlayer-_tKvSXvp.js";
function getBlockElement(el, parent) {
  if (parent && el === parent) {
    return null;
  }
  const nodeName = el.nodeName.toLowerCase();
  if (["div", "li", "ul", "ol", "blockquote"].includes(nodeName) === true) {
    return el;
  }
  const style = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle, display = style.display;
  if (display === "block" || display === "table") {
    return el;
  }
  return getBlockElement(el.parentNode);
}
function isChildOf(el, parent, orSame) {
  return !el || el === document.body ? false : orSame === true && el === parent || (parent === document ? document.body : parent).contains(el.parentNode);
}
function createRange(node, chars, range) {
  if (!range) {
    range = document.createRange();
    range.selectNode(node);
    range.setStart(node, 0);
  }
  if (chars.count === 0) {
    range.setEnd(node, chars.count);
  } else if (chars.count > 0) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length;
      } else {
        range.setEnd(node, chars.count);
        chars.count = 0;
      }
    } else {
      for (let lp = 0; chars.count !== 0 && lp < node.childNodes.length; lp++) {
        range = createRange(node.childNodes[lp], chars, range);
      }
    }
  }
  return range;
}
const urlRegex = /^https?:\/\//;
class Caret {
  constructor(el, eVm) {
    this.el = el;
    this.eVm = eVm;
    this._range = null;
  }
  get selection() {
    if (this.el) {
      const sel = document.getSelection();
      if (isChildOf(sel.anchorNode, this.el, true) && isChildOf(sel.focusNode, this.el, true)) {
        return sel;
      }
    }
    return null;
  }
  get hasSelection() {
    return this.selection !== null ? this.selection.toString().length !== 0 : false;
  }
  get range() {
    const sel = this.selection;
    if (sel !== null && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
    return this._range;
  }
  get parent() {
    const range = this.range;
    if (range !== null) {
      const node = range.startContainer;
      return node.nodeType === document.ELEMENT_NODE ? node : node.parentNode;
    }
    return null;
  }
  get blockParent() {
    const parent = this.parent;
    if (parent !== null) {
      return getBlockElement(parent, this.el);
    }
    return null;
  }
  save(range = this.range) {
    if (range !== null) {
      this._range = range;
    }
  }
  restore(range = this._range) {
    const r = document.createRange(), sel = document.getSelection();
    if (range !== null) {
      r.setStart(range.startContainer, range.startOffset);
      r.setEnd(range.endContainer, range.endOffset);
      sel.removeAllRanges();
      sel.addRange(r);
    } else {
      sel.selectAllChildren(this.el);
      sel.collapseToEnd();
    }
  }
  savePosition() {
    let charCount = -1, node;
    const selection = document.getSelection(), parentEl = this.el.parentNode;
    if (selection.focusNode && isChildOf(selection.focusNode, parentEl)) {
      node = selection.focusNode;
      charCount = selection.focusOffset;
      while (node && node !== parentEl) {
        if (node !== this.el && node.previousSibling) {
          node = node.previousSibling;
          charCount += node.textContent.length;
        } else {
          node = node.parentNode;
        }
      }
    }
    this.savedPos = charCount;
  }
  restorePosition(length = 0) {
    if (this.savedPos > 0 && this.savedPos < length) {
      const selection = window.getSelection(), range = createRange(this.el, { count: this.savedPos });
      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
  hasParent(name, spanLevel) {
    const el = spanLevel ? this.parent : this.blockParent;
    return el !== null ? el.nodeName.toLowerCase() === name.toLowerCase() : false;
  }
  hasParents(list, recursive, el = this.parent) {
    if (el === null) {
      return false;
    }
    if (list.includes(el.nodeName.toLowerCase()) === true) {
      return true;
    }
    return recursive === true ? this.hasParents(list, recursive, el.parentNode) : false;
  }
  is(cmd, param) {
    if (this.selection === null) {
      return false;
    }
    switch (cmd) {
      case "formatBlock":
        return param === "DIV" && this.parent === this.el || this.hasParent(param, param === "PRE");
      case "link":
        return this.hasParent("A", true);
      case "fontSize":
        return document.queryCommandValue(cmd) === param;
      case "fontName":
        const res = document.queryCommandValue(cmd);
        return res === `"${param}"` || res === param;
      case "fullscreen":
        return this.eVm.inFullscreen.value;
      case "viewsource":
        return this.eVm.isViewingSource.value;
      case void 0:
        return false;
      default:
        const state = document.queryCommandState(cmd);
        return param !== void 0 ? state === param : state;
    }
  }
  getParentAttribute(attrib) {
    if (this.parent !== null) {
      return this.parent.getAttribute(attrib);
    }
    return null;
  }
  can(name) {
    if (name === "outdent") {
      return this.hasParents(["blockquote", "li"], true);
    }
    if (name === "indent") {
      return this.hasParents(["li"], true);
    }
    if (name === "link") {
      return this.selection !== null || this.is("link");
    }
  }
  apply(cmd, param, done = noop) {
    if (cmd === "formatBlock") {
      if (["BLOCKQUOTE", "H1", "H2", "H3", "H4", "H5", "H6"].includes(param) && this.is(cmd, param)) {
        cmd = "outdent";
        param = null;
      }
      if (param === "PRE" && this.is(cmd, "PRE")) {
        param = "P";
      }
    } else if (cmd === "print") {
      done();
      const win = window.open();
      win.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `);
      win.print();
      win.close();
      return;
    } else if (cmd === "link") {
      const link = this.getParentAttribute("href");
      if (link === null) {
        const selection = this.selectWord(this.selection);
        const url = selection ? selection.toString() : "";
        if (!url.length && (!this.range || !this.range.cloneContents().querySelector("img"))) return;
        this.eVm.editLinkUrl.value = urlRegex.test(url) ? url : "https://";
        document.execCommand("createLink", false, this.eVm.editLinkUrl.value);
        this.save(selection.getRangeAt(0));
      } else {
        this.eVm.editLinkUrl.value = link;
        this.range.selectNodeContents(this.parent);
        this.save();
      }
      return;
    } else if (cmd === "fullscreen") {
      this.eVm.toggleFullscreen();
      done();
      return;
    } else if (cmd === "viewsource") {
      this.eVm.isViewingSource.value = this.eVm.isViewingSource.value === false;
      this.eVm.setContent(this.eVm.props.modelValue);
      done();
      return;
    }
    document.execCommand(cmd, false, param);
    done();
  }
  selectWord(sel) {
    if (sel === null || sel.isCollapsed !== true || /* IE 11 */
    sel.modify === void 0) {
      return sel;
    }
    const range = document.createRange();
    range.setStart(sel.anchorNode, sel.anchorOffset);
    range.setEnd(sel.focusNode, sel.focusOffset);
    const direction = range.collapsed ? ["backward", "forward"] : ["forward", "backward"];
    range.detach();
    const endNode = sel.focusNode, endOffset = sel.focusOffset;
    sel.collapse(sel.anchorNode, sel.anchorOffset);
    sel.modify("move", direction[0], "character");
    sel.modify("move", direction[1], "word");
    sel.extend(endNode, endOffset);
    sel.modify("extend", direction[1], "character");
    sel.modify("extend", direction[0], "word");
    return sel;
  }
}
const QBtnGroup = createComponent({
  name: "QBtnGroup",
  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      const cls = ["unelevated", "outline", "flat", "rounded", "square", "push", "stretch", "glossy"].filter((t) => props[t] === true).map((t) => `q-btn-group--${t}`).join(" ");
      return `q-btn-group row no-wrap${cls.length !== 0 ? " " + cls : ""}` + (props.spread === true ? " q-btn-group--spread" : " inline");
    });
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index !== -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
const QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: scrollTargetProp,
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "menu");
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (
            // always prevent touch event
            e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")
          ) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    const menuClass = computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && // menu was hidden from code or ESC plugin
      (evt === void 0 || evt.qClickOutside !== true)) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      emit("escapeKey");
      hide(evt);
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function renderPortalContent() {
      return h(
        Transition,
        transitionProps.value,
        () => showing.value === true ? h("div", {
          role: "menu",
          ...attrs,
          ref: innerRef,
          tabindex: -1,
          class: [
            "q-menu q-position-engine scroll" + menuClass.value,
            attrs.class
          ],
          style: [
            attrs.style,
            transitionStyle.value
          ],
          ...onEvents.value
        }, hSlot(slots.default)) : null
      );
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
const btnPropsList = Object.keys(nonRoundBtnProps);
function passBtnProps(props) {
  return btnPropsList.reduce((acc, key) => {
    const val = props[key];
    if (val !== void 0) {
      acc[key] = val;
    }
    return acc;
  }, {});
}
const QBtnDropdown = createComponent({
  name: "QBtnDropdown",
  props: {
    ...nonRoundBtnProps,
    ...useTransitionProps,
    modelValue: Boolean,
    split: Boolean,
    dropdownIcon: String,
    contentClass: [Array, String, Object],
    contentStyle: [Array, String, Object],
    cover: Boolean,
    persistent: Boolean,
    noRouteDismiss: Boolean,
    autoClose: Boolean,
    menuAnchor: {
      type: String,
      default: "bottom end"
    },
    menuSelf: {
      type: String,
      default: "top end"
    },
    menuOffset: Array,
    disableMainBtn: Boolean,
    disableDropdown: Boolean,
    noIconAnimation: Boolean,
    toggleAriaLabel: String
  },
  emits: ["update:modelValue", "click", "beforeShow", "show", "beforeHide", "hide"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const showing = ref(props.modelValue);
    const menuRef = ref(null);
    const targetUid = useId();
    const ariaAttrs = computed(() => {
      const acc = {
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-haspopup": "true",
        "aria-controls": targetUid.value,
        "aria-label": props.toggleAriaLabel || proxy.$q.lang.label[showing.value === true ? "collapse" : "expand"](props.label)
      };
      if (props.disable === true || (props.split === false && props.disableMainBtn === true || props.disableDropdown === true)) {
        acc["aria-disabled"] = "true";
      }
      return acc;
    });
    const iconClass = computed(
      () => "q-btn-dropdown__arrow" + (showing.value === true && props.noIconAnimation === false ? " rotate-180" : "") + (props.split === false ? " q-btn-dropdown__arrow-container" : "")
    );
    const btnDesignAttr = computed(() => getBtnDesignAttr(props));
    const btnProps = computed(() => passBtnProps(props));
    watch(() => props.modelValue, (val) => {
      menuRef.value !== null && menuRef.value[val ? "show" : "hide"]();
    });
    watch(() => props.split, hide);
    function onBeforeShow(e) {
      showing.value = true;
      emit("beforeShow", e);
    }
    function onShow(e) {
      emit("show", e);
      emit("update:modelValue", true);
    }
    function onBeforeHide(e) {
      showing.value = false;
      emit("beforeHide", e);
    }
    function onHide(e) {
      emit("hide", e);
      emit("update:modelValue", false);
    }
    function onClick(e) {
      emit("click", e);
    }
    function onClickHide(e) {
      stop(e);
      hide();
      emit("click", e);
    }
    function toggle(evt) {
      menuRef.value !== null && menuRef.value.toggle(evt);
    }
    function show(evt) {
      menuRef.value !== null && menuRef.value.show(evt);
    }
    function hide(evt) {
      menuRef.value !== null && menuRef.value.hide(evt);
    }
    Object.assign(proxy, {
      show,
      hide,
      toggle
    });
    onMounted(() => {
      props.modelValue === true && show();
    });
    return () => {
      const Arrow = [
        h(QIcon, {
          class: iconClass.value,
          name: props.dropdownIcon || proxy.$q.iconSet.arrow.dropdown
        })
      ];
      props.disableDropdown !== true && Arrow.push(
        h(QMenu, {
          ref: menuRef,
          id: targetUid.value,
          class: props.contentClass,
          style: props.contentStyle,
          cover: props.cover,
          fit: true,
          persistent: props.persistent,
          noRouteDismiss: props.noRouteDismiss,
          autoClose: props.autoClose,
          anchor: props.menuAnchor,
          self: props.menuSelf,
          offset: props.menuOffset,
          separateClosePopup: true,
          transitionShow: props.transitionShow,
          transitionHide: props.transitionHide,
          transitionDuration: props.transitionDuration,
          onBeforeShow,
          onShow,
          onBeforeHide,
          onHide
        }, slots.default)
      );
      if (props.split === false) {
        return h(QBtn, {
          class: "q-btn-dropdown q-btn-dropdown--simple",
          ...btnProps.value,
          ...ariaAttrs.value,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          round: false,
          onClick
        }, {
          default: () => hSlot(slots.label, []).concat(Arrow),
          loading: slots.loading
        });
      }
      return h(QBtnGroup, {
        class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",
        rounded: props.rounded,
        square: props.square,
        ...btnDesignAttr.value,
        glossy: props.glossy,
        stretch: props.stretch
      }, () => [
        h(QBtn, {
          class: "q-btn-dropdown--current",
          ...btnProps.value,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          round: false,
          onClick: onClickHide
        }, {
          default: slots.label,
          loading: slots.loading
        }),
        h(QBtn, {
          class: "q-btn-dropdown__arrow-container q-anchor--skip",
          ...ariaAttrs.value,
          ...btnDesignAttr.value,
          disable: props.disable === true || props.disableDropdown === true,
          rounded: props.rounded,
          color: props.color,
          textColor: props.textColor,
          dense: props.dense,
          size: props.size,
          padding: props.padding,
          ripple: props.ripple
        }, () => Arrow)
      ]);
    };
  }
});
function run(e, btn, eVm) {
  if (btn.handler) {
    btn.handler(e, eVm, eVm.caret);
  } else {
    eVm.runCmd(btn.cmd, btn.param);
  }
}
function getGroup(children) {
  return h("div", { class: "q-editor__toolbar-group" }, children);
}
function getBtn(eVm, btn, clickHandler, active = false) {
  const toggled = active || (btn.type === "toggle" ? btn.toggled ? btn.toggled(eVm) : btn.cmd && eVm.caret.is(btn.cmd, btn.param) : false), child = [];
  if (btn.tip && eVm.$q.platform.is.desktop) {
    const Key = btn.key ? h("div", [
      h("small", `(CTRL + ${String.fromCharCode(btn.key)})`)
    ]) : null;
    child.push(
      h(QTooltip, { delay: 1e3 }, () => [
        h("div", { innerHTML: btn.tip }),
        Key
      ])
    );
  }
  return h(QBtn, {
    ...eVm.buttonProps.value,
    icon: btn.icon !== null ? btn.icon : void 0,
    color: toggled ? btn.toggleColor || eVm.props.toolbarToggleColor : btn.color || eVm.props.toolbarColor,
    textColor: toggled && !eVm.props.toolbarPush ? null : btn.textColor || eVm.props.toolbarTextColor,
    label: btn.label,
    disable: btn.disable ? typeof btn.disable === "function" ? btn.disable(eVm) : true : false,
    size: "sm",
    onClick(e) {
      clickHandler && clickHandler();
      run(e, btn, eVm);
    }
  }, () => child);
}
function getDropdown(eVm, btn) {
  const onlyIcons = btn.list === "only-icons";
  let label = btn.label, icon = btn.icon !== null ? btn.icon : void 0, contentClass, Items;
  function closeDropdown() {
    Dropdown.component.proxy.hide();
  }
  if (onlyIcons) {
    Items = btn.options.map((btn2) => {
      const active = btn2.type === void 0 ? eVm.caret.is(btn2.cmd, btn2.param) : false;
      if (active) {
        label = btn2.tip;
        icon = btn2.icon !== null ? btn2.icon : void 0;
      }
      return getBtn(eVm, btn2, closeDropdown, active);
    });
    contentClass = eVm.toolbarBackgroundClass.value;
    Items = [
      getGroup(Items)
    ];
  } else {
    const activeClass = eVm.props.toolbarToggleColor !== void 0 ? `text-${eVm.props.toolbarToggleColor}` : null;
    const inactiveClass = eVm.props.toolbarTextColor !== void 0 ? `text-${eVm.props.toolbarTextColor}` : null;
    const noIcons = btn.list === "no-icons";
    Items = btn.options.map((btn2) => {
      const disable = btn2.disable ? btn2.disable(eVm) : false;
      const active = btn2.type === void 0 ? eVm.caret.is(btn2.cmd, btn2.param) : false;
      if (active) {
        label = btn2.tip;
        icon = btn2.icon !== null ? btn2.icon : void 0;
      }
      const htmlTip = btn2.htmlTip;
      return h(QItem, {
        active,
        activeClass,
        clickable: true,
        disable,
        dense: true,
        onClick(e) {
          closeDropdown();
          eVm.contentRef.value !== null && eVm.contentRef.value.focus();
          eVm.caret.restore();
          run(e, btn2, eVm);
        }
      }, () => [
        noIcons === true ? null : h(
          QItemSection,
          {
            class: active ? activeClass : inactiveClass,
            side: true
          },
          () => h(QIcon, { name: btn2.icon !== null ? btn2.icon : void 0 })
        ),
        h(
          QItemSection,
          htmlTip ? () => h("div", { class: "text-no-wrap", innerHTML: btn2.htmlTip }) : btn2.tip ? () => h("div", { class: "text-no-wrap" }, btn2.tip) : void 0
        )
      ]);
    });
    contentClass = [eVm.toolbarBackgroundClass.value, inactiveClass];
  }
  const highlight = btn.highlight && label !== btn.label;
  const Dropdown = h(QBtnDropdown, {
    ...eVm.buttonProps.value,
    noCaps: true,
    noWrap: true,
    color: highlight ? eVm.props.toolbarToggleColor : eVm.props.toolbarColor,
    textColor: highlight && !eVm.props.toolbarPush ? null : eVm.props.toolbarTextColor,
    label: btn.fixedLabel ? btn.label : label,
    icon: btn.fixedIcon ? btn.icon !== null ? btn.icon : void 0 : icon,
    contentClass,
    onShow: (evt) => eVm.emit("dropdownShow", evt),
    onHide: (evt) => eVm.emit("dropdownHide", evt),
    onBeforeShow: (evt) => eVm.emit("dropdownBeforeShow", evt),
    onBeforeHide: (evt) => eVm.emit("dropdownBeforeHide", evt)
  }, () => Items);
  return Dropdown;
}
function getToolbar(eVm) {
  if (eVm.caret) {
    return eVm.buttons.value.filter((f) => {
      return !eVm.isViewingSource.value || f.find((fb) => fb.cmd === "viewsource");
    }).map((group) => getGroup(
      group.map((btn) => {
        if (eVm.isViewingSource.value && btn.cmd !== "viewsource") {
          return false;
        }
        if (btn.type === "slot") {
          return hSlot(eVm.slots[btn.slot]);
        }
        if (btn.type === "dropdown") {
          return getDropdown(eVm, btn);
        }
        return getBtn(eVm, btn);
      })
    ));
  }
}
function getFonts(defaultFont, defaultFontLabel, defaultFontIcon, fonts = {}) {
  const aliases = Object.keys(fonts);
  if (aliases.length === 0) {
    return {};
  }
  const def = {
    default_font: {
      cmd: "fontName",
      param: defaultFont,
      icon: defaultFontIcon,
      tip: defaultFontLabel
    }
  };
  aliases.forEach((alias) => {
    const name = fonts[alias];
    def[alias] = {
      cmd: "fontName",
      param: name,
      icon: defaultFontIcon,
      tip: name,
      htmlTip: `<font face="${name}">${name}</font>`
    };
  });
  return def;
}
function getLinkEditor(eVm) {
  if (eVm.caret) {
    const color = eVm.props.toolbarColor || eVm.props.toolbarTextColor;
    let link = eVm.editLinkUrl.value;
    const updateLink = () => {
      eVm.caret.restore();
      if (link !== eVm.editLinkUrl.value) {
        document.execCommand("createLink", false, link === "" ? " " : link);
      }
      eVm.editLinkUrl.value = null;
    };
    return [
      h("div", { class: `q-mx-xs text-${color}` }, `${eVm.$q.lang.editor.url}: `),
      h("input", {
        key: "qedt_btm_input",
        class: "col q-editor__link-input",
        value: link,
        onInput: (evt) => {
          stop(evt);
          link = evt.target.value;
        },
        onKeydown: (evt) => {
          if (shouldIgnoreKey(evt) === true) return;
          switch (evt.keyCode) {
            case 13:
              prevent(evt);
              return updateLink();
            case 27:
              prevent(evt);
              eVm.caret.restore();
              if (!eVm.editLinkUrl.value || eVm.editLinkUrl.value === "https://") {
                document.execCommand("unlink");
              }
              eVm.editLinkUrl.value = null;
              break;
          }
        }
      }),
      getGroup([
        h(QBtn, {
          key: "qedt_btm_rem",
          tabindex: -1,
          ...eVm.buttonProps.value,
          label: eVm.$q.lang.label.remove,
          noCaps: true,
          onClick: () => {
            eVm.caret.restore();
            document.execCommand("unlink");
            eVm.editLinkUrl.value = null;
          }
        }),
        h(QBtn, {
          key: "qedt_btm_upd",
          ...eVm.buttonProps.value,
          label: eVm.$q.lang.label.update,
          noCaps: true,
          onClick: updateLink
        })
      ])
    ];
  }
}
let counter = 0;
const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
};
const useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let historyEntry, fullscreenFillerNode, container;
  const inFullscreen = ref(false);
  vmHasRouter(vm) === true && watch(() => proxy.$route.fullPath, () => {
    props.noRouteFullscreenExit !== true && exitFullscreen();
  });
  watch(() => props.fullscreen, (v) => {
    if (inFullscreen.value !== v) {
      toggleFullscreen();
    }
  });
  watch(inFullscreen, (v) => {
    emit("update:fullscreen", v);
    emit("fullscreen", v);
  });
  function toggleFullscreen() {
    if (inFullscreen.value === true) {
      exitFullscreen();
    } else {
      setFullscreen();
    }
  }
  function setFullscreen() {
    if (inFullscreen.value === true) return;
    inFullscreen.value = true;
    container = proxy.$el.parentNode;
    container.replaceChild(fullscreenFillerNode, proxy.$el);
    document.body.appendChild(proxy.$el);
    counter++;
    if (counter === 1) {
      document.body.classList.add("q-body--fullscreen-mixin");
    }
    historyEntry = {
      handler: exitFullscreen
    };
    History.add(historyEntry);
  }
  function exitFullscreen() {
    if (inFullscreen.value !== true) return;
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
    container.replaceChild(proxy.$el, fullscreenFillerNode);
    inFullscreen.value = false;
    counter = Math.max(0, counter - 1);
    if (counter === 0) {
      document.body.classList.remove("q-body--fullscreen-mixin");
      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => {
          proxy.$el.scrollIntoView();
        });
      }
    }
  }
  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement("span");
  });
  onMounted(() => {
    props.fullscreen === true && setFullscreen();
  });
  onBeforeUnmount(exitFullscreen);
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen
  });
  return {
    inFullscreen,
    toggleFullscreen
  };
}
const toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, notPlainObject = new Set(
  ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp"].map((name) => "[object " + name + "]")
);
function isPlainObject(obj) {
  if (obj !== Object(obj) || notPlainObject.has(toString.call(obj)) === true) {
    return false;
  }
  if (obj.constructor && hasOwn.call(obj, "constructor") === false && hasOwn.call(obj.constructor.prototype, "isPrototypeOf") === false) {
    return false;
  }
  let key;
  for (key in obj) {
  }
  return key === void 0 || hasOwn.call(obj, key);
}
function extend() {
  let options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, deep = false;
  const length = arguments.length;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (Object(target) !== target && typeof target !== "function") {
    target = {};
  }
  if (length === i) {
    target = this;
    i--;
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep === true && copy && ((copyIsArray = Array.isArray(copy)) || isPlainObject(copy) === true)) {
          if (copyIsArray === true) {
            clone = Array.isArray(src) === true ? src : [];
          } else {
            clone = isPlainObject(src) === true ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== void 0) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
const QEditor = createComponent({
  name: "QEditor",
  props: {
    ...useDarkProps,
    ...useFullscreenProps,
    modelValue: {
      type: String,
      required: true
    },
    readonly: Boolean,
    disable: Boolean,
    minHeight: {
      type: String,
      default: "10rem"
    },
    maxHeight: String,
    height: String,
    definitions: Object,
    fonts: Object,
    placeholder: String,
    toolbar: {
      type: Array,
      validator: (v) => v.length === 0 || v.every((group) => group.length),
      // long line on purpose for API validation purposes:
      default: () => [["left", "center", "right", "justify"], ["bold", "italic", "underline", "strike"], ["undo", "redo"]]
    },
    toolbarColor: String,
    toolbarBg: String,
    toolbarTextColor: String,
    toolbarToggleColor: {
      type: String,
      default: "primary"
    },
    toolbarOutline: Boolean,
    toolbarPush: Boolean,
    toolbarRounded: Boolean,
    paragraphTag: {
      type: String,
      validator: (v) => ["div", "p"].includes(v),
      default: "div"
    },
    contentStyle: Object,
    contentClass: [Object, Array, String],
    square: Boolean,
    flat: Boolean,
    dense: Boolean
  },
  emits: [
    ...useFullscreenEmits,
    "update:modelValue",
    "keydown",
    "click",
    "focus",
    "blur",
    "dropdownShow",
    "dropdownHide",
    "dropdownBeforeShow",
    "dropdownBeforeHide",
    "linkShow",
    "linkHide"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const { inFullscreen, toggleFullscreen } = useFullscreen();
    const splitAttrs = useSplitAttrs();
    const rootRef = ref(null);
    const contentRef = ref(null);
    const editLinkUrl = ref(null);
    const isViewingSource = ref(false);
    const editable = computed(() => !props.readonly && !props.disable);
    let defaultFont, offsetBottom;
    let lastEmit = props.modelValue;
    {
      document.execCommand("defaultParagraphSeparator", false, props.paragraphTag);
      defaultFont = window.getComputedStyle(document.body).fontFamily;
    }
    const toolbarBackgroundClass = computed(() => props.toolbarBg ? ` bg-${props.toolbarBg}` : "");
    const buttonProps = computed(() => {
      const flat = props.toolbarOutline !== true && props.toolbarPush !== true;
      return {
        type: "a",
        flat,
        noWrap: true,
        outline: props.toolbarOutline,
        push: props.toolbarPush,
        rounded: props.toolbarRounded,
        dense: true,
        color: props.toolbarColor,
        disable: !editable.value,
        size: "sm"
      };
    });
    const buttonDef = computed(() => {
      const e = $q.lang.editor, i = $q.iconSet.editor;
      return {
        bold: { cmd: "bold", icon: i.bold, tip: e.bold, key: 66 },
        italic: { cmd: "italic", icon: i.italic, tip: e.italic, key: 73 },
        strike: { cmd: "strikeThrough", icon: i.strikethrough, tip: e.strikethrough, key: 83 },
        underline: { cmd: "underline", icon: i.underline, tip: e.underline, key: 85 },
        unordered: { cmd: "insertUnorderedList", icon: i.unorderedList, tip: e.unorderedList },
        ordered: { cmd: "insertOrderedList", icon: i.orderedList, tip: e.orderedList },
        subscript: { cmd: "subscript", icon: i.subscript, tip: e.subscript, htmlTip: "x<subscript>2</subscript>" },
        superscript: { cmd: "superscript", icon: i.superscript, tip: e.superscript, htmlTip: "x<superscript>2</superscript>" },
        link: { cmd: "link", disable: (eVm2) => eVm2.caret && !eVm2.caret.can("link"), icon: i.hyperlink, tip: e.hyperlink, key: 76 },
        fullscreen: { cmd: "fullscreen", icon: i.toggleFullscreen, tip: e.toggleFullscreen, key: 70 },
        viewsource: { cmd: "viewsource", icon: i.viewSource, tip: e.viewSource },
        quote: { cmd: "formatBlock", param: "BLOCKQUOTE", icon: i.quote, tip: e.quote, key: 81 },
        left: { cmd: "justifyLeft", icon: i.left, tip: e.left },
        center: { cmd: "justifyCenter", icon: i.center, tip: e.center },
        right: { cmd: "justifyRight", icon: i.right, tip: e.right },
        justify: { cmd: "justifyFull", icon: i.justify, tip: e.justify },
        print: { type: "no-state", cmd: "print", icon: i.print, tip: e.print, key: 80 },
        outdent: { type: "no-state", disable: (eVm2) => eVm2.caret && !eVm2.caret.can("outdent"), cmd: "outdent", icon: i.outdent, tip: e.outdent },
        indent: { type: "no-state", disable: (eVm2) => eVm2.caret && !eVm2.caret.can("indent"), cmd: "indent", icon: i.indent, tip: e.indent },
        removeFormat: { type: "no-state", cmd: "removeFormat", icon: i.removeFormat, tip: e.removeFormat },
        hr: { type: "no-state", cmd: "insertHorizontalRule", icon: i.hr, tip: e.hr },
        undo: { type: "no-state", cmd: "undo", icon: i.undo, tip: e.undo, key: 90 },
        redo: { type: "no-state", cmd: "redo", icon: i.redo, tip: e.redo, key: 89 },
        h1: { cmd: "formatBlock", param: "H1", icon: i.heading1 || i.heading, tip: e.heading1, htmlTip: `<h1 class="q-ma-none">${e.heading1}</h1>` },
        h2: { cmd: "formatBlock", param: "H2", icon: i.heading2 || i.heading, tip: e.heading2, htmlTip: `<h2 class="q-ma-none">${e.heading2}</h2>` },
        h3: { cmd: "formatBlock", param: "H3", icon: i.heading3 || i.heading, tip: e.heading3, htmlTip: `<h3 class="q-ma-none">${e.heading3}</h3>` },
        h4: { cmd: "formatBlock", param: "H4", icon: i.heading4 || i.heading, tip: e.heading4, htmlTip: `<h4 class="q-ma-none">${e.heading4}</h4>` },
        h5: { cmd: "formatBlock", param: "H5", icon: i.heading5 || i.heading, tip: e.heading5, htmlTip: `<h5 class="q-ma-none">${e.heading5}</h5>` },
        h6: { cmd: "formatBlock", param: "H6", icon: i.heading6 || i.heading, tip: e.heading6, htmlTip: `<h6 class="q-ma-none">${e.heading6}</h6>` },
        p: { cmd: "formatBlock", param: props.paragraphTag, icon: i.heading, tip: e.paragraph },
        code: { cmd: "formatBlock", param: "PRE", icon: i.code, htmlTip: `<code>${e.code}</code>` },
        "size-1": { cmd: "fontSize", param: "1", icon: i.size1 || i.size, tip: e.size1, htmlTip: `<font size="1">${e.size1}</font>` },
        "size-2": { cmd: "fontSize", param: "2", icon: i.size2 || i.size, tip: e.size2, htmlTip: `<font size="2">${e.size2}</font>` },
        "size-3": { cmd: "fontSize", param: "3", icon: i.size3 || i.size, tip: e.size3, htmlTip: `<font size="3">${e.size3}</font>` },
        "size-4": { cmd: "fontSize", param: "4", icon: i.size4 || i.size, tip: e.size4, htmlTip: `<font size="4">${e.size4}</font>` },
        "size-5": { cmd: "fontSize", param: "5", icon: i.size5 || i.size, tip: e.size5, htmlTip: `<font size="5">${e.size5}</font>` },
        "size-6": { cmd: "fontSize", param: "6", icon: i.size6 || i.size, tip: e.size6, htmlTip: `<font size="6">${e.size6}</font>` },
        "size-7": { cmd: "fontSize", param: "7", icon: i.size7 || i.size, tip: e.size7, htmlTip: `<font size="7">${e.size7}</font>` }
      };
    });
    const buttons = computed(() => {
      const userDef = props.definitions || {};
      const def = props.definitions || props.fonts ? extend(
        true,
        {},
        buttonDef.value,
        userDef,
        getFonts(
          defaultFont,
          $q.lang.editor.defaultFont,
          $q.iconSet.editor.font,
          props.fonts
        )
      ) : buttonDef.value;
      return props.toolbar.map(
        (group) => group.map((token) => {
          if (token.options) {
            return {
              type: "dropdown",
              icon: token.icon,
              label: token.label,
              size: "sm",
              dense: true,
              fixedLabel: token.fixedLabel,
              fixedIcon: token.fixedIcon,
              highlight: token.highlight,
              list: token.list,
              options: token.options.map((item) => def[item])
            };
          }
          const obj = def[token];
          if (obj) {
            return obj.type === "no-state" || userDef[token] && (obj.cmd === void 0 || buttonDef.value[obj.cmd] && buttonDef.value[obj.cmd].type === "no-state") ? obj : Object.assign({ type: "toggle" }, obj);
          } else {
            return {
              type: "slot",
              slot: token
            };
          }
        })
      );
    });
    const eVm = {
      $q,
      props,
      slots,
      emit,
      // caret (will get injected after mount)
      inFullscreen,
      toggleFullscreen,
      runCmd,
      isViewingSource,
      editLinkUrl,
      toolbarBackgroundClass,
      buttonProps,
      contentRef,
      buttons,
      setContent
    };
    watch(() => props.modelValue, (v) => {
      if (lastEmit !== v) {
        lastEmit = v;
        setContent(v, true);
      }
    });
    watch(editLinkUrl, (v) => {
      emit(`link${v ? "Show" : "Hide"}`);
    });
    const hasToolbar = computed(() => props.toolbar && props.toolbar.length !== 0);
    const keys = computed(() => {
      const k = {}, add = (btn) => {
        if (btn.key) {
          k[btn.key] = {
            cmd: btn.cmd,
            param: btn.param
          };
        }
      };
      buttons.value.forEach((group) => {
        group.forEach((token) => {
          if (token.options) {
            token.options.forEach(add);
          } else {
            add(token);
          }
        });
      });
      return k;
    });
    const innerStyle = computed(() => inFullscreen.value ? props.contentStyle : [
      {
        minHeight: props.minHeight,
        height: props.height,
        maxHeight: props.maxHeight
      },
      props.contentStyle
    ]);
    const classes = computed(
      () => `q-editor q-editor--${isViewingSource.value === true ? "source" : "default"}` + (props.disable === true ? " disabled" : "") + (inFullscreen.value === true ? " fullscreen column" : "") + (props.square === true ? " q-editor--square no-border-radius" : "") + (props.flat === true ? " q-editor--flat" : "") + (props.dense === true ? " q-editor--dense" : "") + (isDark.value === true ? " q-editor--dark q-dark" : "")
    );
    const innerClass = computed(() => [
      props.contentClass,
      "q-editor__content",
      { col: inFullscreen.value, "overflow-auto": inFullscreen.value || props.maxHeight }
    ]);
    const attributes = computed(() => props.disable === true ? { "aria-disabled": "true" } : {});
    function onInput() {
      if (contentRef.value !== null) {
        const prop = `inner${isViewingSource.value === true ? "Text" : "HTML"}`;
        const val = contentRef.value[prop];
        if (val !== props.modelValue) {
          lastEmit = val;
          emit("update:modelValue", val);
        }
      }
    }
    function onKeydown2(e) {
      emit("keydown", e);
      if (e.ctrlKey !== true || shouldIgnoreKey(e) === true) {
        refreshToolbar();
        return;
      }
      const key = e.keyCode;
      const target = keys.value[key];
      if (target !== void 0) {
        const { cmd, param } = target;
        stopAndPrevent(e);
        runCmd(cmd, param, false);
      }
    }
    function onClick(e) {
      refreshToolbar();
      emit("click", e);
    }
    function onBlur2(e) {
      if (contentRef.value !== null) {
        const { scrollTop, scrollHeight } = contentRef.value;
        offsetBottom = scrollHeight - scrollTop;
      }
      eVm.caret.save();
      emit("blur", e);
    }
    function onFocus(e) {
      nextTick(() => {
        if (contentRef.value !== null && offsetBottom !== void 0) {
          contentRef.value.scrollTop = contentRef.value.scrollHeight - offsetBottom;
        }
      });
      emit("focus", e);
    }
    function onFocusin(e) {
      const root = rootRef.value;
      if (root !== null && root.contains(e.target) === true && (e.relatedTarget === null || root.contains(e.relatedTarget) !== true)) {
        const prop = `inner${isViewingSource.value === true ? "Text" : "HTML"}`;
        eVm.caret.restorePosition(contentRef.value[prop].length);
        refreshToolbar();
      }
    }
    function onFocusout(e) {
      const root = rootRef.value;
      if (root !== null && root.contains(e.target) === true && (e.relatedTarget === null || root.contains(e.relatedTarget) !== true)) {
        eVm.caret.savePosition();
        refreshToolbar();
      }
    }
    function onPointerStart() {
      offsetBottom = void 0;
    }
    function onSelectionchange(e) {
      eVm.caret.save();
    }
    function setContent(v, restorePosition) {
      if (contentRef.value !== null) {
        if (restorePosition === true) {
          eVm.caret.savePosition();
        }
        const prop = `inner${isViewingSource.value === true ? "Text" : "HTML"}`;
        contentRef.value[prop] = v;
        if (restorePosition === true) {
          eVm.caret.restorePosition(contentRef.value[prop].length);
          refreshToolbar();
        }
      }
    }
    function runCmd(cmd, param, update2 = true) {
      focus();
      eVm.caret.restore();
      eVm.caret.apply(cmd, param, () => {
        focus();
        eVm.caret.save();
        if (update2) {
          refreshToolbar();
        }
      });
    }
    function refreshToolbar() {
      setTimeout(() => {
        editLinkUrl.value = null;
        proxy.$forceUpdate();
      }, 1);
    }
    function focus() {
      addFocusFn(() => {
        contentRef.value !== null && contentRef.value.focus({ preventScroll: true });
      });
    }
    function getContentEl() {
      return contentRef.value;
    }
    onMounted(() => {
      eVm.caret = proxy.caret = new Caret(contentRef.value, eVm);
      setContent(props.modelValue);
      refreshToolbar();
      document.addEventListener("selectionchange", onSelectionchange);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("selectionchange", onSelectionchange);
    });
    Object.assign(proxy, {
      runCmd,
      refreshToolbar,
      focus,
      getContentEl
    });
    return () => {
      let toolbars;
      if (hasToolbar.value) {
        const bars = [
          h("div", {
            key: "qedt_top",
            class: "q-editor__toolbar row no-wrap scroll-x" + toolbarBackgroundClass.value
          }, getToolbar(eVm))
        ];
        editLinkUrl.value !== null && bars.push(
          h("div", {
            key: "qedt_btm",
            class: "q-editor__toolbar row no-wrap items-center scroll-x" + toolbarBackgroundClass.value
          }, getLinkEditor(eVm))
        );
        toolbars = h("div", {
          key: "toolbar_ctainer",
          class: "q-editor__toolbars-container"
        }, bars);
      }
      return h("div", {
        ref: rootRef,
        class: classes.value,
        style: { height: inFullscreen.value === true ? "100%" : null },
        ...attributes.value,
        onFocusin,
        onFocusout
      }, [
        toolbars,
        h("div", {
          ref: contentRef,
          style: innerStyle.value,
          class: innerClass.value,
          contenteditable: editable.value,
          placeholder: props.placeholder,
          ...{},
          ...splitAttrs.listeners.value,
          onInput,
          onKeydown: onKeydown2,
          onClick,
          onBlur: onBlur2,
          onFocus,
          // clean saved scroll position
          onMousedown: onPointerStart,
          onTouchstartPassive: onPointerStart
        })
      ]);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExerciseForm",
  setup(__props, { expose: __expose }) {
    __expose();
    const route = useRoute();
    const router = useRouter();
    const submitted = ref(false);
    let exerciseDetails = Exercise.get(Number.parseInt(route.params.id));
    const formDetails = ref({ ...exerciseDetails });
    const title = ref("Edit exercise");
    if (!exerciseDetails) {
      exerciseDetails = Exercise.create(void 0, false);
      title.value = "Create exercise";
    } else {
      exerciseDetails = Exercise.create(exerciseDetails);
    }
    function stripHtml(html) {
      return html.replace(/<[^>]*>?/gm, "");
    }
    function saveExercise() {
      submitted.value = true;
      if (!validateForm()) {
        Notify.create("Form cannot be validated. please double check all required fields");
        return;
      }
      formDetails.value.description = stripHtml(formDetails.value.description);
      if (recordedAudio.value) formDetails.value.voiceNote = recordedAudio.value;
      Exercise.create(formDetails.value);
      Notify.create("Saved successfully");
      if (title.value != "Edit exercise") exerciseCount.value += 1;
      router.go(-1);
    }
    function validateForm() {
      return !!formDetails.value.name && !!stripHtml(formDetails.value.description);
    }
    function deleteExercise() {
      exerciseDetails.delete();
      Notify.create("Exercise deleted");
      exerciseCount.value -= 1;
      router.go(-1);
    }
    if (!formDetails.value.description) formDetails.value.description = "";
    function decodeHtmlEntities(html) {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
    const recordedAudio = ref();
    recordedAudio.value = exerciseDetails.voiceNote;
    function saveAudio(audio) {
      recordedAudio.value = audio;
    }
    const __returned__ = { route, router, submitted, get exerciseDetails() {
      return exerciseDetails;
    }, set exerciseDetails(v) {
      exerciseDetails = v;
    }, formDetails, title, stripHtml, saveExercise, validateForm, deleteExercise, decodeHtmlEntities, recordedAudio, saveAudio, get Notify() {
      return Notify;
    }, AudioPlayer };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "q-gutted-md q-card--bordered q-layout-padding" };
const _hoisted_2 = { class: "q-mt-md" };
const _hoisted_3 = {
  key: 0,
  class: "text-negative q-mt-xs"
};
const _hoisted_4 = { class: "q-mt-md" };
const _hoisted_5 = { class: "q-mt-lg" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", null, toDisplayString($setup.title), 1),
    createBaseVNode("form", _hoisted_1, [
      createVNode(QInput, {
        modelValue: $setup.formDetails.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.formDetails.name = $event),
        label: "Name",
        "stack-label": "",
        required: "",
        rules: [(val) => !!val || "Name is required"],
        error: $setup.submitted && !$setup.formDetails?.name
      }, null, 8, ["modelValue", "rules", "error"]),
      createBaseVNode("div", _hoisted_2, [
        _cache[3] || (_cache[3] = createBaseVNode("label", { class: "text-caption" }, "Description *", -1)),
        createVNode(QEditor, {
          "model-value": $setup.decodeHtmlEntities($setup.formDetails.description),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = (val) => $setup.formDetails.description = val),
          class: normalizeClass(["q-mt-xs", { "q-editor-error": $setup.submitted && !$setup.formDetails?.description }]),
          style: { "white-space": "pre-wrap" }
        }, null, 8, ["model-value", "class"]),
        $setup.submitted && !$setup.formDetails?.description ? (openBlock(), createElementBlock("div", _hoisted_3, " Description is required ")) : createCommentVNode("", true)
      ]),
      createBaseVNode("div", _hoisted_4, [
        _cache[4] || (_cache[4] = createBaseVNode("p", null, "Record a voice explanation:", -1)),
        createVNode($setup["AudioPlayer"], {
          "voice-note": $setup.recordedAudio,
          onAudioRecorded: $setup.saveAudio
        }, null, 8, ["voice-note"])
      ]),
      createBaseVNode("div", _hoisted_5, [
        createVNode(QBtn, {
          onClick: $setup.saveExercise,
          color: "accent"
        }, {
          default: withCtx(() => _cache[5] || (_cache[5] = [
            createTextVNode("Save")
          ])),
          _: 1
        }),
        createVNode(QBtn, {
          onClick: _cache[2] || (_cache[2] = ($event) => ($setup.router.go(-1), $setup.Notify.create("No changes were made."))),
          class: "q-ml-sm"
        }, {
          default: withCtx(() => _cache[6] || (_cache[6] = [
            createTextVNode("Cancel")
          ])),
          _: 1
        }),
        $setup.title == "Edit exercise" ? (openBlock(), createBlock(QBtn, {
          key: 0,
          onClick: $setup.deleteExercise
        }, {
          default: withCtx(() => _cache[7] || (_cache[7] = [
            createTextVNode("DELETE")
          ])),
          _: 1
        })) : createCommentVNode("", true)
      ])
    ])
  ], 64);
}
const ExerciseForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ExerciseForm.vue"]]);
export {
  ExerciseForm as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhlcmNpc2VGb3JtLUJBYWZlMHdwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2VkaXRvci9lZGl0b3ItY2FyZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2J0bi1ncm91cC9RQnRuR3JvdXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmtleWJvYXJkL2VzY2FwZS1rZXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3Vzb3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9tZW51L1FNZW51LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tZHJvcGRvd24vUUJ0bkRyb3Bkb3duLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9lZGl0b3IvZWRpdG9yLXV0aWxzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZnVsbHNjcmVlbi91c2UtZnVsbHNjcmVlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2V4dGVuZC9leHRlbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2VkaXRvci9RRWRpdG9yLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2V4ZXJjaXNlL0V4ZXJjaXNlRm9ybS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuXG5mdW5jdGlvbiBnZXRCbG9ja0VsZW1lbnQgKGVsLCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCAmJiBlbCA9PT0gcGFyZW50KSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0IG5vZGVOYW1lID0gZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKVxuXG4gIGlmIChbICdkaXYnLCAnbGknLCAndWwnLCAnb2wnLCAnYmxvY2txdW90ZScgXS5pbmNsdWRlcyhub2RlTmFtZSkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIGNvbnN0XG4gICAgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZVxuICAgICAgPyB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClcbiAgICAgIDogZWwuY3VycmVudFN0eWxlLFxuICAgIGRpc3BsYXkgPSBzdHlsZS5kaXNwbGF5XG5cbiAgaWYgKGRpc3BsYXkgPT09ICdibG9jaycgfHwgZGlzcGxheSA9PT0gJ3RhYmxlJykge1xuICAgIHJldHVybiBlbFxuICB9XG5cbiAgcmV0dXJuIGdldEJsb2NrRWxlbWVudChlbC5wYXJlbnROb2RlKVxufVxuXG5mdW5jdGlvbiBpc0NoaWxkT2YgKGVsLCBwYXJlbnQsIG9yU2FtZSkge1xuICByZXR1cm4gIWVsIHx8IGVsID09PSBkb2N1bWVudC5ib2R5XG4gICAgPyBmYWxzZVxuICAgIDogKG9yU2FtZSA9PT0gdHJ1ZSAmJiBlbCA9PT0gcGFyZW50KSB8fCAocGFyZW50ID09PSBkb2N1bWVudCA/IGRvY3VtZW50LmJvZHkgOiBwYXJlbnQpLmNvbnRhaW5zKGVsLnBhcmVudE5vZGUpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlIChub2RlLCBjaGFycywgcmFuZ2UpIHtcbiAgaWYgKCFyYW5nZSkge1xuICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxuICAgIHJhbmdlLnNlbGVjdE5vZGUobm9kZSlcbiAgICByYW5nZS5zZXRTdGFydChub2RlLCAwKVxuICB9XG5cbiAgaWYgKGNoYXJzLmNvdW50ID09PSAwKSB7XG4gICAgcmFuZ2Uuc2V0RW5kKG5vZGUsIGNoYXJzLmNvdW50KVxuICB9XG4gIGVsc2UgaWYgKGNoYXJzLmNvdW50ID4gMCkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgaWYgKG5vZGUudGV4dENvbnRlbnQubGVuZ3RoIDwgY2hhcnMuY291bnQpIHtcbiAgICAgICAgY2hhcnMuY291bnQgLT0gbm9kZS50ZXh0Q29udGVudC5sZW5ndGhcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByYW5nZS5zZXRFbmQobm9kZSwgY2hhcnMuY291bnQpXG4gICAgICAgIGNoYXJzLmNvdW50ID0gMFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAobGV0IGxwID0gMDsgY2hhcnMuY291bnQgIT09IDAgJiYgbHAgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBscCsrKSB7XG4gICAgICAgIHJhbmdlID0gY3JlYXRlUmFuZ2Uobm9kZS5jaGlsZE5vZGVzWyBscCBdLCBjaGFycywgcmFuZ2UpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJhbmdlXG59XG5cbmNvbnN0IHVybFJlZ2V4ID0gL15odHRwcz86XFwvXFwvL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJldCB7XG4gIGNvbnN0cnVjdG9yIChlbCwgZVZtKSB7XG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5lVm0gPSBlVm1cbiAgICB0aGlzLl9yYW5nZSA9IG51bGxcbiAgfVxuXG4gIGdldCBzZWxlY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmVsKSB7XG4gICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKVxuXG4gICAgICAvLyBvbmx5IHdoZW4gdGhlIHNlbGVjdGlvbiBpbiBlbGVtZW50XG4gICAgICBpZiAoaXNDaGlsZE9mKHNlbC5hbmNob3JOb2RlLCB0aGlzLmVsLCB0cnVlKSAmJiBpc0NoaWxkT2Yoc2VsLmZvY3VzTm9kZSwgdGhpcy5lbCwgdHJ1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHNlbFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgaGFzU2VsZWN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24gIT09IG51bGxcbiAgICAgID8gdGhpcy5zZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggIT09IDBcbiAgICAgIDogZmFsc2VcbiAgfVxuXG4gIGdldCByYW5nZSAoKSB7XG4gICAgY29uc3Qgc2VsID0gdGhpcy5zZWxlY3Rpb25cblxuICAgIGlmIChzZWwgIT09IG51bGwgJiYgc2VsLnJhbmdlQ291bnQpIHtcbiAgICAgIHJldHVybiBzZWwuZ2V0UmFuZ2VBdCgwKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yYW5nZVxuICB9XG5cbiAgZ2V0IHBhcmVudCAoKSB7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnJhbmdlXG5cbiAgICBpZiAocmFuZ2UgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lclxuXG4gICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gZG9jdW1lbnQuRUxFTUVOVF9OT0RFXG4gICAgICAgID8gbm9kZVxuICAgICAgICA6IG5vZGUucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgYmxvY2tQYXJlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50XG5cbiAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZ2V0QmxvY2tFbGVtZW50KHBhcmVudCwgdGhpcy5lbClcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgc2F2ZSAocmFuZ2UgPSB0aGlzLnJhbmdlKSB7XG4gICAgaWYgKHJhbmdlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yYW5nZSA9IHJhbmdlXG4gICAgfVxuICB9XG5cbiAgcmVzdG9yZSAocmFuZ2UgPSB0aGlzLl9yYW5nZSkge1xuICAgIGNvbnN0XG4gICAgICByID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKSxcbiAgICAgIHNlbCA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpXG5cbiAgICBpZiAocmFuZ2UgIT09IG51bGwpIHtcbiAgICAgIHIuc2V0U3RhcnQocmFuZ2Uuc3RhcnRDb250YWluZXIsIHJhbmdlLnN0YXJ0T2Zmc2V0KVxuICAgICAgci5zZXRFbmQocmFuZ2UuZW5kQ29udGFpbmVyLCByYW5nZS5lbmRPZmZzZXQpXG4gICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgIHNlbC5hZGRSYW5nZShyKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNlbC5zZWxlY3RBbGxDaGlsZHJlbih0aGlzLmVsKVxuICAgICAgc2VsLmNvbGxhcHNlVG9FbmQoKVxuICAgIH1cbiAgfVxuXG4gIHNhdmVQb3NpdGlvbiAoKSB7XG4gICAgbGV0IGNoYXJDb3VudCA9IC0xLCBub2RlXG4gICAgY29uc3RcbiAgICAgIHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpLFxuICAgICAgcGFyZW50RWwgPSB0aGlzLmVsLnBhcmVudE5vZGVcblxuICAgIGlmIChzZWxlY3Rpb24uZm9jdXNOb2RlICYmIGlzQ2hpbGRPZihzZWxlY3Rpb24uZm9jdXNOb2RlLCBwYXJlbnRFbCkpIHtcbiAgICAgIG5vZGUgPSBzZWxlY3Rpb24uZm9jdXNOb2RlXG4gICAgICBjaGFyQ291bnQgPSBzZWxlY3Rpb24uZm9jdXNPZmZzZXRcblxuICAgICAgd2hpbGUgKG5vZGUgJiYgbm9kZSAhPT0gcGFyZW50RWwpIHtcbiAgICAgICAgaWYgKG5vZGUgIT09IHRoaXMuZWwgJiYgbm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmdcbiAgICAgICAgICBjaGFyQ291bnQgKz0gbm9kZS50ZXh0Q29udGVudC5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNhdmVkUG9zID0gY2hhckNvdW50XG4gIH1cblxuICByZXN0b3JlUG9zaXRpb24gKGxlbmd0aCA9IDApIHtcbiAgICBpZiAodGhpcy5zYXZlZFBvcyA+IDAgJiYgdGhpcy5zYXZlZFBvcyA8IGxlbmd0aCkge1xuICAgICAgY29uc3RcbiAgICAgICAgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpLFxuICAgICAgICByYW5nZSA9IGNyZWF0ZVJhbmdlKHRoaXMuZWwsIHsgY291bnQ6IHRoaXMuc2F2ZWRQb3MgfSlcblxuICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc1BhcmVudCAobmFtZSwgc3BhbkxldmVsKSB7XG4gICAgY29uc3QgZWwgPSBzcGFuTGV2ZWxcbiAgICAgID8gdGhpcy5wYXJlbnRcbiAgICAgIDogdGhpcy5ibG9ja1BhcmVudFxuXG4gICAgcmV0dXJuIGVsICE9PSBudWxsXG4gICAgICA/IGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgOiBmYWxzZVxuICB9XG5cbiAgaGFzUGFyZW50cyAobGlzdCwgcmVjdXJzaXZlLCBlbCA9IHRoaXMucGFyZW50KSB7XG4gICAgaWYgKGVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAobGlzdC5pbmNsdWRlcyhlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVjdXJzaXZlID09PSB0cnVlXG4gICAgICA/IHRoaXMuaGFzUGFyZW50cyhsaXN0LCByZWN1cnNpdmUsIGVsLnBhcmVudE5vZGUpXG4gICAgICA6IGZhbHNlXG4gIH1cblxuICBpcyAoY21kLCBwYXJhbSkge1xuICAgIGlmICh0aGlzLnNlbGVjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgc3dpdGNoIChjbWQpIHtcbiAgICAgIGNhc2UgJ2Zvcm1hdEJsb2NrJzpcbiAgICAgICAgcmV0dXJuIChwYXJhbSA9PT0gJ0RJVicgJiYgdGhpcy5wYXJlbnQgPT09IHRoaXMuZWwpXG4gICAgICAgICAgfHwgdGhpcy5oYXNQYXJlbnQocGFyYW0sIHBhcmFtID09PSAnUFJFJylcbiAgICAgIGNhc2UgJ2xpbmsnOlxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQYXJlbnQoJ0EnLCB0cnVlKVxuICAgICAgY2FzZSAnZm9udFNpemUnOlxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlDb21tYW5kVmFsdWUoY21kKSA9PT0gcGFyYW1cbiAgICAgIGNhc2UgJ2ZvbnROYW1lJzpcbiAgICAgICAgY29uc3QgcmVzID0gZG9jdW1lbnQucXVlcnlDb21tYW5kVmFsdWUoY21kKVxuICAgICAgICByZXR1cm4gcmVzID09PSBgXCIkeyBwYXJhbSB9XCJgIHx8IHJlcyA9PT0gcGFyYW1cbiAgICAgIGNhc2UgJ2Z1bGxzY3JlZW4nOlxuICAgICAgICByZXR1cm4gdGhpcy5lVm0uaW5GdWxsc2NyZWVuLnZhbHVlXG4gICAgICBjYXNlICd2aWV3c291cmNlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZVZtLmlzVmlld2luZ1NvdXJjZS52YWx1ZVxuICAgICAgY2FzZSB2b2lkIDA6XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBkb2N1bWVudC5xdWVyeUNvbW1hbmRTdGF0ZShjbWQpXG4gICAgICAgIHJldHVybiBwYXJhbSAhPT0gdm9pZCAwID8gc3RhdGUgPT09IHBhcmFtIDogc3RhdGVcbiAgICB9XG4gIH1cblxuICBnZXRQYXJlbnRBdHRyaWJ1dGUgKGF0dHJpYikge1xuICAgIGlmICh0aGlzLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldEF0dHJpYnV0ZShhdHRyaWIpXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNhbiAobmFtZSkge1xuICAgIGlmIChuYW1lID09PSAnb3V0ZGVudCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc1BhcmVudHMoWyAnYmxvY2txdW90ZScsICdsaScgXSwgdHJ1ZSlcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gJ2luZGVudCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc1BhcmVudHMoWyAnbGknIF0sIHRydWUpXG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09ICdsaW5rJykge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uICE9PSBudWxsIHx8IHRoaXMuaXMoJ2xpbmsnKVxuICAgIH1cbiAgfVxuXG4gIGFwcGx5IChjbWQsIHBhcmFtLCBkb25lID0gbm9vcCkge1xuICAgIGlmIChjbWQgPT09ICdmb3JtYXRCbG9jaycpIHtcbiAgICAgIGlmIChbICdCTE9DS1FVT1RFJywgJ0gxJywgJ0gyJywgJ0gzJywgJ0g0JywgJ0g1JywgJ0g2JyBdLmluY2x1ZGVzKHBhcmFtKSAmJiB0aGlzLmlzKGNtZCwgcGFyYW0pKSB7XG4gICAgICAgIGNtZCA9ICdvdXRkZW50J1xuICAgICAgICBwYXJhbSA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtID09PSAnUFJFJyAmJiB0aGlzLmlzKGNtZCwgJ1BSRScpKSB7XG4gICAgICAgIHBhcmFtID0gJ1AnXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGNtZCA9PT0gJ3ByaW50Jykge1xuICAgICAgZG9uZSgpXG5cbiAgICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKClcblxuICAgICAgd2luLmRvY3VtZW50LndyaXRlKGBcbiAgICAgICAgPCFkb2N0eXBlIGh0bWw+XG4gICAgICAgIDxodG1sPlxuICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgPHRpdGxlPlByaW50IC0gJHsgZG9jdW1lbnQudGl0bGUgfTwvdGl0bGU+XG4gICAgICAgICAgPC9oZWFkPlxuICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgPGRpdj4keyB0aGlzLmVsLmlubmVySFRNTCB9PC9kaXY+XG4gICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+XG4gICAgICBgKVxuICAgICAgd2luLnByaW50KClcbiAgICAgIHdpbi5jbG9zZSgpXG5cbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBlbHNlIGlmIChjbWQgPT09ICdsaW5rJykge1xuICAgICAgY29uc3QgbGluayA9IHRoaXMuZ2V0UGFyZW50QXR0cmlidXRlKCdocmVmJylcblxuICAgICAgaWYgKGxpbmsgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5zZWxlY3RXb3JkKHRoaXMuc2VsZWN0aW9uKVxuICAgICAgICBjb25zdCB1cmwgPSBzZWxlY3Rpb24gPyBzZWxlY3Rpb24udG9TdHJpbmcoKSA6ICcnXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICF1cmwubGVuZ3RoXG4gICAgICAgICAgJiYgKFxuICAgICAgICAgICAgIXRoaXMucmFuZ2VcbiAgICAgICAgICAgIHx8ICF0aGlzLnJhbmdlLmNsb25lQ29udGVudHMoKS5xdWVyeVNlbGVjdG9yKCdpbWcnKVxuICAgICAgICAgIClcbiAgICAgICAgKSByZXR1cm5cblxuICAgICAgICB0aGlzLmVWbS5lZGl0TGlua1VybC52YWx1ZSA9IHVybFJlZ2V4LnRlc3QodXJsKSA/IHVybCA6ICdodHRwczovLydcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgdGhpcy5lVm0uZWRpdExpbmtVcmwudmFsdWUpXG5cbiAgICAgICAgdGhpcy5zYXZlKHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZVZtLmVkaXRMaW5rVXJsLnZhbHVlID0gbGlua1xuXG4gICAgICAgIHRoaXMucmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRoaXMucGFyZW50KVxuICAgICAgICB0aGlzLnNhdmUoKVxuICAgICAgfVxuXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZWxzZSBpZiAoY21kID09PSAnZnVsbHNjcmVlbicpIHtcbiAgICAgIHRoaXMuZVZtLnRvZ2dsZUZ1bGxzY3JlZW4oKVxuICAgICAgZG9uZSgpXG5cbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBlbHNlIGlmIChjbWQgPT09ICd2aWV3c291cmNlJykge1xuICAgICAgdGhpcy5lVm0uaXNWaWV3aW5nU291cmNlLnZhbHVlID0gdGhpcy5lVm0uaXNWaWV3aW5nU291cmNlLnZhbHVlID09PSBmYWxzZVxuICAgICAgdGhpcy5lVm0uc2V0Q29udGVudCh0aGlzLmVWbS5wcm9wcy5tb2RlbFZhbHVlKVxuICAgICAgZG9uZSgpXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGNtZCwgZmFsc2UsIHBhcmFtKVxuXG4gICAgZG9uZSgpXG4gIH1cblxuICBzZWxlY3RXb3JkIChzZWwpIHtcbiAgICBpZiAoc2VsID09PSBudWxsIHx8IHNlbC5pc0NvbGxhcHNlZCAhPT0gdHJ1ZSB8fCAvKiBJRSAxMSAqLyBzZWwubW9kaWZ5ID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBzZWxcbiAgICB9XG5cbiAgICAvLyBEZXRlY3QgaWYgc2VsZWN0aW9uIGlzIGJhY2t3YXJkc1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxuICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzZWwuYW5jaG9yT2Zmc2V0KVxuICAgIHJhbmdlLnNldEVuZChzZWwuZm9jdXNOb2RlLCBzZWwuZm9jdXNPZmZzZXQpXG4gICAgY29uc3QgZGlyZWN0aW9uID0gcmFuZ2UuY29sbGFwc2VkID8gWyAnYmFja3dhcmQnLCAnZm9yd2FyZCcgXSA6IFsgJ2ZvcndhcmQnLCAnYmFja3dhcmQnIF1cbiAgICByYW5nZS5kZXRhY2goKVxuXG4gICAgLy8gbW9kaWZ5KCkgd29ya3Mgb24gdGhlIGZvY3VzIG9mIHRoZSBzZWxlY3Rpb25cbiAgICBjb25zdFxuICAgICAgZW5kTm9kZSA9IHNlbC5mb2N1c05vZGUsXG4gICAgICBlbmRPZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXRcbiAgICBzZWwuY29sbGFwc2Uoc2VsLmFuY2hvck5vZGUsIHNlbC5hbmNob3JPZmZzZXQpXG4gICAgc2VsLm1vZGlmeSgnbW92ZScsIGRpcmVjdGlvblsgMCBdLCAnY2hhcmFjdGVyJylcbiAgICBzZWwubW9kaWZ5KCdtb3ZlJywgZGlyZWN0aW9uWyAxIF0sICd3b3JkJylcbiAgICBzZWwuZXh0ZW5kKGVuZE5vZGUsIGVuZE9mZnNldClcbiAgICBzZWwubW9kaWZ5KCdleHRlbmQnLCBkaXJlY3Rpb25bIDEgXSwgJ2NoYXJhY3RlcicpXG4gICAgc2VsLm1vZGlmeSgnZXh0ZW5kJywgZGlyZWN0aW9uWyAwIF0sICd3b3JkJylcblxuICAgIHJldHVybiBzZWxcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJ0bkdyb3VwJyxcblxuICBwcm9wczoge1xuICAgIHVuZWxldmF0ZWQ6IEJvb2xlYW4sXG4gICAgb3V0bGluZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW4sXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIHB1c2g6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcbiAgICBnbG9zc3k6IEJvb2xlYW4sXG4gICAgc3ByZWFkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2xzID0gWyAndW5lbGV2YXRlZCcsICdvdXRsaW5lJywgJ2ZsYXQnLCAncm91bmRlZCcsICdzcXVhcmUnLCAncHVzaCcsICdzdHJldGNoJywgJ2dsb3NzeScgXVxuICAgICAgICAuZmlsdGVyKHQgPT4gcHJvcHNbIHQgXSA9PT0gdHJ1ZSlcbiAgICAgICAgLm1hcCh0ID0+IGBxLWJ0bi1ncm91cC0tJHsgdCB9YCkuam9pbignICcpXG5cbiAgICAgIHJldHVybiBgcS1idG4tZ3JvdXAgcm93IG5vLXdyYXAkeyBjbHMubGVuZ3RoICE9PSAwID8gJyAnICsgY2xzIDogJycgfWBcbiAgICAgICAgKyAocHJvcHMuc3ByZWFkID09PSB0cnVlID8gJyBxLWJ0bi1ncm91cC0tc3ByZWFkJyA6ICcgaW5saW5lJylcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cbmxldCBlc2NEb3duXG5cbmZ1bmN0aW9uIG9uS2V5ZG93biAoZXZ0KSB7XG4gIGVzY0Rvd24gPSBldnQua2V5Q29kZSA9PT0gMjdcbn1cblxuZnVuY3Rpb24gb25CbHVyICgpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBvbktleXVwIChldnQpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcblxuICAgIGlmIChpc0tleUNvZGUoZXZ0LCAyNykgPT09IHRydWUpIHtcbiAgICAgIGhhbmRsZXJzWyBoYW5kbGVycy5sZW5ndGggLSAxIF0oZXZ0KVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGUgKGFjdGlvbikge1xuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXlkb3duJywgb25LZXlkb3duKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdibHVyJywgb25CbHVyKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXl1cCcsIG9uS2V5dXApXG4gIGVzY0Rvd24gPSBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXNjYXBlS2V5IChmbikge1xuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUpIHtcbiAgICBoYW5kbGVycy5wdXNoKGZuKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdXBkYXRlKCdhZGRFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVzY2FwZUtleSAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cblxuZnVuY3Rpb24gdHJpZ2dlciAoZSkge1xuICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c291dCAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c291dCAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJpZ2dlcilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBUcmFuc2l0aW9uLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFuY2hvciwgeyB1c2VBbmNob3JQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWFuY2hvci91c2UtYW5jaG9yLmpzJ1xuaW1wb3J0IHVzZVNjcm9sbFRhcmdldCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zY3JvbGwtdGFyZ2V0L3VzZS1zY3JvbGwtdGFyZ2V0LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVRyYW5zaXRpb24sIHsgdXNlVHJhbnNpdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdHJhbnNpdGlvbi91c2UtdHJhbnNpdGlvbi5qcydcbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNsb3NlUG9ydGFsTWVudXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnBvcnRhbC9wb3J0YWwuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIHNjcm9sbFRhcmdldFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24sIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZEVzY2FwZUtleSwgcmVtb3ZlRXNjYXBlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9lc2NhcGUta2V5LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNvdXQsIHJlbW92ZUZvY3Vzb3V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1c291dC5qcydcbmltcG9ydCB7IGNoaWxkSGFzRm9jdXMgfSBmcm9tICcuLi8uLi91dGlscy9kb20vZG9tLmpzJ1xuaW1wb3J0IHsgYWRkQ2xpY2tPdXRzaWRlLCByZW1vdmVDbGlja091dHNpZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNsaWNrLW91dHNpZGUvY2xpY2stb3V0c2lkZS5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmltcG9ydCB7XG4gIHZhbGlkYXRlUG9zaXRpb24sIHZhbGlkYXRlT2Zmc2V0LCBzZXRQb3NpdGlvbiwgcGFyc2VQb3NpdGlvblxufSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnBvc2l0aW9uLWVuZ2luZS9wb3NpdGlvbi1lbmdpbmUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTWVudScsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFuY2hvclByb3BzLFxuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgYXV0b0Nsb3NlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogQm9vbGVhbixcblxuICAgIG5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUmVmb2N1czogQm9vbGVhbixcbiAgICBub0ZvY3VzOiBCb29sZWFuLFxuXG4gICAgZml0OiBCb29sZWFuLFxuICAgIGNvdmVyOiBCb29sZWFuLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuXG4gICAgYW5jaG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIHNlbGY6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVPZmZzZXRcbiAgICB9LFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wLFxuXG4gICAgdG91Y2hQb3NpdGlvbjogQm9vbGVhbixcblxuICAgIG1heEhlaWdodDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdlc2NhcGVLZXknXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgbGV0IHJlZm9jdXNUYXJnZXQgPSBudWxsLCBhYnNvbHV0ZU9mZnNldCwgdW53YXRjaFBvc2l0aW9uLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHkgfSA9IHZtXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLm5vUm91dGVEaXNtaXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcbiAgICBjb25zdCB7IHRyYW5zaXRpb25Qcm9wcywgdHJhbnNpdGlvblN0eWxlIH0gPSB1c2VUcmFuc2l0aW9uKHByb3BzKVxuICAgIGNvbnN0IHsgbG9jYWxTY3JvbGxUYXJnZXQsIGNoYW5nZVNjcm9sbEV2ZW50LCB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCB9ID0gdXNlU2Nyb2xsVGFyZ2V0KHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpXG5cbiAgICBjb25zdCB7IGFuY2hvckVsLCBjYW5TaG93IH0gPSB1c2VBbmNob3IoeyBzaG93aW5nIH0pXG5cbiAgICBjb25zdCB7IGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsIGNhblNob3csIGhhbmRsZVNob3csIGhhbmRsZUhpZGUsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIHByb2Nlc3NPbk1vdW50OiB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IHsgc2hvd1BvcnRhbCwgaGlkZVBvcnRhbCwgcmVuZGVyUG9ydGFsIH0gPSB1c2VQb3J0YWwodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCAnbWVudScpXG5cbiAgICBjb25zdCBjbGlja091dHNpZGVQcm9wcyA9IHtcbiAgICAgIGFuY2hvckVsLFxuICAgICAgaW5uZXJSZWYsXG4gICAgICBvbkNsaWNrT3V0c2lkZSAoZSkge1xuICAgICAgICBpZiAocHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgaGlkZShlKVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgLy8gYWx3YXlzIHByZXZlbnQgdG91Y2ggZXZlbnRcbiAgICAgICAgICAgIGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNsaWNrIGlmIGl0J3Mgb24gYSBkaWFsb2cgYmFja2Ryb3BcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1kaWFsb2dfX2JhY2tkcm9wJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFuY2hvck9yaWdpbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwYXJzZVBvc2l0aW9uKFxuICAgICAgICBwcm9wcy5hbmNob3IgfHwgKFxuICAgICAgICAgIHByb3BzLmNvdmVyID09PSB0cnVlID8gJ2NlbnRlciBtaWRkbGUnIDogJ2JvdHRvbSBzdGFydCdcbiAgICAgICAgKSxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBzZWxmT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY292ZXIgPT09IHRydWVcbiAgICAgICAgPyBhbmNob3JPcmlnaW4udmFsdWVcbiAgICAgICAgOiBwYXJzZVBvc2l0aW9uKHByb3BzLnNlbGYgfHwgJ3RvcCBzdGFydCcsICRxLmxhbmcucnRsKVxuICAgICkpXG5cbiAgICBjb25zdCBtZW51Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1zcXVhcmUnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtbWVudS0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5hdXRvQ2xvc2UgPT09IHRydWVcbiAgICAgICAgPyB7IG9uQ2xpY2s6IG9uQXV0b0Nsb3NlIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICBjb25zdCBoYW5kbGVzRm9jdXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgKVxuXG4gICAgd2F0Y2goaGFuZGxlc0ZvY3VzLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBhZGRFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIGFkZENsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgICBpZiAobm9kZSAmJiBub2RlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSB0cnVlKSB7XG4gICAgICAgICAgbm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c11bdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdW3RhYmluZGV4XScpXG4gICAgICAgICAgICB8fCBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdIFt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c10gW3RhYmluZGV4XScpXG4gICAgICAgICAgICB8fCBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdLCBbZGF0YS1hdXRvZm9jdXNdJylcbiAgICAgICAgICAgIHx8IG5vZGVcbiAgICAgICAgICBub2RlLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCkge1xuICAgICAgcmVmb2N1c1RhcmdldCA9IHByb3BzLm5vUmVmb2N1cyA9PT0gZmFsc2VcbiAgICAgICAgPyBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIDogbnVsbFxuXG4gICAgICBhZGRGb2N1c291dChvbkZvY3Vzb3V0KVxuXG4gICAgICBzaG93UG9ydGFsKClcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG5cbiAgICAgIGFic29sdXRlT2Zmc2V0ID0gdm9pZCAwXG5cbiAgICAgIGlmIChldnQgIT09IHZvaWQgMCAmJiAocHJvcHMudG91Y2hQb3NpdGlvbiB8fCBwcm9wcy5jb250ZXh0TWVudSkpIHtcbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuXG4gICAgICAgIGlmIChwb3MubGVmdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IGFuY2hvckVsLnZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgYWJzb2x1dGVPZmZzZXQgPSB7IGxlZnQ6IHBvcy5sZWZ0IC0gbGVmdCwgdG9wOiBwb3MudG9wIC0gdG9wIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodW53YXRjaFBvc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uID0gd2F0Y2goXG4gICAgICAgICAgKCkgPT4gJHEuc2NyZWVuLndpZHRoICsgJ3wnICsgJHEuc2NyZWVuLmhlaWdodCArICd8JyArIHByb3BzLnNlbGYgKyAnfCcgKyBwcm9wcy5hbmNob3IgKyAnfCcgKyAkcS5sYW5nLnJ0bCxcbiAgICAgICAgICB1cGRhdGVQb3NpdGlvblxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5ub0ZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaWNrKCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGljaygoKSA9PiB7XG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKClcbiAgICAgICAgcHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSAmJiBmb2N1cygpXG4gICAgICB9KVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyByZXF1aXJlZCBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJkb3VibGUtdGFwIG5lZWRlZFwiIGlzc3VlXG4gICAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBpZiBhdXRvLWNsb3NlLCB0aGVuIHRoaXMgY2xpY2sgc2hvdWxkXG4gICAgICAgICAgLy8gbm90IGNsb3NlIHRoZSBtZW51XG4gICAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSBwcm9wcy5hdXRvQ2xvc2VcbiAgICAgICAgICBpbm5lclJlZi52YWx1ZS5jbGljaygpXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICBoaWRlUG9ydGFsKClcblxuICAgICAgYW5jaG9yQ2xlYW51cCh0cnVlKVxuXG4gICAgICBpZiAoXG4gICAgICAgIHJlZm9jdXNUYXJnZXQgIT09IG51bGxcbiAgICAgICAgJiYgKFxuICAgICAgICAgIC8vIG1lbnUgd2FzIGhpZGRlbiBmcm9tIGNvZGUgb3IgRVNDIHBsdWdpblxuICAgICAgICAgIGV2dCA9PT0gdm9pZCAwXG4gICAgICAgICAgLy8gbWVudSB3YXMgbm90IGNsb3NlZCBmcm9tIGEgbW91c2Ugb3IgdG91Y2ggY2xpY2tPdXRzaWRlXG4gICAgICAgICAgfHwgZXZ0LnFDbGlja091dHNpZGUgIT09IHRydWVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgICgoZXZ0ICYmIGV2dC50eXBlLmluZGV4T2YoJ2tleScpID09PSAwXG4gICAgICAgICAgPyByZWZvY3VzVGFyZ2V0LmNsb3Nlc3QoJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleF49XCItXCJdKScpXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgKSB8fCByZWZvY3VzVGFyZ2V0KS5mb2N1cygpXG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGhpZGVQb3J0YWwodHJ1ZSkgLy8gZG9uZSBoaWRpbmcsIG5vdyBkZXN0cm95XG4gICAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5jaG9yQ2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBhYnNvbHV0ZU9mZnNldCA9IHZvaWQgMFxuXG4gICAgICBpZiAodW53YXRjaFBvc2l0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uKClcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgPT09IHRydWUgfHwgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3Vzb3V0KVxuICAgICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgICAgcmVtb3ZlRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCB8fCBwcm9wcy5zY3JvbGxUYXJnZXQgIT09IHZvaWQgMCkge1xuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSA9IGdldFNjcm9sbFRhcmdldChhbmNob3JFbC52YWx1ZSwgcHJvcHMuc2Nyb2xsVGFyZ2V0KVxuICAgICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSwgdXBkYXRlUG9zaXRpb24pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BdXRvQ2xvc2UgKGUpIHtcbiAgICAgIC8vIGlmIGF1dG8tY2xvc2UsIHRoZW4gdGhlIGlvcyBkb3VibGUtdGFwIGZpeCB3aGljaFxuICAgICAgLy8gaXNzdWVzIGEgY2xpY2sgc2hvdWxkIG5vdCBjbG9zZSB0aGUgbWVudVxuICAgICAgaWYgKGF2b2lkQXV0b0Nsb3NlICE9PSB0cnVlKSB7XG4gICAgICAgIGNsb3NlUG9ydGFsTWVudXMocHJveHksIGUpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c291dCAoZXZ0KSB7XG4gICAgICAvLyB0aGUgZm9jdXMgaXMgbm90IGluIGEgdnVlIGNoaWxkIGNvbXBvbmVudFxuICAgICAgaWYgKFxuICAgICAgICBoYW5kbGVzRm9jdXMudmFsdWUgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZVxuICAgICAgICAmJiBjaGlsZEhhc0ZvY3VzKGlubmVyUmVmLnZhbHVlLCBldnQudGFyZ2V0KSAhPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIGZvY3VzKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVzY2FwZUtleSAoZXZ0KSB7XG4gICAgICBlbWl0KCdlc2NhcGVLZXknKVxuICAgICAgaGlkZShldnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgc2V0UG9zaXRpb24oe1xuICAgICAgICB0YXJnZXRFbDogaW5uZXJSZWYudmFsdWUsXG4gICAgICAgIG9mZnNldDogcHJvcHMub2Zmc2V0LFxuICAgICAgICBhbmNob3JFbDogYW5jaG9yRWwudmFsdWUsXG4gICAgICAgIGFuY2hvck9yaWdpbjogYW5jaG9yT3JpZ2luLnZhbHVlLFxuICAgICAgICBzZWxmT3JpZ2luOiBzZWxmT3JpZ2luLnZhbHVlLFxuICAgICAgICBhYnNvbHV0ZU9mZnNldCxcbiAgICAgICAgZml0OiBwcm9wcy5maXQsXG4gICAgICAgIGNvdmVyOiBwcm9wcy5jb3ZlcixcbiAgICAgICAgbWF4SGVpZ2h0OiBwcm9wcy5tYXhIZWlnaHQsXG4gICAgICAgIG1heFdpZHRoOiBwcm9wcy5tYXhXaWR0aFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJQb3J0YWxDb250ZW50ICgpIHtcbiAgICAgIHJldHVybiBoKFxuICAgICAgICBUcmFuc2l0aW9uLFxuICAgICAgICB0cmFuc2l0aW9uUHJvcHMudmFsdWUsXG4gICAgICAgICgpID0+IChcbiAgICAgICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgcm9sZTogJ21lbnUnLFxuICAgICAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICAgICdxLW1lbnUgcS1wb3NpdGlvbi1lbmdpbmUgc2Nyb2xsJyArIG1lbnVDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogW1xuICAgICAgICAgICAgICAgIGF0dHJzLnN0eWxlLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25TdHlsZS52YWx1ZVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAuLi5vbkV2ZW50cy52YWx1ZVxuICAgICAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudChhbmNob3JDbGVhbnVwKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBmb2N1cywgdXBkYXRlUG9zaXRpb24gfSlcblxuICAgIHJldHVybiByZW5kZXJQb3J0YWxcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUUJ0biBmcm9tICcuLi9idG4vUUJ0bi5qcydcbmltcG9ydCBRQnRuR3JvdXAgZnJvbSAnLi4vYnRuLWdyb3VwL1FCdG5Hcm91cC5qcydcbmltcG9ydCBRTWVudSBmcm9tICcuLi9tZW51L1FNZW51LmpzJ1xuXG5pbXBvcnQgeyBnZXRCdG5EZXNpZ25BdHRyLCBub25Sb3VuZEJ0blByb3BzIH0gZnJvbSAnLi4vYnRuL3VzZS1idG4uanMnXG5pbXBvcnQgdXNlSWQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWlkL3VzZS1pZC5qcydcbmltcG9ydCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5jb25zdCBidG5Qcm9wc0xpc3QgPSBPYmplY3Qua2V5cyhub25Sb3VuZEJ0blByb3BzKVxuXG5leHBvcnQgZnVuY3Rpb24gcGFzc0J0blByb3BzIChwcm9wcykge1xuICByZXR1cm4gYnRuUHJvcHNMaXN0LnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBjb25zdCB2YWwgPSBwcm9wc1sga2V5IF1cbiAgICBpZiAodmFsICE9PSB2b2lkIDApIHtcbiAgICAgIGFjY1sga2V5IF0gPSB2YWxcbiAgICB9XG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG5Ecm9wZG93bicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi5ub25Sb3VuZEJ0blByb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IEJvb2xlYW4sXG4gICAgc3BsaXQ6IEJvb2xlYW4sXG4gICAgZHJvcGRvd25JY29uOiBTdHJpbmcsXG5cbiAgICBjb250ZW50Q2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgY29udGVudFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgY292ZXI6IEJvb2xlYW4sXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBub1JvdXRlRGlzbWlzczogQm9vbGVhbixcbiAgICBhdXRvQ2xvc2U6IEJvb2xlYW4sXG5cbiAgICBtZW51QW5jaG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYm90dG9tIGVuZCdcbiAgICB9LFxuICAgIG1lbnVTZWxmOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndG9wIGVuZCdcbiAgICB9LFxuICAgIG1lbnVPZmZzZXQ6IEFycmF5LFxuXG4gICAgZGlzYWJsZU1haW5CdG46IEJvb2xlYW4sXG4gICAgZGlzYWJsZURyb3Bkb3duOiBCb29sZWFuLFxuXG4gICAgbm9JY29uQW5pbWF0aW9uOiBCb29sZWFuLFxuXG4gICAgdG9nZ2xlQXJpYUxhYmVsOiBTdHJpbmdcbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAnY2xpY2snLCAnYmVmb3JlU2hvdycsICdzaG93JywgJ2JlZm9yZUhpZGUnLCAnaGlkZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKHByb3BzLm1vZGVsVmFsdWUpXG4gICAgY29uc3QgbWVudVJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHRhcmdldFVpZCA9IHVzZUlkKClcblxuICAgIGNvbnN0IGFyaWFBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgICAgICdhcmlhLWNvbnRyb2xzJzogdGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLnRvZ2dsZUFyaWFMYWJlbCB8fCBwcm94eS4kcS5sYW5nLmxhYmVsWyBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJ2NvbGxhcHNlJyA6ICdleHBhbmQnIF0ocHJvcHMubGFiZWwpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgICB8fCAoXG4gICAgICAgICAgKHByb3BzLnNwbGl0ID09PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlTWFpbkJ0biA9PT0gdHJ1ZSlcbiAgICAgICAgICB8fCBwcm9wcy5kaXNhYmxlRHJvcGRvd24gPT09IHRydWVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICBjb25zdCBpY29uQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYnRuLWRyb3Bkb3duX19hcnJvdydcbiAgICAgICsgKHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9JY29uQW5pbWF0aW9uID09PSBmYWxzZSA/ICcgcm90YXRlLTE4MCcgOiAnJylcbiAgICAgICsgKHByb3BzLnNwbGl0ID09PSBmYWxzZSA/ICcgcS1idG4tZHJvcGRvd25fX2Fycm93LWNvbnRhaW5lcicgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBidG5EZXNpZ25BdHRyID0gY29tcHV0ZWQoKCkgPT4gZ2V0QnRuRGVzaWduQXR0cihwcm9wcykpXG4gICAgY29uc3QgYnRuUHJvcHMgPSBjb21wdXRlZCgoKSA9PiBwYXNzQnRuUHJvcHMocHJvcHMpKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdmFsID0+IHtcbiAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZVsgdmFsID8gJ3Nob3cnIDogJ2hpZGUnIF0oKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5zcGxpdCwgaGlkZSlcblxuICAgIGZ1bmN0aW9uIG9uQmVmb3JlU2hvdyAoZSkge1xuICAgICAgc2hvd2luZy52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2JlZm9yZVNob3cnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2hvdyAoZSkge1xuICAgICAgZW1pdCgnc2hvdycsIGUpXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CZWZvcmVIaWRlIChlKSB7XG4gICAgICBzaG93aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGVtaXQoJ2JlZm9yZUhpZGUnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSGlkZSAoZSkge1xuICAgICAgZW1pdCgnaGlkZScsIGUpXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrSGlkZSAoZSkge1xuICAgICAgc3RvcChlKVxuICAgICAgaGlkZSgpXG4gICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlIChldnQpIHtcbiAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS50b2dnbGUoZXZ0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3cgKGV2dCkge1xuICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlLnNob3coZXZ0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGUgKGV2dCkge1xuICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlLmhpZGUoZXZ0KVxuICAgIH1cblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHNob3csIGhpZGUsIHRvZ2dsZVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSAmJiBzaG93KClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IEFycm93ID0gW1xuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6IGljb25DbGFzcy52YWx1ZSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5kcm9wZG93bkljb24gfHwgcHJveHkuJHEuaWNvblNldC5hcnJvdy5kcm9wZG93blxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBwcm9wcy5kaXNhYmxlRHJvcGRvd24gIT09IHRydWUgJiYgQXJyb3cucHVzaChcbiAgICAgICAgaChRTWVudSwge1xuICAgICAgICAgIHJlZjogbWVudVJlZixcbiAgICAgICAgICBpZDogdGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAgIGNsYXNzOiBwcm9wcy5jb250ZW50Q2xhc3MsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmNvbnRlbnRTdHlsZSxcbiAgICAgICAgICBjb3ZlcjogcHJvcHMuY292ZXIsXG4gICAgICAgICAgZml0OiB0cnVlLFxuICAgICAgICAgIHBlcnNpc3RlbnQ6IHByb3BzLnBlcnNpc3RlbnQsXG4gICAgICAgICAgbm9Sb3V0ZURpc21pc3M6IHByb3BzLm5vUm91dGVEaXNtaXNzLFxuICAgICAgICAgIGF1dG9DbG9zZTogcHJvcHMuYXV0b0Nsb3NlLFxuICAgICAgICAgIGFuY2hvcjogcHJvcHMubWVudUFuY2hvcixcbiAgICAgICAgICBzZWxmOiBwcm9wcy5tZW51U2VsZixcbiAgICAgICAgICBvZmZzZXQ6IHByb3BzLm1lbnVPZmZzZXQsXG4gICAgICAgICAgc2VwYXJhdGVDbG9zZVBvcHVwOiB0cnVlLFxuICAgICAgICAgIHRyYW5zaXRpb25TaG93OiBwcm9wcy50cmFuc2l0aW9uU2hvdyxcbiAgICAgICAgICB0cmFuc2l0aW9uSGlkZTogcHJvcHMudHJhbnNpdGlvbkhpZGUsXG4gICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgb25CZWZvcmVTaG93LFxuICAgICAgICAgIG9uU2hvdyxcbiAgICAgICAgICBvbkJlZm9yZUhpZGUsXG4gICAgICAgICAgb25IaWRlXG4gICAgICAgIH0sIHNsb3RzLmRlZmF1bHQpXG4gICAgICApXG5cbiAgICAgIGlmIChwcm9wcy5zcGxpdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGgoUUJ0biwge1xuICAgICAgICAgIGNsYXNzOiAncS1idG4tZHJvcGRvd24gcS1idG4tZHJvcGRvd24tLXNpbXBsZScsXG4gICAgICAgICAgLi4uYnRuUHJvcHMudmFsdWUsXG4gICAgICAgICAgLi4uYXJpYUF0dHJzLnZhbHVlLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMuZGlzYWJsZU1haW5CdG4gPT09IHRydWUsXG4gICAgICAgICAgbm9XcmFwOiB0cnVlLFxuICAgICAgICAgIHJvdW5kOiBmYWxzZSxcbiAgICAgICAgICBvbkNsaWNrXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBoU2xvdChzbG90cy5sYWJlbCwgW10pLmNvbmNhdChBcnJvdyksXG4gICAgICAgICAgbG9hZGluZzogc2xvdHMubG9hZGluZ1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChRQnRuR3JvdXAsIHtcbiAgICAgICAgY2xhc3M6ICdxLWJ0bi1kcm9wZG93biBxLWJ0bi1kcm9wZG93bi0tc3BsaXQgbm8td3JhcCBxLWJ0bi1pdGVtJyxcbiAgICAgICAgcm91bmRlZDogcHJvcHMucm91bmRlZCxcbiAgICAgICAgc3F1YXJlOiBwcm9wcy5zcXVhcmUsXG4gICAgICAgIC4uLmJ0bkRlc2lnbkF0dHIudmFsdWUsXG4gICAgICAgIGdsb3NzeTogcHJvcHMuZ2xvc3N5LFxuICAgICAgICBzdHJldGNoOiBwcm9wcy5zdHJldGNoXG4gICAgICB9LCAoKSA9PiBbXG4gICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgIGNsYXNzOiAncS1idG4tZHJvcGRvd24tLWN1cnJlbnQnLFxuICAgICAgICAgIC4uLmJ0blByb3BzLnZhbHVlLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMuZGlzYWJsZU1haW5CdG4gPT09IHRydWUsXG4gICAgICAgICAgbm9XcmFwOiB0cnVlLFxuICAgICAgICAgIHJvdW5kOiBmYWxzZSxcbiAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrSGlkZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgZGVmYXVsdDogc2xvdHMubGFiZWwsXG4gICAgICAgICAgbG9hZGluZzogc2xvdHMubG9hZGluZ1xuICAgICAgICB9KSxcblxuICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICBjbGFzczogJ3EtYnRuLWRyb3Bkb3duX19hcnJvdy1jb250YWluZXIgcS1hbmNob3ItLXNraXAnLFxuICAgICAgICAgIC4uLmFyaWFBdHRycy52YWx1ZSxcbiAgICAgICAgICAuLi5idG5EZXNpZ25BdHRyLnZhbHVlLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMuZGlzYWJsZURyb3Bkb3duID09PSB0cnVlLFxuICAgICAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIHRleHRDb2xvcjogcHJvcHMudGV4dENvbG9yLFxuICAgICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZSxcbiAgICAgICAgICBzaXplOiBwcm9wcy5zaXplLFxuICAgICAgICAgIHBhZGRpbmc6IHByb3BzLnBhZGRpbmcsXG4gICAgICAgICAgcmlwcGxlOiBwcm9wcy5yaXBwbGVcbiAgICAgICAgfSwgKCkgPT4gQXJyb3cpXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuaW1wb3J0IFFCdG5Ecm9wZG93biBmcm9tICcuLi9idG4tZHJvcGRvd24vUUJ0bkRyb3Bkb3duLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVRvb2x0aXAgZnJvbSAnLi4vdG9vbHRpcC9RVG9vbHRpcC5qcydcbmltcG9ydCBRSXRlbSBmcm9tICcuLi9pdGVtL1FJdGVtLmpzJ1xuaW1wb3J0IFFJdGVtU2VjdGlvbiBmcm9tICcuLi9pdGVtL1FJdGVtU2VjdGlvbi5qcydcblxuaW1wb3J0IHsgcHJldmVudCwgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmtleWJvYXJkL2tleS1jb21wb3NpdGlvbi5qcydcblxuZnVuY3Rpb24gcnVuIChlLCBidG4sIGVWbSkge1xuICBpZiAoYnRuLmhhbmRsZXIpIHtcbiAgICBidG4uaGFuZGxlcihlLCBlVm0sIGVWbS5jYXJldClcbiAgfVxuICBlbHNlIHtcbiAgICBlVm0ucnVuQ21kKGJ0bi5jbWQsIGJ0bi5wYXJhbSlcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRHcm91cCAoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWVkaXRvcl9fdG9vbGJhci1ncm91cCcgfSwgY2hpbGRyZW4pXG59XG5cbmZ1bmN0aW9uIGdldEJ0biAoZVZtLCBidG4sIGNsaWNrSGFuZGxlciwgYWN0aXZlID0gZmFsc2UpIHtcbiAgY29uc3RcbiAgICB0b2dnbGVkID0gYWN0aXZlIHx8IChidG4udHlwZSA9PT0gJ3RvZ2dsZSdcbiAgICAgID8gKGJ0bi50b2dnbGVkID8gYnRuLnRvZ2dsZWQoZVZtKSA6IGJ0bi5jbWQgJiYgZVZtLmNhcmV0LmlzKGJ0bi5jbWQsIGJ0bi5wYXJhbSkpXG4gICAgICA6IGZhbHNlKSxcbiAgICBjaGlsZCA9IFtdXG5cbiAgaWYgKGJ0bi50aXAgJiYgZVZtLiRxLnBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgICBjb25zdCBLZXkgPSBidG4ua2V5XG4gICAgICA/IGgoJ2RpdicsIFtcbiAgICAgICAgaCgnc21hbGwnLCBgKENUUkwgKyAkeyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ0bi5rZXkpIH0pYClcbiAgICAgIF0pXG4gICAgICA6IG51bGxcbiAgICBjaGlsZC5wdXNoKFxuICAgICAgaChRVG9vbHRpcCwgeyBkZWxheTogMTAwMCB9LCAoKSA9PiBbXG4gICAgICAgIGgoJ2RpdicsIHsgaW5uZXJIVE1MOiBidG4udGlwIH0pLFxuICAgICAgICBLZXlcbiAgICAgIF0pXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGgoUUJ0biwge1xuICAgIC4uLmVWbS5idXR0b25Qcm9wcy52YWx1ZSxcbiAgICBpY29uOiBidG4uaWNvbiAhPT0gbnVsbCA/IGJ0bi5pY29uIDogdm9pZCAwLFxuICAgIGNvbG9yOiB0b2dnbGVkID8gYnRuLnRvZ2dsZUNvbG9yIHx8IGVWbS5wcm9wcy50b29sYmFyVG9nZ2xlQ29sb3IgOiBidG4uY29sb3IgfHwgZVZtLnByb3BzLnRvb2xiYXJDb2xvcixcbiAgICB0ZXh0Q29sb3I6IHRvZ2dsZWQgJiYgIWVWbS5wcm9wcy50b29sYmFyUHVzaCA/IG51bGwgOiBidG4udGV4dENvbG9yIHx8IGVWbS5wcm9wcy50b29sYmFyVGV4dENvbG9yLFxuICAgIGxhYmVsOiBidG4ubGFiZWwsXG4gICAgZGlzYWJsZTogYnRuLmRpc2FibGUgPyAodHlwZW9mIGJ0bi5kaXNhYmxlID09PSAnZnVuY3Rpb24nID8gYnRuLmRpc2FibGUoZVZtKSA6IHRydWUpIDogZmFsc2UsXG4gICAgc2l6ZTogJ3NtJyxcbiAgICBvbkNsaWNrIChlKSB7XG4gICAgICBjbGlja0hhbmRsZXIgJiYgY2xpY2tIYW5kbGVyKClcbiAgICAgIHJ1bihlLCBidG4sIGVWbSlcbiAgICB9XG4gIH0sICgpID0+IGNoaWxkKVxufVxuXG5mdW5jdGlvbiBnZXREcm9wZG93biAoZVZtLCBidG4pIHtcbiAgY29uc3Qgb25seUljb25zID0gYnRuLmxpc3QgPT09ICdvbmx5LWljb25zJ1xuICBsZXRcbiAgICBsYWJlbCA9IGJ0bi5sYWJlbCxcbiAgICBpY29uID0gYnRuLmljb24gIT09IG51bGwgPyBidG4uaWNvbiA6IHZvaWQgMCxcbiAgICBjb250ZW50Q2xhc3MsXG4gICAgSXRlbXNcblxuICBmdW5jdGlvbiBjbG9zZURyb3Bkb3duICgpIHtcbiAgICBEcm9wZG93bi5jb21wb25lbnQucHJveHkuaGlkZSgpXG4gIH1cblxuICBpZiAob25seUljb25zKSB7XG4gICAgSXRlbXMgPSBidG4ub3B0aW9ucy5tYXAoYnRuID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGJ0bi50eXBlID09PSB2b2lkIDBcbiAgICAgICAgPyBlVm0uY2FyZXQuaXMoYnRuLmNtZCwgYnRuLnBhcmFtKVxuICAgICAgICA6IGZhbHNlXG5cbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgbGFiZWwgPSBidG4udGlwXG4gICAgICAgIGljb24gPSBidG4uaWNvbiAhPT0gbnVsbCA/IGJ0bi5pY29uIDogdm9pZCAwXG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0QnRuKGVWbSwgYnRuLCBjbG9zZURyb3Bkb3duLCBhY3RpdmUpXG4gICAgfSlcbiAgICBjb250ZW50Q2xhc3MgPSBlVm0udG9vbGJhckJhY2tncm91bmRDbGFzcy52YWx1ZVxuICAgIEl0ZW1zID0gW1xuICAgICAgZ2V0R3JvdXAoSXRlbXMpXG4gICAgXVxuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IGFjdGl2ZUNsYXNzID0gZVZtLnByb3BzLnRvb2xiYXJUb2dnbGVDb2xvciAhPT0gdm9pZCAwXG4gICAgICA/IGB0ZXh0LSR7IGVWbS5wcm9wcy50b29sYmFyVG9nZ2xlQ29sb3IgfWBcbiAgICAgIDogbnVsbFxuICAgIGNvbnN0IGluYWN0aXZlQ2xhc3MgPSBlVm0ucHJvcHMudG9vbGJhclRleHRDb2xvciAhPT0gdm9pZCAwXG4gICAgICA/IGB0ZXh0LSR7IGVWbS5wcm9wcy50b29sYmFyVGV4dENvbG9yIH1gXG4gICAgICA6IG51bGxcblxuICAgIGNvbnN0IG5vSWNvbnMgPSBidG4ubGlzdCA9PT0gJ25vLWljb25zJ1xuXG4gICAgSXRlbXMgPSBidG4ub3B0aW9ucy5tYXAoYnRuID0+IHtcbiAgICAgIGNvbnN0IGRpc2FibGUgPSBidG4uZGlzYWJsZSA/IGJ0bi5kaXNhYmxlKGVWbSkgOiBmYWxzZVxuICAgICAgY29uc3QgYWN0aXZlID0gYnRuLnR5cGUgPT09IHZvaWQgMFxuICAgICAgICA/IGVWbS5jYXJldC5pcyhidG4uY21kLCBidG4ucGFyYW0pXG4gICAgICAgIDogZmFsc2VcblxuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICBsYWJlbCA9IGJ0bi50aXBcbiAgICAgICAgaWNvbiA9IGJ0bi5pY29uICE9PSBudWxsID8gYnRuLmljb24gOiB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgY29uc3QgaHRtbFRpcCA9IGJ0bi5odG1sVGlwXG5cbiAgICAgIHJldHVybiBoKFFJdGVtLCB7XG4gICAgICAgIGFjdGl2ZSxcbiAgICAgICAgYWN0aXZlQ2xhc3MsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgIG9uQ2xpY2sgKGUpIHtcbiAgICAgICAgICBjbG9zZURyb3Bkb3duKClcbiAgICAgICAgICBlVm0uY29udGVudFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBlVm0uY29udGVudFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgZVZtLmNhcmV0LnJlc3RvcmUoKVxuICAgICAgICAgIHJ1bihlLCBidG4sIGVWbSlcbiAgICAgICAgfVxuICAgICAgfSwgKCkgPT4gW1xuICAgICAgICBub0ljb25zID09PSB0cnVlXG4gICAgICAgICAgPyBudWxsXG4gICAgICAgICAgOiBoKFxuICAgICAgICAgICAgUUl0ZW1TZWN0aW9uLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzczogYWN0aXZlID8gYWN0aXZlQ2xhc3MgOiBpbmFjdGl2ZUNsYXNzLFxuICAgICAgICAgICAgICBzaWRlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4gaChRSWNvbiwgeyBuYW1lOiBidG4uaWNvbiAhPT0gbnVsbCA/IGJ0bi5pY29uIDogdm9pZCAwIH0pXG4gICAgICAgICAgKSxcblxuICAgICAgICBoKFxuICAgICAgICAgIFFJdGVtU2VjdGlvbixcbiAgICAgICAgICBodG1sVGlwXG4gICAgICAgICAgICA/ICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6ICd0ZXh0LW5vLXdyYXAnLCBpbm5lckhUTUw6IGJ0bi5odG1sVGlwIH0pXG4gICAgICAgICAgICA6IChidG4udGlwID8gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3RleHQtbm8td3JhcCcgfSwgYnRuLnRpcCkgOiB2b2lkIDApXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfSlcbiAgICBjb250ZW50Q2xhc3MgPSBbIGVWbS50b29sYmFyQmFja2dyb3VuZENsYXNzLnZhbHVlLCBpbmFjdGl2ZUNsYXNzIF1cbiAgfVxuXG4gIGNvbnN0IGhpZ2hsaWdodCA9IGJ0bi5oaWdobGlnaHQgJiYgbGFiZWwgIT09IGJ0bi5sYWJlbFxuICBjb25zdCBEcm9wZG93biA9IGgoUUJ0bkRyb3Bkb3duLCB7XG4gICAgLi4uZVZtLmJ1dHRvblByb3BzLnZhbHVlLFxuICAgIG5vQ2FwczogdHJ1ZSxcbiAgICBub1dyYXA6IHRydWUsXG4gICAgY29sb3I6IGhpZ2hsaWdodCA/IGVWbS5wcm9wcy50b29sYmFyVG9nZ2xlQ29sb3IgOiBlVm0ucHJvcHMudG9vbGJhckNvbG9yLFxuICAgIHRleHRDb2xvcjogaGlnaGxpZ2h0ICYmICFlVm0ucHJvcHMudG9vbGJhclB1c2ggPyBudWxsIDogZVZtLnByb3BzLnRvb2xiYXJUZXh0Q29sb3IsXG4gICAgbGFiZWw6IGJ0bi5maXhlZExhYmVsID8gYnRuLmxhYmVsIDogbGFiZWwsXG4gICAgaWNvbjogYnRuLmZpeGVkSWNvbiA/IChidG4uaWNvbiAhPT0gbnVsbCA/IGJ0bi5pY29uIDogdm9pZCAwKSA6IGljb24sXG4gICAgY29udGVudENsYXNzLFxuICAgIG9uU2hvdzogZXZ0ID0+IGVWbS5lbWl0KCdkcm9wZG93blNob3cnLCBldnQpLFxuICAgIG9uSGlkZTogZXZ0ID0+IGVWbS5lbWl0KCdkcm9wZG93bkhpZGUnLCBldnQpLFxuICAgIG9uQmVmb3JlU2hvdzogZXZ0ID0+IGVWbS5lbWl0KCdkcm9wZG93bkJlZm9yZVNob3cnLCBldnQpLFxuICAgIG9uQmVmb3JlSGlkZTogZXZ0ID0+IGVWbS5lbWl0KCdkcm9wZG93bkJlZm9yZUhpZGUnLCBldnQpXG4gIH0sICgpID0+IEl0ZW1zKVxuXG4gIHJldHVybiBEcm9wZG93blxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9vbGJhciAoZVZtKSB7XG4gIGlmIChlVm0uY2FyZXQpIHtcbiAgICByZXR1cm4gZVZtLmJ1dHRvbnMudmFsdWVcbiAgICAgIC5maWx0ZXIoZiA9PiB7XG4gICAgICAgIHJldHVybiAhZVZtLmlzVmlld2luZ1NvdXJjZS52YWx1ZSB8fCBmLmZpbmQoZmIgPT4gZmIuY21kID09PSAndmlld3NvdXJjZScpXG4gICAgICB9KVxuICAgICAgLm1hcChncm91cCA9PiBnZXRHcm91cChcbiAgICAgICAgZ3JvdXAubWFwKGJ0biA9PiB7XG4gICAgICAgICAgaWYgKGVWbS5pc1ZpZXdpbmdTb3VyY2UudmFsdWUgJiYgYnRuLmNtZCAhPT0gJ3ZpZXdzb3VyY2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYnRuLnR5cGUgPT09ICdzbG90Jykge1xuICAgICAgICAgICAgcmV0dXJuIGhTbG90KGVWbS5zbG90c1sgYnRuLnNsb3QgXSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYnRuLnR5cGUgPT09ICdkcm9wZG93bicpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXREcm9wZG93bihlVm0sIGJ0bilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZ2V0QnRuKGVWbSwgYnRuKVxuICAgICAgICB9KVxuICAgICAgKSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9udHMgKGRlZmF1bHRGb250LCBkZWZhdWx0Rm9udExhYmVsLCBkZWZhdWx0Rm9udEljb24sIGZvbnRzID0ge30pIHtcbiAgY29uc3QgYWxpYXNlcyA9IE9iamVjdC5rZXlzKGZvbnRzKVxuICBpZiAoYWxpYXNlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge31cbiAgfVxuXG4gIGNvbnN0IGRlZiA9IHtcbiAgICBkZWZhdWx0X2ZvbnQ6IHtcbiAgICAgIGNtZDogJ2ZvbnROYW1lJyxcbiAgICAgIHBhcmFtOiBkZWZhdWx0Rm9udCxcbiAgICAgIGljb246IGRlZmF1bHRGb250SWNvbixcbiAgICAgIHRpcDogZGVmYXVsdEZvbnRMYWJlbFxuICAgIH1cbiAgfVxuXG4gIGFsaWFzZXMuZm9yRWFjaChhbGlhcyA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGZvbnRzWyBhbGlhcyBdXG4gICAgZGVmWyBhbGlhcyBdID0ge1xuICAgICAgY21kOiAnZm9udE5hbWUnLFxuICAgICAgcGFyYW06IG5hbWUsXG4gICAgICBpY29uOiBkZWZhdWx0Rm9udEljb24sXG4gICAgICB0aXA6IG5hbWUsXG4gICAgICBodG1sVGlwOiBgPGZvbnQgZmFjZT1cIiR7IG5hbWUgfVwiPiR7IG5hbWUgfTwvZm9udD5gXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBkZWZcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtFZGl0b3IgKGVWbSkge1xuICBpZiAoZVZtLmNhcmV0KSB7XG4gICAgY29uc3QgY29sb3IgPSBlVm0ucHJvcHMudG9vbGJhckNvbG9yIHx8IGVWbS5wcm9wcy50b29sYmFyVGV4dENvbG9yXG4gICAgbGV0IGxpbmsgPSBlVm0uZWRpdExpbmtVcmwudmFsdWVcbiAgICBjb25zdCB1cGRhdGVMaW5rID0gKCkgPT4ge1xuICAgICAgZVZtLmNhcmV0LnJlc3RvcmUoKVxuXG4gICAgICBpZiAobGluayAhPT0gZVZtLmVkaXRMaW5rVXJsLnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIGxpbmsgPT09ICcnID8gJyAnIDogbGluaylcbiAgICAgIH1cblxuICAgICAgZVZtLmVkaXRMaW5rVXJsLnZhbHVlID0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiBgcS1teC14cyB0ZXh0LSR7IGNvbG9yIH1gIH0sIGAkeyBlVm0uJHEubGFuZy5lZGl0b3IudXJsIH06IGApLFxuICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgIGtleTogJ3FlZHRfYnRtX2lucHV0JyxcbiAgICAgICAgY2xhc3M6ICdjb2wgcS1lZGl0b3JfX2xpbmstaW5wdXQnLFxuICAgICAgICB2YWx1ZTogbGluayxcbiAgICAgICAgb25JbnB1dDogZXZ0ID0+IHtcbiAgICAgICAgICBzdG9wKGV2dClcbiAgICAgICAgICBsaW5rID0gZXZ0LnRhcmdldC52YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBvbktleWRvd246IGV2dCA9PiB7XG4gICAgICAgICAgaWYgKHNob3VsZElnbm9yZUtleShldnQpID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgICAgIHN3aXRjaCAoZXZ0LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMTM6IC8vIEVOVEVSIGtleVxuICAgICAgICAgICAgICBwcmV2ZW50KGV2dClcbiAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZUxpbmsoKVxuICAgICAgICAgICAgY2FzZSAyNzogLy8gRVNDQVBFIGtleVxuICAgICAgICAgICAgICBwcmV2ZW50KGV2dClcbiAgICAgICAgICAgICAgZVZtLmNhcmV0LnJlc3RvcmUoKVxuICAgICAgICAgICAgICBpZiAoIWVWbS5lZGl0TGlua1VybC52YWx1ZSB8fCBlVm0uZWRpdExpbmtVcmwudmFsdWUgPT09ICdodHRwczovLycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgndW5saW5rJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlVm0uZWRpdExpbmtVcmwudmFsdWUgPSBudWxsXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGdldEdyb3VwKFtcbiAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAga2V5OiAncWVkdF9idG1fcmVtJyxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uZVZtLmJ1dHRvblByb3BzLnZhbHVlLFxuICAgICAgICAgIGxhYmVsOiBlVm0uJHEubGFuZy5sYWJlbC5yZW1vdmUsXG4gICAgICAgICAgbm9DYXBzOiB0cnVlLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIGVWbS5jYXJldC5yZXN0b3JlKClcbiAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmxpbmsnKVxuICAgICAgICAgICAgZVZtLmVkaXRMaW5rVXJsLnZhbHVlID0gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgIGtleTogJ3FlZHRfYnRtX3VwZCcsXG4gICAgICAgICAgLi4uZVZtLmJ1dHRvblByb3BzLnZhbHVlLFxuICAgICAgICAgIGxhYmVsOiBlVm0uJHEubGFuZy5sYWJlbC51cGRhdGUsXG4gICAgICAgICAgbm9DYXBzOiB0cnVlLFxuICAgICAgICAgIG9uQ2xpY2s6IHVwZGF0ZUxpbmtcbiAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgXVxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZU1vdW50LCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgSGlzdG9yeSBmcm9tICcuLi8uLi9wbHVnaW5zL3ByaXZhdGUuaGlzdG9yeS9IaXN0b3J5LmpzJ1xuaW1wb3J0IHsgdm1IYXNSb3V0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5sZXQgY291bnRlciA9IDBcblxuZXhwb3J0IGNvbnN0IHVzZUZ1bGxzY3JlZW5Qcm9wcyA9IHtcbiAgZnVsbHNjcmVlbjogQm9vbGVhbixcbiAgbm9Sb3V0ZUZ1bGxzY3JlZW5FeGl0OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VGdWxsc2NyZWVuRW1pdHMgPSBbICd1cGRhdGU6ZnVsbHNjcmVlbicsICdmdWxsc2NyZWVuJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gdm1cblxuICBsZXQgaGlzdG9yeUVudHJ5LCBmdWxsc2NyZWVuRmlsbGVyTm9kZSwgY29udGFpbmVyXG4gIGNvbnN0IGluRnVsbHNjcmVlbiA9IHJlZihmYWxzZSlcblxuICB2bUhhc1JvdXRlcih2bSkgPT09IHRydWUgJiYgd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCAoKSA9PiB7XG4gICAgcHJvcHMubm9Sb3V0ZUZ1bGxzY3JlZW5FeGl0ICE9PSB0cnVlICYmIGV4aXRGdWxsc2NyZWVuKClcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5mdWxsc2NyZWVuLCB2ID0+IHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlICE9PSB2KSB7XG4gICAgICB0b2dnbGVGdWxsc2NyZWVuKClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goaW5GdWxsc2NyZWVuLCB2ID0+IHtcbiAgICBlbWl0KCd1cGRhdGU6ZnVsbHNjcmVlbicsIHYpXG4gICAgZW1pdCgnZnVsbHNjcmVlbicsIHYpXG4gIH0pXG5cbiAgZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbiAoKSB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgZXhpdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNldEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUpIHJldHVyblxuXG4gICAgaW5GdWxsc2NyZWVuLnZhbHVlID0gdHJ1ZVxuICAgIGNvbnRhaW5lciA9IHByb3h5LiRlbC5wYXJlbnROb2RlXG4gICAgY29udGFpbmVyLnJlcGxhY2VDaGlsZChmdWxsc2NyZWVuRmlsbGVyTm9kZSwgcHJveHkuJGVsKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocHJveHkuJGVsKVxuXG4gICAgY291bnRlcisrXG4gICAgaWYgKGNvdW50ZXIgPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1mdWxsc2NyZWVuLW1peGluJylcbiAgICB9XG5cbiAgICBoaXN0b3J5RW50cnkgPSB7XG4gICAgICBoYW5kbGVyOiBleGl0RnVsbHNjcmVlblxuICAgIH1cbiAgICBIaXN0b3J5LmFkZChoaXN0b3J5RW50cnkpXG4gIH1cblxuICBmdW5jdGlvbiBleGl0RnVsbHNjcmVlbiAoKSB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICBpZiAoaGlzdG9yeUVudHJ5ICE9PSB2b2lkIDApIHtcbiAgICAgIEhpc3RvcnkucmVtb3ZlKGhpc3RvcnlFbnRyeSlcbiAgICAgIGhpc3RvcnlFbnRyeSA9IHZvaWQgMFxuICAgIH1cblxuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQocHJveHkuJGVsLCBmdWxsc2NyZWVuRmlsbGVyTm9kZSlcbiAgICBpbkZ1bGxzY3JlZW4udmFsdWUgPSBmYWxzZVxuXG4gICAgY291bnRlciA9IE1hdGgubWF4KDAsIGNvdW50ZXIgLSAxKVxuXG4gICAgaWYgKGNvdW50ZXIgPT09IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1mdWxsc2NyZWVuLW1peGluJylcblxuICAgICAgaWYgKHByb3h5LiRlbC5zY3JvbGxJbnRvVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBwcm94eS4kZWwuc2Nyb2xsSW50b1ZpZXcoKSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQmVmb3JlTW91bnQoKCkgPT4ge1xuICAgIGZ1bGxzY3JlZW5GaWxsZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm9wcy5mdWxsc2NyZWVuID09PSB0cnVlICYmIHNldEZ1bGxzY3JlZW4oKVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudChleGl0RnVsbHNjcmVlbilcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgIHRvZ2dsZUZ1bGxzY3JlZW4sXG4gICAgc2V0RnVsbHNjcmVlbixcbiAgICBleGl0RnVsbHNjcmVlblxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgaW5GdWxsc2NyZWVuLFxuICAgIHRvZ2dsZUZ1bGxzY3JlZW5cbiAgfVxufVxuIiwiY29uc3RcbiAgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuICBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICBub3RQbGFpbk9iamVjdCA9IG5ldyBTZXQoXG4gICAgWyAnQm9vbGVhbicsICdOdW1iZXInLCAnU3RyaW5nJywgJ0Z1bmN0aW9uJywgJ0FycmF5JywgJ0RhdGUnLCAnUmVnRXhwJyBdXG4gICAgICAubWFwKG5hbWUgPT4gJ1tvYmplY3QgJyArIG5hbWUgKyAnXScpXG4gIClcblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCAob2JqKSB7XG4gIGlmIChvYmogIT09IE9iamVjdChvYmopIHx8IG5vdFBsYWluT2JqZWN0Lmhhcyh0b1N0cmluZy5jYWxsKG9iaikpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAoXG4gICAgb2JqLmNvbnN0cnVjdG9yXG4gICAgJiYgaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKSA9PT0gZmFsc2VcbiAgICAmJiBoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpID09PSBmYWxzZVxuICApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGxldCBrZXlcbiAgZm9yIChrZXkgaW4gb2JqKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgcmV0dXJuIGtleSA9PT0gdm9pZCAwIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbmQgKCkge1xuICBsZXRcbiAgICBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbIDAgXSB8fCB7fSxcbiAgICBpID0gMSxcbiAgICBkZWVwID0gZmFsc2VcbiAgY29uc3QgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWVwID0gdGFyZ2V0XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzWyAxIF0gfHwge31cbiAgICBpID0gMlxuICB9XG5cbiAgaWYgKE9iamVjdCh0YXJnZXQpICE9PSB0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRhcmdldCA9IHt9XG4gIH1cblxuICBpZiAobGVuZ3RoID09PSBpKSB7XG4gICAgdGFyZ2V0ID0gdGhpc1xuICAgIGktLVxuICB9XG5cbiAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgob3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdKSAhPT0gbnVsbCkge1xuICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgICAgc3JjID0gdGFyZ2V0WyBuYW1lIF1cbiAgICAgICAgY29weSA9IG9wdGlvbnNbIG5hbWUgXVxuXG4gICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGRlZXAgPT09IHRydWVcbiAgICAgICAgICAmJiBjb3B5XG4gICAgICAgICAgJiYgKChjb3B5SXNBcnJheSA9IEFycmF5LmlzQXJyYXkoY29weSkpIHx8IGlzUGxhaW5PYmplY3QoY29weSkgPT09IHRydWUpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChjb3B5SXNBcnJheSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2xvbmUgPSBBcnJheS5pc0FycmF5KHNyYykgPT09IHRydWUgPyBzcmMgOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNsb25lID0gaXNQbGFpbk9iamVjdChzcmMpID09PSB0cnVlID8gc3JjIDoge31cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb3B5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IGNvcHlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IENhcmV0IGZyb20gJy4vZWRpdG9yLWNhcmV0LmpzJ1xuaW1wb3J0IHsgZ2V0VG9vbGJhciwgZ2V0Rm9udHMsIGdldExpbmtFZGl0b3IgfSBmcm9tICcuL2VkaXRvci11dGlscy5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VGdWxsc2NyZWVuLCB7IHVzZUZ1bGxzY3JlZW5Qcm9wcywgdXNlRnVsbHNjcmVlbkVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZnVsbHNjcmVlbi91c2UtZnVsbHNjcmVlbi5qcydcbmltcG9ydCB1c2VTcGxpdEF0dHJzIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1zcGxpdC1hdHRycy91c2Utc3BsaXQtYXR0cnMuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uLy4uL3V0aWxzL2V4dGVuZC9leHRlbmQuanMnXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmtleWJvYXJkL2tleS1jb21wb3NpdGlvbi5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRWRpdG9yJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VGdWxsc2NyZWVuUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcmVhZG9ubHk6IEJvb2xlYW4sXG4gICAgZGlzYWJsZTogQm9vbGVhbixcbiAgICBtaW5IZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcxMHJlbSdcbiAgICB9LFxuICAgIG1heEhlaWdodDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIGRlZmluaXRpb25zOiBPYmplY3QsXG4gICAgZm9udHM6IE9iamVjdCxcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuXG4gICAgdG9vbGJhcjoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gdi5sZW5ndGggPT09IDAgfHwgdi5ldmVyeShncm91cCA9PiBncm91cC5sZW5ndGgpLFxuICAgICAgLy8gbG9uZyBsaW5lIG9uIHB1cnBvc2UgZm9yIEFQSSB2YWxpZGF0aW9uIHB1cnBvc2VzOlxuICAgICAgZGVmYXVsdDogKCkgPT4gWyBbICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5JyBdLCBbICdib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJyBdLCBbICd1bmRvJywgJ3JlZG8nIF0gXVxuICAgIH0sXG4gICAgdG9vbGJhckNvbG9yOiBTdHJpbmcsXG4gICAgdG9vbGJhckJnOiBTdHJpbmcsXG4gICAgdG9vbGJhclRleHRDb2xvcjogU3RyaW5nLFxuICAgIHRvb2xiYXJUb2dnbGVDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICB0b29sYmFyT3V0bGluZTogQm9vbGVhbixcbiAgICB0b29sYmFyUHVzaDogQm9vbGVhbixcbiAgICB0b29sYmFyUm91bmRlZDogQm9vbGVhbixcblxuICAgIHBhcmFncmFwaFRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RpdicsICdwJyBdLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgY29udGVudFN0eWxlOiBPYmplY3QsXG4gICAgY29udGVudENsYXNzOiBbIE9iamVjdCwgQXJyYXksIFN0cmluZyBdLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZ1bGxzY3JlZW5FbWl0cyxcbiAgICAndXBkYXRlOm1vZGVsVmFsdWUnLFxuICAgICdrZXlkb3duJywgJ2NsaWNrJyxcbiAgICAnZm9jdXMnLCAnYmx1cicsXG4gICAgJ2Ryb3Bkb3duU2hvdycsXG4gICAgJ2Ryb3Bkb3duSGlkZScsXG4gICAgJ2Ryb3Bkb3duQmVmb3JlU2hvdycsXG4gICAgJ2Ryb3Bkb3duQmVmb3JlSGlkZScsXG4gICAgJ2xpbmtTaG93JyxcbiAgICAnbGlua0hpZGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IGluRnVsbHNjcmVlbiwgdG9nZ2xlRnVsbHNjcmVlbiB9ID0gdXNlRnVsbHNjcmVlbigpXG4gICAgY29uc3Qgc3BsaXRBdHRycyA9IHVzZVNwbGl0QXR0cnMoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGVkaXRMaW5rVXJsID0gcmVmKG51bGwpXG4gICAgY29uc3QgaXNWaWV3aW5nU291cmNlID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgZWRpdGFibGUgPSBjb21wdXRlZCgoKSA9PiAhcHJvcHMucmVhZG9ubHkgJiYgIXByb3BzLmRpc2FibGUpXG5cbiAgICBsZXQgZGVmYXVsdEZvbnQsIG9mZnNldEJvdHRvbVxuICAgIGxldCBsYXN0RW1pdCA9IHByb3BzLm1vZGVsVmFsdWVcblxuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdkZWZhdWx0UGFyYWdyYXBoU2VwYXJhdG9yJywgZmFsc2UsIHByb3BzLnBhcmFncmFwaFRhZylcbiAgICAgIGRlZmF1bHRGb250ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuZm9udEZhbWlseVxuICAgIH1cblxuICAgIGNvbnN0IHRvb2xiYXJCYWNrZ3JvdW5kQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy50b29sYmFyQmcgPyBgIGJnLSR7IHByb3BzLnRvb2xiYXJCZyB9YCA6ICcnXG4gICAgKSlcblxuICAgIGNvbnN0IGJ1dHRvblByb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZmxhdCA9IHByb3BzLnRvb2xiYXJPdXRsaW5lICE9PSB0cnVlXG4gICAgICAgICYmIHByb3BzLnRvb2xiYXJQdXNoICE9PSB0cnVlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdhJyxcbiAgICAgICAgZmxhdCxcbiAgICAgICAgbm9XcmFwOiB0cnVlLFxuICAgICAgICBvdXRsaW5lOiBwcm9wcy50b29sYmFyT3V0bGluZSxcbiAgICAgICAgcHVzaDogcHJvcHMudG9vbGJhclB1c2gsXG4gICAgICAgIHJvdW5kZWQ6IHByb3BzLnRvb2xiYXJSb3VuZGVkLFxuICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgY29sb3I6IHByb3BzLnRvb2xiYXJDb2xvcixcbiAgICAgICAgZGlzYWJsZTogIWVkaXRhYmxlLnZhbHVlLFxuICAgICAgICBzaXplOiAnc20nXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGJ1dHRvbkRlZiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGUgPSAkcS5sYW5nLmVkaXRvcixcbiAgICAgICAgaSA9ICRxLmljb25TZXQuZWRpdG9yXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJvbGQ6IHsgY21kOiAnYm9sZCcsIGljb246IGkuYm9sZCwgdGlwOiBlLmJvbGQsIGtleTogNjYgfSxcbiAgICAgICAgaXRhbGljOiB7IGNtZDogJ2l0YWxpYycsIGljb246IGkuaXRhbGljLCB0aXA6IGUuaXRhbGljLCBrZXk6IDczIH0sXG4gICAgICAgIHN0cmlrZTogeyBjbWQ6ICdzdHJpa2VUaHJvdWdoJywgaWNvbjogaS5zdHJpa2V0aHJvdWdoLCB0aXA6IGUuc3RyaWtldGhyb3VnaCwga2V5OiA4MyB9LFxuICAgICAgICB1bmRlcmxpbmU6IHsgY21kOiAndW5kZXJsaW5lJywgaWNvbjogaS51bmRlcmxpbmUsIHRpcDogZS51bmRlcmxpbmUsIGtleTogODUgfSxcbiAgICAgICAgdW5vcmRlcmVkOiB7IGNtZDogJ2luc2VydFVub3JkZXJlZExpc3QnLCBpY29uOiBpLnVub3JkZXJlZExpc3QsIHRpcDogZS51bm9yZGVyZWRMaXN0IH0sXG4gICAgICAgIG9yZGVyZWQ6IHsgY21kOiAnaW5zZXJ0T3JkZXJlZExpc3QnLCBpY29uOiBpLm9yZGVyZWRMaXN0LCB0aXA6IGUub3JkZXJlZExpc3QgfSxcbiAgICAgICAgc3Vic2NyaXB0OiB7IGNtZDogJ3N1YnNjcmlwdCcsIGljb246IGkuc3Vic2NyaXB0LCB0aXA6IGUuc3Vic2NyaXB0LCBodG1sVGlwOiAneDxzdWJzY3JpcHQ+Mjwvc3Vic2NyaXB0PicgfSxcbiAgICAgICAgc3VwZXJzY3JpcHQ6IHsgY21kOiAnc3VwZXJzY3JpcHQnLCBpY29uOiBpLnN1cGVyc2NyaXB0LCB0aXA6IGUuc3VwZXJzY3JpcHQsIGh0bWxUaXA6ICd4PHN1cGVyc2NyaXB0PjI8L3N1cGVyc2NyaXB0PicgfSxcbiAgICAgICAgbGluazogeyBjbWQ6ICdsaW5rJywgZGlzYWJsZTogZVZtID0+IGVWbS5jYXJldCAmJiAhZVZtLmNhcmV0LmNhbignbGluaycpLCBpY29uOiBpLmh5cGVybGluaywgdGlwOiBlLmh5cGVybGluaywga2V5OiA3NiB9LFxuICAgICAgICBmdWxsc2NyZWVuOiB7IGNtZDogJ2Z1bGxzY3JlZW4nLCBpY29uOiBpLnRvZ2dsZUZ1bGxzY3JlZW4sIHRpcDogZS50b2dnbGVGdWxsc2NyZWVuLCBrZXk6IDcwIH0sXG4gICAgICAgIHZpZXdzb3VyY2U6IHsgY21kOiAndmlld3NvdXJjZScsIGljb246IGkudmlld1NvdXJjZSwgdGlwOiBlLnZpZXdTb3VyY2UgfSxcblxuICAgICAgICBxdW90ZTogeyBjbWQ6ICdmb3JtYXRCbG9jaycsIHBhcmFtOiAnQkxPQ0tRVU9URScsIGljb246IGkucXVvdGUsIHRpcDogZS5xdW90ZSwga2V5OiA4MSB9LFxuICAgICAgICBsZWZ0OiB7IGNtZDogJ2p1c3RpZnlMZWZ0JywgaWNvbjogaS5sZWZ0LCB0aXA6IGUubGVmdCB9LFxuICAgICAgICBjZW50ZXI6IHsgY21kOiAnanVzdGlmeUNlbnRlcicsIGljb246IGkuY2VudGVyLCB0aXA6IGUuY2VudGVyIH0sXG4gICAgICAgIHJpZ2h0OiB7IGNtZDogJ2p1c3RpZnlSaWdodCcsIGljb246IGkucmlnaHQsIHRpcDogZS5yaWdodCB9LFxuICAgICAgICBqdXN0aWZ5OiB7IGNtZDogJ2p1c3RpZnlGdWxsJywgaWNvbjogaS5qdXN0aWZ5LCB0aXA6IGUuanVzdGlmeSB9LFxuXG4gICAgICAgIHByaW50OiB7IHR5cGU6ICduby1zdGF0ZScsIGNtZDogJ3ByaW50JywgaWNvbjogaS5wcmludCwgdGlwOiBlLnByaW50LCBrZXk6IDgwIH0sXG4gICAgICAgIG91dGRlbnQ6IHsgdHlwZTogJ25vLXN0YXRlJywgZGlzYWJsZTogZVZtID0+IGVWbS5jYXJldCAmJiAhZVZtLmNhcmV0LmNhbignb3V0ZGVudCcpLCBjbWQ6ICdvdXRkZW50JywgaWNvbjogaS5vdXRkZW50LCB0aXA6IGUub3V0ZGVudCB9LFxuICAgICAgICBpbmRlbnQ6IHsgdHlwZTogJ25vLXN0YXRlJywgZGlzYWJsZTogZVZtID0+IGVWbS5jYXJldCAmJiAhZVZtLmNhcmV0LmNhbignaW5kZW50JyksIGNtZDogJ2luZGVudCcsIGljb246IGkuaW5kZW50LCB0aXA6IGUuaW5kZW50IH0sXG4gICAgICAgIHJlbW92ZUZvcm1hdDogeyB0eXBlOiAnbm8tc3RhdGUnLCBjbWQ6ICdyZW1vdmVGb3JtYXQnLCBpY29uOiBpLnJlbW92ZUZvcm1hdCwgdGlwOiBlLnJlbW92ZUZvcm1hdCB9LFxuICAgICAgICBocjogeyB0eXBlOiAnbm8tc3RhdGUnLCBjbWQ6ICdpbnNlcnRIb3Jpem9udGFsUnVsZScsIGljb246IGkuaHIsIHRpcDogZS5ociB9LFxuICAgICAgICB1bmRvOiB7IHR5cGU6ICduby1zdGF0ZScsIGNtZDogJ3VuZG8nLCBpY29uOiBpLnVuZG8sIHRpcDogZS51bmRvLCBrZXk6IDkwIH0sXG4gICAgICAgIHJlZG86IHsgdHlwZTogJ25vLXN0YXRlJywgY21kOiAncmVkbycsIGljb246IGkucmVkbywgdGlwOiBlLnJlZG8sIGtleTogODkgfSxcblxuICAgICAgICBoMTogeyBjbWQ6ICdmb3JtYXRCbG9jaycsIHBhcmFtOiAnSDEnLCBpY29uOiBpLmhlYWRpbmcxIHx8IGkuaGVhZGluZywgdGlwOiBlLmhlYWRpbmcxLCBodG1sVGlwOiBgPGgxIGNsYXNzPVwicS1tYS1ub25lXCI+JHsgZS5oZWFkaW5nMSB9PC9oMT5gIH0sXG4gICAgICAgIGgyOiB7IGNtZDogJ2Zvcm1hdEJsb2NrJywgcGFyYW06ICdIMicsIGljb246IGkuaGVhZGluZzIgfHwgaS5oZWFkaW5nLCB0aXA6IGUuaGVhZGluZzIsIGh0bWxUaXA6IGA8aDIgY2xhc3M9XCJxLW1hLW5vbmVcIj4keyBlLmhlYWRpbmcyIH08L2gyPmAgfSxcbiAgICAgICAgaDM6IHsgY21kOiAnZm9ybWF0QmxvY2snLCBwYXJhbTogJ0gzJywgaWNvbjogaS5oZWFkaW5nMyB8fCBpLmhlYWRpbmcsIHRpcDogZS5oZWFkaW5nMywgaHRtbFRpcDogYDxoMyBjbGFzcz1cInEtbWEtbm9uZVwiPiR7IGUuaGVhZGluZzMgfTwvaDM+YCB9LFxuICAgICAgICBoNDogeyBjbWQ6ICdmb3JtYXRCbG9jaycsIHBhcmFtOiAnSDQnLCBpY29uOiBpLmhlYWRpbmc0IHx8IGkuaGVhZGluZywgdGlwOiBlLmhlYWRpbmc0LCBodG1sVGlwOiBgPGg0IGNsYXNzPVwicS1tYS1ub25lXCI+JHsgZS5oZWFkaW5nNCB9PC9oND5gIH0sXG4gICAgICAgIGg1OiB7IGNtZDogJ2Zvcm1hdEJsb2NrJywgcGFyYW06ICdINScsIGljb246IGkuaGVhZGluZzUgfHwgaS5oZWFkaW5nLCB0aXA6IGUuaGVhZGluZzUsIGh0bWxUaXA6IGA8aDUgY2xhc3M9XCJxLW1hLW5vbmVcIj4keyBlLmhlYWRpbmc1IH08L2g1PmAgfSxcbiAgICAgICAgaDY6IHsgY21kOiAnZm9ybWF0QmxvY2snLCBwYXJhbTogJ0g2JywgaWNvbjogaS5oZWFkaW5nNiB8fCBpLmhlYWRpbmcsIHRpcDogZS5oZWFkaW5nNiwgaHRtbFRpcDogYDxoNiBjbGFzcz1cInEtbWEtbm9uZVwiPiR7IGUuaGVhZGluZzYgfTwvaDY+YCB9LFxuICAgICAgICBwOiB7IGNtZDogJ2Zvcm1hdEJsb2NrJywgcGFyYW06IHByb3BzLnBhcmFncmFwaFRhZywgaWNvbjogaS5oZWFkaW5nLCB0aXA6IGUucGFyYWdyYXBoIH0sXG4gICAgICAgIGNvZGU6IHsgY21kOiAnZm9ybWF0QmxvY2snLCBwYXJhbTogJ1BSRScsIGljb246IGkuY29kZSwgaHRtbFRpcDogYDxjb2RlPiR7IGUuY29kZSB9PC9jb2RlPmAgfSxcblxuICAgICAgICAnc2l6ZS0xJzogeyBjbWQ6ICdmb250U2l6ZScsIHBhcmFtOiAnMScsIGljb246IGkuc2l6ZTEgfHwgaS5zaXplLCB0aXA6IGUuc2l6ZTEsIGh0bWxUaXA6IGA8Zm9udCBzaXplPVwiMVwiPiR7IGUuc2l6ZTEgfTwvZm9udD5gIH0sXG4gICAgICAgICdzaXplLTInOiB7IGNtZDogJ2ZvbnRTaXplJywgcGFyYW06ICcyJywgaWNvbjogaS5zaXplMiB8fCBpLnNpemUsIHRpcDogZS5zaXplMiwgaHRtbFRpcDogYDxmb250IHNpemU9XCIyXCI+JHsgZS5zaXplMiB9PC9mb250PmAgfSxcbiAgICAgICAgJ3NpemUtMyc6IHsgY21kOiAnZm9udFNpemUnLCBwYXJhbTogJzMnLCBpY29uOiBpLnNpemUzIHx8IGkuc2l6ZSwgdGlwOiBlLnNpemUzLCBodG1sVGlwOiBgPGZvbnQgc2l6ZT1cIjNcIj4keyBlLnNpemUzIH08L2ZvbnQ+YCB9LFxuICAgICAgICAnc2l6ZS00JzogeyBjbWQ6ICdmb250U2l6ZScsIHBhcmFtOiAnNCcsIGljb246IGkuc2l6ZTQgfHwgaS5zaXplLCB0aXA6IGUuc2l6ZTQsIGh0bWxUaXA6IGA8Zm9udCBzaXplPVwiNFwiPiR7IGUuc2l6ZTQgfTwvZm9udD5gIH0sXG4gICAgICAgICdzaXplLTUnOiB7IGNtZDogJ2ZvbnRTaXplJywgcGFyYW06ICc1JywgaWNvbjogaS5zaXplNSB8fCBpLnNpemUsIHRpcDogZS5zaXplNSwgaHRtbFRpcDogYDxmb250IHNpemU9XCI1XCI+JHsgZS5zaXplNSB9PC9mb250PmAgfSxcbiAgICAgICAgJ3NpemUtNic6IHsgY21kOiAnZm9udFNpemUnLCBwYXJhbTogJzYnLCBpY29uOiBpLnNpemU2IHx8IGkuc2l6ZSwgdGlwOiBlLnNpemU2LCBodG1sVGlwOiBgPGZvbnQgc2l6ZT1cIjZcIj4keyBlLnNpemU2IH08L2ZvbnQ+YCB9LFxuICAgICAgICAnc2l6ZS03JzogeyBjbWQ6ICdmb250U2l6ZScsIHBhcmFtOiAnNycsIGljb246IGkuc2l6ZTcgfHwgaS5zaXplLCB0aXA6IGUuc2l6ZTcsIGh0bWxUaXA6IGA8Zm9udCBzaXplPVwiN1wiPiR7IGUuc2l6ZTcgfTwvZm9udD5gIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgYnV0dG9ucyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHVzZXJEZWYgPSBwcm9wcy5kZWZpbml0aW9ucyB8fCB7fVxuICAgICAgY29uc3QgZGVmID0gcHJvcHMuZGVmaW5pdGlvbnMgfHwgcHJvcHMuZm9udHNcbiAgICAgICAgPyBleHRlbmQoXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBidXR0b25EZWYudmFsdWUsXG4gICAgICAgICAgdXNlckRlZixcbiAgICAgICAgICBnZXRGb250cyhcbiAgICAgICAgICAgIGRlZmF1bHRGb250LFxuICAgICAgICAgICAgJHEubGFuZy5lZGl0b3IuZGVmYXVsdEZvbnQsXG4gICAgICAgICAgICAkcS5pY29uU2V0LmVkaXRvci5mb250LFxuICAgICAgICAgICAgcHJvcHMuZm9udHNcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgOiBidXR0b25EZWYudmFsdWVcblxuICAgICAgcmV0dXJuIHByb3BzLnRvb2xiYXIubWFwKFxuICAgICAgICBncm91cCA9PiBncm91cC5tYXAodG9rZW4gPT4ge1xuICAgICAgICAgIGlmICh0b2tlbi5vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiAnZHJvcGRvd24nLFxuICAgICAgICAgICAgICBpY29uOiB0b2tlbi5pY29uLFxuICAgICAgICAgICAgICBsYWJlbDogdG9rZW4ubGFiZWwsXG4gICAgICAgICAgICAgIHNpemU6ICdzbScsXG4gICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBmaXhlZExhYmVsOiB0b2tlbi5maXhlZExhYmVsLFxuICAgICAgICAgICAgICBmaXhlZEljb246IHRva2VuLmZpeGVkSWNvbixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0OiB0b2tlbi5oaWdobGlnaHQsXG4gICAgICAgICAgICAgIGxpc3Q6IHRva2VuLmxpc3QsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHRva2VuLm9wdGlvbnMubWFwKGl0ZW0gPT4gZGVmWyBpdGVtIF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb2JqID0gZGVmWyB0b2tlbiBdXG5cbiAgICAgICAgICBpZiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLnR5cGUgPT09ICduby1zdGF0ZScgfHwgKHVzZXJEZWZbIHRva2VuIF0gJiYgKFxuICAgICAgICAgICAgICBvYmouY21kID09PSB2b2lkIDAgfHwgKGJ1dHRvbkRlZi52YWx1ZVsgb2JqLmNtZCBdICYmIGJ1dHRvbkRlZi52YWx1ZVsgb2JqLmNtZCBdLnR5cGUgPT09ICduby1zdGF0ZScpXG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgICA6IE9iamVjdC5hc3NpZ24oeyB0eXBlOiAndG9nZ2xlJyB9LCBvYmopXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3Nsb3QnLFxuICAgICAgICAgICAgICBzbG90OiB0b2tlblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9KVxuXG4gICAgY29uc3QgZVZtID0ge1xuICAgICAgJHEsXG4gICAgICBwcm9wcyxcbiAgICAgIHNsb3RzLFxuICAgICAgZW1pdCxcbiAgICAgIC8vIGNhcmV0ICh3aWxsIGdldCBpbmplY3RlZCBhZnRlciBtb3VudClcbiAgICAgIGluRnVsbHNjcmVlbixcbiAgICAgIHRvZ2dsZUZ1bGxzY3JlZW4sXG4gICAgICBydW5DbWQsXG4gICAgICBpc1ZpZXdpbmdTb3VyY2UsXG4gICAgICBlZGl0TGlua1VybCxcbiAgICAgIHRvb2xiYXJCYWNrZ3JvdW5kQ2xhc3MsXG4gICAgICBidXR0b25Qcm9wcyxcbiAgICAgIGNvbnRlbnRSZWYsXG4gICAgICBidXR0b25zLFxuICAgICAgc2V0Q29udGVudFxuICAgIH1cblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHYgPT4ge1xuICAgICAgaWYgKGxhc3RFbWl0ICE9PSB2KSB7XG4gICAgICAgIGxhc3RFbWl0ID0gdlxuICAgICAgICBzZXRDb250ZW50KHYsIHRydWUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKGVkaXRMaW5rVXJsLCB2ID0+IHtcbiAgICAgIGVtaXQoYGxpbmskeyB2ID8gJ1Nob3cnIDogJ0hpZGUnIH1gKVxuICAgIH0pXG5cbiAgICBjb25zdCBoYXNUb29sYmFyID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudG9vbGJhciAmJiBwcm9wcy50b29sYmFyLmxlbmd0aCAhPT0gMClcblxuICAgIGNvbnN0IGtleXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBrID0ge30sXG4gICAgICAgIGFkZCA9IGJ0biA9PiB7XG4gICAgICAgICAgaWYgKGJ0bi5rZXkpIHtcbiAgICAgICAgICAgIGtbIGJ0bi5rZXkgXSA9IHtcbiAgICAgICAgICAgICAgY21kOiBidG4uY21kLFxuICAgICAgICAgICAgICBwYXJhbTogYnRuLnBhcmFtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIGJ1dHRvbnMudmFsdWUuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGdyb3VwLmZvckVhY2godG9rZW4gPT4ge1xuICAgICAgICAgIGlmICh0b2tlbi5vcHRpb25zKSB7XG4gICAgICAgICAgICB0b2tlbi5vcHRpb25zLmZvckVhY2goYWRkKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFkZCh0b2tlbilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGtcbiAgICB9KVxuXG4gICAgY29uc3QgaW5uZXJTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIGluRnVsbHNjcmVlbi52YWx1ZVxuICAgICAgICA/IHByb3BzLmNvbnRlbnRTdHlsZVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbWluSGVpZ2h0OiBwcm9wcy5taW5IZWlnaHQsXG4gICAgICAgICAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb3BzLmNvbnRlbnRTdHlsZVxuICAgICAgICAgIF1cbiAgICApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1lZGl0b3IgcS1lZGl0b3ItLSR7IGlzVmlld2luZ1NvdXJjZS52YWx1ZSA9PT0gdHJ1ZSA/ICdzb3VyY2UnIDogJ2RlZmF1bHQnIH1gXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICsgKGluRnVsbHNjcmVlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgZnVsbHNjcmVlbiBjb2x1bW4nIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZWRpdG9yLS1zcXVhcmUgbm8tYm9yZGVyLXJhZGl1cycgOiAnJylcbiAgICAgICsgKHByb3BzLmZsYXQgPT09IHRydWUgPyAnIHEtZWRpdG9yLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtZWRpdG9yLS1kZW5zZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1lZGl0b3ItLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoW1xuICAgICAgcHJvcHMuY29udGVudENsYXNzLFxuICAgICAgJ3EtZWRpdG9yX19jb250ZW50JyxcbiAgICAgIHsgY29sOiBpbkZ1bGxzY3JlZW4udmFsdWUsICdvdmVyZmxvdy1hdXRvJzogaW5GdWxsc2NyZWVuLnZhbHVlIHx8IHByb3BzLm1heEhlaWdodCB9XG4gICAgXSkpXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGZ1bmN0aW9uIG9uSW5wdXQgKCkge1xuICAgICAgaWYgKGNvbnRlbnRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IGBpbm5lciR7IGlzVmlld2luZ1NvdXJjZS52YWx1ZSA9PT0gdHJ1ZSA/ICdUZXh0JyA6ICdIVE1MJyB9YFxuICAgICAgICBjb25zdCB2YWwgPSBjb250ZW50UmVmLnZhbHVlWyBwcm9wIF1cblxuICAgICAgICBpZiAodmFsICE9PSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgICAgICAgbGFzdEVtaXQgPSB2YWxcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93biAoZSkge1xuICAgICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICAgIGlmIChlLmN0cmxLZXkgIT09IHRydWUgfHwgc2hvdWxkSWdub3JlS2V5KGUpID09PSB0cnVlKSB7XG4gICAgICAgIHJlZnJlc2hUb29sYmFyKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZVxuICAgICAgY29uc3QgdGFyZ2V0ID0ga2V5cy52YWx1ZVsga2V5IF1cbiAgICAgIGlmICh0YXJnZXQgIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCB7IGNtZCwgcGFyYW0gfSA9IHRhcmdldFxuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBydW5DbWQoY21kLCBwYXJhbSwgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgcmVmcmVzaFRvb2xiYXIoKVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1ciAoZSkge1xuICAgICAgaWYgKGNvbnRlbnRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AsIHNjcm9sbEhlaWdodCB9ID0gY29udGVudFJlZi52YWx1ZVxuICAgICAgICBvZmZzZXRCb3R0b20gPSBzY3JvbGxIZWlnaHQgLSBzY3JvbGxUb3BcbiAgICAgIH1cbiAgICAgIGVWbS5jYXJldC5zYXZlKClcbiAgICAgIGVtaXQoJ2JsdXInLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXMgKGUpIHtcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKGNvbnRlbnRSZWYudmFsdWUgIT09IG51bGwgJiYgb2Zmc2V0Qm90dG9tICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb250ZW50UmVmLnZhbHVlLnNjcm9sbFRvcCA9IGNvbnRlbnRSZWYudmFsdWUuc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0Qm90dG9tXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBlbWl0KCdmb2N1cycsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c2luIChlKSB7XG4gICAgICBjb25zdCByb290ID0gcm9vdFJlZi52YWx1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIHJvb3QgIT09IG51bGxcbiAgICAgICAgJiYgcm9vdC5jb250YWlucyhlLnRhcmdldCkgPT09IHRydWVcbiAgICAgICAgJiYgKFxuICAgICAgICAgIGUucmVsYXRlZFRhcmdldCA9PT0gbnVsbFxuICAgICAgICAgIHx8IHJvb3QuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSAhPT0gdHJ1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IGBpbm5lciR7IGlzVmlld2luZ1NvdXJjZS52YWx1ZSA9PT0gdHJ1ZSA/ICdUZXh0JyA6ICdIVE1MJyB9YFxuICAgICAgICBlVm0uY2FyZXQucmVzdG9yZVBvc2l0aW9uKGNvbnRlbnRSZWYudmFsdWVbIHByb3AgXS5sZW5ndGgpXG4gICAgICAgIHJlZnJlc2hUb29sYmFyKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3Vzb3V0IChlKSB7XG4gICAgICBjb25zdCByb290ID0gcm9vdFJlZi52YWx1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIHJvb3QgIT09IG51bGxcbiAgICAgICAgJiYgcm9vdC5jb250YWlucyhlLnRhcmdldCkgPT09IHRydWVcbiAgICAgICAgJiYgKFxuICAgICAgICAgIGUucmVsYXRlZFRhcmdldCA9PT0gbnVsbFxuICAgICAgICAgIHx8IHJvb3QuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSAhPT0gdHJ1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgZVZtLmNhcmV0LnNhdmVQb3NpdGlvbigpXG4gICAgICAgIHJlZnJlc2hUb29sYmFyKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBvaW50ZXJTdGFydCAoKSB7XG4gICAgICBvZmZzZXRCb3R0b20gPSB2b2lkIDBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNlbGVjdGlvbmNoYW5nZSAoZSkge1xuICAgICAgZVZtLmNhcmV0LnNhdmUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldENvbnRlbnQgKHYsIHJlc3RvcmVQb3NpdGlvbikge1xuICAgICAgaWYgKGNvbnRlbnRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHJlc3RvcmVQb3NpdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGVWbS5jYXJldC5zYXZlUG9zaXRpb24oKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcCA9IGBpbm5lciR7IGlzVmlld2luZ1NvdXJjZS52YWx1ZSA9PT0gdHJ1ZSA/ICdUZXh0JyA6ICdIVE1MJyB9YFxuICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBwcm9wIF0gPSB2XG5cbiAgICAgICAgaWYgKHJlc3RvcmVQb3NpdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGVWbS5jYXJldC5yZXN0b3JlUG9zaXRpb24oY29udGVudFJlZi52YWx1ZVsgcHJvcCBdLmxlbmd0aClcbiAgICAgICAgICByZWZyZXNoVG9vbGJhcigpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5DbWQgKGNtZCwgcGFyYW0sIHVwZGF0ZSA9IHRydWUpIHtcbiAgICAgIGZvY3VzKClcbiAgICAgIGVWbS5jYXJldC5yZXN0b3JlKClcbiAgICAgIGVWbS5jYXJldC5hcHBseShjbWQsIHBhcmFtLCAoKSA9PiB7XG4gICAgICAgIGZvY3VzKClcbiAgICAgICAgZVZtLmNhcmV0LnNhdmUoKVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgcmVmcmVzaFRvb2xiYXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hUb29sYmFyICgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlZGl0TGlua1VybC52YWx1ZSA9IG51bGxcbiAgICAgICAgcHJveHkuJGZvcmNlVXBkYXRlKClcbiAgICAgIH0sIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGNvbnRlbnRSZWYudmFsdWUgIT09IG51bGwgJiYgY29udGVudFJlZi52YWx1ZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudEVsICgpIHtcbiAgICAgIHJldHVybiBjb250ZW50UmVmLnZhbHVlXG4gICAgfVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGVWbS5jYXJldCA9IHByb3h5LmNhcmV0ID0gbmV3IENhcmV0KGNvbnRlbnRSZWYudmFsdWUsIGVWbSlcbiAgICAgIHNldENvbnRlbnQocHJvcHMubW9kZWxWYWx1ZSlcbiAgICAgIHJlZnJlc2hUb29sYmFyKClcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgb25TZWxlY3Rpb25jaGFuZ2UpXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBvblNlbGVjdGlvbmNoYW5nZSlcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgcnVuQ21kLCByZWZyZXNoVG9vbGJhciwgZm9jdXMsIGdldENvbnRlbnRFbFxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGV0IHRvb2xiYXJzXG5cbiAgICAgIGlmIChoYXNUb29sYmFyLnZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGJhcnMgPSBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAga2V5OiAncWVkdF90b3AnLFxuICAgICAgICAgICAgY2xhc3M6ICdxLWVkaXRvcl9fdG9vbGJhciByb3cgbm8td3JhcCBzY3JvbGwteCdcbiAgICAgICAgICAgICAgKyB0b29sYmFyQmFja2dyb3VuZENsYXNzLnZhbHVlXG4gICAgICAgICAgfSwgZ2V0VG9vbGJhcihlVm0pKVxuICAgICAgICBdXG5cbiAgICAgICAgZWRpdExpbmtVcmwudmFsdWUgIT09IG51bGwgJiYgYmFycy5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGtleTogJ3FlZHRfYnRtJyxcbiAgICAgICAgICAgIGNsYXNzOiAncS1lZGl0b3JfX3Rvb2xiYXIgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHNjcm9sbC14J1xuICAgICAgICAgICAgICArIHRvb2xiYXJCYWNrZ3JvdW5kQ2xhc3MudmFsdWVcbiAgICAgICAgICB9LCBnZXRMaW5rRWRpdG9yKGVWbSkpXG4gICAgICAgIClcblxuICAgICAgICB0b29sYmFycyA9IGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICd0b29sYmFyX2N0YWluZXInLFxuICAgICAgICAgIGNsYXNzOiAncS1lZGl0b3JfX3Rvb2xiYXJzLWNvbnRhaW5lcidcbiAgICAgICAgfSwgYmFycylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHsgaGVpZ2h0OiBpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUgPyAnMTAwJScgOiBudWxsIH0sXG4gICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgIG9uRm9jdXNpbixcbiAgICAgICAgb25Gb2N1c291dFxuICAgICAgfSwgW1xuICAgICAgICB0b29sYmFycyxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBjb250ZW50UmVmLFxuICAgICAgICAgIHN0eWxlOiBpbm5lclN0eWxlLnZhbHVlLFxuICAgICAgICAgIGNsYXNzOiBpbm5lckNsYXNzLnZhbHVlLFxuICAgICAgICAgIGNvbnRlbnRlZGl0YWJsZTogZWRpdGFibGUudmFsdWUsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgIC4uLihfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgICAgICAgID8geyBpbm5lckhUTUw6IHByb3BzLm1vZGVsVmFsdWUgfVxuICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgLi4uc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgICAgb25JbnB1dCxcbiAgICAgICAgICBvbktleWRvd24sXG4gICAgICAgICAgb25DbGljayxcbiAgICAgICAgICBvbkJsdXIsXG4gICAgICAgICAgb25Gb2N1cyxcblxuICAgICAgICAgIC8vIGNsZWFuIHNhdmVkIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICAgIG9uTW91c2Vkb3duOiBvblBvaW50ZXJTdGFydCxcbiAgICAgICAgICBvblRvdWNoc3RhcnRQYXNzaXZlOiBvblBvaW50ZXJTdGFydFxuICAgICAgICB9KVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSAncXVhc2FyJztcbmltcG9ydCB7IEV4ZXJjaXNlLCB0eXBlIFZvaWNlTm90ZSB9IGZyb20gJ3NyYy9jb21wb25lbnRzL21vZGVscyc7XG5pbXBvcnQgeyBleGVyY2lzZUNvdW50IH0gZnJvbSAnc3JjL2NvbXBvbmVudHMvc3RhdGUnO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHVzZVJvdXRlLCB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCBBdWRpb1BsYXllciBmcm9tICdzcmMvY29tcG9uZW50cy9BdWRpb1BsYXllci52dWUnO1xuXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKClcbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5jb25zdCBzdWJtaXR0ZWQgPSByZWYoZmFsc2UpXG5cbmxldCBleGVyY2lzZURldGFpbHMgPSBFeGVyY2lzZS5nZXQoTnVtYmVyLnBhcnNlSW50KHJvdXRlLnBhcmFtcy5pZCBhcyBzdHJpbmcpKVxuXG4vLyBzcHJlYWRlciB0byBzdG9wIHR5cGVzY3JpcHQgZm9ybSBjb21wbGFpbmluZ1xuY29uc3QgZm9ybURldGFpbHMgPSByZWYoeyAuLi5leGVyY2lzZURldGFpbHMgfSlcblxuY29uc3QgdGl0bGUgPSByZWYoJ0VkaXQgZXhlcmNpc2UnKVxuXG5pZiAoIWV4ZXJjaXNlRGV0YWlscykge1xuICBleGVyY2lzZURldGFpbHMgPSBFeGVyY2lzZS5jcmVhdGUodW5kZWZpbmVkLCBmYWxzZSlcbiAgdGl0bGUudmFsdWUgPSAnQ3JlYXRlIGV4ZXJjaXNlJ1xufSBlbHNlIHtcbiAgZXhlcmNpc2VEZXRhaWxzID0gRXhlcmNpc2UuY3JlYXRlKGV4ZXJjaXNlRGV0YWlscylcbn1cblxuZnVuY3Rpb24gc3RyaXBIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoLzxbXj5dKj4/L2dtLCAnJyk7XG59XG5cbmZ1bmN0aW9uIHNhdmVFeGVyY2lzZSgpIHtcbiAgc3VibWl0dGVkLnZhbHVlID0gdHJ1ZVxuICBpZiAoIXZhbGlkYXRlRm9ybSgpKSB7XG4gICAgTm90aWZ5LmNyZWF0ZSgnRm9ybSBjYW5ub3QgYmUgdmFsaWRhdGVkLiBwbGVhc2UgZG91YmxlIGNoZWNrIGFsbCByZXF1aXJlZCBmaWVsZHMnKVxuICAgIHJldHVyblxuICB9XG4gIGZvcm1EZXRhaWxzLnZhbHVlLmRlc2NyaXB0aW9uID0gc3RyaXBIdG1sKGZvcm1EZXRhaWxzLnZhbHVlLmRlc2NyaXB0aW9uISlcbiAgaWYgKHJlY29yZGVkQXVkaW8udmFsdWUpIGZvcm1EZXRhaWxzLnZhbHVlLnZvaWNlTm90ZSA9IHJlY29yZGVkQXVkaW8udmFsdWVcbiAgRXhlcmNpc2UuY3JlYXRlKGZvcm1EZXRhaWxzLnZhbHVlKVxuICBOb3RpZnkuY3JlYXRlKCdTYXZlZCBzdWNjZXNzZnVsbHknKVxuICBpZiAodGl0bGUudmFsdWUgIT0gJ0VkaXQgZXhlcmNpc2UnKSBleGVyY2lzZUNvdW50LnZhbHVlICs9IDFcbiAgcm91dGVyLmdvKC0xKVxufVxuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlRm9ybSgpIHtcbiAgcmV0dXJuICEhZm9ybURldGFpbHMudmFsdWUubmFtZSAmJiAhIXN0cmlwSHRtbChmb3JtRGV0YWlscy52YWx1ZS5kZXNjcmlwdGlvbiBhcyBzdHJpbmcpXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUV4ZXJjaXNlKCkge1xuICBleGVyY2lzZURldGFpbHMhLmRlbGV0ZSgpXG4gIE5vdGlmeS5jcmVhdGUoJ0V4ZXJjaXNlIGRlbGV0ZWQnKVxuICBleGVyY2lzZUNvdW50LnZhbHVlIC09IDFcbiAgcm91dGVyLmdvKC0xKVxufVxuXG5cbmlmICghZm9ybURldGFpbHMudmFsdWUuZGVzY3JpcHRpb24hKSBmb3JtRGV0YWlscy52YWx1ZS5kZXNjcmlwdGlvbiA9ICcnXG5cbmZ1bmN0aW9uIGRlY29kZUh0bWxFbnRpdGllcyhodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCB0eHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICB0eHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgcmV0dXJuIHR4dC52YWx1ZTtcbn1cbmNvbnN0IHJlY29yZGVkQXVkaW8gPSByZWY8Vm9pY2VOb3RlPigpXG5yZWNvcmRlZEF1ZGlvLnZhbHVlID0gZXhlcmNpc2VEZXRhaWxzLnZvaWNlTm90ZVxuXG5mdW5jdGlvbiBzYXZlQXVkaW8oYXVkaW86IFZvaWNlTm90ZSkge1xuICByZWNvcmRlZEF1ZGlvLnZhbHVlID0gYXVkaW9cbn1cblxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGgxPnt7IHRpdGxlIH19PC9oMT5cbiAgPGZvcm0gY2xhc3M9XCJxLWd1dHRlZC1tZCBxLWNhcmQtLWJvcmRlcmVkIHEtbGF5b3V0LXBhZGRpbmcgXCI+XG4gICAgPHEtaW5wdXQgdi1tb2RlbD1cImZvcm1EZXRhaWxzIS5uYW1lXCIgbGFiZWw9XCJOYW1lXCIgc3RhY2stbGFiZWwgcmVxdWlyZWQgOnJ1bGVzPVwiW3ZhbCA9PiAhIXZhbCB8fCAnTmFtZSBpcyByZXF1aXJlZCddXCJcbiAgICAgIDplcnJvcj1cInN1Ym1pdHRlZCAmJiAhZm9ybURldGFpbHM/Lm5hbWVcIiAvPlxuXG4gICAgPGRpdiBjbGFzcz1cInEtbXQtbWRcIj5cbiAgICAgIDxsYWJlbCBjbGFzcz1cInRleHQtY2FwdGlvblwiPkRlc2NyaXB0aW9uICo8L2xhYmVsPlxuICAgICAgPHEtZWRpdG9yIDptb2RlbC12YWx1ZT1cImRlY29kZUh0bWxFbnRpdGllcyhmb3JtRGV0YWlscyEuZGVzY3JpcHRpb24hKVwiXG4gICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIodmFsKSA9PiBmb3JtRGV0YWlscyEuZGVzY3JpcHRpb24gPSB2YWxcIiBjbGFzcz1cInEtbXQteHNcIlxuICAgICAgICA6Y2xhc3M9XCJ7ICdxLWVkaXRvci1lcnJvcic6IHN1Ym1pdHRlZCAmJiAhZm9ybURldGFpbHM/LmRlc2NyaXB0aW9uIH1cIiBzdHlsZT1cIndoaXRlLXNwYWNlOiBwcmUtd3JhcDtcIiAvPlxuICAgICAgPGRpdiB2LWlmPVwic3VibWl0dGVkICYmICFmb3JtRGV0YWlscz8uZGVzY3JpcHRpb25cIiBjbGFzcz1cInRleHQtbmVnYXRpdmUgcS1tdC14c1wiPlxuICAgICAgICBEZXNjcmlwdGlvbiBpcyByZXF1aXJlZFxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZFwiPlxuICAgICAgPHA+UmVjb3JkIGEgdm9pY2UgZXhwbGFuYXRpb246PC9wPlxuICAgICAgPEF1ZGlvUGxheWVyIDp2b2ljZS1ub3RlPVwicmVjb3JkZWRBdWRpb1wiIEBhdWRpby1yZWNvcmRlZD1cInNhdmVBdWRpb1wiIC8+XG4gICAgPC9kaXY+XG5cblxuICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnXCI+XG4gICAgICA8cS1idG4gQGNsaWNrPVwic2F2ZUV4ZXJjaXNlXCIgY29sb3I9XCJhY2NlbnRcIj5TYXZlPC9xLWJ0bj5cbiAgICAgIDxxLWJ0biBAY2xpY2s9XCJyb3V0ZXIuZ28oLTEpLCBOb3RpZnkuY3JlYXRlKCdObyBjaGFuZ2VzIHdlcmUgbWFkZS4nKVwiIGNsYXNzPVwicS1tbC1zbVwiPkNhbmNlbDwvcS1idG4+XG4gICAgICA8cS1idG4gdi1pZj1cInRpdGxlID09ICdFZGl0IGV4ZXJjaXNlJ1wiIEBjbGljaz1cImRlbGV0ZUV4ZXJjaXNlXCI+REVMRVRFPC9xLWJ0bj5cbiAgICA8L2Rpdj5cbiAgPC9mb3JtPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnEtZWRpdG9yLWVycm9yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MxMDAxNTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJoYW5kbGVycyIsImJ0biIsImVWbSIsIm9uS2V5ZG93biIsIm9uQmx1ciIsInVwZGF0ZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlVk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVCbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsU0FBUyxnQkFBaUIsSUFBSSxRQUFRO0FBQ3BDLE1BQUksVUFBVSxPQUFPLFFBQVE7QUFDM0IsV0FBTztBQUFBLEVBQ1g7QUFFRSxRQUFNLFdBQVcsR0FBRyxTQUFTLFlBQVc7QUFFeEMsTUFBSSxDQUFFLE9BQU8sTUFBTSxNQUFNLE1BQU0sWUFBWSxFQUFHLFNBQVMsUUFBUSxNQUFNLE1BQU07QUFDekUsV0FBTztBQUFBLEVBQ1g7QUFFRSxRQUNFLFFBQVEsT0FBTyxtQkFDWCxPQUFPLGlCQUFpQixFQUFFLElBQzFCLEdBQUcsY0FDUCxVQUFVLE1BQU07QUFFbEIsTUFBSSxZQUFZLFdBQVcs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QUFBLFFBQ2hJLGNBQWMsRUFBRSxNQUFNLFlBQVksS0FBSyxnQkFBZ0IsTUFBTSxFQUFFLGNBQWMsS0FBSyxFQUFFLGFBQWE7QUFBQSxRQUNqRyxJQUFJLEVBQUUsTUFBTSxZQUFZLEtBQUssd0JBQXdCLE1BQU0sRUFBRSxJQUFJLEtBQUssRUFBRSxHQUFHO0FBQUEsUUFDM0UsTUFBTSxFQUFFLE1BQU0sWUFBWSxLQUFLLFFBQVEsTUFBTSxFQUFFLE1BQU0sS0FBSyxFQUFFLE1BQU0sS0FBSyxHQUFHO0FBQUEsUUFDMUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxLQUFLLFFBQVEsTUFBTSxFQUFFLE1BQU0sS0FBSyxFQUFFLE1BQU0sS0FBSyxHQUFHO0FBQUEsUUFFMUUsSUFBSSxFQUFFLEtBQUssZUFBZSxPQUFPLE1BQU0sTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEtBQUssRUFBRSxVQUFVLFNBQVMseUJBQTBCLEVBQUUsUUFBUyxRQUFRO0FBQUEsUUFDN0ksSUFBSSxFQUFFLEtBQUssZUFBZSxPQUFPLE1BQU0sTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEtBQUssRUFBRSxVQUFVLFNBQVMseUJBQTBCLEVBQUUsUUFBUyxRQUFRO0FBQUEsUUFDN0ksSUFBSSxFQUFFLEtBQUssZUFBZSxPQUFPLE1BQU0sTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEtBQUssRUFBRSxVQUFVLFNBQVMseUJBQTBCLEVBQUUsUUFBUyxRQUFRO0FBQUEsUUFDN0ksSUFBSSxFQUFFLEtBQUssZUFBZSxPQUFPLE1BQU0sTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEtBQUssRUFBRSxVQUFVLFNBQVMseUJBQTBCLEVBQUUsUUFBUyxRQUFRO0FBQUEsUUFDN0ksSUFBSSxFQUFFLEtBQUssZUFBZSxPQUFPLE1BQU0sTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEtBQUssRUFBRSxVQUFVLFNBQVMseUJBQTBCLEVBQUUsUUFBUyxRQUFRO0FBQUEsUUFDN0ksSUFBSSxFQUFFLEtBQUssZUFBZSxPQUFPLE1BQU0sTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEtBQUssRUFBRSxVQUFVLFNBQVMseUJBQTBCLEVBQUUsUUFBUyxRQUFRO0FBQUEsUUFDN0ksR0FBRyxFQUFFLEtBQUssZUFBZSxPQUFPLE1BQU0sY0FBYyxNQUFNLEVBQUUsU0FBUyxLQUFLLEVBQUUsVUFBVTtBQUFBLFFBQ3RGLE1BQU0sRUFBRSxLQUFLLGVBQWUsT0FBTyxPQUFPLE1BQU0sRUFBRSxNQUFNLFNBQVMsU0FBVSxFQUFFLElBQUssVUFBVTtBQUFBLFFBRTVGLFVBQVUsRUFBRSxLQUFLLFlBQVksT0FBTyxLQUFLLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxTQUFTLGtCQUFtQixFQUFFLEtBQU0sVUFBVTtBQUFBLFFBQzlILFVBQVUsRUFBRSxLQUFLLFlBQVksT0FBTyxLQUFLLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxTQUFTLGtCQUFtQixFQUFFLEtBQU0sVUFBVTtBQUFBLFFBQzlILFVBQVUsRUFBRSxLQUFLLFlBQVksT0FBTyxLQUFLLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxTQUFTLGtCQUFtQixFQUFFLEtBQU0sVUFBVTtBQUFBLFFBQzlILFVBQVUsRUFBRSxLQUFLLFlBQVksT0FBTyxLQUFLLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxTQUFTLGtCQUFtQixFQUFFLEtBQU0sVUFBVTtBQUFBLFFBQzlILFVBQVUsRUFBRSxLQUFLLFlBQVksT0FBTyxLQUFLLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxTQUFTLGtCQUFtQixFQUFFLEtBQU0sVUFBVTtBQUFBLFFBQzlILFVBQVUsRUFBRSxLQUFLLFlBQVksT0FBTyxLQUFLLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxTQUFTLGtCQUFtQixFQUFFLEtBQU0sVUFBVTtBQUFBLFFBQzlILFVBQVUsRUFBRSxLQUFLLFlBQVksT0FBTyxLQUFL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
