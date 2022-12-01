<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
			    <view class="title">商品名称</view>
			    <uni-easyinput class="input" v-model="form.name" placeholder="请输入商品名称" ></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">品牌</view>
			    <view class="outModal" @click="openModal()">
			        <uni-easyinput class="input" v-model="form.brand_name" placeholder="请选择"
			            placeholder-style="color:#8D8D8D;" disabled>
			        </uni-easyinput>
			    </view>
			</view>
			<view class="group">
			    <view class="title">备案名称</view>
			    <uni-easyinput class="input" v-model="form.filing_name" placeholder="请输入备案名称"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">备案编号</view>
			    <uni-easyinput class="input" v-model="form.filing_no" placeholder="请输入备案编号"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">条形码</view>
			    <uni-easyinput class="input" v-model="form.barcode" placeholder="请输入条形码"></uni-easyinput>
			</view>
			
			<view class="group">
			    <view class="title">货位1</view>
			    <uni-easyinput class="input" v-model="form.location" placeholder="请输入货位1"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">货位2</view>
			    <uni-easyinput class="input" v-model="form.location2" placeholder="请输入货位2"></uni-easyinput>
			</view>
			
			<view class="group">
			    <view class="title">成本价格</view>
			    <uni-easyinput class="input" v-model="form.cost_price" placeholder="请输入成本价格"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">销售价格</view>
			    <uni-easyinput class="input" v-model="form.sales_price" placeholder="请输入销售价格"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">重量</view>
			    <uni-easyinput class="input" v-model="form.weight" placeholder="请输入重量"></uni-easyinput>
			</view>
		</view>
		<view v-show="showClient" class="modal" >
			    <view class="modal-main">
			        <view class="modal-title">
			            <view class="text">品牌选择</view>
			            <image class="close" src="/static/image/modal-close.png" @click="closeModal('client')">
			            </image>
			        </view>
			        <view class="modal-body">
			            <view class="search flex">
			                <uni-easyinput class="input" v-model="username" placeholder="请输入品牌名称" ></uni-easyinput>
			                <button class="btn-search" @click="searchClient">搜索</button>
			            </view>
			            <view class="contact"  style="height: 80%;">
			                <view class="item_box" v-for="(item,i) in clientList" :key="i" @click="selectClient(i,index)">
								<view class="flex">
								    <view class="title" style="width: 130rpx;">ID</view><view>：</view>
								    <view class="value">{{item.id}}</view>
								</view>
			                    <view class="flex">
			                        <view class="title" style="width: 130rpx;text-align-last: justify;">品牌名称</view><view>：</view>
			                        <view class="value">{{item.name}}</view>
			                    </view>
			                </view>
			            </view>
							<uni-pagination
								@change = "handlePage"
								:total="total"
								pageSize='20'
								:current="page"
								:showIcon="true"
							>
							</uni-pagination>
			        </view>
			    </view>
			</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">{{button_text}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:'',//名称
					brand_name:'',//品牌名称
					brand_id:'',//品牌id
					location:'',
					location2:'',
					cost_price:'',
					sales_price:'',
					filing_name:'',
					filing_no:'',
					brand_name:'',
					barcode:'',
					weight:'',
				},
				data:'',
				edit:'',
				button_text:'',
				page:1,
				showClient: false,
				clientList: [],
				username:'',
				total:'',
			}
		},
		onLoad(option) {
			this.edit = option
			if(option.data) {
				uni.setNavigationBarTitle({
				    title: '编辑商品'
				});
				this.button_text ="确定修改"
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.http({
					url:this.api.goods_detail,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						id:this.data
					},
					success:res=>{
						this.form = res
					}
				})
			} else {
				this.button_text ="确定添加"
			}
		},
		methods: {
			// 名称选择
			openModal(name) {
				this.showClient = true
			    this.clientInList()
			},
			// 弹窗关闭按钮
			closeModal(name) {
			    this.showClient = false
				this.page = 1
			},
			// 品牌名称搜索
			searchClient() {
			    this.clientInList()
			},
			handlePage(params) {
				this.page = params.current;
				this.clientInList()
			},
			// 品牌列表
			clientInList() {
				this.http({
				    url: this.api.goods_brand_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						name:this.username,
						page:this.page-1,
						length:20
				    },
				    success: res => {
						this.clientList= res.list
						this.total = res.total
				    }
				})
			},
			// 品牌选择点击
			selectClient(i) {
				this.form.brand_id = this.clientList[i].id
				this.form.brand_name = this.clientList[i].name
				this.showClient = false
				this.page = 1
			},
			// 返回上一页
			previous() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
			},
			// 添加/编辑按钮点击
			add() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							// 添加
							this.http({
								url:this.api.goods_submit,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									...this.form
								},
								success:res=>{
									uni.showToast({
										title:'编辑成功',
										icon:'none',
										duration: 2000
									})
									setTimeout(() =>{
										this.previous()
									},500) 
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});			
				
			}
		}
	}
</script>

<style lang="scss">
.modal .modal-main .modal-body .contact .item_box .value {
	width: 300rpx;	
}
.good {
	padding: 0 30rpx;
	.group {
		.title {
			width: 128rpx;
		}
	}
}
</style>
