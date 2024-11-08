"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const adressData = common_vendor.ref(null);
    const getUserInfo = async () => {
      await api_apis.apiUserInfo().then((res) => {
        if (res.errCode === 0) {
          adressData.value = res.data;
        }
      });
    };
    getUserInfo();
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: adressData.value
      }, adressData.value ? {
        b: common_vendor.p({
          title: "个人中心"
        }),
        c: common_assets._imports_0,
        d: common_vendor.t((_a = adressData.value) == null ? void 0 : _a.IP),
        e: common_vendor.t(((_b = adressData.value) == null ? void 0 : _b.address.province) + "-" + ((_c = adressData.value) == null ? void 0 : _c.address.city)),
        f: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        g: common_vendor.t((_d = adressData.value) == null ? void 0 : _d.downloadSize),
        h: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        i: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        j: common_vendor.t((_e = adressData.value) == null ? void 0 : _e.scoreSize),
        k: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        l: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        m: common_vendor.p({
          type: "person-filled",
          size: "30"
        }),
        n: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        o: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        p: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        q: common_vendor.p({
          type: "help-filled",
          size: "15"
        }),
        r: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        })
      } : {
        s: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
