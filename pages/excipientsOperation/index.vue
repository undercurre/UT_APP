<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">辅料绑定工单</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工单
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.WO_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						机种
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" disabled v-model="netData.MODEL" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" disabled v-model="netData.PART_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						辅料条码
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text"  :focus="autoFocus" v-model="formData.solder_no" placeholder=" " @confirm="handleSubmit">
					</view>
				</view>
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

<script src="./excipientsOperation.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 5em!important;
	}
</style>
