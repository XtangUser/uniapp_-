"use strict";const e=require("../../common/vendor.js"),t=require("../../common/assets.js"),i=require("../../utils/common.js");if(!Array){e.resolveComponent("uni-icons")()}Math;const o={__name:"theme-title",props:{isMore:{type:Boolean,default:!1},item:{type:Object,default:()=>({name:"默认标题",picurl:"@../../common/image/more.jpg",updateTime:new Date-18e6})}},setup:o=>(s,m)=>e.e({a:!o.isMore},o.isMore?{}:{b:o.item.picurl,c:e.t(o.item.name),d:e.t(e.unref(i.compareTimestamp)(o.item.updateTime)),e:`/pages/classifyList/classifyList?id=${o.item._id}&name=${o.item.name}`},{f:o.isMore},o.isMore?{g:t._imports_0$2,h:e.p({type:"more-filled",size:"30",color:"#fff"})}:{})},s=e._export_sfc(o,[["__scopeId","data-v-1e8b2ea2"]]);wx.createComponent(s);
