<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">替换条码</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						原条码
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.FEEDER" placeholder=" " :focus="autoFocus" @confirm="feederclick">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						新条码
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="FormSave.FEEDER" placeholder=" " :focus="autoFocus">
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
					<!-- <image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image> -->
					<text class="tix">保存</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./SmtFeederReplace.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
	  width: 4em!important; 
	 }
</style>
