<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">箱号检查</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<!--  @confirm="handleSearchWoNo" -->
				<view class="form-item">
					<view class="form-label align-right">
						箱号：
					</view>
					<view class="form-value">
						<input class="form-input"  type="text" v-model="SiteFrom.carton_no" placeholder=" " :focus="autoFocus"  @confirm="submitData" >
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						产品流水号：
					</view>
					<view class="form-value">
						<input class="form-input"  type="text" v-model="SiteFrom.sn" placeholder=" " :focus="autoFocus" @confirm="submitData">
					</view>
				</view>
				
			</view>
			<view class="view-status" style="background-color: #fff;box-shadow: 0 1px 10rpx #e5e5e5;" >
				<view class="view-item" v-for="(item, index) in statusList" :key="index" :class="{active: checkStatusIndex === index}"
				 @tap="handleChangeStatus(index)">{{ item.SBU_CHINESE }}</view>
			</view>
			<view style="border: 1px solid #e5e5e5;width: 100%;margin-top: 20rpx;height: 760rpx;overflow: auto;">
			{{NewsInfo}}
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<!-- <view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">退出</text>
				</view> -->
				<!--  @tap="RevokeFormData(true)" -->
				<!-- <view class="toolbar-btn warning" @tap="submitForm(1)">
					<text class="tix">撤销</text>
				</view> -->
				<!-- <view class="toolbar-btn primary" @tap="submitForm(2)">
					<text class="tix">确定</text>
				</view> -->
			</div>
		</view>
	</gracePage>
</template>
<script src="./SfcsContainerList.js"></script>

<style scoped lang="scss">
@import '~@/styles/publics.scss';
.form-label {
	width: 7em!important;
}
.toolbar-btn {
	width: 48% !important;
}
.form-content{
	padding-bottom: 0rpx;
}
.view-status {
	height: 100rpx;
	position: relative;
	// margin-left: -25rpx;
	width: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
	box-shadow: none !important;
	// padding: 0 30rpx;
}
.view-item {
	width: 20%;
	height: 100%;
	color: #666;
	font-size: 32rpx;
	line-height: 1;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.view-item.active:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2rpx;
	background-color: #009c50;
	width: 100%;
}
.view-item.active {
	color: #009c50;
}
.u-th,
.u-td {
    vertical-align: bottom;
    border-bottom: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	display: inline-block;
}
</style>
