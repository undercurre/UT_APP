<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装作业上线</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工装
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.TongsNo" placeholder=" " :focus="autoFocus" @confirm="getLoadScraperData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						型号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.TONGS_MODEL" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						来源
					</view>
					<view class="form-value disabled ">
					<!-- 	<text v-if="form.SOURCES === 0">自制</text>
						<text v-if="form.SOURCES === 1">外购</text>
						<text v-if="form.SOURCES === 2">转移</text> form-txt -->
						<input class="form-input" disabled type="text" v-model="form.SOURCES">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						状态
					</view>
					<view class="form-value disabled">
					<!-- 	<text v-if="form.STATUS === -1">未注册</text>
						<text v-if="form.STATUS === 0">待入库</text>
						<text v-if="form.STATUS === 1">存储中</text>
						<text v-if="form.STATUS === 2">借出</text>
						<text v-if="form.STATUS === 3">使用中</text>
						<text v-if="form.STATUS === 4">保养中</text>
						<text v-if="form.STATUS === 5">维修中</text>
						<text v-if="form.STATUS === 6">已报废</text>
						<text v-if="form.STATUS === 7">永久借出</text> -->
						<input class="form-input" disabled type="text" v-model="form.STATUS" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						工位
					</view>
					<view class="form-value">
						<picker mode="selector" :range="NameList" range-key="OPERATION_SITE_NAME" @change="handlePickeLine">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="NameList[NameIndex] ? NameList[NameIndex].OPERATION_SITE_NAME : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
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
					<text class="tix">提交</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./index.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 3em!important;	
	}
	.form-txt{
		font-size: 32rpx;
		border: none !important;
		line-height: 60rpx;
	}
</style>
