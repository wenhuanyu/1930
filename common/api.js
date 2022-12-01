/**
 * API接口统一管理
 */
module.exports = {
	Index_index:"Index/index",//首页授权界面
	personal:'index/personal',//我的列表
	login: "Login/index",//登录
	bind: "Login/bind",//绑定账号
	userData: "users/userData",//个人资料
	merchant: "Index/merchant_info",//公司信息
	upload: "upload/upload",//图片
	
	// 客户管理
	client: "Index/Client",//客户列表接口
	habit_habit_new:'habit/habit_new',//客户详情
	addClient: "Index/addClient",//添加客户
	deleteCilent:'Index/deleteCilent',//删除客户
	editClient: "Index/editCilent",//编辑客户
	Habit_habit_list:'Habit/habit_list',//习惯列表
	Index_ShopList:'Index/ShopList',//商品列表
	Index_ShopType:'Index/ShopType',//分类列表
	Habit_habit_add:'Habit/habit_add',//习惯分类添加
}
