<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">离线卸料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						周转车
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.feederOrReel" placeholder=" " :focus="autoFocus" @confirm="handleBlur">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						线体
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="formData.feederOrReel" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						站位
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.feederOrReel" placeholder=" ">
					</view>
				</view>
				<div class="titx">
					离线备料信息：
				</div>
				<div class="input-textarea">
					<textarea v-model="formData.remark"></textarea>
				</div>
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn warning" @tap="resetFormData(true)">
					<text class="tix">清除</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./HandPlugOfflineLoading.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 4em !important;
	}

	.titx {
		font-size: 16px;
		line-height: 1;
		display: flex;
		align-items: center;
		height: 30rpx;
	}

	.input-textarea {
		padding: 20rpx;
		border: 1px solid #E5E5E5;
		margin: 20rpx 0 0;
		font-size: 16px;
		line-height: 1.5;
		height: 350rpx;
		width: 100%;
		box-sizing: border-box;
	}
</style>
