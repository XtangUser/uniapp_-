<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-title v-for="item in classifyList" :item="item" :key="item._id"></theme-title>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		apiGetClassify,
	} from "@/api/apis.js"
	const classifyList = ref([])
	const getClassify = async () => {
		let res = await apiGetClassify({
		pageSize:15,
		})
		// 过滤数组
		res.data=res.data.filter(item=>{
			return item.name!='AI美图'
		})
		classifyList.value = res.data
	}

	getClassify()
</script>

<style scoped lang="scss">
	.classLayout {
		.classify {
			padding: 30rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 15rpx;

		}
	}
</style>