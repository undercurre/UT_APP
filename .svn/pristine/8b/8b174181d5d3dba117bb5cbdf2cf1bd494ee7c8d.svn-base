<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">钢网归还</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						钢网编号
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.STENCIL_NO" placeholder=" " :focus="autoFocus" @confirm="getLoadData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						储位
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.LOCATION" placeholder=" " :focus="autoFocusLocation">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						归还者
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.WorkNo" placeholder=" " :focus="autoFocusWorkNo">
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
			</div>
		</view>
	</gracePage>
</template>

<script src="./SmtStencilReturn.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 5em!important;	
	}
</style>
