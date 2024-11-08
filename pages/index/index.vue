<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar></custom-nav-bar>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper indicator-dots autoplay :interval="3000" :duration="1000" indicator-active-color="#00bfff"
				indicator-color="#ccc" circular>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target == 'miniProgram'" :url="item.url" class="like" target="miniProgram"
						:app-id="item.appid">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>

					<navigator v-else :url="`/pages/classifyList/classifyList?${item.url}`" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>

				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper :autoplay="true" :interval="3000" :duration="1000" circular vertical>
					<swiper-item>
						<view class="swiper-item">
							<navigator url="/pages/notice/detail">常见问题，点击联系客服，或qq邮箱</navigator>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<navigator url="/pages/notice/notice">小唐壁纸酷--站主有话说</navigator>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right" @click="goDetail">
				<uni-icons type="right" size="20" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 每日推荐 -->
		<view class="select">
			<!-- 封装组件 -->
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar-filled" size="30"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd号"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x show-scrollbar="false">
					<view v-for="item in roudomPic" class="box" @click="goPreview(item._id)" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题精选 -->
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="bars" size="30"></uni-icons>
						<view class="more">
							More+
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<theme-title v-for="item in classifyList" :item="item" :key="item._id"></theme-title>
				<!-- 更多 -->
				<theme-title :isMore='true'></theme-title>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		apiGetBanner,
		apiGetDayRandom,
		// apiGetNotice,
		apiGetClassify,
	} from "@/api/apis.js"
	// 分享api
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	// 定义接收数组
	const bannerList = ref([])
	// 获取数据
	const getBanner = async () => {
		let res = await apiGetBanner({

		})
		bannerList.value = res.data
	}
	getBanner()
	// 随机列表壁纸
	const roudomPic = ref([])
	const getDayroudom = async () => {
		let res = await apiGetDayRandom({})
		roudomPic.value = res.data
	}
	getDayroudom()
	// // 获取公告列表
	// const noticeList = ref([])
	// const getNotice = async () => {
	// 	let res = await apiGetNotice({
	// 		data: {
	// 			select: true,
	// 			pageSize: 3,
	// 		}
	// 	})
	// 		noticeList.value = res.data
	// }
	// getNotice()
	// 专题精选
	const classifyList = ref([])
	const getClassify = async () => {
		let res = await apiGetClassify({
			data: {
				select:true
			}
		})
		res.data=res.data.filter(item=>{
			return item.name!='AI美图'
		})
		console.log(res.data);
		classifyList.value = res.data
	}

	getClassify();
	onShareAppMessage(() => {
		return {
			title: '小唐壁纸酷',
			path: '/pages/index/index'
		}
	})
	// 跳转公告页面
	const goDetail = () => {
		uni.navigateTo({
			url: '/pages/notice/detail'
		})
	}
	// 跳转预览页面
	const goPreview = (id) => {
		// 添加随机列表缓存
		uni.setStorageSync('storageClassList', roudomPic.value)
		uni.navigateTo({
			url: '/pages/preview/preview?id=' + id
		})
	}
	// 分享朋友圈api
	onShareTimeline(() => {
		return {
			title: '小唐壁纸酷',
		}
	})
</script>

<style lang="scss" scoped>
	.banner {
		width: 750rpx;
		padding: 30rpx 0;

		swiper {
			width: 750rpx;
			height: 340rpx;

			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;

				.like {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

			}
		}
	}

	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;

		.left {
			width: 140rpx;
			display: flex;
			align-items: center;

			:deep(.uni-icons) {
				color: $brand-theme-color !important;

			}

			.text {
				margin-left: 10rpx;
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}

		.center {
			flex: 1;
		}

		.right {
			width: 70rpx;
			display: flex;
			align-items: center;
		}

		swiper {
			height: 100%;

			&-item {
				height: 100%;
				font-size: 30rpx;
				color: #666;
				// 设置字体溢出省略
				text-overflow: ellipsis;
				overflow: hidden;
				// 不换行
				white-space: nowrap;
			}
		}
	}

	.select {
		.date {
			display: flex;
			align-items: center;
			color: $brand-theme-color;

			:deep(.uni-icons) {
				color: $brand-theme-color !important;

			}
		}

		padding-top: 50rpx;

		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;

			scroll-view {
				white-space: nowrap;

				.box {
					margin-right: 15rpx;
					width: 200rpx;
					height: 430rpx;
					display: inline-block;

					image {
						width: 100%;
						height: 100%;
						border-radius: 12rpx;
					}
				}

				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}

	.theme {
		padding-top: 30rpx;

		.date {
			display: flex;
			align-items: center;
		}

		.more {
			font-size: 30rpx;
			color: #888;
			padding-left: 2rpx;
		}

		.content {
			margin-top: 10rpx;
			padding: 20rpx 50rpx 30rpx;
			//网格布局
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>