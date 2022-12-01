<template>
	<view style="height: 100vh;">
		<view class="content">
		    <view class="left" style="height: 88%;">
		        <view class="left_item" v-for="(item,index) in classification_list" :key = 'index' @click="Firstclick_list(item.id)"
				:class="{btna:countI == item.id}">
					{{item.name}}
				</view>
		    </view>
		    <view class="right" style="height: 88%;">
		        <view class="item_list" style="margin-bottom: 32rpx;" v-for="(item,index) in secList_list" :key="index">
					<view>
						<image v-if="item.image" :src="item.image"></image>
						<image v-else src="../../../static/image/default.png"></image>
					</view>
					<view class="item_list_bottom">
						<view class="item_list_bottom_left">{{item.name}}</view>
						<view  class="item_list_bottom_right">
							<view>￥{{item.money}}</view>
							<view class="good_num_box">
								<view class="good_num_box_cut">
									<image src="../../../static/image/jian.png"></image>
								</view>
								<view class="good_num_box_input">
									<input type="text" v-model.number="item.number"  disabled/>
								</view>
								<view class="good_num_box_cut">
									<image src="../../../static/image/jia.png"></image>
								</view>
							</view>
						</view>
					</view>
		        </view>
		    </view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-search" @click="add"><image src="../../../static/image/tianjia.png"></image>添加商品</button>
		</view>
		<view v-show="showWarehouse" class="modal_bottom">
		    <view class="modal-main">
				<image class="close" src="/static/image/modal-close.png" @click="closeModal()">
				</image>
		        <view class="content">
		            <view class="left" style="height: 87%;">
		                <view class="left_item" v-for="(item,index) in classification" :key = 'index' @click="Firstclick(item.id)"
		        		:class="{btna:count == item.id}">
		        			{{item.name}}
		        		</view>
		            </view>
		            <view class="right"  style="height: 87%;">
		                <view class="item_list_modal" v-for="(item,index) in secList" :key="index">
		        			<view style="display: flex;justify-content: space-between;">
								<view>
									<image v-if="item.image" :src="item.image"></image>
									<image v-else src="../../../static/image/default.png"></image>
								</view>
								<view class="item_list_bottom">
									<view class="item_list_bottom_left">{{item.name}}</view>
									<view  class="item_list_bottom_right">
										<view></view>
										<view class="good_num_box">
											<view class="good_num_box_cut" @click="goodcut(item,index)">
												<image src="../../../static/image/jiancolor.png"></image>
											</view>
											<view class="good_num_box_input">
												<input type="number" v-model="item.number" @input="numberChange($event,index)"/>
											</view>
											<view class="good_num_box_cut" @click="goodadd(item,index)">
												<image src="../../../static/image/jiacolor.png"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="item.number>0" style="display: flex;align-items: center;margin-bottom: 20rpx;">
								<view style="font-size: 28rpx;color: #333333;margin-right: 10rpx;">商品金额</view>
								<input type="text" v-model="item.money" @input="price($event,index)" class="input"/>
							</view>
		                </view>
		            </view>
					<view class="container fix-bottom">
					    <button class="btn-search" @click="addShop">添加<span v-if='good_num>0'>（{{good_num}}）</span></button>
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
				classification:[],
				classification_list:[],
				count:'',
				countI:'',
				secList:[],
				client_id:'',
				cate_id:'',
				showWarehouse:false,
				good_num:0,
				good_list:[],
				secList_list:[],
			}
		},
		onLoad(option) {
			this.client_id = JSON.parse(decodeURIComponent(option.data)).id
			this.interfaceList()
			this.fenleiList()
		},
		methods: {
			addShop() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.Habit_habit_add,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
									data:JSON.stringify(this.good_list),
									client_id:this.client_id
							    },
							    success: res => {
									uni.showToast({
										title:'添加成功',
										icon:'none',
										duration: 2000
									})
									this.showWarehouse = false
									this.good_list = []
									this.good_num = 0
									this.count = ''
									this.interfaceList()
									this.fenleiList()
							    }
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 商品单价
			price(e, i) {
				console.log('e',e)
			    if (e == "") {
			        e = 0
			    }
			    this.secList[i].money = e.detail.value
				this.good_list.map((item,index)=>{
					if(item.goods_id == this.secList[i].id) {
						item.money = this.secList[i].money
					}
				})
				console.log('this.good_list',this.good_list)
			},
			// 商品数量
			numberChange(e,i) {
				console.log('e',e)
				if (e == "") {
				    e = 0
				}
				
				var flag = this.functiontofindIndexByKeyValue(this.secList[i].id)
				console.log('flag',flag)
				if(flag!==-1) {
					this.good_list[flag].cate_id = this.secList[i].cate_id
					this.good_list[flag].goods_id = this.secList[i].id
					this.good_list[flag].money = this.secList[i].money
					this.good_list[flag].number = this.secList[i].number
				} else {
					let a = {}
					a.cate_id = this.secList[i].cate_id
					a.goods_id = this.secList[i].id
					a.money = this.secList[i].money
					a.number = this.secList[i].number
					this.good_list.push(a)
				}
				this.good_num = 0
				this.good_list.map((item,index)=>{
					this.good_num = Number(this.good_num) + Number(item.number)
				})
				console.log('this.secList',this.secList)
				console.log('this.good_list',this.good_list)
				console.log('this.good_num',this.good_num)
			},
			goodcut(eve,i) {
				this.secList[i].number -=1
				if(this.secList[i].number<0) {
					this.secList[i].number = 0
				}else if (this.secList[i].number>=0) {
					this.good_num-=1
					if(this.good_num<0) {
						this.good_num= 0
					}
				}
				var flag = this.functiontofindIndexByKeyValue(this.secList[i].id)
				if(flag!==-1) {
					if(this.secList[i].number == 0) {
						this.good_list.splice(flag, 1)
					} else {
						this.good_list[flag].cate_id = this.secList[i].cate_id
						this.good_list[flag].goods_id = this.secList[i].id
						this.good_list[flag].money = this.secList[i].money
						this.good_list[flag].number = this.secList[i].number
					}
				}
				
				console.log('this.good_list',this.good_list)
			},
			 functiontofindIndexByKeyValue(valuetosearch) {
			      for (var i = 0; i < this.good_list.length; i++) {
			          if (this.good_list[i].goods_id == valuetosearch) {
			              return i;
			          }
			      }
			      return -1;
			  },
			goodadd(eve,i) {
				this.secList[i].number +=1
				var flag = this.functiontofindIndexByKeyValue(this.secList[i].id)
				console.log('flag',flag)
				if(flag!==-1) {
					this.good_list[flag].cate_id = this.secList[i].cate_id
					this.good_list[flag].goods_id = this.secList[i].id
					this.good_list[flag].money = this.secList[i].money
					this.good_list[flag].number = this.secList[i].number
				} else {
					let a = {}
					a.cate_id = this.secList[i].cate_id
					a.goods_id = this.secList[i].id
					a.money = this.secList[i].money
					a.number = this.secList[i].number
					this.good_list.push(a)
				}
				this.good_num+=1
			},
			add() {
				this.showWarehouse = true
				this.http({
					url:this.api.Index_ShopType,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
					},
					success:res =>{
						this.classification = res
					}
				})
				this.http({
					url:this.api.Index_ShopList,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
					},
					success:res =>{
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
						this.secList = res.list
						this.secList.map((item,index)=>{
							item.number = 0
						})
					}
				})
			},
			// 关闭
			closeModal() {
				this.showWarehouse = false
				this.good_list = []
				this.count = ''
			},
			Firstclick_list(eve,i) {
				this.countI = eve
				this.cate_id = eve
				this.interfaceList()
			},
			// 一级分类点击
			Firstclick(eve,i) {
				this.count = eve
				this.http({
					url:this.api.Index_ShopList,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						cate_id:eve
					},
					success:res =>{
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
						this.secList = res.list
						console.log('this.good_list',this.good_list)
						if(this.good_list.length>0) {
							for(var num = 0; num<this.good_list.length;num++) {
								for(var num1 = 0; num1<this.secList.length;num1++) {
									if(this.good_list[num].goods_id == this.secList[num1].id) {
										this.secList[num1].number = this.good_list[num].number
										this.secList[num1].money = this.good_list[num].money
										this.secList[num1].goods_id = this.good_list[num].id
										this.secList[num1].cate_id = this.good_list[num].cate_id
									}
								}
							}
						}
						this.secList.map((item,index)=> {
							if(!item.number) {
								item.number = 0
							}
						})
						console.log('this.secList',this.secList)
					}
				})
			},
			fenleiList() {
				this.http({
					url:this.api.Index_ShopType,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						client_id:this.client_id,
						// cate_id:this.cate_id
					},
					success:res =>{
						this.classification_list = res
					}
				})
			},
			// 习惯列表接口
			interfaceList() {
				// this.page = 0
				this.http({
					url:this.api.Habit_habit_list,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						client_id:this.client_id,
						cate_id:this.cate_id
					},
					success:res =>{
						if(res.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
						this.secList_list = res
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.btn-search  {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	image {
		width: 30rpx;
		height: 30rpx;
	}
}
.content {
	display: flex;
	flex-direction: row;
	height: 100vh;
	.left {
		width: 172rpx;
		font-size: 28rpx;
		text-align: center;
		background: #F9FAFC;
		box-sizing: border-box;
		margin-right: 15rpx;
		overflow: auto;
		.left_item {
			line-height: 84rpx;
		}
		.btna {
			background: #EDF2FD;
			font-weight: 500;
			color: #4B83F0;
		}
	}           
	.right {
		width: 560rpx;
		font-size: 28rpx;
		overflow: auto;
		.item_list_bottom {
			.item_list_bottom_left {
				width: 360rpx;
				height: 80rpx;
				margin-bottom: 30rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #393E4C;
				line-height: 21px;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.item_list_bottom_right {
				width: 360rpx;
				height: 36rpx;
				line-height: 36rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.good_num_box {
					width: 160rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					display: flex;
					justify-content: space-between;
					align-items: center;
					image {
						display: block;
						width: 36rpx;
						height: 36rpx;
						border: none;
						margin: 0 10rpx;
					}
				}
			}
		}
		.input {
			width: 380rpx;
			height: 80rpx;
			border-radius: 8rpx;
			padding-left: 20rpx;
			border: 2rpx solid #E7E7E7;
		}
		.item_list_modal {
			image {
				width: 160rpx;
				height: 160rpx;
			}
		}
		.item_list {
			display: flex;
			justify-content: space-between;
			image {
				width: 160rpx;
				height: 160rpx;
				border: 2rpx solid #F1F1F1;
			}
		}
		
	}
}
</style>
