"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      inverted: true,
      text: "置顶",
      type: "error"
    }),
    b: common_vendor.p({
      date: Date.now(),
      format: "yyyy-MM-dd hh:mm:ss"
    }),
    c: common_assets._imports_0$1,
    d: common_assets._imports_1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c2e4c1e"]]);
wx.createPage(MiniProgramPage);
