"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_title2 = common_vendor.resolveComponent("theme-title");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_title2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_title = () => "../../components/theme-title/theme-title.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_title)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const getBanner = async () => {
      let res = await api_apis.apiGetBanner();
      bannerList.value = res.data;
    };
    getBanner();
    const roudomPic = common_vendor.ref([]);
    const getDayroudom = async () => {
      let res = await api_apis.apiGetDayRandom();
      roudomPic.value = res.data;
    };
    getDayroudom();
    const classifyList = common_vendor.ref([]);
    const getClassify = async () => {
      let res = await api_apis.apiGetClassify({
        data: {
          pageSize: 8,
          pageNum: 1
        }
      });
      classifyList.value = res.data;
    };
    getClassify();
    common_vendor.onShareAppMessage(() => {
      return {
        title: "小唐壁纸酷",
        path: "/pages/index/index"
      };
    });
    const goDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail"
      });
    };
    const goPreview = (id) => {
      common_vendor.index.setStorageSync("storageClassList", roudomPic.value);
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
    };
    common_vendor.onShareTimeline(() => {
      return {
        title: "小唐壁纸酷"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.target == "miniProgram"
          }, item.target == "miniProgram" ? {
            b: item.picurl,
            c: item.url,
            d: item.appid
          } : {
            e: item.picurl,
            f: `/pages/classifyList/classifyList?${item.url}`
          }, {
            g: item._id
          });
        }),
        b: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        c: common_vendor.p({
          type: "right",
          size: "20",
          color: "#333"
        }),
        d: common_vendor.o(goDetail),
        e: common_vendor.p({
          type: "calendar-filled",
          size: "30"
        }),
        f: common_vendor.p({
          date: Date.now(),
          format: "dd号"
        }),
        g: common_vendor.f(roudomPic.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: common_vendor.o(($event) => goPreview(item._id), item._id),
            c: item._id
          };
        }),
        h: common_vendor.p({
          type: "bars",
          size: "30"
        }),
        i: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-8-" + i0,
            c: common_vendor.p({
              item
            })
          };
        }),
        j: common_vendor.p({
          isMore: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
