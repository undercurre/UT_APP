<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">钢网清洗</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						钢网编号
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.STENCIL_NO" placeholder=" " :focus="autoFocus" @confirm="getStencilInfo">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						清洗时间
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" placeholder=" " v-model="form.LAST_CLEAN_TIME">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						印刷次数
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" placeholder=" " v-model="form.PrintCount">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						检查人
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" placeholder=" " v-model="form.WorkNo">
					</view>
				</view>
				<!-- <view class="form-item">
					<view class="form-label align-right">
						张力上点
					</view>
					<view class="form-value">
						<input class="form-input" type="text" placeholder=" " v-model="form.TENSION_A">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						张力下点
					</view>
					<view class="form-value">
						<input class="form-input" type="text" placeholder=" " v-model="form.TENSION_B">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						张力左点
					</view>
					<view class="form-value">
						<input class="form-input" type="text" placeholder=" " v-model="form.TENSION_C">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						张力右点
					</view>
					<view class="form-value">
						<input class="form-input" type="text" placeholder=" " v-model="form.TENSION_D">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						张力中点
					</view>
					<view class="form-value">
						<input class="form-input" type="text" placeholder=" " v-model="form.TENSION_E">
					</view>
				</view> -->
				<view class="x-list">
					<checkbox-group style="display: block;" @change="handleChangeCheckBox">
						<view class="x-label">
							<checkbox value="有破损" :checked="this.INSPECT_RESULT.indexOf('有破损') !== -1" :disabled="isNG" />有破损
						</view>
						<view class="x-label">
							<checkbox value="有凹凸" :checked="this.INSPECT_RESULT.indexOf('有凹凸') !== -1" :disabled="isNG" />有凹凸
						</view>
						<view class="x-label">
							<checkbox value="有刮伤" :checked="this.INSPECT_RESULT.indexOf('有刮伤') !== -1" :disabled="isNG" />有刮伤
						</view>
						<view class="x-label">
							<checkbox value="有异物不洁" :checked="this.INSPECT_RESULT.indexOf('有异物不洁') !== -1" :disabled="isNG" />有异物不洁
						</view>
						<view class="x-label">
							<checkbox value="有变形" :checked="this.INSPECT_RESULT.indexOf('有变形') !== -1" :disabled="isNG" />有变形
						</view>
						<!-- <view class="x-label">
							<checkbox value="有钢网张力异常（正常范围30-50Ncm²）" :checked="this.INSPECT_RESULT.indexOf('有钢网张力异常（正常范围30-50Ncm²）') !== -1"
							 :disabled="true" />有钢网张力异常（正常范围30-50Ncm²）
						</view> -->
						<view class="x-label">
							<checkbox value="OK" :checked="this.INSPECT_RESULT.indexOf('OK') !== -1" :disabled="isNG" />OK
						</view>
					</checkbox-group>
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
					<text class="tix">确认清洗</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./YT-SmtStencilClean.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}

	.x-list {
		padding: 20rpx 20rpx;
	}

	.x-label {
		display: flex;
		font-size: 16px;
		color: #888;
		line-height: 1;
		align-items: center;
		padding-bottom: 20rpx;
	}

	.x-text {
		font-size: 32rpx;
		color: #444444;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		lines: 1;
	}
</style>

