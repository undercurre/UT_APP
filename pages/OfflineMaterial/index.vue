<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">离线上料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						飞达
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.feeder" placeholder=" " :focus="autoFocus" @confirm="handleCheckFeeder">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						料站
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.fullLocation" placeholder=" " :focus="checkReelFlag" @confirm="submitForm">
					</view>
				</view>
				<view class="form-item" style="margin-bottom: 0;">
					<view class="form-label align-right" style="color: #fff;">
						xxxx
					</view>
					<view class="form-value no-border">
						<view class="x-3" style="margin-left: 30rpx;flex-direction: row;justify-content: flex-end;">
							<view style="display: flex;flex-direction: row;align-items: center;padding-left: 30rpx;background-color: red;padding-top: 10rpx;padding-bottom: 10rpx;">
								<checkbox-group style="width: auto;" @change="handleChangeBox">
									<checkbox value="1" :checked="auto"></checkbox>
								</checkbox-group>
								<text style="color: yellow;font-size: 36rpx;margin-right: 50rpx;">自动</text>
							</view>
						</view>
					</view>
				</view>
				<div class="titX">
					消息区：
				</div>
				<view class="msg-content-x" :style="{
					height: msgContentHeight + 'px'
				}">
					<div class="content-item" :class="{
					successX: item.type === 'success',
					errorX: item.type === 'error'
				}" v-for="(item, index) in msgList" :key="index">
						<span class="left">{{ item.msg }}</span>
					</div>
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

<script src="./OfflineMaterial.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	
	.form-label {
		width: 3em !important;
	}
	
	.x-3 {
		display: flex;
		flex-direction: row;
		padding: 10rpx 5rpx;
		align-items: center;
	}
</style>
