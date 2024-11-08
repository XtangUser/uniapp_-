<template>
	<view class="userLayout pageBg" v-if="adressData">
		<custom-nav-bar title="个人中心"></custom-nav-bar> 
		<view class="userInfo">
			<view class="avatar">
				<image src="../../common/image/小唐.jpg" mode="" class="image"></image>
			</view>
			<view class="ip">
				{{adressData?.IP}}
			</view>
			<view class="adress">
				来自:{{adressData?.address.province+'-'+adressData?.address.city}}
			</view>
		</view>
		<view class="section">
			<view class="list">
				<!-- 我的下载 -->
				<navigator url="/pages/classifyList/classifyList?name=我的下载&type=download">
					<view class="row">

					<view class="left">
						<uni-icons type="download-filled" size="20"></uni-icons>
						<view class="text">
							我的下载
						</view>
					</view>
					<view class="right">
						<view class="text">
							{{adressData?.downloadSize}}
						</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>

					</view>
					</view>
				</navigator>
				<!-- 我的评分 -->
				<navigator url="/pages/classifyList/classifyList?name=我的评分&type=score" >
					<view class="row">

					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">
							我的评分
						</view>
					</view>
					<view class="right">
						<view class="text">
							{{adressData?.scoreSize}}
						</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>

					</view>
					</view>
				</navigator>
				<!-- 联系客服 -->
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">
							联系客服
						</view>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="onCall">拨打电话</button>
					<!-- #endif -->
					<view class="right">
						<view class="text">
							<uni-icons type="person-filled" size="30" ></uni-icons>
						</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>

					</view>
				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<!-- 订阅更新 -->
				<navigator class="row" url="/pages/notice/detail">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">
							订阅更新
						</view>
					</view>
					<view class="right">
						<view class="text">
							2
						</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>

					</view>
				</navigator>
				<!-- 常见问题 -->
				<navigator class="row" url="/pages/notice/notice">
					<view class="left">
						<uni-icons type="help-filled" size="15"></uni-icons>
						<view class="text">
							常见问题
						</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</navigator>
			</view>
		</view>
	</view>
	<!-- 显示加载页面 -->
	<view v-else>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	// 导入接口方法
	import { ref } from 'vue';
import {apiUserInfo} from '../../api/apis.js'
	// h5页面为拨打电话
	const onCall = () => {
		uni.makePhoneCall({
			phoneNumber: '18236292785' //仅为示例
		});
	}
	// i定义数组接收数据
	const adressData=ref(null)
	// 拉取个人数据信息
	const getUserInfo=async ()=>{
		await apiUserInfo().then(res=>{
			if(res.errCode===0){
				adressData.value=res.data
			}
		})
	}
	getUserInfo()
</script>

<style scoped lang="scss">
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;

		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;

			.image{
				width: 100%;
				height: 100%
			}
		}

		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 20rpx;
		}

		.adress {
			font-size: 28rpx;
			color: #aaa;
		}
	}

	.section {
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.5);

		.list {
			.row {
				background-color: #fff;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				&:last-child {
					border-bottom: 0;
				}

				.left {
					display: flex;
					align-items: center;
					:deep(.uni-icons) {
						color: $brand-theme-color !important;

					}

					.text {
						margin-left: 10rpx;
						color: #666;
					}
				}

				.right {
					display: flex;
					align-items: center;
					.text {
						font-size: 28rpx;
						color: #aaa;
					}
				}

				button {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100rpx;
					opacity: 0;
				}
			}
		}
	}
</style>