<script>
    export default {
        onLaunch: function() {

        },
        onShow: function() {

        },
        onHide: function() {

        }
    }
</script>

<style lang="scss">
    @import '@/static/css/helper.scss';
    @import '@/static/css/frame.scss';
	//设置圆角
	radio.round .wx-radio-input,
	radio.round .uni-radio-input,
	checkbox.round .wx-checkbox-input,
	checkbox.round .uni-checkbox-input {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		border-color: #FF5722 !important;
	}
	
	//设置背景色
	radio.checkClick[checked] .wx-radio-input,
	radio.checkClick.checked .uni-radio-input,
	checkbox.checkClick[checked] .wx-checkbox-input,
	checkbox.checkClick.checked .uni-checkbox-input{
		background-color: #FF5722 !important;
		border-color: #FF5722 !important;
		color: #ffffff !important;
	}
</style>
