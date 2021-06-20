<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">SMT插料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						<!-- 新料卷 --> 
						主料卷
					</view>
					<view class="form-value">
						<input class="form-input" type="text" :maxlength="-1" v-model="formData.newReelID" placeholder=" " :focus="autoFocus" @confirm="handleCheckReel">
					</view>
				</view>
				<view class="form-item" style="margin-bottom: 0;">
					<view class="form-label align-right">
						<!-- 旧料卷 -->
						副料卷
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="formData.feederReelLocation" placeholder=" " :focus="checkReelFlag" @confirm="handleConnectReel">
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

<script src="./ProductLineChaLiao.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	
	.form-label {
		width: 4em !important;
	}
</style>
