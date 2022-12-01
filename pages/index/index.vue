<template>
	<view>
		<view>
			<view class="banner flex">
				<image class="image" :src="logoImage"></image>
				<view class="name">
					{{name}}
				</view>
			</view>

			<view v-if="isLogin" class="icon_box">
				<block v-for="item in guide" :key="item.title">
					<view class="item" @click="jump(item.id)">
						<view class="icon_box_text">
							<view class="flex icon_box_text_left">
								<image :src="item.icon"></image>
								<view class="icon_title">{{item.title}}</view>
							</view>
							<view class="icon_box_text_right">
								<image src="../../static/image/right.png"></image>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				isLogin: false,
				name: "",
				logoImage:'',
				guide: [],
			}
		},
		onLoad() {
			let state = this.common.get("state")
			if (state == 1) {
				uni.reLaunch({
					url: "/pages/login/login"
				})
				return
			} else if (state == 2) {
				let that = this
				that.isLogin = true
			} else {
				// this.name = "云仓储"
				uni.switchTab({
					url: "/pages/user/user"
				})
			}
		},
		onShow() {
		    let uid = this.common.get("uid")
		    if (uid != "") {
		        this.http({
		            url: this.api.merchant,
		            method: "POST",
		            data: {
		                uid: uid
		            },
		            success: res => {
		                this.name = res.shop_name
						this.logoImage = res.shop_logo
		            }
		        })
				this.index_list()
		    } else {
				uni.switchTab({
				    url: "/pages/user/user"
				})
			}
		},
		methods: {
			// 主页功能列表接口
			index_list() {
				this.http({
					url: this.api.Index_index,
					method: "POST",
					data: {
						uid: this.common.get("uid")
					},
					success: res => {
						this.guide = res
					}
				})
				
			},
			// 页面跳转
			jump(item) {
				console.log('item',item)
				// 客户管理
				if(item == 35) {
					uni.navigateTo({
						url: "/pages/customer/customer/customer"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
    .banner {
        width: 750rpx;
        height: 192rpx;
        background: #2E74F4;
        box-sizing: border-box;
        padding: 30rpx;
        color: $color-f;
        .image {
            width: 100rpx;
            height: 100rpx;
            margin-right: 30rpx;
			border-radius: 50%;
        }
    }
	.icon_box {
		margin-top: 30rpx;
		.item {
			box-shadow: 0px 2rpx 16rpx 2rpx rgba(179,175,175,0.2500);
			background: #ffffff;
			border-radius: 8rpx;
			margin: 20rpx 30rpx;
			.icon_box_text {
				display: flex;
				align-items: center;
				justify-content: space-between;
				// width: 690rpx;
				padding: 20rpx 50rpx ;
				font-size: 32rpx;
				font-weight: 500;
				color: $color-3;
				.icon_box_text_left {
					image {
						width: 100rpx;
						height: 100rpx;
						margin-right: 28rpx;
					}
				}
				.icon_box_text_right {
					image {
						width: 36rpx;
						height: 24rpx;
					}
				}
			}
		}
	}
	
</style>
