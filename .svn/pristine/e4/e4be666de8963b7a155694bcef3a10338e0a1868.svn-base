<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">补刷条码</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<div id="myForm">
					<view class="form-item">
						<view class="form-label align-right" style="height: 60rpx;">
							拼板数
						</view>
						<view class="form-value no-border" style="height: 60rpx;display: flex;align-items: center;">
							<graceNumberBox style="margin-left: 10rpx;height: 100%;" inputPadding="0" @change="handleChange" btnFontSize="20px" btnSize="30rpx" inputColor="#444444" inputHeight="60rpx" inputFontSize="18px" width="100px" :value="pingBan_num"></graceNumberBox>
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							流水号
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="formData.wo_no" placeholder=" " :focus="autoFocus" @confirm="sendTextMsg">
						</view>
					</view>
				</div>
				<view class="grace-form-item grace-form-list">
					<scroll-view :scroll-y="true" :scroll-x="true" :style="{
							height: '400rpx'
						}">
						<view v-for="(item, index) in formArr" :key="index" class="grace-form-box"><text class="grace-form-txt">{{item}}</text></view>
					</scroll-view>
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
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/qingcu.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./brushBarcode.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	
	.form-label {
		width: 4em!important;
	}

	.grace-form-list {
		border: 2rpx solid #e5e5e5;
		box-sizing: border-box;
		flex-direction: column !important;
		justify-content: space-between !important;
	}

	.grace-form-box {
		text-align: left;
	}

	.grace-form-txt {
		font-size: 16px;
		color: #444444;
		text-align: left;
	}

</style>
