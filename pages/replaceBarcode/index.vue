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
			<view @submit="submitForm" class="form-content">
				<view class="form-item">
					<text class="form-label align-right">旧条码</text>
					<view class="form-value">
						<input ref="sn" :selection-start="currentSelection === 'sn' && selection ? selectionStart : 0" :selection-end="currentSelection === 'sn' && selection ? selectionEnd : -1"
						 :focus="autoFocus" @focus.stop="handleFocus('sn', formData.sn)" v-model="formData.sn" @confirm="handleCheckSn"
						 type="text" class="form-input" placeholder=" " />
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">新条码</text>
					<view class="form-value">
						<input ref="newSN" :selection-start="currentSelection === 'newSN' && selection ? selectionStart : 0"
						 :selection-end="currentSelection === 'newSN' && selection ? selectionEnd : -1" :focus="autoFocusNext"
						 @focus.stop="handleFocus('newSN', formData.newSN)" v-model="formData.newSN" @confirm="handleCheckNewSn" type="text"
						 class="form-input" placeholder=" " />
					</view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn " @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn " @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./replaceBarcode.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 4em !important;
	}
</style>
