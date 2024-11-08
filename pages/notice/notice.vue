<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">欢迎大家来到小唐壁纸酷</view>			
		</view>
		
		<view class="info">
			<view class="item">小唐壁纸酷</view>					
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>	
		</view>
		
		
		<view class="content">		
			这是学习案例，免费提供一个无广告的壁纸下载中心，当然有啥相关问题也可联系站主
			<view class="weixin">
				<image src="../../common/image/weixin.jpg" mode="widthFix"></image>
			</view>
			<view class="qq">
				<image src="../../common/image/qq.jpg" mode="widthFix" style="display: inline-block;"></image>
			</view>
		</view>
		
		<view class="count">
			阅读 888
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.noticeLayout{
	padding:30rpx;
		.title{
			font-size: 40rpx;
			color:#111;
			line-height: 1.6em;
			padding-bottom:30rpx;
			display: flex;
			.tag{
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;	
			}
			.font{
				padding-left:6rpx;
			}
		}
		.info{
			display: flex;
			align-items: center;
			color:#999;
			font-size: 28rpx;
			.item{
				padding-right: 20rpx;
			}
		}
		.content{
			padding:50rpx 0;
		}
		.count{
			color:#999;
			font-size: 28rpx;
		}
}
</style>