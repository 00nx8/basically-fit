const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-C1QIMBYD.js","./index-DiEwj2lb.js","./index-DIdGMIfO.css"])))=>i.map(i=>d[i]);
import { au as registerPlugin, av as __vitePreload, G as defineComponent, r as ref, ae as Notify, _ as _export_sfc, V as createElementBlock, I as openBlock, H as createBlock, a1 as createCommentVNode, J as withCtx, S as createTextVNode, P as toDisplayString, T as QBtn, X as Fragment } from "./index-DiEwj2lb.js";
const VoiceRecorder = registerPlugin("VoiceRecorder", {
  web: () => __vitePreload(() => import("./web-C1QIMBYD.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).then((m) => new m.VoiceRecorderWeb())
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AudioPlayer",
  props: ["voiceNote", "isDisplay"],
  emits: ["audioRecorded"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const isRecording = ref(false);
    const emit = __emit;
    const props = __props;
    function recordAudio() {
      Notify.create("recording....");
      VoiceRecorder.startRecording().catch((error) => Notify.create(error));
      isRecording.value = true;
    }
    function stopRecording() {
      VoiceRecorder.stopRecording().then((result) => {
        isRecording.value = false;
        emit("audioRecorded", result.value);
      }).catch((error) => console.log(error));
    }
    function playRecording() {
      console.log("supposed to be playing audio");
      const audioRef = new Audio(`data:${props.voiceNote?.mimeType};base64,${props.voiceNote?.recordDataBase64}`);
      audioRef.onloadeddata = () => {
        audioRef.play().then(() => {
          console.log("Audio is playing");
        }).catch((err) => {
          console.error("Error playing audio:", err);
        });
      };
      audioRef.load();
    }
    const __returned__ = { isRecording, emit, props, recordAudio, stopRecording, playRecording };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    $setup.props.voiceNote ? (openBlock(), createBlock(QBtn, {
      key: 0,
      color: "secondary",
      onClick: $setup.playRecording
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(!$setup.props.isDisplay ? "play existing recording" : "play voice explanation"), 1)
      ]),
      _: 1
    })) : createCommentVNode("", true),
    !$setup.props.isDisplay ? (openBlock(), createElementBlock("div", _hoisted_1, [
      !$setup.isRecording ? (openBlock(), createBlock(QBtn, {
        key: 0,
        color: "secondary",
        onClick: $setup.recordAudio
      }, {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createTextVNode("Record")
        ])),
        _: 1
      })) : createCommentVNode("", true),
      $setup.isRecording ? (openBlock(), createBlock(QBtn, {
        key: 1,
        color: "secondary",
        onClick: $setup.stopRecording
      }, {
        default: withCtx(() => _cache[1] || (_cache[1] = [
          createTextVNode("Stop")
        ])),
        _: 1
      })) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ], 64);
}
const AudioPlayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "AudioPlayer.vue"]]);
export {
  AudioPlayer as A
};


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFNLGdCQUFnQixlQUFlLGlCQUFpQjtBQUFBLEVBQ2xELEtBQUssTUFBTSwyQkFBTyxtQkFBTyw4REFBRSxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsa0JBQWtCO0FBQ25FLENBQUM7Ozs7Ozs7QUNFSyx3QkFBYyxJQUFJLEtBQUs7QUFDN0IsVUFBTSxPQUFPO0FBQ2IsVUFBTSxRQUFRO0FBRWQsYUFBUyxjQUFjO0FBQ3JCLGFBQU8sT0FBTyxlQUFlO0FBQzdCLG9CQUFjLGVBQ1gsUUFBTSxXQUFTLE9BQU8sT0FBTyxLQUFLLENBQUM7QUFDdEMsa0JBQVksUUFBUTtBQUFBO0FBRXRCLGFBQVMsZ0JBQWdCO0FBQ3ZCLG9CQUFjLGNBQWMsRUFDekIsS0FBSyxDQUFDLFdBQVc7QUFDaEIsb0JBQVksUUFBUTtBQUNmLDhCQUFpQixPQUFPLEtBQUs7QUFBQSxPQUNuQyxFQUNBLE1BQU0sV0FBUyxRQUFRLElBQUksS0FBSyxDQUFDO0FBQUE7QUFHdEMsYUFBUyxnQkFBZ0I7QUFDdkIsY0FBUSxJQUFJLDhCQUE4QjtBQUVwQyx1QkFBVyxJQUFJLE1BQU0sUUFBUSxNQUFNLFdBQVcsUUFBUSxXQUFXLE1BQU0sV0FBVyxnQkFBZ0IsRUFBRTtBQUUxRyxlQUFTLGVBQWUsTUFBTTtBQUNuQix3QkFDTixLQUFLLE1BQU07QUFDVixrQkFBUSxJQUFJLGtCQUFrQjtBQUFBLFNBQy9CLEVBQ0EsTUFBTSxDQUFPO0FBQ0osd0JBQU0sd0JBQXdCLEdBQUc7QUFBQSxTQUMxQztBQUFBLE1BQ0w7QUFFQSxlQUFTLEtBQUs7QUFBQTs7Ozs7Ozs7c0JBTWRBLG1CQUVRQyxVQUFBO0FBQUEsV0EvQ1YsZ0NBNkMwQkMsWUFBQTtBQUFBLE1BQXlCO0FBQUE7QUFBQSxNQTdDbkQ7QUFBQTtBQUFBO1FBQUFDLGdCQUFBQyxnQkFBQTtBQUFBO0FBQUE7QUFBQSxLQWdERSxLQUFBQyxtQkFBQTtBQUFBLFlBQ2tDLE1BQWdELGFBQUFDLFVBQUEsR0FBQU4sbUJBQUE7QUFBQSxjQWpEcEYsNEJBaUQ0QkUsWUFBQTtBQUFBLFFBQXNCO0FBQUE7QUFBQSxRQWpEbEQ7QUFBQTtBQUFBO1VBQUFDLGdCQUFBO0FBQUE7QUFBQTtBQUFBLCtCQWtESSxJQUErRTtBQUFBLGFBbERuRiw0QkFrRDRCRCxZQUFBO0FBQUEsUUFBcUI7QUFBQTtBQUFBLFFBbERqRDtBQUFBO0FBQUE7VUFBQUMsZ0JBQUE7QUFBQTtBQUFBO0FBQUEsWUFBQUUsbUJBQUE7QUFBQSxVQUFBQSxtQkFBQTtBQUFBIiwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSIsIl9vcGVuQmxvY2siXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itdm9pY2UtcmVjb3JkZXIvZGlzdC9lc20vaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BdWRpb1BsYXllci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuY29uc3QgVm9pY2VSZWNvcmRlciA9IHJlZ2lzdGVyUGx1Z2luKCdWb2ljZVJlY29yZGVyJywge1xuICAgIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4oKG0pID0+IG5ldyBtLlZvaWNlUmVjb3JkZXJXZWIoKSksXG59KTtcbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgVm9pY2VSZWNvcmRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IFZvaWNlUmVjb3JkZXIgfSBmcm9tICdjYXBhY2l0b3Itdm9pY2UtcmVjb3JkZXInO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSAncXVhc2FyJztcbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSc7XG5cbmNvbnN0IGlzUmVjb3JkaW5nID0gcmVmKGZhbHNlKVxuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnYXVkaW9SZWNvcmRlZCddKVxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbJ3ZvaWNlTm90ZScsICdpc0Rpc3BsYXknXSlcblxuZnVuY3Rpb24gcmVjb3JkQXVkaW8oKSB7XG4gIE5vdGlmeS5jcmVhdGUoJ3JlY29yZGluZy4uLi4nKVxuICBWb2ljZVJlY29yZGVyLnN0YXJ0UmVjb3JkaW5nKClcbiAgICAuY2F0Y2goZXJyb3IgPT4gTm90aWZ5LmNyZWF0ZShlcnJvcikpO1xuICBpc1JlY29yZGluZy52YWx1ZSA9IHRydWVcbn1cbmZ1bmN0aW9uIHN0b3BSZWNvcmRpbmcoKSB7XG4gIFZvaWNlUmVjb3JkZXIuc3RvcFJlY29yZGluZygpXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaXNSZWNvcmRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgZW1pdCgnYXVkaW9SZWNvcmRlZCcsIHJlc3VsdC52YWx1ZSlcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xufVxuXG5mdW5jdGlvbiBwbGF5UmVjb3JkaW5nKCkge1xuICBjb25zb2xlLmxvZygnc3VwcG9zZWQgdG8gYmUgcGxheWluZyBhdWRpbycpXG5cbiAgY29uc3QgYXVkaW9SZWYgPSBuZXcgQXVkaW8oYGRhdGE6JHtwcm9wcy52b2ljZU5vdGU/Lm1pbWVUeXBlfTtiYXNlNjQsJHtwcm9wcy52b2ljZU5vdGU/LnJlY29yZERhdGFCYXNlNjR9YCk7XG5cbiAgYXVkaW9SZWYub25sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgIGF1ZGlvUmVmLnBsYXkoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnQXVkaW8gaXMgcGxheWluZycpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwbGF5aW5nIGF1ZGlvOicsIGVycik7XG4gICAgICB9KTtcbiAgfTtcblxuICBhdWRpb1JlZi5sb2FkKCk7XG59XG5cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxxLWJ0biBjb2xvcj1cInNlY29uZGFyeVwiIHYtaWY9XCJwcm9wcy52b2ljZU5vdGVcIiBAY2xpY2s9XCJwbGF5UmVjb3JkaW5nXCI+XG4gICAge3sgIXByb3BzLmlzRGlzcGxheSA/ICdwbGF5IGV4aXN0aW5nIHJlY29yZGluZycgOiAncGxheSB2b2ljZSBleHBsYW5hdGlvbicgfX1cbiAgPC9xLWJ0bj5cbiAgPGRpdiB2LWlmPVwiIXByb3BzLmlzRGlzcGxheVwiPlxuICAgIDxxLWJ0biBjb2xvcj1cInNlY29uZGFyeVwiIHYtaWY9XCIhaXNSZWNvcmRpbmdcIiBAY2xpY2s9XCJyZWNvcmRBdWRpb1wiPlJlY29yZDwvcS1idG4+XG4gICAgPHEtYnRuIGNvbG9yPVwic2Vjb25kYXJ5XCIgdi1pZj1cImlzUmVjb3JkaW5nXCIgQGNsaWNrPVwic3RvcFJlY29yZGluZ1wiPlN0b3A8L3EtYnRuPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwiZmlsZSI6ImFzc2V0cy9BdWRpb1BsYXllci1fdEt2U1h2cC5qcyJ9