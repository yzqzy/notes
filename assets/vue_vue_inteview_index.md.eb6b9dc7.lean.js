import{_ as s,c as n,o as a,a as l}from"./app.2eca1b5a.js";const p="/assets/mvc.083bb7b9.png",o="/assets/mvvm.0f4c3a4d.png",e="/assets/depend.30daeaf6.png",t="/assets/depend02.02d04a33.png",c="/assets/compiler.1ee680fe.png",r="/assets/lifecycle.e0fdf4d9.png",F="/assets/head2head.2805479f.png",y="/assets/tail2tail.4f500269.png",D="/assets/head2tail.2582fcd9.png",A="/assets/tail2head.1a7b2ea1.png",C="/assets/out_order.1cdec0e2.png",i="/assets/no_key.c71d14f6.png",d="/assets/has_key.4a568050.png",u="/assets/component_render.64a70def.png",m="/assets/component_update.cf723ae4.png",E="/assets/async_component_render.23cbe8cc.png",v="/assets/functional_component.dc5c3fca.png",h="/assets/component_translate_data.0dc5bcee.png",f="/assets/model_elm.f8ebc1cc.png",g="/assets/model_component.3fbc8c8e.png",b="/assets/slot.25c2a89d.png",B="/assets/scope_slot.9bde1586.png",k="/assets/custom_directive.7c09bb05.png",x="/assets/vuex.804b3f17.png",M=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. MVVM","slug":"_1-mvvm","link":"#_1-mvvm","children":[]},{"level":2,"title":"2. vue2 \u54CD\u5E94\u5F0F\u539F\u7406","slug":"_2-vue2-\u54CD\u5E94\u5F0F\u539F\u7406","link":"#_2-vue2-\u54CD\u5E94\u5F0F\u539F\u7406","children":[{"level":3,"title":"\u5904\u7406\u5BF9\u8C61","slug":"\u5904\u7406\u5BF9\u8C61","link":"#\u5904\u7406\u5BF9\u8C61","children":[]},{"level":3,"title":"\u5904\u7406\u6570\u7EC4","slug":"\u5904\u7406\u6570\u7EC4","link":"#\u5904\u7406\u6570\u7EC4","children":[]}]},{"level":2,"title":"3. Vue3 \u54CD\u5E94\u5F0F\u539F\u7406","slug":"_3-vue3-\u54CD\u5E94\u5F0F\u539F\u7406","link":"#_3-vue3-\u54CD\u5E94\u5F0F\u539F\u7406","children":[]},{"level":2,"title":"4. \u4F9D\u8D56\u6536\u96C6","slug":"_4-\u4F9D\u8D56\u6536\u96C6","link":"#_4-\u4F9D\u8D56\u6536\u96C6","children":[]},{"level":2,"title":"5. \u6A21\u677F\u7F16\u8BD1\u539F\u7406","slug":"_5-\u6A21\u677F\u7F16\u8BD1\u539F\u7406","link":"#_5-\u6A21\u677F\u7F16\u8BD1\u539F\u7406","children":[{"level":3,"title":"\u7F16\u8BD1\u5165\u53E3","slug":"\u7F16\u8BD1\u5165\u53E3","link":"#\u7F16\u8BD1\u5165\u53E3","children":[]},{"level":3,"title":"\u6838\u5FC3\u903B\u8F91","slug":"\u6838\u5FC3\u903B\u8F91","link":"#\u6838\u5FC3\u903B\u8F91","children":[]}]},{"level":2,"title":"6. \u751F\u547D\u5468\u671F\u94A9\u5B50\u51FD\u6570","slug":"_6-\u751F\u547D\u5468\u671F\u94A9\u5B50\u51FD\u6570","link":"#_6-\u751F\u547D\u5468\u671F\u94A9\u5B50\u51FD\u6570","children":[{"level":3,"title":"\u5B9E\u73B0\u8FC7\u7A0B","slug":"\u5B9E\u73B0\u8FC7\u7A0B","link":"#\u5B9E\u73B0\u8FC7\u7A0B","children":[]},{"level":3,"title":"\u6267\u884C\u9636\u6BB5","slug":"\u6267\u884C\u9636\u6BB5","link":"#\u6267\u884C\u9636\u6BB5","children":[]}]},{"level":2,"title":"7. Vue.mixin \u539F\u7406\u53CA\u4F7F\u7528\u573A\u666F","slug":"_7-vue-mixin-\u539F\u7406\u53CA\u4F7F\u7528\u573A\u666F","link":"#_7-vue-mixin-\u539F\u7406\u53CA\u4F7F\u7528\u573A\u666F","children":[]},{"level":2,"title":"8. Vue \u7EC4\u4EF6 data \u4E3A\u4EC0\u4E48\u5FC5\u987B\u662F\u4E2A\u51FD\u6570","slug":"_8-vue-\u7EC4\u4EF6-data-\u4E3A\u4EC0\u4E48\u5FC5\u987B\u662F\u4E2A\u51FD\u6570","link":"#_8-vue-\u7EC4\u4EF6-data-\u4E3A\u4EC0\u4E48\u5FC5\u987B\u662F\u4E2A\u51FD\u6570","children":[]},{"level":2,"title":"9. nextTick \u539F\u7406\u53CA\u4F7F\u7528\u573A\u666F","slug":"_9-nexttick-\u539F\u7406\u53CA\u4F7F\u7528\u573A\u666F","link":"#_9-nexttick-\u539F\u7406\u53CA\u4F7F\u7528\u573A\u666F","children":[]},{"level":2,"title":"10. computed \u548C watch \u533A\u522B","slug":"_10-computed-\u548C-watch-\u533A\u522B","link":"#_10-computed-\u548C-watch-\u533A\u522B","children":[]},{"level":2,"title":"11. Vue.set \u65B9\u6CD5\u662F\u5982\u4F55\u5B9E\u73B0\u7684","slug":"_11-vue-set-\u65B9\u6CD5\u662F\u5982\u4F55\u5B9E\u73B0\u7684","link":"#_11-vue-set-\u65B9\u6CD5\u662F\u5982\u4F55\u5B9E\u73B0\u7684","children":[]},{"level":2,"title":"12. Vue \u4E3A\u4EC0\u4E48\u9700\u8981\u865A\u62DF DOM","slug":"_12-vue-\u4E3A\u4EC0\u4E48\u9700\u8981\u865A\u62DF-dom","link":"#_12-vue-\u4E3A\u4EC0\u4E48\u9700\u8981\u865A\u62DF-dom","children":[]},{"level":2,"title":"13. Vue \u4E2D diff \u7B97\u6CD5\u539F\u7406","slug":"_13-vue-\u4E2D-diff-\u7B97\u6CD5\u539F\u7406","link":"#_13-vue-\u4E2D-diff-\u7B97\u6CD5\u539F\u7406","children":[]},{"level":2,"title":"14. vue \u5DF2\u7ECF\u5B58\u5728\u6570\u636E\u52AB\u6301\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u4F7F\u7528\u865A\u62DF DOM \u548C diff \u7B97\u6CD5","slug":"_14-vue-\u5DF2\u7ECF\u5B58\u5728\u6570\u636E\u52AB\u6301\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u4F7F\u7528\u865A\u62DF-dom-\u548C-diff-\u7B97\u6CD5","link":"#_14-vue-\u5DF2\u7ECF\u5B58\u5728\u6570\u636E\u52AB\u6301\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u4F7F\u7528\u865A\u62DF-dom-\u548C-diff-\u7B97\u6CD5","children":[]},{"level":2,"title":"15.  Vue \u4E2D key \u7684\u4F5C\u7528\u548C\u539F\u7406","slug":"_15-vue-\u4E2D-key-\u7684\u4F5C\u7528\u548C\u539F\u7406","link":"#_15-vue-\u4E2D-key-\u7684\u4F5C\u7528\u548C\u539F\u7406","children":[]},{"level":2,"title":"16. \u8C08\u8C08\u4F60\u5BF9 vue \u7EC4\u4EF6\u5316\u7684\u7406\u89E3","slug":"_16-\u8C08\u8C08\u4F60\u5BF9-vue-\u7EC4\u4EF6\u5316\u7684\u7406\u89E3","link":"#_16-\u8C08\u8C08\u4F60\u5BF9-vue-\u7EC4\u4EF6\u5316\u7684\u7406\u89E3","children":[]},{"level":2,"title":"17. Vue \u7EC4\u4EF6\u6E32\u67D3\u6D41\u7A0B","slug":"_17-vue-\u7EC4\u4EF6\u6E32\u67D3\u6D41\u7A0B","link":"#_17-vue-\u7EC4\u4EF6\u6E32\u67D3\u6D41\u7A0B","children":[]},{"level":2,"title":"18. Vue \u7EC4\u4EF6\u66F4\u65B0\u6D41\u7A0B","slug":"_18-vue-\u7EC4\u4EF6\u66F4\u65B0\u6D41\u7A0B","link":"#_18-vue-\u7EC4\u4EF6\u66F4\u65B0\u6D41\u7A0B","children":[]},{"level":2,"title":"19. Vue \u4E2D\u5F02\u6B65\u7EC4\u4EF6\u539F\u7406","slug":"_19-vue-\u4E2D\u5F02\u6B65\u7EC4\u4EF6\u539F\u7406","link":"#_19-vue-\u4E2D\u5F02\u6B65\u7EC4\u4EF6\u539F\u7406","children":[{"level":3,"title":"\u521B\u5EFA\u65B9\u5F0F","slug":"\u521B\u5EFA\u65B9\u5F0F","link":"#\u521B\u5EFA\u65B9\u5F0F","children":[]},{"level":3,"title":"\u6267\u884C\u6D41\u7A0B\u5206\u6790","slug":"\u6267\u884C\u6D41\u7A0B\u5206\u6790","link":"#\u6267\u884C\u6D41\u7A0B\u5206\u6790","children":[]}]},{"level":2,"title":"20. \u51FD\u6570\u7EC4\u4EF6\u7684\u4F18\u52BF\u53CA\u539F\u7406","slug":"_20-\u51FD\u6570\u7EC4\u4EF6\u7684\u4F18\u52BF\u53CA\u539F\u7406","link":"#_20-\u51FD\u6570\u7EC4\u4EF6\u7684\u4F18\u52BF\u53CA\u539F\u7406","children":[{"level":3,"title":"\u7279\u6027","slug":"\u7279\u6027","link":"#\u7279\u6027","children":[]},{"level":3,"title":"\u6267\u884C\u6D41\u7A0B\u5206\u6790","slug":"\u6267\u884C\u6D41\u7A0B\u5206\u6790-1","link":"#\u6267\u884C\u6D41\u7A0B\u5206\u6790-1","children":[]}]},{"level":2,"title":"21. Vue \u7EC4\u4EF6\u4F20\u503C\u7684\u65B9\u5F0F\u53CA\u533A\u522B","slug":"_21-vue-\u7EC4\u4EF6\u4F20\u503C\u7684\u65B9\u5F0F\u53CA\u533A\u522B","link":"#_21-vue-\u7EC4\u4EF6\u4F20\u503C\u7684\u65B9\u5F0F\u53CA\u533A\u522B","children":[{"level":3,"title":"\u4F20\u503C\u65B9\u5F0F","slug":"\u4F20\u503C\u65B9\u5F0F","link":"#\u4F20\u503C\u65B9\u5F0F","children":[]},{"level":3,"title":"\u539F\u7406\u5206\u6790","slug":"\u539F\u7406\u5206\u6790","link":"#\u539F\u7406\u5206\u6790","children":[]}]},{"level":2,"title":"22. $attrs \u662F\u4E3A\u4E86\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\u51FA\u73B0\u7684","slug":"_22-attrs-\u662F\u4E3A\u4E86\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\u51FA\u73B0\u7684","link":"#_22-attrs-\u662F\u4E3A\u4E86\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\u51FA\u73B0\u7684","children":[]},{"level":2,"title":"23. v-if \u548C v-for \u54EA\u4E2A\u4F18\u5148\u7EA7\u66F4\u9AD8","slug":"_23-v-if-\u548C-v-for-\u54EA\u4E2A\u4F18\u5148\u7EA7\u66F4\u9AD8","link":"#_23-v-if-\u548C-v-for-\u54EA\u4E2A\u4F18\u5148\u7EA7\u66F4\u9AD8","children":[]},{"level":2,"title":"24. v-if\u3001v-model\u3001v-for \u7684\u5B9E\u73B0\u539F\u7406","slug":"_24-v-if\u3001v-model\u3001v-for-\u7684\u5B9E\u73B0\u539F\u7406","link":"#_24-v-if\u3001v-model\u3001v-for-\u7684\u5B9E\u73B0\u539F\u7406","children":[{"level":3,"title":"v-for \u5B9E\u73B0\u539F\u7406","slug":"v-for-\u5B9E\u73B0\u539F\u7406","link":"#v-for-\u5B9E\u73B0\u539F\u7406","children":[]},{"level":3,"title":"v-if \u5B9E\u73B0\u539F\u7406","slug":"v-if-\u5B9E\u73B0\u539F\u7406","link":"#v-if-\u5B9E\u73B0\u539F\u7406","children":[]},{"level":3,"title":"v-model \u5B9E\u73B0\u539F\u7406","slug":"v-model-\u5B9E\u73B0\u539F\u7406","link":"#v-model-\u5B9E\u73B0\u539F\u7406","children":[]}]},{"level":2,"title":"25. Vue \u63D2\u69FD\u7684\u4F7F\u7528\u53CA\u5B9E\u73B0\u539F\u7406","slug":"_25-vue-\u63D2\u69FD\u7684\u4F7F\u7528\u53CA\u5B9E\u73B0\u539F\u7406","link":"#_25-vue-\u63D2\u69FD\u7684\u4F7F\u7528\u53CA\u5B9E\u73B0\u539F\u7406","children":[{"level":3,"title":"\u4F7F\u7528","slug":"\u4F7F\u7528","link":"#\u4F7F\u7528","children":[]},{"level":3,"title":"\u5B9E\u73B0\u539F\u7406","slug":"\u5B9E\u73B0\u539F\u7406","link":"#\u5B9E\u73B0\u539F\u7406","children":[]}]},{"level":2,"title":"26. Vue.use \u4F7F\u7528\u3001\u5B9E\u73B0\u539F\u7406","slug":"_26-vue-use-\u4F7F\u7528\u3001\u5B9E\u73B0\u539F\u7406","link":"#_26-vue-use-\u4F7F\u7528\u3001\u5B9E\u73B0\u539F\u7406","children":[]},{"level":2,"title":"27. \u7EC4\u4EF6\u5199 name \u7684\u597D\u5904\u53CA\u4F5C\u7528","slug":"_27-\u7EC4\u4EF6\u5199-name-\u7684\u597D\u5904\u53CA\u4F5C\u7528","link":"#_27-\u7EC4\u4EF6\u5199-name-\u7684\u597D\u5904\u53CA\u4F5C\u7528","children":[]},{"level":2,"title":"28. Vue \u4E8B\u4EF6\u4FEE\u9970\u7B26\u3001\u5B9E\u73B0\u539F\u7406","slug":"_28-vue-\u4E8B\u4EF6\u4FEE\u9970\u7B26\u3001\u5B9E\u73B0\u539F\u7406","link":"#_28-vue-\u4E8B\u4EF6\u4FEE\u9970\u7B26\u3001\u5B9E\u73B0\u539F\u7406","children":[]},{"level":2,"title":"29. Vue .sync \u4FEE\u9970\u7B26\u7684\u4F5C\u7528\u53CA\u539F\u7406","slug":"_29-vue-sync-\u4FEE\u9970\u7B26\u7684\u4F5C\u7528\u53CA\u539F\u7406","link":"#_29-vue-sync-\u4FEE\u9970\u7B26\u7684\u4F5C\u7528\u53CA\u539F\u7406","children":[]},{"level":2,"title":"30. \u5982\u4F55\u7406\u89E3\u81EA\u5B9A\u4E49\u6307\u4EE4","slug":"_30-\u5982\u4F55\u7406\u89E3\u81EA\u5B9A\u4E49\u6307\u4EE4","link":"#_30-\u5982\u4F55\u7406\u89E3\u81EA\u5B9A\u4E49\u6307\u4EE4","children":[]},{"level":2,"title":"31. keep-alive \u4F7F\u7528\u3001\u5B9E\u73B0\u539F\u7406","slug":"_31-keep-alive-\u4F7F\u7528\u3001\u5B9E\u73B0\u539F\u7406","link":"#_31-keep-alive-\u4F7F\u7528\u3001\u5B9E\u73B0\u539F\u7406","children":[{"level":3,"title":"\u4F7F\u7528","slug":"\u4F7F\u7528-1","link":"#\u4F7F\u7528-1","children":[]},{"level":3,"title":"\u5B9E\u73B0\u539F\u7406","slug":"\u5B9E\u73B0\u539F\u7406-1","link":"#\u5B9E\u73B0\u539F\u7406-1","children":[]}]},{"level":2,"title":"32. Vue-Router \u94A9\u5B50\u51FD\u6570\u3001\u6267\u884C\u6D41\u7A0B","slug":"_32-vue-router-\u94A9\u5B50\u51FD\u6570\u3001\u6267\u884C\u6D41\u7A0B","link":"#_32-vue-router-\u94A9\u5B50\u51FD\u6570\u3001\u6267\u884C\u6D41\u7A0B","children":[]},{"level":2,"title":"33. Vue-Router \u4E24\u79CD\u6A21\u5F0F\u7684\u533A\u522B","slug":"_33-vue-router-\u4E24\u79CD\u6A21\u5F0F\u7684\u533A\u522B","link":"#_33-vue-router-\u4E24\u79CD\u6A21\u5F0F\u7684\u533A\u522B","children":[]},{"level":2,"title":"34. \u8C08\u4E00\u4E0B\u4F60\u5BF9 vuex \u7684\u4E2A\u4EBA\u7406\u89E3","slug":"_34-\u8C08\u4E00\u4E0B\u4F60\u5BF9-vuex-\u7684\u4E2A\u4EBA\u7406\u89E3","link":"#_34-\u8C08\u4E00\u4E0B\u4F60\u5BF9-vuex-\u7684\u4E2A\u4EBA\u7406\u89E3","children":[]},{"level":2,"title":"35. mutation \u548C action \u7684\u533A\u522B","slug":"_35-mutation-\u548C-action-\u7684\u533A\u522B","link":"#_35-mutation-\u548C-action-\u7684\u533A\u522B","children":[]},{"level":2,"title":"36. Vue \u4E2D\u5E38\u7528\u7684\u6027\u80FD\u4F18\u5316\u624B\u6BB5","slug":"_36-vue-\u4E2D\u5E38\u7528\u7684\u6027\u80FD\u4F18\u5316\u624B\u6BB5","link":"#_36-vue-\u4E2D\u5E38\u7528\u7684\u6027\u80FD\u4F18\u5316\u624B\u6BB5","children":[]},{"level":2,"title":"37. Vue \u4E2D\u4F7F\u7528\u4E86\u54EA\u4E9B\u8BBE\u8BA1\u6A21\u5F0F","slug":"_37-vue-\u4E2D\u4F7F\u7528\u4E86\u54EA\u4E9B\u8BBE\u8BA1\u6A21\u5F0F","link":"#_37-vue-\u4E2D\u4F7F\u7528\u4E86\u54EA\u4E9B\u8BBE\u8BA1\u6A21\u5F0F","children":[{"level":3,"title":"\u5355\u4F8B\u6A21\u5F0F","slug":"\u5355\u4F8B\u6A21\u5F0F","link":"#\u5355\u4F8B\u6A21\u5F0F","children":[]},{"level":3,"title":"\u5DE5\u5382\u6A21\u5F0F","slug":"\u5DE5\u5382\u6A21\u5F0F","link":"#\u5DE5\u5382\u6A21\u5F0F","children":[]},{"level":3,"title":"\u53D1\u5E03\u8BA2\u9605\u6A21\u5F0F","slug":"\u53D1\u5E03\u8BA2\u9605\u6A21\u5F0F","link":"#\u53D1\u5E03\u8BA2\u9605\u6A21\u5F0F","children":[]},{"level":3,"title":"\u89C2\u5BDF\u8005\u6A21\u5F0F","slug":"\u89C2\u5BDF\u8005\u6A21\u5F0F","link":"#\u89C2\u5BDF\u8005\u6A21\u5F0F","children":[]},{"level":3,"title":"\u4EE3\u7406\u6A21\u5F0F","slug":"\u4EE3\u7406\u6A21\u5F0F","link":"#\u4EE3\u7406\u6A21\u5F0F","children":[]},{"level":3,"title":"\u88C5\u9970\u6A21\u5F0F","slug":"\u88C5\u9970\u6A21\u5F0F","link":"#\u88C5\u9970\u6A21\u5F0F","children":[]},{"level":3,"title":"\u4E2D\u4ECB\u8005\u6A21\u5F0F","slug":"\u4E2D\u4ECB\u8005\u6A21\u5F0F","link":"#\u4E2D\u4ECB\u8005\u6A21\u5F0F","children":[]},{"level":3,"title":"\u7B56\u7565\u6A21\u5F0F","slug":"\u7B56\u7565\u6A21\u5F0F","link":"#\u7B56\u7565\u6A21\u5F0F","children":[]},{"level":3,"title":"\u5916\u89C2\u6A21\u5F0F","slug":"\u5916\u89C2\u6A21\u5F0F","link":"#\u5916\u89C2\u6A21\u5F0F","children":[]},{"level":3,"title":"\u3002\u3002\u3002","slug":"\u3002\u3002\u3002","link":"#\u3002\u3002\u3002","children":[]}]}],"relativePath":"vue/vue_inteview/index.md"}'),V={name:"vue/vue_inteview/index.md"},_=l("",488),w=[_];function j(O,S,$,N,q,T){return a(),n("div",null,w)}const R=s(V,[["render",j]]);export{M as __pageData,R as default};
