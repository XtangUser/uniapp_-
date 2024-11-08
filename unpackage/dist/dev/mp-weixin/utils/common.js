"use strict";
const common_vendor = require("../common/vendor.js");
function compareTimestamp(timestamp) {
  const currentTime = Date.now();
  const timeDiff = currentTime - timestamp;
  const minutes = timeDiff / 6e4;
  const hours = timeDiff / 36e5;
  const days = timeDiff / 864e5;
  const months = timeDiff / 2592e6;
  if (minutes < 1)
    return "刚刚更新";
  if (minutes < 60)
    return Math.floor(minutes) + "分钟前更新";
  if (hours < 24)
    return Math.floor(hours) + "小时前更新";
  if (days < 30)
    return Math.floor(days) + "天前更新";
  if (months < 3)
    return Math.floor(months) + "月前更新";
  return null;
}
function gotoHome() {
  common_vendor.index.showToast({
    title: "提示",
    content: "页面有误将返回首页",
    showCancel: false,
    success(res) {
      if (res.confirm) {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }
    }
  });
}
exports.compareTimestamp = compareTimestamp;
exports.gotoHome = gotoHome;
