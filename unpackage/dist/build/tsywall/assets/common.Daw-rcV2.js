import{z as o,A as e}from"./index-DVkdyF2D.js";function n(o){const e=Date.now()-o,n=e/6e4,t=e/36e5,a=e/864e5,r=e/2592e6;return n<1?"刚刚更新":n<60?Math.floor(n)+"分钟前更新":t<24?Math.floor(t)+"小时前更新":a<30?Math.floor(a)+"天前更新":r<3?Math.floor(r)+"月前更新":null}function t(){o({title:"提示",content:"页面有误将返回首页",showCancel:!1,success(o){o.confirm&&e({url:"/pages/index/index"})}})}export{n as c,t as g};