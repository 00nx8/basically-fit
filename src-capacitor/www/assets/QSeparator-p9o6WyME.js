import { u as useDarkProps, a as useDark } from "./use-dark-D3vguVup.js";
import { c as createComponent, g as getCurrentInstance, a as computed, h } from "./index-DiEwj2lb.js";
const insetMap = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
};
const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
const QSeparator = createComponent({
  name: "QSeparator",
  props: {
    ...useDarkProps,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  },
  setup(props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const orientClass = computed(() => ` q-separator--${orientation.value}`);
    const insetClass = computed(() => props.inset !== false ? `${orientClass.value}-${insetMap[props.inset]}` : "");
    const classes = computed(
      () => `q-separator${orientClass.value}${insetClass.value}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (isDark.value === true ? " q-separator--dark" : "")
    );
    const style = computed(() => {
      const acc = {};
      if (props.size !== void 0) {
        acc[props.vertical === true ? "width" : "height"] = props.size;
      }
      if (props.spaced !== false) {
        const size = props.spaced === true ? `${margins.md}px` : props.spaced in margins ? `${margins[props.spaced]}px` : props.spaced;
        const dir = props.vertical === true ? ["Left", "Right"] : ["Top", "Bottom"];
        acc[`margin${dir[0]}`] = acc[`margin${dir[1]}`] = size;
      }
      return acc;
    });
    return () => h("hr", {
      class: classes.value,
      style: style.value,
      "aria-orientation": orientation.value
    });
  }
});
export {
  QSeparator as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNlcGFyYXRvci1wOW82V3lNRS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zZXBhcmF0b3IvUVNlcGFyYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbmNvbnN0IGluc2V0TWFwID0ge1xuICB0cnVlOiAnaW5zZXQnLFxuICBpdGVtOiAnaXRlbS1pbnNldCcsXG4gICdpdGVtLXRodW1ibmFpbCc6ICdpdGVtLXRodW1ibmFpbC1pbnNldCdcbn1cblxuZXhwb3J0IGNvbnN0IG1hcmdpbnMgPSB7XG4gIHhzOiAyLFxuICBzbTogNCxcbiAgbWQ6IDgsXG4gIGxnOiAxNixcbiAgeGw6IDI0XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2VwYXJhdG9yJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHNwYWNlZDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICBpbnNldDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHNpemU6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyAndmVydGljYWwnXG4gICAgICAgIDogJ2hvcml6b250YWwnXG4gICAgKSlcblxuICAgIGNvbnN0IG9yaWVudENsYXNzID0gY29tcHV0ZWQoKCkgPT4gYCBxLXNlcGFyYXRvci0tJHsgb3JpZW50YXRpb24udmFsdWUgfWApXG5cbiAgICBjb25zdCBpbnNldENsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaW5zZXQgIT09IGZhbHNlXG4gICAgICAgID8gYCR7IG9yaWVudENsYXNzLnZhbHVlIH0tJHsgaW5zZXRNYXBbIHByb3BzLmluc2V0IF0gfWBcbiAgICAgICAgOiAnJ1xuICAgICkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXNlcGFyYXRvciR7IG9yaWVudENsYXNzLnZhbHVlIH0keyBpbnNldENsYXNzLnZhbHVlIH1gXG4gICAgICArIChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNlcGFyYXRvci0tZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG5cbiAgICAgIGlmIChwcm9wcy5zaXplICE9PSB2b2lkIDApIHtcbiAgICAgICAgYWNjWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd3aWR0aCcgOiAnaGVpZ2h0JyBdID0gcHJvcHMuc2l6ZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuc3BhY2VkICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBzaXplID0gcHJvcHMuc3BhY2VkID09PSB0cnVlXG4gICAgICAgICAgPyBgJHsgbWFyZ2lucy5tZCB9cHhgXG4gICAgICAgICAgOiBwcm9wcy5zcGFjZWQgaW4gbWFyZ2lucyA/IGAkeyBtYXJnaW5zWyBwcm9wcy5zcGFjZWQgXSB9cHhgIDogcHJvcHMuc3BhY2VkXG5cbiAgICAgICAgY29uc3QgZGlyID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IFsgJ0xlZnQnLCAnUmlnaHQnIF1cbiAgICAgICAgICA6IFsgJ1RvcCcsICdCb3R0b20nIF1cblxuICAgICAgICBhY2NbIGBtYXJnaW4keyBkaXJbIDAgXSB9YCBdID0gYWNjWyBgbWFyZ2luJHsgZGlyWyAxIF0gfWAgXSA9IHNpemVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnaHInLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICdhcmlhLW9yaWVudGF0aW9uJzogb3JpZW50YXRpb24udmFsdWVcbiAgICB9KVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsTUFBTSxXQUFXO0FBQUEsRUFDZixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixrQkFBa0I7QUFDcEI7QUFFTyxNQUFNLFVBQVU7QUFBQSxFQUNyQixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQ047QUFFQSxNQUFBLGFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsUUFBUSxDQUFFLFNBQVMsTUFBUTtBQUFBLElBQzNCLE9BQU8sQ0FBRSxTQUFTLE1BQVE7QUFBQSxJQUMxQixVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUDtBQUFBLEVBRUQsTUFBTyxPQUFPO0FBQ1osVUFBTSxLQUFLLG1CQUFrQjtBQUM3QixVQUFNLFNBQVMsUUFBUSxPQUFPLEdBQUcsTUFBTSxFQUFFO0FBRXpDLFVBQU0sY0FBYyxTQUFTLE1BQzNCLE1BQU0sYUFBYSxPQUNmLGFBQ0EsWUFDTDtBQUVELFVBQU0sY0FBYyxTQUFTLE1BQU0saUJBQWtCLFlBQVksT0FBUTtBQUV6RSxVQUFNLGFBQWEsU0FBUyxNQUMxQixNQUFNLFVBQVUsUUFDWixHQUFJLFlBQVksS0FBTyxJQUFJLFNBQVUsTUFBTSxNQUFTLEtBQ3BELEVBQ0w7QUFFRCxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLGNBQWUsWUFBWSxLQUFLLEdBQUssV0FBVyxLQUFPLE1BQ3BELE1BQU0sVUFBVSxTQUFTLE9BQVEsTUFBTSxLQUFPLEtBQUksT0FDbEQsT0FBTyxVQUFVLE9BQU8sdUJBQXVCO0FBQUEsSUFDeEQ7QUFFSSxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLFlBQU0sTUFBTSxDQUFBO0FBRVosVUFBSSxNQUFNLFNBQVMsUUFBUTtBQUN6QixZQUFLLE1BQU0sYUFBYSxPQUFPLFVBQVUsUUFBVSxJQUFHLE1BQU07QUFBQSxNQUNwRTtBQUVNLFVBQUksTUFBTSxXQUFXLE9BQU87QUFDMUIsY0FBTSxPQUFPLE1BQU0sV0FBVyxPQUMxQixHQUFJLFFBQVEsU0FDWixNQUFNLFVBQVUsVUFBVSxHQUFJLFFBQVMsTUFBTSxNQUFRLENBQUEsT0FBUSxNQUFNO0FBRXZFLGNBQU0sTUFBTSxNQUFNLGFBQWEsT0FDM0IsQ0FBRSxRQUFRLE9BQU8sSUFDakIsQ0FBRSxPQUFPLFFBQVE7QUFFckIsWUFBSyxTQUFVLElBQUssQ0FBRyxDQUFBLEVBQUcsSUFBSyxJQUFLLFNBQVUsSUFBSyxDQUFHLENBQUEsRUFBRyxJQUFLO0FBQUEsTUFDdEU7QUFFTSxhQUFPO0FBQUEsSUFDUixDQUFBO0FBRUQsV0FBTyxNQUFNLEVBQUUsTUFBTTtBQUFBLE1BQ25CLE9BQU8sUUFBUTtBQUFBLE1BQ2YsT0FBTyxNQUFNO0FBQUEsTUFDYixvQkFBb0IsWUFBWTtBQUFBLElBQ2pDLENBQUE7QUFBQSxFQUNMO0FBQ0EsQ0FBQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
