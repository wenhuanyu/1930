<template>
	<view>
		<view class="top_box">
			<view class="top_box_list">
				<view class="first">
					<view>{{data.nick_name}}</view>
					<image class="image" src="../../../static/image/phone.png" @click="phone"></image>
				</view>
				<view class="second">联系电话 <span>{{data.mobile}}</span></view>
				<view class="second">联系地址 <span>{{data.addres}}</span></view>
				<view class="second">备注内容 <span>{{data.remark}}</span></view>
			</view>
		</view>
		<!-- 消费记录 -->
		<view class="view_block" v-if="form.data.length>0">
			<view class="title">消费记录</view>
			<view class="title" style="color: #333333;font-size: 24rpx;">数量/个</view>
			<view class="charts-box" style="height: 300px;">
				<qiun-data-charts type="area" :opts="{
					fontSize: 10,
					padding: [15,10,0,10],
					dataLabel:false,
					xAxis: {'rotateLabel': true,},
					legend: {'lineHeight':40,},
					extra:{area:{type:'curve',addLine:true,gradient:true}}}"
					:chartData="friendTrand"
					:resshow="delayload"
					background="none" />
			</view>
		</view>
		
		<view v-if="form.all.length>0">
			<view style="#333333; margin-left: 20rpx;">排行榜</view>
			<view style="margin-top: 20rpx;">
				<view style="display: flex;background: #F7F8F9;line-height: 72rpx;font-size: 24rpx;color: #666666;">
					<view style="width: 60%;padding-left: 20rpx;">商品名称</view>
					<view style="width: 40%;padding-left: 20rpx;">销量</view>
				</view>
				<view v-for="(item,index) in form.all" :key='index' style="display: flex;line-height: 72rpx;font-size: 28rpx;color: #333333;font-weight: 500;border-bottom: 2rpx solid #F9F9F9;">
					<view style="width: 60%;padding-left: 20rpx;">{{item.name}}</view>
					<view style="width: 40%;padding-left: 20rpx;">{{item.number}}</view>
				</view>
			</view>
		</view>	
		<view v-show="show" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop>
					<view class="group">
						<view class="phone_box">
							<view class="phone" @click="dianhua">
								<view>电话：</view>
									{{data.mobile}}
								</view>
								<button class="btn-submit" style="width: 100%; background: #ffffff;color: #000000;" @click="closeModal">取消</button>
							</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:'',
				form:{
					data:[],
					all:[]
				},
				show:false,
				delayload: false, //延时加载图表，否则会出现图表加载完后定位错乱
				friendTrand: {
					"categories": [],
					"series": []
				},
			}
		},
	
		onLoad(option) {
			if (option.data) {
				this.data = JSON.parse(decodeURIComponent(option.data))
			}
			this.getData()
		},
		methods: {
			async getData(){
				uni.showLoading();
				this.http({
					url: this.api.habit_habit_new,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						client_id:this.data.id
					},
					success: res => {
						this.form = res
						this.friendTrand.categories = this.form.day
						this.friendTrand.series[0] = {
							"name": "数量",
							"data": this.form.data,
							"color": "#5A63FB",
						}
						
						console.log('this.friendTrand',this.friendTrand)
					}
				})
				await setTimeout(() => {
					this.delayload = true;
					uni.hideLoading();
				}, 1000)
				
			},
			phone() {
				this.show = true
			},
			// 电话
			dianhua() {
				let phone = ''
				phone = this.data.mobile
				uni.makePhoneCall({
					phoneNumber: phone ,//仅为示例
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.show = false
					}
				});
				this.show = false
			},
			closeModal() {
				this.show = false
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.view_block{
		background-color: #fff;
		padding: 16rpx 20rpx 10rpx 20rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		.title{
			text-align:left;
			margin-bottom: 30rpx;
			font-size: 30rpx;
		}
		.trend_title{
			text-align: right;
			font-size: 22rpx;
			color: #ff9900;
			margin-top: 50rpx;
		}
	}
.modal_bottom {
	z-index: 999;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	.modal-main {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 100;
		>view{
			width: 100%;
			height: 18%;
			box-shadow: 0px -13rpx 34rpx 0px rgba(0, 0, 0, 0.12);
			border-radius: 20rpx 20rpx 0px 0px;
			background: $color-f;
			position: absolute;
			bottom: 0;
			left: 0;
		}
		.group {
			.phone_box {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				.phone {
					width: 50.1%;
					display: flex;
					align-items: center;
					height: 100rpx;
					border-bottom: 2rpx solid #F6F6F6;
					view{
						width: 120rpx;
						
					}
				}
			}
			
			.title {
				text-align: center;
				margin-bottom: 40rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: $color-3;
			}
			.uni-easyinput__content  {
				height: 100rpx;
				line-height: 100rpx;
				margin-bottom: 40rpx;
			}
		}
	}
}

.top_box {
	background-color: #E6EAFA;
	height: 328rpx;
	padding-top: 60rpx;
	.top_box_list {
		width: 630rpx;
		height: 236rpx;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 16rpx 2rpx rgba(179,175,175,0.25);
		border-radius: 8rpx;
		margin: 0 auto;
		padding: 30rpx;
		.first {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
			border-bottom:4rpx solid #F9F9F9;
			margin-bottom: 30rpx;
			.image {
				display: block;
				width: 32rpx;
				height: 32rpx;
			}
		}
		.second {
			font-size: 24rpx;
			font-weight: 400;
			color: #3D4154;
			line-height: 44rpx;
			display: flex;
			span {
				display: block;
				width: 500rpx;
				margin-left: 20rpx;
				font-weight: 600;
			}
		}
	}
}
</style>
