<template>
	<view class="container">
		<block v-if="isLogin">
			<view class="flex" @click="ziliao">
				<image class="avatar" :src="avatar"></image>
				<view class="info">
					<view class="nickname">
						{{nickname}}
					</view>
					<view class="tel">
						{{tel}}
					</view>
				</view>
			</view>
			<view class="personal_list" v-if="is_shop == 1">
				<block v-for="item in personal_list" :key="item.title">
					<view class="item" @click="jump(item.id)">
						<view class="icon_text">
							<view>
								<image src="../../static/image/shop.png"></image>
							</view>
							<view class="icon_title">{{item.title}}</view>
						</view>
					</view>
				</block>
			</view>
			<view class="bottom_text" @click="tiaozhuan" style="position: fixed; bottom: 10%; right: 4%; width: 92%;">
				技术支持：木子天禾科技
			</view>
		</block>
		<block v-else>
			<view class="flex ">
				<image class="avatar" src="/static/image/user-default.png"></image>
				<view class="login" @click="login">点击登录</view>
			</view>
		</block>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				isLogin: false,
				nickname: "",
				tel: "",
				avatar: "",
				personal_list:[
					{
						id:1,
						title:'商品管理'
					}
				],
				is_shop:'',
			}
		},
		onLoad() {
			let state = this.common.get("state")
			if (state == 1) {
				uni.reLaunch({
					url: "/pages/login/login"
				})
			} else if (state == 2) {
				this.isLogin = true
			}

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
						this.is_shop = res.is_shop
					}
				})
			}
			// this.userList()
		},
		methods: {
			//技术支持跳转
			tiaozhuan(){
				uni.navigateToMiniProgram({
					appId: 'wxa59d080ba74b049a',
					path: 'page/index/index',
					success(res) {}
				})
			},
			// 资料跳转
			ziliao() {
				uni.navigateTo({
					url:"/pages/ziliao/ziliao/ziliao"
				})
			},
			// 微信小程序登录
			login() {
				// 1.获取用户信息
				uni.getUserProfile({
					desc: "weixin",
					success: res => {
						console.log('res',res)
						let encryptedData = res.encryptedData
						let iv = res.iv
						let userInfo = res.userInfo

						// 2.获取code
						uni.login({
							provider: "weixin",
							success: res => {
								console.log('111',res)
								let code = res.code

								// 3.登录获取session_key
								this.http({
									url: this.api.login,
									method: "POST",
									data: {
										code: code,
									},
									success: res => {
										if (!res.session_key) {
											this.store(res)
											return
										}
										let session_key = res.session_key
										
										// 4.绑定用户信息
										this.http({
											url: this.api.login,
											method: "POST",
											data: {
												avatar: userInfo.avatarUrl,
												nick_name: userInfo.nickName,
												sex: 0,
												session_key: session_key,
												iv: iv,
												encryptedData: encryptedData
											},
											success: res => {
												this.store(res)
											}
										})
									}
								})
							}
						})
					}
				})
			},
			store(res) {
				this.common.set("uid", res.uid)
				this.common.set("state", res.binding_state)
				if (res.binding_state == 1) {
					uni.reLaunch({
						url: "/pages/login/login"
					})
				} else if (res.binding_state == 2) {
					uni.reLaunch({
						url: "/pages/index/index"
					})
				}
			},
			// 我的页面功能列表接口
			// userList() {
			// 	this.http({
			// 		url:this.api.personal,
			// 		method:"POST",
			// 		data:{
			// 			uid: this.common.get("uid")
			// 		},
			// 		success:res =>{
			// 			this.personal_list = res
			// 		}
			// 	})
			// },
			// 跳转
			jump(item) {
				console.log('item',item)
				// 商品
				if(item == 1) {
					uni.navigateTo({
						url:"/pages/goods/goods/goods"
					})
				}
				// 商品分类管理
				if(item == 39) {
					uni.navigateTo({
						url:"/pages/goods_category/goods_category/goods_category"
					})
				}
				// 商品单位
				if(item == 40) {
					uni.navigateTo({
						url:"/pages/commodity_unit/commodity_unit/commodity_unit"
					})
				}
				// 员工管理
				if(item == 42) {
					uni.navigateTo({
						url:"/pages/employees/employees/employees"
					})
				}
				// 公司设置
				if(item == 46) {
					uni.navigateTo({
						url:"/pages/setting/setting/setting"
					})
				}
			}
        }
    }
</script>

<style lang="scss">
.flex {
	margin-top: 48rpx;
	.info {
		margin-left: 20rpx;
		.nickname {
			font-size: 32rpx;
			font-weight: bold;
		}
		.tel {
			margin-top: 20rpx;
			color: $color-8;
		}
	}
	.login {
		font-size: 36rpx;
		font-weight: bold;
		margin-left: 20rpx;
	}
}
.personal_list {
	margin-top: 88rpx;
	width: 690rpx;
	display: grid;
	justify-content: space-evenly;
	flex-wrap: wrap;
	grid-template-columns: repeat(auto-fill, 220rpx);
	grid-gap: 14rpx;
	.item {
		width: 220rpx;
		height: 150rpx;
		background: #FFFFFF;
		box-shadow: 0px 1px 8px 1px rgba(179, 175, 175, 0.12);
	}
	button::after{
		border: 0; // 或者 border: none;
	}
	.button{
		border-radius: 0!important;
		width: 220rpx!important;
		height: 150rpx!important;
		background: #FFFFFF!important;
	}
}
.bottom_text {
	height: 34rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #999999;
	line-height: 34rpx;
	text-align: center;
}
.item {
	margin-top: 20rpx;
	.one {
		width: 220rpx;
		height: 150rpx;
		box-shadow: 0px 2px 16px 2px rgba(179, 175, 175, 0.12);
		border-radius: 8px;
		margin-right: 20rpx;
		.image {
			width: 54rpx;
			height: 54rpx;
			margin-bottom: 10rpx;
		}
	}
}
</style>
