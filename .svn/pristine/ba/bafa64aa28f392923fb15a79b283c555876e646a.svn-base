<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">{{ menuName }}</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<!-- 全屏 Loading -->
			<graceFullLoading
				fontSize="30rpx"
				text="系统初始化..."
				:graceFullLoading="graceFullLoading"
				logoUrl="https://staticimgs.oss-cn-beijing.aliyuncs.com/logo.png"
			></graceFullLoading>
			<!-- 宫格布局 -->
			<view v-for="(item, index) in gridsData" :key="item.id">
				<view v-if="item.isDir && item.child && item.child.length" style="font-size: 16px;color: #666;line-height: 3;font-weight: 600;">{{ item.name }}</view>
				<view class="grace-grids">
					<view class="grace-grids-items three" v-for="(subitem, subindex) in item.child" :key="subitem.id" @click="handleMenuClick(subitem, subindex)">
						<image class="grace-grids-icon-img" lazy-load :src="subitem.icon" mode="widthFix"></image>
						<text class="grace-grids-text">{{ subitem.name }}</text>
					</view>
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script src="./home.js"></script>
<style>
.demo_body {
	padding: 200rpx 150rpx;
}
.index_logo {
	width: 320rpx;
	height: 52rpx;
	margin-top: 188rpx;
}
.demo {
	margin-top: 20rpx;
}
.three {
	width: 233.3333333333333rpx;
	/* height: 233.3333333333333rpx; */
	/* height: 180rpx; */
	margin-bottom: 20rpx;
}
.three:active {
	background-color: rgb(239, 241, 246);
	/* background-color: red; */
}
.five {
	width: 140rpx;
}
.grace-grids-icon-img {
	width: 120rpx;
	height: 120rpx;
	zoom: 0.7;
}
.grace-grids-text {
	font-size: 32rpx;
	line-height: 34rpx;
	margin-top: 10px;
	color: #555;
}

.backTo {
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

.backTo .b-img {
	width: 40rpx;
	height: 40rpx;
}

.backTo .b-txt {
	font-size: 16px;
	line-height: 1;
	color: rgb(79,125,145);
	margin-left: 20rpx;
}
</style>
