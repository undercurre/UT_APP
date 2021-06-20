<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">WMS服务器设定</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						服务器IP
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.HOST" placeholder=" " :focus="autoFocus" @confirm="handleConfirm(1)">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						端口号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.PORT" placeholder=" " :focus="focusNext" @confirm="handleConfirm(2)">
					</view>
				</view>
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

<script src="./WMSServiceSet.js"></script>

<style lang="scss" scoped>
	@import '~@/styles/publics.scss';
	.form-label {
		width: 5em!important;
	}
</style>
