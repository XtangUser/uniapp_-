"use strict";const e=require("../../common/vendor.js"),t=require("../../api/apis.js");if(!Array){(e.resolveComponent("custom-nav-bar")+e.resolveComponent("theme-title"))()}Math||((()=>"../../components/custom-nav-bar/custom-nav-bar.js")+(()=>"../../components/theme-title/theme-title.js"))();const a={__name:"Classify",setup(a){const s=e.ref([]);return(async()=>{let e=await t.apiGetClassify({pageSize:15});e.data=e.data.filter((e=>"AI美图"!=e.name)),s.value=e.data})(),(t,a)=>({a:e.p({title:"分类"}),b:e.f(s.value,((t,a,s)=>({a:t._id,b:"a0c8f7cc-1-"+s,c:e.p({item:t})})))})}},s=e._export_sfc(a,[["__scopeId","data-v-a0c8f7cc"]]);wx.createPage(s);
