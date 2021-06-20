<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">离线备料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						飞达
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.FEED_ID" placeholder=" " :focus="autoFocus" @confirm="handleCheckFeeder">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right" style="height: 60rpx;">
						位置
					</view>
					<view class="form-value no-border" style="height: 60rpx;display: flex;align-items: center;">
						<graceNumberBox style="margin-left: 10rpx;height: 100%;" inputPadding="0px"  @change="handleChange" btnFontSize="20px" btnSize="30rpx" inputColor="#444444" inputHeight="60rpx" inputFontSize="18px" width="100px" :value="formData.FEED_TYPE"></graceNumberBox>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						料卷
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="formData.REEL_ID" placeholder=" " :focus="checkFeederFlag" @confirm="handleCheckReel">
					</view>
				</view>
				<div style="overflow-y: scroll;position: relative;" :style="{
					height: list.length ? '200px!important' : ''
				}">
					<u-table>
							<u-tr>
								<u-th style="width: 210rpx">飞达</u-th>
								<u-th style="width: 140rpx">位置</u-th>
								<u-th style="width: 350rpx">料卷</u-th>
							</u-tr>
							<u-tr v-for="item in list" :key="item.ID">
								<u-td style="width: 210rpx;overflow: hidden;line-height: 21px;">{{ item.FEEDER }}</u-td>
								<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.FEEDER_TYPE }}</u-td>
								<u-td style="width: 350rpx;overflow: hidden;line-height: 21px;">{{ item.REEL_ID }}</u-td>
							</u-tr>
						</u-table>
				</div>
				<!-- 消息区 -->
				<div class="titX">
					消息区：
				</div>
				<view class="msg-content-x" style="margin-top: 20rpx;" :style="{
					height: list.length ? msgContentHeight + 'px' : msgContentHeight2 + 'px'
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
			<!-- 	<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view> -->
			</div>
		</view>
	</gracePage>
</template>

<script src="./OffLinePreparation.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 4em !important;
	}

	// .toolbar-btn {
	// 	width: 32% !important;
	// }
</style>
