<template>
	<view class="preview" v-if="currentInfo">
		<swiper circular :current="classIndex" @change="changeClassIndex">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<image v-if="imgsRead.includes(index)" :src="item.picUrl" mode="aspectFill" @click="onMask"></image>
			</swiper-item>
		</swiper>
		<!-- 遮罩层 -->
		<view class="mask" v-if="maskState">
			<view class="goBack" @click="goBack" :style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<!-- 计数 -->
			<view class="count">
				{{ classIndex +1}} / {{classList.length}}
			</view>
			<!-- 时间 -->
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月/dd日"></uni-dateformat>
			</view>
			<!-- 底部详细信息 -->
			<view class="footer">
				<view class="box" @click="clickInfo(true)">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">
						信息
					</view>
				</view>
				<view class="box" @click="clickScore(true)">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">
						{{currentInfo.score}}分
					</view>
				</view>
				<view class="box" @click="clickDownload()">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">
						下载
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 底层弹出框 -->
	<!-- 详细信息 -->
	<uni-popup ref="infoPopup" type="bottom">
		<view class="infoPopup">
			<view class="popHeader">
				<view></view>
				<view class="title">
					壁纸信息
				</view>
				<view class="close" @click="clickInfo(false)">
					<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
				</view>
			</view>
			<scroll-view scroll-y="true">
				<view class="content">
					<!-- 壁纸id -->
					<view class="row">
						<view class="label">
							壁纸ID:
						</view>
						<text selectable class="value">{{currentInfo.classid}}</text>
					</view>
					<!-- 分类 -->
					<view class="row">
						<view class="label">
							分类:
						</view>
						<text selectable class="value classify">{{currentInfo.tabs[1]}}</text>
					</view>
					<!-- 发布者 -->
					<view class="row">
						<view class="label">
							发布者:
						</view>
						<text selectable class="value">{{currentInfo.nickname}}</text>
					</view>
					<!-- 评分 -->
					<view class="row">
						<view class="label">
							评分:
						</view>
						<view class="value roteBox">
							<uni-rate readonly="true" value="5" touchable="false" size="16" />
							<text selectable class="score">{{currentInfo.score}}分</text>
						</view>

					</view>
					<!-- 摘要 -->
					<view class="row">
						<view class="label">
							摘要:
						</view>
						<view class="value"><text selectable>{{currentInfo.description}}</text></view>
					</view>
					<!-- 标签名 -->
					<view class="row">
						<view class="label">
							标签名:
						</view>
						<view selectable class="value tabs">
							<view class="tab" v-for="(item,index) in currentInfo.tabs" :key="index">
								{{item}}
							</view>
						</view>
					</view>
					<!-- 版权声明 -->
					<view class="copyright">
						声明：本图片来用户投稿,非商业使用,用于免费学习交流,如侵犯了您的权益,您可以拷贝壁纸ID举报至平台,邮箱3196263280@qq.com,管理将删除侵权壁纸，维护您的权益。

					</view>
					<view class="safe-arae-insert-bottom">
						
					</view>
				</view>


			</scroll-view>
		</view>
	</uni-popup>
	<!-- 点击评分 -->
	<uni-popup ref="scorePopup" :is-mask-click="false">
		<view class="scorePopup">
			<view class="popHeader">
				<view></view>
				<view class="title">
					{{buttonSwitch || currentInfo.userScore ?'已经评分过了~':'壁纸评分'}}
				</view>
				<view class="close" @click="clickScore(false)">
					<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
				</view>
			</view>
			<view class="content">
				<uni-rate v-model="scoreValue" :size="18" allow-half :disabled="buttonSwitch" />
				<text class="text">{{scoreValue}}分</text>
			</view>
			<view class="footer">
				<button @click="submitScore" type="default" size="mini"
					:disabled="buttonSwitch || currentInfo.userScore">确认评分</button>
			</view>
		</view>
	</uni-popup>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		getStatusBarHeight
	} from "@/utils/system.js"
	import {
		onShareAppMessage,
		onShareTimeline,
		onUnload
	} from '@dcloudio/uni-app'
	import {
		apiGetSetupScore,
		apiWriteDownload,
		apiDetailWall
	} from "@/api/apis.js"
	const classList = ref([])
	// 定义方法实现遮罩层的显示与隐藏
	// 定义对象接收壁纸详细信息
	const currentInfo = ref(null)
	const maskState = ref(true)
	// 评分弹窗
	const scoreValue = ref(0)
	const scorePopup = ref(null)
	const onMask = () => {
		maskState.value = !maskState.value
	}
	// 详细信息点击显示弹窗
	const infoPopup = ref(null)
	const clickInfo = (value) => {
		if (value) {
			infoPopup.value.open()
		} else {
			infoPopup.value.close()
		}

	}
	const clickScore = (value) => {
		if (value) {
			scorePopup.value.open()
				if (currentInfo.value.userScore) {
					buttonSwitch.value = true
					scoreValue.value = currentInfo.value.userScore;
					}
					else{
						scoreValue.value=currentInfo.value.score
					}
		} else {
			    scorePopup.value.close()
				scoreValue.value = 0;
				buttonSwitch.value = false;
		}

	}
	// 接收路径传输过来的id
	const currentId = ref(null)
	let Props = defineProps({
		id: String,
		type: String
	})
	// 拉取缓存中的图片信息(修改后缀名，进行渲染)
	const classIndex = ref(null)
	const imgsRead = ref([])
	// 拿到当前页面的详细信息
	async function getDetailInfo() {
		currentId.value = Props.id
		classList.value = uni.getStorageSync('storageClassList') || []
		if (Props.type == 'share') {
			let res = await apiDetailWall({
				id: Props.id
			})
			classList.value = res.data.map(item => {
				return {
					...item,
					picUrl: item.smallPicurl.replace('_small.webp', '.jpg')
				}
			})
		}
		else{
			
			classList.value = classList.value.map(item => {
				return {
					...item,
					picUrl: item.smallPicurl.replace('_small.webp', '.jpg')
				}
			})
		}
		// 在数组中找到点击图片的索引
		classIndex.value = classList.value.findIndex(item => {
			return item._id == Props.id
		})
		// 刚进页面进行赋值
			currentInfo.value = classList.value[classIndex.value]
			readImgFun()
	
	}
	getDetailInfo()
	// 提交评分
	// 定义按键控制变量
	const buttonSwitch = ref(false)
	const submitScore = async () => {
		try{
			// 加载框
			uni.showLoading({
				title: '加载中...'
			})
			let res = await apiGetSetupScore({
				classid: currentInfo.value.classid,
				wallId: currentInfo.value._id,
				userScore: scoreValue.value,
			})
			if (res.errCode === 0) {
				uni.showToast({
					title: "评分成功!",
					icon: "success"
				})
				// 更新分数，重新设置缓冲数据
				classList.value[classIndex.value].userScore = scoreValue.value
				uni.setStorageSync('storageClassList', classList.value)
			} else {
				uni.showToast({
					title: "失败!",
					icon: "error"
				})
				
			}
			clickScore()
		}finally{
			uni.hideLoading()
		}
	

	}
	//返回上一页
	const goBack = () => {
		uni.navigateBack({
			success() {
			
			},
			fail() {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		})
	}
	// 解决资源浪费问题
function readImgFun() {
    const lastIndex = classList.value.length - 1;
    imgsRead.value = [
        classIndex.value === 0 ? lastIndex : classIndex.value - 1,
        classIndex.value,
        classIndex.value === lastIndex ? 0 : classIndex.value + 1
    ];
    imgsRead.value = [...new Set(imgsRead.value)];
}
	// 滑动图片修改索引值
	const changeClassIndex = (current) => {
		currentInfo.value = classList.value[current.detail.current]
		classIndex.value = current.detail.current
		readImgFun()
	}
	//点击下载
	const clickDownload = async () => {

		// #ifdef H5
		uni.showModal({
			content: "请长按保存壁纸",
			showCancel: false
		})
		// #endif

		// #ifndef H5
		try {

			uni.showLoading({
				title: "下载中...",
				mask: true
			})
			let {
				classid,
				_id: wallId
			} = currentInfo.value;
			// 多次请求返回稍等
			let res = await apiWriteDownload({
				classid,
				wallId
			})
			if (res.errCode != 0) throw res;
			// 将网络路径转换成本地图片路径
			uni.getImageInfo({
				src: currentInfo.value.picUrl,
				success: (res) => {
					// 调用本地图片存储api
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: (res) => {
							uni.showToast({
								title: "保存成功，请到相册查看",
								icon: "none"
							})
						},
						// 手动调用权限，实现多次下载
						fail: err => {
							if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title: '保存失败，请重新点击下载',
									icon: "none"
								})
								return;
							}
							uni.showModal({
								title: "授权提示",
								content: "需要授权保存相册",
								success: res => {
									if (res.confirm) {
										uni.openSetting({
											success: (setting) => {
												if (setting
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: "获取授权成功",
														icon: "none"
													})
												} else {
													uni.showToast({
														title: "获取权限失败",
														icon: "none"
													})
												}
											}
										})
									}
								}
							})
						},
						complete: () => {
							uni.hideLoading();
						}
					})

				}
			})

		} catch (err) {
			uni.hideLoading();
		}
		// #endif
	}
	// 分享
	onShareAppMessage(() => {
		return {
			title: '小唐壁纸酷',
			path: `/pages/preview/preview?id=${currentId.value}&type="share"`
		}
	})
	// 分享朋友圈api
	onShareTimeline(() => {
		return {
			title: '小唐壁纸酷',
			query: "id=" + currentId.value + "&type=share",
		}
	})
