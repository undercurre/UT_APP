<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">连接PTS电脑</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="marginTop">
				<!-- <image style="width: 250px;" src="/static/htl_logo2.png" lazy-load mode="widthFix" class="logo"></image> -->
				<image style="width: 250px;" src="/static/logo_2.png" lazy-load mode="widthFix" class="logo"></image>
		    </view>
			<form @submit="submitForm" class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item item-border">
					<text class="grace-form-label">线体</text>
					<view class="grace-form-body pickerS">
						<!-- <graceSelectMenu defaultText="点击选择线体" :selectIndex="listIndex" :show="false" :items="list"></graceSelectMenu> -->
						<picker mode="selector" :range="list" @change="picker">
							<view style="text-align: left;font-size: 18px;" :style="{
								color: list[listIndex] ? '#333' : 'rgb(138, 138, 138)' 
							}">{{list[listIndex] ? list[listIndex] : '请选择线体'}}</view>
						</picker>
						<text class="grace-select-menu-icon icon-allow-b"></text>
					</view>
				</view>
				<view class="grace-form-item item-border">
					<text class="grace-form-label">PDA_ID</text>
					<view class="grace-form-body">
						<input
							ref="PDA_ID"
							:selection-start="selection ? selectionStart : 0"
							:selection-end="selection ? selectionEnd : -1"
							@focus="handleFocus"
							type="text"
							@input="selection = false"
							name="PDA_ID"
							class="grace-form-input"
							placeholder="PDA_ID"
							v-model="PDA_ID"
						/>
					</view>
				</view>

				<view class="grace-margin-top" style="margin-top: 80rpx;">
					<button form-type="submit" style="background: #009c50!important;" type="primary" class="grace-button grace-border-radius grace-gtbg-blue">确定</button>
				</view>
			</form>
			<view style="width:700rpx;margin: 0 auto;">
				<view class="flex-right" style="align-items: center;"><text class="sys-no">当前版本：IMS {{ current_version }}</text></view>
			</view>
		</view>
	</gracePage>
</template>

<script src="./links.js"></script>

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
	font-size: 32rpx;
	color: #444444;
}
.grace-form-input {
	text-align: left;
	font-size: 34rpx;
	color: #333;
}
.grace-form-item {
	padding: 10rpx 0;
}
.item-border {
/* 	border-bottom-color: #e5e5e5;
	border-bottom-width: 1rpx;
	border-style: solid; */
	border-bottom: 1rpx solid #E5E5E5;
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

.grace-select-menu-icon{font-family:"grace-iconfont"; margin-left:10rpx; font-size:22rpx;}
.icon-allow-b:after{content:"\e603";}

.pickerS {
	color: #999999;
	font-size: 16rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
