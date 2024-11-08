"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  props: {
    id: String,
    type: String
  },
  setup(__props) {
    const classList = common_vendor.ref([]);
    const currentInfo = common_vendor.ref(null);
    const maskState = common_vendor.ref(true);
    const scoreValue = common_vendor.ref(0);
    const scorePopup = common_vendor.ref(null);
    const onMask = () => {
      maskState.value = !maskState.value;
    };
    const infoPopup = common_vendor.ref(null);
    const clickInfo = (value) => {
      if (value) {
        infoPopup.value.open();
      } else {
        infoPopup.value.close();
      }
    };
    const clickScore = (value) => {
      if (value) {
        scorePopup.value.open();
        if (currentInfo.value.userScore) {
          buttonSwitch.value = true;
          scoreValue.value = currentInfo.value.userScore;
        } else {
          scoreValue.value = currentInfo.value.score;
        }
      } else {
        scorePopup.value.close();
        scoreValue.value = 0;
        buttonSwitch.value = false;
      }
    };
    const currentId = common_vendor.ref(null);
    let Props = __props;
    const classIndex = common_vendor.ref(null);
    const imgsRead = common_vendor.ref([]);
    async function getDetailInfo() {
      currentId.value = Props.id;
      classList.value = common_vendor.index.getStorageSync("storageClassList") || [];
      if (Props.type == "share") {
        let res = await api_apis.apiDetailWall({
          id: Props.id
        });
        classList.value = res.data.map((item) => {
          return {
            ...item,
            picUrl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      } else {
        classList.value = classList.value.map((item) => {
          return {
            ...item,
            picUrl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      classIndex.value = classList.value.findIndex((item) => {
        return item._id == Props.id;
      });
      currentInfo.value = classList.value[classIndex.value];
      readImgFun();
    }
    getDetailInfo();
    const buttonSwitch = common_vendor.ref(false);
    const submitScore = async () => {
      try {
        common_vendor.index.showLoading({
          title: "加载中..."
        });
        let res = await api_apis.apiGetSetupScore({
          classid: currentInfo.value.classid,
          wallId: currentInfo.value._id,
          userScore: scoreValue.value
        });
        if (res.errCode === 0) {
          common_vendor.index.showToast({
            title: "评分成功!",
            icon: "success"
          });
          classList.value[classIndex.value].userScore = scoreValue.value;
          common_vendor.index.setStorageSync("storageClassList", classList.value);
        } else {
          common_vendor.index.showToast({
            title: "失败!",
            icon: "error"
          });
        }
        clickScore();
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success() {
        },
        fail() {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    function readImgFun() {
      const lastIndex = classList.value.length - 1;
      imgsRead.value = [
        classIndex.value === 0 ? lastIndex : classIndex.value - 1,
        classIndex.value,
        classIndex.value === lastIndex ? 0 : classIndex.value + 1
      ];
      imgsRead.value = [...new Set(imgsRead.value)];
    }
    const changeClassIndex = (current) => {
      currentInfo.value = classList.value[current.detail.current];
      classIndex.value = current.detail.current;
      readImgFun();
    };
    const clickDownload = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        let {
          classid,
          _id: wallId
        } = currentInfo.value;
        let res = await api_apis.apiWriteDownload({
          classid,
          wallId
        });
        if (res.errCode != 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picUrl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (res3) => {
                common_vendor.index.showToast({
                  title: "保存成功，请到相册查看",
                  icon: "none"
                });
              },
              // 手动调用权限，实现多次下载
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "授权提示",
                  content: "需要授权保存相册",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取权限失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (err) {
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "小唐壁纸酷",
        path: `/pages/preview/preview?id=${currentId.value}&type="share"`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "小唐壁纸酷",
        query: "id=" + currentId.value + "&type=share"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? common_vendor.e({
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: imgsRead.value.includes(index)
          }, imgsRead.value.includes(index) ? {
            b: item.picUrl,
            c: common_vendor.o(onMask, item._id)
          } : {}, {
            d: item._id
          });
        }),
        c: classIndex.value,
        d: common_vendor.o(changeClassIndex),
        e: maskState.value
      }, maskState.value ? {
        f: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        g: common_vendor.o(goBack),
        h: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        i: common_vendor.t(classIndex.value + 1),
        j: common_vendor.t(classList.value.length),
        k: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: Date.now(),
          format: "MM月/dd日"
        }),
        m: common_vendor.p({
          type: "info",
          size: "23"
        }),
        n: common_vendor.o(($event) => clickInfo(true)),
        o: common_vendor.p({
          type: "star",
          size: "23"
        }),
        p: common_vendor.t(currentInfo.value.score),
        q: common_vendor.o(($event) => clickScore(true)),
        r: common_vendor.p({
          type: "download",
          size: "23"
        }),
        s: common_vendor.o(($event) => clickDownload())
      } : {}) : {}, {
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(($event) => clickInfo(false)),
        w: common_vendor.t(currentInfo.value.classid),
        x: common_vendor.t(currentInfo.value.tabs[1]),
        y: common_vendor.t(currentInfo.value.nickname),
        z: common_vendor.p({
          readonly: "true",
          value: "5",
          touchable: "false",
          size: "16"
        }),
        A: common_vendor.t(currentInfo.value.score),
        B: common_vendor.t(currentInfo.value.description),
        C: common_vendor.f(currentInfo.value.tabs, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        D: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        E: common_vendor.p({
          type: "bottom"
        }),
        F: common_vendor.t(buttonSwitch.value || currentInfo.value.userScore ? "已经评分过了~" : "壁纸评分"),
        G: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        H: common_vendor.o(($event) => clickScore(false)),
        I: common_vendor.o(($event) => scoreValue.value = $event),
        J: common_vendor.p({
          size: 18,
          ["allow-half"]: true,
          disabled: buttonSwitch.value,
          modelValue: scoreValue.value
        }),
        K: common_vendor.t(scoreValue.value),
        L: common_vendor.o(submitScore),
        M: buttonSwitch.value || currentInfo.value.userScore,
        N: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        O: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