</script>

<style scoped lang="scss">
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				width: fit-content;
			}

			.goBack {
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100px;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.count {
				top: 10vh;
				font-size: 28rpx;
				background: rgba(0, 0, 0, 0.3);
				color: #fff;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				color: #fff;
				line-height: 1em;
				font-weight: 100;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
				letter-spacing: 2rpx;
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
				color: #fff;
				letter-spacing: 2rpx;
			}

			.footer {
				background: rgba(255, 2555, 255, 0.8);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);

				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 2rpx 10rpx;

					.text {
						font-size: 26rpx;
						color: #777;
					}

				}
			}
		}
	}

	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}

		.close {
			padding: 6rpx;
		}
	}

	.infoPopup {
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;

		scroll-view {
			max-height: 60vh;

			.content {
				.row {
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7rem;

					.label {
						color: $text-font-color-3;
						width: 140rpx;
						text-align: center;
						font-size: 30rpx;
					}

					.value {
						flex: 1;
						width: 0;
					}

					.roteBox {
						display: flex;
						align-items: center;

						.score {
							font-size: 26rpx;
							color: $uni-text-color;
							padding-left: 10rpx;
						}
					}

					.tabs {

						display: flex;
						flex-wrap: wrap;

						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1rem;
							margin: 0 10rpx 10rpx 0;
						}
					}

					.classify {
						color: $brand-theme-color;
					}

				}

				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #F6F6F6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}

	.scorePopup {
		background: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;

		.content {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				color: #FFCA3E;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}

		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>