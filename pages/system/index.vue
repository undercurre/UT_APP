<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">系统</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="user-info">
				<text class="u-txt">用户：{{ userName }}</text>
			</view>
			<view class="list">
				<view class="item" v-if="item.id" v-for="(item) in list" :key="item.id" @click="handleClick(item)">
					<image :class="'x' + item.id" class="img" :src="item.icon" lazy-load fade-show></image>
					<text class="item-text">{{ item.label }}</text>
				</view>
			</view>
		</view>
	</gracePage>
</template>

<script src="./system.js"></script>

<style scoped>
.user-info {
	display: flex;
	align-items: center;
	width: 750rpx;
	position: relative;
	margin-left: -25rpx;
	height: 100rpx;
	background: #fffbe8;
	box-sizing: border-box;
	padding: 0 25rpx;
	color: #ed6a0c;
}
.u-txt {
	font-size: 16px;
	color: #ed6a0c;
	line-height: 1;
}
.list {
	
}
.item {
	height: 120rpx;
	display: flex;
	align-items: center;
	/* border-bottom: 1rpx dashed #E5E5E5; */
}

.item:last-child {
	border-bottom: none;
}

.item:active {
	background: #eeeeee;
}

.img {
	width: 70rpx;
	height: 70rpx;
}

.item-text {
	color: #333333;
	font-size: 16px;
	line-height: 1;
	margin-left: 20rpx;
}

.x2, .x4 {
	width: 60rpx!important;
	height: 60rpx!important;
	margin-left: 5rpx;
	margin-right: 5rpx;
}
</style>
