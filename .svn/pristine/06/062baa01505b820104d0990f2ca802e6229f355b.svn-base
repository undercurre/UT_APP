<template>
	<gracePage :customHeader="true">
		<!-- 头部 -->
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装领用</text></view>
			</view>
		</graceHeader>
		<!-- body -->
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工装编号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.CODE" placeholder=" " :focus="autoFocus" @confirm="getLoadData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						备注
					</view>
					<view class="form-value">
						<textarea style="height: 140rpx;" class="form-input" placeholder=" " v-model="form.remark" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						领用人
					</view>
					<view class="form-value disabled">
						<input disabled class="form-input" type="text" placeholder=" " v-model="form.UserName">
					</view>
				</view>
			</view>
		</view>
		<!-- 尾部 -->
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确认领用</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>


<script src="./index.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
</style>
