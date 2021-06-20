<template>
	<view>
		<ytFileSelector @cancel="show = false" v-if="show" @selected="selectedHandler" :autoclose="false" ref="selectors"></ytFileSelector>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">声音设置</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">

				<form class="grace-form" style="margin-top:80rpx;">
					<view class="grace-form-item item-border">
						<text class="grace-form-label">成功声</text>
						<view class="grace-form-body flex1">
							<input @click="handlePlay(formData.success.path)" v-model="formData.success.name" style="color: #409EFF;" type="text"
							 disabled name="successVoice" class="grace-form-input" placeholder="请选择成功声文件" />
							<image @click="handleChooseFile(1)" class="img" src="/static/system/06.png" lazy-load></image>
						</view>
					</view>
					<view class="grace-form-item item-border">
						<text class="grace-form-label">警告声</text>
						<view class="grace-form-body flex1">
							<input @click="handlePlay(formData.warning.path)" v-model="formData.warning.name" style="color: #409EFF;" type="text"
							 disabled name="warningVoice" class="grace-form-input" placeholder="请选择警告声" />
							<image @click="handleChooseFile(2)" class="img" src="/static/system/06.png" lazy-load></image>
						</view>
					</view>
					<view class="grace-form-item item-border">
						<text class="grace-form-label">错误声</text>
						<view class="grace-form-body flex1">
							<input @click="handlePlay(formData.error.path)" v-model="formData.error.name" style="color: #409EFF;" name="errorVoice"
							 disabled type="text" class="grace-form-input" placeholder="请选择错误声" />
							<image @click="handleChooseFile(3)" class="img" src="/static/system/06.png" lazy-load></image>
						</view>
					</view>
				</form>
			</view>

			<!-- 	<view class="grace-footer grace-grids grace-nowrap myfoot" slot="gFooter" ref="footer">
				<view class="grace-grids-items a" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">取消</text>
				</view>
				<view class="grace-grids-items b" @tap="reset">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">重置</text>
				</view>
				<view class="grace-grids-items a" @tap="submitForm">
					<image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">保存</text>
				</view>
			</view> -->

			<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">取消</text>
					</view>
					<view class="toolbar-btn warning" @tap="reset">
						<text class="tix">重置</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm">
						<!-- <image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image> -->
						<text class="tix">保存</text>
					</view>
				</div>

			</view>

		</gracePage>
	</view>
</template>

<script src="./voiceSet.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	/* 调整宫格大小 */
	.grace-grids-items {
		width: 200rpx;
		background-color: #ffffff;
		height: 90rpx;
		margin: 0 25rpx;
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
		display: flex;
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

	.flex1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.img {
		width: 80rpx;
		height: 80rpx;
	}

	.toolbar-btn {
		width: 32% !important;
	}
</style>
