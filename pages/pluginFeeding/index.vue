<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">手工插件上料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view @submit="submitForm" class="form-content">
				<view class="form-item">
					<text class="form-label align-right">工单</text>
					<view class="form-value"><input type="text" v-model="netData.WO_NO" class="form-input" disabled placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">料号</text>
					<view class="form-value"><input type="text" v-model="netData.PCB_PN" class="form-input" disabled placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">名称</text>
					<view class="form-value"><input type="text" v-model="netData.MODEL" class="form-input" disabled placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">线体</text>
					<view class="form-value"><input type="text" :value="lineList[currentLine].LINE_NAME || ''" class="form-input"
						 disabled placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">站位</text>
					<view class="form-value">
						<input ref="MAC" :selection-start="currentSelection === 'MAC' && selection ? selectionStart : 0" :selection-end="currentSelection === 'MAC' && selection ? selectionEnd : -1"
						 type="text" :focus="autoFocus" @focus.stop="handleFocus('MAC', formData.MAC)" @confirm="handleCheckMAC" v-model="formData.MAC"
						 @input="selection = false" class="form-input" placeholder="请输入站位" />
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">料卷</text>
					<view class="form-value">
						<input ref="ReelId" :maxlength="-1" :selection-start="currentSelection === 'ReelId' && selection ? selectionStart : 0"
						 :selection-end="currentSelection === 'ReelId' && selection ? selectionEnd : -1" type="text" :focus="autoNextFocus"
						 @focus.stop="handleFocus('ReelId', formData.ReelId)" @confirm="handleCheckReel" v-model="formData.ReelId" @input="selection = false"
						 class="form-input" placeholder="请输入料卷" />
					</view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn " @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<!-- <image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image> -->
					<text class="tix">同步料单</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./pluginFeeding.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 4em !important;
	}
</style>
