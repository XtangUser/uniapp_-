<template>
	<view class="themeItem">
		<navigator :url="`/pages/classifyList/classifyList?id=${item._id}&name=${item.name}`" class="box" v-if='!isMore'>
			<image :src="item.picurl" mode="aspectFill" class="pic"></image>
		<view class="mask">
			{{item.name}}
		</view>
		<view class="tab">
			{{compareTimestamp(item.updateTime)}}
		</view>
		</navigator>
		<navigator url="/pages/Classify/Classify" class="box more" v-if='isMore' open-type="reLaunch">
			<image src="../../common/image/more.jpg" mode="aspectFill" class="pic"></image>
		<view class="mask">
			<uni-icons type="more-filled" size="30" color="#fff"></uni-icons>
			<text class="text">更多</text>
		</view>
		</navigator>
	</view>
</template>

<script setup>
	import {compareTimestamp} from '@/utils/common.js'
// 定义变量进行判断是否渲染更多
defineProps({
	isMore:{
		type:Boolean,
		default:false
	},
	item:{
		type:Object,
		default(){
			return  {
				name:'默认标题',
				picurl:'@../../common/image/more.jpg',
				updateTime:new Date() - 1000*3600*5
			}
			
		}
	}
})
</script>

<style scoped lang="scss">
	.themeItem {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			//子绝父相 
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}


		.mask {
			width: 100%;
			height: 70rpx;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			position: absolute;
			bottom: 0;
			left: 0;
			// 居中
			display: flex;
			justify-content: center;
			align-items: center;
			backdrop-filter: blur(20rpx);
			font-weight: 600;
			font-size: 30rpx;
		}
		.tab{
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(250,129,90,0.7);
			backdrop-filter: blur(20rpx);
			color: #fff;
			font-size: 22rpx;
			padding: 6rpx 10rpx;
			border-radius: 0 0 20rpx 0;
		}
				}
		.more{
			
		.mask{
			width: 100%;
			height:340rpx;
			flex-direction: column;
		}
		
	}
	}
</style>