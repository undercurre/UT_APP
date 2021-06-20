<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">产线补连板</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content" id="myForm" ref="myForm">
				<view class="form-item">
					<text class="form-label align-right">拼板数</text>
					<view class="form-value no-border flex">
						<graceNumberBox style="margin-left: 10rpx;" @change="handleChange" inputPadding="0" btnFontSize="20px" btnSize="30rpx"
						 inputColor="#444444" inputHeight="60rpx" inputFontSize="18px" width="100px" :value="pingBan_num"></graceNumberBox>
					</view>
				</view>
				<view class="form-item" id="barCode">
					<text class="form-label align-right">条码</text>
					<view class="form-value">
						<input ref="wo_no" :maxlength="-1" v-model="sn" :focus="autoFoucs" type="text" class="form-input"
						 placeholder=" " @confirm="checkSn" />
					</view>
				</view>
			</view>
			<view class="grace-form-item grace-form-list">
				<scroll-view :scroll-y="true" :scroll-x="true" :style="{
						height: scrollHeight + 'px'
					}">
					<view v-for="(item, index) in pnList" :key="index" class="grace-form-box sn"><text class="grace-form-txt">{{item}}</text></view>
				</scroll-view>
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
				<view class="toolbar-btn primary" @tap="submitForm">
					<!-- <image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image> -->
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./ProductionBoard.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 4em !important;
	}

	.toolbar-btn {
		width: 30% !important;
	}
</style>
