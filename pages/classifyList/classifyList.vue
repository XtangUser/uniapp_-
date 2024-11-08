<template>
	<!-- 添加加载框 -->
	<view class="loading" v-if="!classifyList.length && nodata!=0">
		<uni-load-more status="loading"></uni-load-more>
	</view>
	<view class="content">
		<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in classifyList"
			:key="item._id">
			<image :src="item.smallPicurl" mode="aspectFill" class="image"></image>
		</navigator>
	</view>
	<!-- 添加下拉框 -->
	<view class="loading" v-if="classifyList.length || nodata===0">
		<uni-load-more :status="nodata===1?'loading':'noMore'"></uni-load-more>
	</view>
	<!-- 底部安全区域 -->
	<view class="safe-arae-insert-bottom">
	</view>
</template>

<script setup>
	import {
		apiGetClassList,
		apiGetHistoryList
	} from '@/api/apis.js'
	import {
		gotoHome
	} from '@/utils/common.js'
	import {
		onLoad,
		onReachBottom,
		onShareAppMessage,
		onShareTimeline,
		onUnload
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
	const data = {
		pageNum: 1,
		pageSize: 12
	}
	let pageName = null;
	const nodata = ref(1)
	// 用onload来接收路径传输过来的参数,注意生命周期的运行时间
	onLoad((e) => {
		const {
			id=null,
			name=null,
			type=null
		} = e
		if (!id) {
			gotoHome();
		}
		pageName = name
		// 设置页面标题
		uni.setNavigationBarTitle({
			title: name,
		})
		// 根据变量限制api接口传参
		if (type) {
			data.type = type;
			getClassLstDoS()
		}
		if (id) {
			data.classid = id;
			getClassifyList()
		}

	})
	// 触底

	// 获取列表数据
	const classifyList = ref([])
	const getClassifyList = async () => {
		let res = await apiGetClassList(data)
		// 结构赋值拼接
		classifyList.value = [...classifyList.value, ...res.data]
		// 将图片存放在缓存里面，便于拉取
		uni.setStorageSync('storageClassList', classifyList.value);
		if (res.data.length == 0) {
			uni.showToast({
				title: "到底了",
				icon: "error"
			})
			nodata.value = 0
		}
	}
	// 获取下载或评分记录
	const getClassLstDoS = async () => {
		let res = await apiGetHistoryList(data)
		// 结构赋值拼接
		classifyList.value = [...classifyList.value, ...res.data]
		// 将图片存放在缓存里面，便于拉取
		uni.setStorageSync('storageClassList', classifyList.value);
		if (res.data.length == 0) {
			uni.showToast({
				title: "到底了",
				icon: "error"
			})
			nodata.value = 0
		}
	}
	onReachBottom(() => {
		if (nodata.value === 0) return;
		data.pageNum++;
		if (data.classid) getClassifyList();
		if(data.type) getClassLstDoS ();
	})
	// 分享
	onShareAppMessage(() => {
		return {
			title: '小唐壁纸酷-' + pageName,
			path: `/pages/classifyList/classifyList?id=${data.classid}&name=${pageName}`
		}
	})
	// 分享朋友圈api
	onShareTimeline(() => {
		return {
			title: '小唐壁纸酷-' + pageName,
			query: `id=${data.classid}&name=${pageName}`,
		}
	})
	onUnload(()=>{
		uni.removeStorageSync("storgClassList")
	})
</script>

<style scoped lang="scss">
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;

		.item {
			height: 440rpx;

			.image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}

	}
</style>