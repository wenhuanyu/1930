<template>
	<view class="background" @click="hideIsShow">
		<!-- 新建信息按钮 -->
		<view class="container add">
			<navigator url="/pages/goods/add/add">
				<button class="flex" type="default">
					<image class="image" src="/static/image/add.png"></image>
				    <view>新建商品</view>
				</button>
			</navigator>
		</view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
				<uni-easyinput class="input picker_mr" v-model="search_name" placeholder="请输入商品名称"></uni-easyinput>
				<uni-easyinput class="input picker_mr" v-model="brand_name" placeholder="请输入品牌名称"></uni-easyinput>
			    <button class="btn-search" @click="search">搜索</button>
			</view>
			
		</view>
		<!-- 列表 -->
		<view class="container list">
		    <view class="item flex" v-for="(item,index) in list" :key="item.id" @click="detail(item.id)">
		    	<view style="width: 100%;">
					<view class="flex mb-10 list_one">
					    <view class="title grey">商品名称</view>
					    <view class="value" style="width: 450rpx;">{{item.name}}</view>
						<view><image class="edit_del" src="/static/image/edit_del.png" @click.stop="edit_del_click(item,index)"></image></view>
					</view>
					<view class="flex mb-10">
						<view class="flex mr-20">
							<view class="title grey">货位1</view>
							<view class="value value_len">{{item.location}}</view>
						</view>
						<view class="flex ">
							<view class="title grey">货位2</view>
						    <view class="value value_len">{{item.location2}}</view>
						</view>
					</view>
		    		<view class="flex mb-10">
		    			<view class="flex mr-20">
		    				<view class="title grey">成本价格</view>
		    				<view class="value value_len">{{item.cost_price}}</view>
		    			</view>
		    			<view class="flex ">
		    				<view class="title grey">销售价格</view>
		    			    <view class="value value_len">{{item.sales_price}}</view>
		    			</view>
		    		</view>
		    		<view class="flex mb-10">
		    		    <view class="title grey">备案名称</view>
		    		    <view class="value">{{item.filing_name}}</view>
		    		</view>
		    		<view class="flex mb-10 last">
		    		    <view class="title grey">备案编号</view>
		    		    <view class="value">{{item.filing_no}}</view>
		    		</view>
					<view class="flex mb-10">
					    <view class="title grey">品牌</view>
					    <view class="value">{{item.brand_name}}</view>
					</view>
					<view class="flex mb-10 last">
					    <view class="title grey">条形码</view>
					    <view class="value">{{item.barcode}}</view>
					</view>
					<view class="flex mb-10 last">
					    <view class="title grey">重量(克)</view>
					    <view class="value">{{item.weight}}</view>
					</view>
					<view class="list_click_box" :class="[isShow  == index ?'show' :'hide']">
						<view class="list_click_text list_click_edit" @click="editor(item.id)" >编辑</view>
						<view class="list_click_text list_click_del" @click="del(item.id)">删除</view>
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
				search_name:'',
				brand_name:'',
				list:[],
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值
				page:0,
				isShow:-1,
			}
		},
		onLoad() {
			this.page = 0
			// 接口
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 列表接口
			this.http({
			    url: this.api.goods_list,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        name: this.search_name,
					brand_name:this.brand_name,
					page:this.page
			    },
			    success: res => {
					this.page+=1
					if(res.list.length == 0) {
						uni.showToast({
							title:'没有更多了',
							icon:'none',
							duration: 2000
						})
					} else {
						this.list = this.list.concat(res.list)
					}
			    }, 
			})
		},

		methods: {
			// 隐藏
			hideIsShow() {
				this.isShow = -1;
			},
			// 按钮点击
			edit_del_click(i,eve) {
				let that = this
				if(eve == that.isShow) {
					that.isShow = -1;
					return false;
				}
				that.isShow = eve;
			},
			// 列表接口
			listInterface() {
				this.http({
				    url: this.api.goods_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        name: this.search_name,
						brand_name:this.brand_name,
						page:this.page
				    },
				    success: res => {
				        this.page+=1
				        this.list = res.list
				    }
				})
			},
			// 搜索 查询按钮点击
			search() {
				this.page = 0
				this.listInterface()
			},
			// 多选复选框改变事件
			changeCheck(e){
			    this.checkedArr = e.detail.value;
			     // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			    if(this.checkedArr.length>0 && this.checkedArr.length==this.list.length){
			        this.allCheck.checked=true;
			    }else{
			        this.allCheck.checked=false;
			    }
			},
			// 全选事件
			changeAll(e){
			    let chooseItem = e.detail.value;
			    // 全选
			    if(chooseItem[0]=='all'){
			        this.allCheck.checked=true;
			        for(let item of this.list){
			            let itemVal=String(item.id);
			            if(!this.checkedArr.includes(itemVal)){
			                this.checkedArr.push(itemVal);
						}
			        }
			    }else{
			        // 取消全选
			        this.allCheck.checked=false;
			        this.checkedArr=[];
			    }
			},
			// 删除按钮
			del(eve){
				uni.showModal({
					title: '提示',
					content: '确定要删除此商品吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.goods_remove,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        id:eve
							    },
							    success: res => {
									this.page = 0
							        this.listInterface()
							    }
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 编辑按钮点击
			editor(eve){
				uni.navigateTo({
					url:'/pages/goods/add/add?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.list_one {
		position: relative;
		.edit_del {
			position: absolute;
			top: -10rpx;
			right: 0;
			width: 76rpx;
			height: 34rpx;
			margin-right: 0;
		}
	}
	.list_click_box {
		z-index: 100;
		position: absolute;
		top: 66rpx;
		right: 30rpx;
		width: 128rpx;
		font-size: 24rpx;
		font-weight: 400;
		// padding: 10rpx;
		background: #FFFFFF;
		box-shadow: 0px 4rpx 8rpx 0px rgba(184, 184, 184, 0.5);
		.list_click_text {
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
		.list_click_default {
			color: #2578FF;
		}
		.list_click_edit {
			color: #2578FF;
		}
		.list_click_del {
			color: #F96164;
		}
	}
.search {
	.input {
		width: 272rpx;
	}
	.picker {
		width: 258rpx;
	}
	.btn-search {
		background: #34BCB5;
	}
}
.btn-color {
	width: 120rpx!important;
	height: 64rpx;
	line-height: 64rpx;
	background: $color-b5;
}
.search .uni-date-editor--x .uni-date__icon-clear {
	top: -4rpx;
}
.uni-date-single {
	padding: 0!important;
	height: 64rpx;
}
.date-picker {
	width: 42%!important;
}
.uniui-calendar {
	display: none;
}
.list {
	position: relative;
    background-color: $color-f;
	.flex {
		align-items: initial;
	}
	.checkbox {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}
    .item {
        position: relative;
        width: 690rpx;
		background: $color-f;
        box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.25);
        border-radius: 8rpx;
        margin-bottom: 20rpx;
        padding: 30rpx 30rpx 30rpx 20rpx;
        box-sizing: border-box;
        &:last-child {
            margin-bottom: 0;
        }
		.image {
		    width: 160rpx;
		    height: 160rpx;
		    margin-right: 20rpx;
		    margin-top: 12rpx;
			border: 2rpx solid #F3F1F1;
		}
        .title {
            color: $color-7;
			font-size: 24rpx;
            font-weight: normal;
        }
		.value {
			width: 550rpx;
			font-size: 24rpx;
		}
		.value_len {
			width: 200rpx;
		}
        .big {
            font-size: 32rpx;
			font-weight: 500;
            width: 100%;
            margin-bottom: 10rpx;
        }

        .grey {
            color: #9FA1A3;
            margin-right: 10rpx;
        }
    }
}
</style>
