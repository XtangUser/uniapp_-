"use strict";const t=require("../utils/request.js");exports.apiDetailWall=function(e={}){return t.request({url:"/detailWall",data:e})},exports.apiGetBanner=function(){return t.request({url:"/homeBanner"})},exports.apiGetClassList=function(e={}){return t.request({url:"/wallList",data:e})},exports.apiGetClassify=function(e={}){return t.request({url:"/classify",data:e})},exports.apiGetDayRandom=function(){return t.request({url:"/randomWall"})},exports.apiGetHistoryList=function(e={}){return t.request({url:"/userWallList",data:e})},exports.apiGetSetupScore=function(e={}){return t.request({url:"/setupScore",data:e})},exports.apiSearchData=function(e={}){return t.request({url:"/searchWall",data:e})},exports.apiUserInfo=function(e={}){return t.request({url:"/userInfo",data:e})},exports.apiWriteDownload=function(e={}){return t.request({url:"/downloadWall",data:e})};