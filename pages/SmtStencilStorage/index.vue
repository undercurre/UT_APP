<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">钢网存储</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						钢网编号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" :maxlength="-1" v-model="form.STENCIL_NO" placeholder=" " :focus="autoFocus" @confirm="autoFocus = false;autoFocusLocation = true;">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						钢网储位
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.LOCATION" placeholder=" " :focus="autoFocusLocation">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						制造日期
					</view>
					<view class="form-value">
						<!-- <picker style="width: 100%;" mode="date" @change="handleChooseMakeDate">
							<view class="form-input" style="text-align: left;font-size: 14px;width:100%" >{{form.MANUFACTURE_TIME?form.MANUFACTURE_TIME:'点击选择日期'}}</view>
						</picker> -->
						<input class="form-input" disabled @click="handleChooseMakeDate" type="text" v-model="form.MANUFACTURE_TIME" placeholder="点击选择日期">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						备注明细
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.REMARK" placeholder=" ">
					</view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">保存</text>
				</view>
				<view class="toolbar-btn warning" @tap="baofei">
					<text class="tix">报废出柜</text>
				</view>
			</div>
			
		</view>
	</gracePage>
</template>

<script src="./SmtStencilStorage.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
	
	.toolbar-btn {
		width: 32%!important;
	}

	/* 调整宫格大小 */
	.grace-grids-items {
		width: 220rpx;
		background-color: #ffffff;
		height: 90rpx;
		/* margin: 0 15rpx; */
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
		margin-bottom: 140rpx;
	}

	/* .grace-form {
		position: sticky;
		top: 0;
	} */
	.mysticky {
		margin-top: 30rpx;
		border-top-width: 2rpx;
		border-top-color: #e5e5e5;
		margin-bottom: 180rpx;
		border-bottom-color: #e5e5e5;
		border-bottom-width: 2rpx;
		border-left-width: 2rpx;
		border-right-width: 2rpx;
		border-left-color: #e5e5e5;
		border-right-color: #e5e5e5;
		/* min-height: 200rpx; */
		/* 	position: sticky;
		bottom: 0; */
	}

	.mylist {
		width: 696rpx;
		/* min-height: 200rpx; */
	}

	.x-list {
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
