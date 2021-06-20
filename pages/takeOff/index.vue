<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">卸料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						料卷
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="formData.feederOrReel" placeholder="请输入料架/料卷" :focus="focusFlag"
						 @confirm="handleBlur">
					</view>
				</view>
				<view class="form-item" style="margin-bottom: 0;">
					<view class="form-label align-right" style="color: #fff;">
						xxx
					</view>
					<view class="form-value no-border">
						<view class="x-3" style="margin-left: 30rpx;background-color: red;">
							<checkbox-group style="width: auto;" @change="handleChangeBox">
								<checkbox value="1" :checked="formData.endReel"></checkbox>
							</checkbox-group>
							<text style="color: yellow;font-size: 16px;">料卷已用完</text>
						</view>
					</view>
				</view>
				<!-- 消息区 -->
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

<script src="./takeOff.js"></script>

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
