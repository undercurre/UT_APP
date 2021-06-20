<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装转储</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">工装编号</view>
					<view class="form-value">
						<input ref="CODE" v-model="formData.CODE" type="text" name="CODE" class="form-input" :focus="autoFocus" @confirm="getMesTongsInfo"></input>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">旧储位</view>
					<view class="form-value disabled">
						<input ref="OLD" disabled v-model="netData.STORE_CODE" type="text" name="OLD" class="form-input"></input>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">新储位</view>
					<view class="form-value">
						<input ref="STORE_CODE" v-model="formData.STORE_CODE" type="text" name="STORE_CODE" class="form-input" :focus="autoFocusNext" @confirm="getMesStoreInfo"></input>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="cleanClick">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">保存</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./FixtureDump.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
</style>
