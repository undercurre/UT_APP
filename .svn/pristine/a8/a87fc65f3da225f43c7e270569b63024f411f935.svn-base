<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="main-tit" style="font-size: 38rpx;">系统登录</text></view>
			</view>
		</graceHeader>
		<!-- 页面主体 -->
		<view slot="gBody" class="grace-body">
			<view class="marginTop">
				<!-- <image style="width: 250px;" src="/static/htl_logo2.png" lazy-load mode="widthFix" class="logo"></image> -->
				<image style="width: 250px;" src="/static/logo_2.png" lazy-load mode="widthFix" class="logo"></image>
				</view>
			<form @submit="loginNow" class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item item-border">
					<text class="grace-form-label">服务器</text>
					<view class="grace-form-body">
						<input
							ref="Host"
							:selection-start="currentSelection === 'Host' && selection ? selectionStart : 0"
							:selection-end="currentSelection === 'Host' && selection ? selectionEnd : -1"
							@focus="handleFocus('Host', formData.Host)"
							type="text"
							name="Host"
							v-model="formData.Host"
							class="grace-form-input"
							placeholder="请输入服务器地址"
						/>
					</view>
				</view>
				<view class="grace-form-item item-border">
					<text class="grace-form-label">账号</text>
					<view class="grace-form-body">
						<input
							ref="UserName"
							:selection-start="currentSelection === 'UserName' && selection ? selectionStart : 0"
							:selection-end="currentSelection === 'UserName' && selection ? selectionEnd : -1"
							@focus.stop="handleFocus('UserName', formData.UserName)"
							type="text"
							name="UserName"
							v-model="formData.UserName"
							class="grace-form-input"
							placeholder="请输入账号"
						/>
					</view>
				</view>
				<view class="grace-form-item item-border">
					<text class="grace-form-label">密码</text>
					<view class="grace-form-body">
						<input
							ref="Password"
							:selection-start="currentSelection === 'Password' && selection ? selectionStart : 0"
							:selection-end="currentSelection === 'Password' && selection ? selectionEnd : -1"
							@focus.stop="handleFocus('Password', formData.Password)"
							type="password"
							name="Password"
							:value="formData.Password"
							class="grace-form-input"
							placeholder="请输入密码"
						/>
					</view>
				</view>
				<view class="grace-form-item">
					<graceFlex :classes="['row', 'space-between']">
						<text class="grace-form-label" style="width: 0;"></text>
						<view class="grace-form-body flex-right">
							<graceCheckBtn checkedColor="#3688ff" :checked="rememberPassword" @change="checkedChange" :size="46"><text class="grace-text">记住密码</text></graceCheckBtn>
						</view>
					</graceFlex>
				</view>
				<view class="grace-margin-top"><button style="background: #009c50!important;" form-type="submit" type="primary" class="grace-button grace-border-radius grace-gtbg-blue">登录</button></view>
			</form>

			<view style="width:700rpx;margin: 0 auto;">
				<view class="flex-right" style="align-items: center;"><text class="sys-no">当前版本：IMS {{ current_version }}</text></view>
			</view>
		</view>
	</gracePage>
</template>
<script src="./login.js"></script>
<style scoped>
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
