import{u as v,a as g}from"./use-dark-hVWXkztj.js";import{c as $,g as f,a as t,h}from"./index-D7LHrqkT.js";const x={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},n={xs:2,sm:4,md:8,lg:16,xl:24},k=$({name:"QSeparator",props:{...v,spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},setup(e){const o=f(),c=g(e,o.proxy.$q),i=t(()=>e.vertical===!0?"vertical":"horizontal"),s=t(()=>` q-separator--${i.value}`),l=t(()=>e.inset!==!1?`${s.value}-${x[e.inset]}`:""),u=t(()=>`q-separator${s.value}${l.value}`+(e.color!==void 0?` bg-${e.color}`:"")+(c.value===!0?" q-separator--dark":"")),m=t(()=>{const a={};if(e.size!==void 0&&(a[e.vertical===!0?"width":"height"]=e.size),e.spaced!==!1){const d=e.spaced===!0?`${n.md}px`:e.spaced in n?`${n[e.spaced]}px`:e.spaced,r=e.vertical===!0?["Left","Right"]:["Top","Bottom"];a[`margin${r[0]}`]=a[`margin${r[1]}`]=d}return a});return()=>h("hr",{class:u.value,style:m.value,"aria-orientation":i.value})}});export{k as Q};
