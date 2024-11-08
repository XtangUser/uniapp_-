"use strict";const e=require("../../../../common/vendor.js"),t={name:"UniRate",props:{isFill:{type:[Boolean,String],default:!0},color:{type:String,default:"#ececec"},activeColor:{type:String,default:"#ffca3e"},disabledColor:{type:String,default:"#c0c0c0"},size:{type:[Number,String],default:24},value:{type:[Number,String],default:0},modelValue:{type:[Number,String],default:0},max:{type:[Number,String],default:5},margin:{type:[Number,String],default:0},disabled:{type:[Boolean,String],default:!1},readonly:{type:[Boolean,String],default:!1},allowHalf:{type:[Boolean,String],default:!1},touchable:{type:[Boolean,String],default:!0}},data:()=>({valueSync:"",userMouseFristMove:!0,userRated:!1,userLastRate:1}),watch:{value(e){this.valueSync=Number(e)},modelValue(e){this.valueSync=Number(e)}},computed:{stars(){const e=this.valueSync?this.valueSync:0,t=[],a=Math.floor(e),i=Math.ceil(e);for(let o=0;o<this.max;o++)a>o?t.push({activeWitch:"100%"}):i-1===o?t.push({activeWitch:100*(e-a)+"%"}):t.push({activeWitch:"0"});return t},marginNumber(){return Number(this.margin)}},created(){this.valueSync=Number(this.value||this.modelValue),this._rateBoxLeft=0,this._oldValue=null},mounted(){setTimeout((()=>{this._getSize()}),100)},methods:{touchstart(e){if(this.readonly||this.disabled)return;const{clientX:t,screenX:a}=e.changedTouches[0];this._getRateCount(t||a)},touchmove(e){if(this.readonly||this.disabled||!this.touchable)return;const{clientX:t,screenX:a}=e.changedTouches[0];this._getRateCount(t||a)},mousedown(e){},mousemove(e){},mouseleave(e){},_getRateCount(e){this._getSize();const t=Number(this.size);if(isNaN(t))return new Error("size 属性只能设置为数字");const a=e-this._rateBoxLeft;let i=parseInt(a/(t+this.marginNumber));i=i<0?0:i,i=i>this.max?this.max:i;const o=parseInt(a-(t+this.marginNumber)*i);let s=0;(this._oldValue!==i||this.PC)&&(this._oldValue=i,s=this.allowHalf?o>t/2?i+1:i+.5:i+1,s=Math.max(.5,Math.min(s,this.max)),this.valueSync=s,this._onChange())},_onChange(){this.$emit("input",this.valueSync),this.$emit("update:modelValue",this.valueSync),this.$emit("change",{value:this.valueSync})},_getSize(){e.index.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((e=>{e&&(this._rateBoxLeft=e[0].left)}))}}};if(!Array){e.resolveComponent("uni-icons")()}Math;const a=e._export_sfc(t,[["render",function(t,a,i,o,s,l){return{a:e.f(l.stars,((t,a,i)=>({a:"f2259da2-0-"+i,b:"f2259da2-1-"+i,c:t.activeWitch,d:a,e:e.o(((...e)=>l.touchstart&&l.touchstart(...e)),a),f:e.o(((...e)=>l.touchmove&&l.touchmove(...e)),a),g:e.o(((...e)=>l.mousedown&&l.mousedown(...e)),a),h:e.o(((...e)=>l.mousemove&&l.mousemove(...e)),a),i:e.o(((...e)=>l.mouseleave&&l.mouseleave(...e)),a)}))),b:e.p({color:i.color,size:i.size,type:i.isFill?"star-filled":"star"}),c:e.p({color:i.disabled?i.disabledColor:i.activeColor,size:i.size,type:"star-filled"}),d:i.disabled?1:"",e:l.marginNumber+"px"}}]]);wx.createComponent(a);
