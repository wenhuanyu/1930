<template>
	<view class="container">
		<view class="list_line">
			<view>头像</view>
			<view><image class="avatar" :src="avatar"></image></view>
		</view>
		<view class="list_line">
			<view>名称</view>
			<view>
				<view class="you_text">{{nickname}}</view>
				<image class="you" src="/static/image/you.png"></image>
			</view>
		</view>
		<!-- <view class="list_line">
			<view>性别</view>
			<view>
				<view class="you_text">男</view>
				<image class="you" src="/static/image/you.png"></image>
			</view>
		</view> -->
		<view class="list_line">
			<view>绑定手机</view>
			<view>
				<view class="you_text">{{tel}}</view>
				<image class="you" src="/static/image/you.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: "",
				tel: "",
				avatar: "",
			}
		},
		onLoad() {
			let uid = this.common.get("uid")
			if (uid != "") {
				this.http({
					url: this.api.userData,
					method: "POST",
					data: {
						uid: uid
					},
					success: res => {
						this.nickname = res.name
						this.tel = res.phone
						this.avatar = res.avatarUrl
					}
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.list_line {
	height: 110rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2rpx solid #F6F7F8;
	font-size: 24rpx;
	font-weight: 400;
	color: $color-3;
	.avatar{
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}
	.you {
		width: 7.92rpx;
		height: 13.9rpx;
		margin-left: 20rpx;
	}
	view{
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.you_text {
		font-size: 28rpx;
		font-weight: 500;
	}
}
</style>
