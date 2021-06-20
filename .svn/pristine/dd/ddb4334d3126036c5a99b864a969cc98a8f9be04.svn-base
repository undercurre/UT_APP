<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">系统设定</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="marginTop">
				<image style="width: 250px;" src="/static/logo_2.png" lazy-load mode="widthFix" class="logo"></image>
				</view>
			<form class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item item-border">
					<text class="grace-form-label">服务器</text>
					<view class="grace-form-body">
						<input class="form-input" type="text" v-model="formData.Host" placeholder=" ">
					</view>
				</view>
				<view class="grace-form-item item-border">
					<text class="grace-form-label">机器号</text>
					<view class="grace-form-body">
						<input class="form-input" type="text" v-model="formData.PDA_ID" placeholder=" ">
					</view>
				</view>
			</form>
		
			<view style="width:700rpx;margin: 0 auto;">
				<view class="flex-right" style="align-items: center;"><text class="sys-no">当前版本：IMS {{ current_version }}</text></view>
			</view>
		</view>
			

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">取消</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">保存</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./systemSet.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
.marginTop {
	margin-top: 100rpx;
}
.logo {
	width: 250rpx;
	height: 68rpx;
}
.grace-form-label {
	width: 168rpx;
	font-size: 36rpx;
	color: #444444;
}
.grace-form-input {
	text-align: left;
	font-size: 36rpx;
	color: #333;
}
.grace-form-item {
	padding: 10rpx 0;
}
.item-border {
/* 	border-bottom-color: #e5e5e5;
	border-bottom-width: 1rpx;
	border-style: solid; */
	border-bottom: 1rpx solid #e5e5e5;
}
.grace-login-three-items {
	width: 88rpx;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 60rpx;
	color: #3688ff;
	text-align: center;
	margin: 10rpx;
}
.main-tit {
	color: #ffffff;
}
.flex-right {
	width: 700rpx;
	height: 100rpx;
	flex-direction: row;
	text-align: right;
	justify-content: flex-end;
	margin-top: 20rpx;
}
.grace-text {
	font-size: 34rpx;
	color: #555;
	text-align: right;
	margin-right: 25rpx;
}
.sys-no {
	font-size: 32rpx;
	color: #555;
}
</style>
