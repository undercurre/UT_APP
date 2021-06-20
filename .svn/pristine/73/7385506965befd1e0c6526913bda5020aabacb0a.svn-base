<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50" ref="header">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工单下线</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="insTop">
				<view class="insX"><text class="insT">机台-工单</text></view>
				<view class="insX">
					<checkbox-group @change="checkAllHelper"><checkbox value="1" :checked="stations.length && stations.length === list.length ? true : false"></checkbox></checkbox-group>
					<text class="insT">全部机台</text>
				</view>
			</view>
			<view class="grace-form mysticky">
				<scroll-view
					:scroll-y="true"
					:scroll-x="true"
					:style="{
						height: scrollHeight + 'px'
					}"
				>
					<view class="mycell" v-for="(item, index) in list" :key="index">
						<view class="x-list">
							<checkbox-group style="width: auto;" @change="handleCheck">
								<checkbox class="x-checkbox" :value="item" :checked="stations.indexOf(item) !== -1"></checkbox>
							</checkbox-group>
							<text class="x-text" style="white-space: nowrap;">{{ item }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter" ref="footer">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./woOffline.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
.mycell {
	/* 	border-style: dashed;
	border-bottom-color: #e5e5e5;
	border-bottom-width: 2rpx; */
	border-bottom: 2rpx dashed #e5e5e5;
}
.insTop {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 750rpx;
	box-sizing: border-box;
	padding: 0 25rpx;
	height: 100rpx;
	border-bottom-width: 2rpx;
	border-bottom-color: #e5e5e5;
	background-color: rgb(240, 195, 90);
	position: relative;
	margin-left: -25rpx;
	margin-top: 0rpx;
}
.insX {
	display: flex;
	width: 350rpx;
	flex-direction: row;
	align-items: center;
	/* justify-content: center; */
	padding-left: 20rpx;
}
.insT {
	font-size: 32rpx;
	color: #ffffff;
}
/* 调整宫格大小 */
.grace-grids-items {
	width: 250rpx;
	background-color: #ffffff;
	height: 90rpx;
	margin: 0 35rpx;
	border-style: solid;
	border-width: 2rpx;
	border-color: #999999;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: #333;
}
.grace-grids-items:active {
	background-color: #007aff;
	color: #ffffff;
}

.icon-x {
	width: 48rpx;
	height: 48rpx;
	margin-right: 20rpx;
}
.tix {
	line-height: 36rpx;
	font-size: 34rpx;
}
.grace-grids-icon {
	height: 60rpx;
	line-height: 60rpx;
	font-size: 50rpx;
	color: #6b7375;
}
.grace-grids-text {
	line-height: 30rpx;
	font-size: 20rpx;
	margin-top: 2px;
	color: #6b7375;
}
.grace-footer-active {
	color: #3688ff !important;
}

.grace-grids-items2 {
	padding: 6rpx 0;
	width: 120rpx;
}
.grace-grids-icon2 {
	height: 50rpx;
	line-height: 50rpx;
	font-size: 40rpx;
	color: #6b7375;
}
.grace-grids-text2 {
	line-height: 28rpx;
	font-size: 20rpx;
	margin-top: 2px;
	color: #6b7375;
}

.myfoot {
	/* background-image: linear-gradient(to right, #b100ff, #00b3ff) !important; */
	background: #009c50;
	height: 130rpx;
	justify-content: center;
	align-items: center;
}

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
.g-fb {
	flex-direction: row;
}
.grace-body {
	position: relative;
}
/* .grace-form {
		position: sticky;
		top: 0;
	} */
.mysticky {
	margin-top: 30rpx;
	/* 	border-top-width: 2rpx;
	border-top-color: #e5e5e5; */
	/* margin-bottom: 180rpx; */
	/* 	border-bottom-color: #e5e5e5;
	border-bottom-width: 2rpx;
	border-left-width: 2rpx;
	border-right-width: 2rpx;
	border-left-color: #e5e5e5;
	border-right-color: #e5e5e5; */
	border: 2rpx solid #e5e5e5;
	box-sizing: border-box;
	/* min-height: 200rpx; */
	/* 	position: sticky;
		bottom: 0; */
}

.mylist {
	width: 696rpx;
	/* min-height: 200rpx; */
}

.x-list {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100rpx;
	padding: 0 20rpx;
}

.x-text {
	font-size: 32rpx;
	color: #444444;
	margin-left: 20rpx;
	text-overflow: ellipsis;
	lines: 1;
}
</style>
