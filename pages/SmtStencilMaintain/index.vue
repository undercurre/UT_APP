<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">钢网保养</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						钢网编号
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.STENCIL_NO" placeholder=" " :focus="autoFocus" @confirm="getLoadScraperData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						当前状态
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" :value="StatusList[statusIndex] ? StatusList[statusIndex].NAME : ' '"
						 placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						维护后
					</view>
					<view class="form-value no-border">
						<div class="flex">
							<radio-group @change="radioChange" style="width: 100%;display: flex;align-items: center;padding-left: 10rpx;">
								<label style="display: flex;align-items: center;">
									<view>
										<radio value="1" :checked="form.ResultStatus === 1" />
									</view>
									<view style="font-size: 16px;color: #888;margin-left: 10rpx;">可用</view>
								</label>
								<label style="display: flex;align-items: center;margin-left: 20rpx;">
									<view>
										<radio value="2" :checked="form.ResultStatus === 2" />
									</view>
									<view style="font-size: 16px;color: #888;margin-left: 10rpx;">报废</view>
								</label>
							</radio-group>
						</div>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						备注
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.Remark" placeholder=" " >
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

<script src="./SmtStencilMaintain.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
</style>
