"use strict";const o=require("../common/vendor.js");exports.compareTimestamp=function(o){const e=Date.now()-o,t=e/6e4,n=e/36e5,r=e/864e5,s=e/2592e6;return t<1?"刚刚更新":t<60?Math.floor(t)+"分钟前更新":n<24?Math.floor(n)+"小时前更新":r<30?Math.floor(r)+"天前更新":s<3?Math.floor(s)+"月前更新":null},exports.gotoHome=function(){o.index.showToast({title:"提示",content:"页面有误将返回首页",showCancel:!1,success(e){e.confirm&&o.index.reLaunch({url:"/pages/index/index"})}})};
