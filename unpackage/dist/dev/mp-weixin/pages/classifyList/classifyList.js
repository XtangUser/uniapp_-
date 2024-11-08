"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classifyList",
  setup(__props) {
    const data = {
      pageNum: 1,
      pageSize: 12
    };
    let pageName = null;
    const nodata = common_vendor.ref(1);
    common_vendor.onLoad((e) => {
      const {
        id = null,
        name = null,
        type = null
      } = e;
      if (!id) {
        utils_common.gotoHome();
      }
      pageName = name;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      if (type) {
        data.type = type;
        getClassLstDoS();
      }
      if (id) {
        data.classid = id;
        getClassifyList();
      }
    });
    const classifyList = common_vendor.ref([]);
    const getClassifyList = async () => {
      let res = await api_apis.apiGetClassList(data);
      classifyList.value = [...classifyList.value, ...res.data];
      common_vendor.index.setStorageSync("storageClassList", classifyList.value);
      if (res.data.length == 0) {
        common_vendor.index.showToast({
          title: "到底了",
          icon: "error"
        });
        nodata.value = 0;
      }
    };
    const getClassLstDoS = async () => {
      let res = await api_apis.apiGetHistoryList(data);
      classifyList.value = [...classifyList.value, ...res.data];
      common_vendor.index.setStorageSync("storageClassList", classifyList.value);
      if (res.data.length == 0) {
        common_vendor.index.showToast({
          title: "到底了",
          icon: "error"
        });
        nodata.value = 0;
      }
    };
    common_vendor.onReachBottom(() => {
      if (nodata.value === 0)
        return;
      data.pageNum++;
      if (data.classid)
        getClassifyList();
      if (data.type)
        getClassLstDoS();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: "小唐壁纸酷-" + pageName,
        path: `/pages/classifyList/classifyList?id=${data.classid}&name=${pageName}`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "小唐壁纸酷-" + pageName,
        query: `id=${data.classid}&name=${pageName}`
      };
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classifyList.value.length && nodata.value != 0
      }, !classifyList.value.length && nodata.value != 0 ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        }),
        d: classifyList.value.length || nodata.value === 0
      }, classifyList.value.length || nodata.value === 0 ? {
        e: common_vendor.p({
          status: nodata.value === 1 ? "loading" : "noMore"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d7121c9c"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
