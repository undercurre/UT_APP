<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">刮刀归还</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						刮刀号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.SCRAPER_NO" placeholder=" " :focus="autoFocus" @confirm="getLoadData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						操作
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" value="归还" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						归还人工号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.WorkerNo" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						站点
					</view>
					<view class="form-value" :class="{
						disabled: true
					}">
						<picker :disabled="true" mode="selector" :range="SmtLineList" range-key="NAME" @change="handlePickeLine">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="SmtLineList[SmtLineIndex] ? SmtLineList[SmtLineIndex].NAME : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
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
								<input class="form-input" :style="{
									color: ScraperStatusList[ScraperStatusIndex] ? '#333' : 'rgb(158, 158, 158)'
								}" disabled type="text" :value="ScraperStatusList[ScraperStatusIndex] ? ScraperStatusList[ScraperStatusIndex].NAME : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						储位
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.LOCATION" placeholder=" ">
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

<script src="./SfcsScraperReturn.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 6em !important;
	}
</style>
