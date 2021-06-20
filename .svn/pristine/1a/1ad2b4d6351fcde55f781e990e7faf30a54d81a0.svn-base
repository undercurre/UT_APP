<template>
	<gracePage :customHeader="true">
		<!-- 头部 -->
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">刮刀清洗</text></view>
			</view>
		</graceHeader>
		<!-- body -->
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item" >
					<view class="form-label align-right">
						刮刀号
					</view>
					<view class="form-value" :class="{
						disabled: disabled
					}">
						<input class="form-input" :disabled="disabled" type="text" v-model="form.SCRAPER_NO" placeholder=" " :focus="autoFocus" @confirm="getLoadData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						已使用次数
					</view>
					<view class="form-value" :class="{
						disabled: disabled
					}">
						<input class="form-input" :disabled="disabled" type="text" placeholder=" " v-model="form.PrintCount">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						当前状态
					</view>
					<view class="form-value" :class="{
						disabled: disabled
					}">
						<picker :disabled="disabled" mode="selector" :range="ScraperStatusList" range-key="NAME" @change="handlePickeStatus">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="ScraperStatusList[ScraperStatusIndex] ? ScraperStatusList[ScraperStatusIndex].NAME : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						清洗人
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" placeholder=" " v-model="form.CLEAN_USER">
					</view>
				</view>
				<view class="form-item" >
					<view class="form-label align-right" >
						过板数量
					</view>
					<view class="form-value" :class="{
						disabled: disabled
					}">
						<input class="form-input" :disabled="disabled" type="text" placeholder=" " v-model="form.ProductCount">
					</view>
				</view>
				<view class="form-item" >
					<view class="form-label align-right">
						上次清洗时间
					</view>
					<view class="form-value" :class="{
						disabled: disabled
					}">
						<input class="form-input" :disabled="disabled" type="text" placeholder=" " v-model="form.LastCleanTime">
					</view>
				</view>
				<view class="form-item" :class="{
						disabled: disabled
					}">
					<view class="form-label align-right">
						使用的站点
					</view>
					<view class="form-value" :class="{
						disabled: disabled
					}">
						<input class="form-input" :disabled="disabled" type="text" placeholder=" " v-model="form.SiteName">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						检查结果
					</view>
					<view class="x-list">
						<checkbox-group style="display: block;" @change="handleChangeCheckBox">
							<view class="x-label">
								<checkbox value="有破损" :checked="this.INSPECT_RESULT.indexOf('有破损') !== -1" :disabled="isNG" />有破损
							</view>
							<view class="x-label">
								<checkbox value="有缺口" :checked="this.INSPECT_RESULT.indexOf('有缺口') !== -1" :disabled="isNG" />有缺口
							</view>
							<view class="x-label">
								<checkbox value="有变形" :checked="this.INSPECT_RESULT.indexOf('有变形') !== -1" :disabled="isNG" />有变形
							</view>
							<view class="x-label">
								<checkbox value="OK" :checked="this.INSPECT_RESULT.indexOf('OK') !== -1" :disabled="isNG" />OK
							</view>
						</checkbox-group>
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
					<text class="tix">保存</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./SfcsScraperClean.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 7em !important;
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
</style>
