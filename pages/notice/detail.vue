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
			如果存在bug记得联系站主哦!!!  
			声明：本图片来用户投稿,非商业使用,用于免费学习交流,如侵犯了您的权益,您可以拷贝壁纸ID举报至平台,邮箱<text style="color:pink" selectable>3196263280@qq.com</text>,管理将删除侵权壁纸，维护您的权益。				
		</view>
		
		<view class="count">
			阅读 999
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
