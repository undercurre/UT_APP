<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">产线下线</text></view>
			</view>
		</graceHeader>

		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">工单</view>
					<view class="form-value">
						<input ref="woNo" v-model="netData.WO_NO" type="text" name="woNo" class="form-input"></input>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">料号</view>
					<view class="form-value">
						<input ref="part_no" v-model="netData.PCB_PN" type="text" class="form-input" disabled='true' />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">名称</view>
					<view class="form-value">
						<input ref="name" v-model="netData.MODEL" @input="selection = false" type="text" class="form-input"
						 disabled='true' />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">线别</view>
					<view class="form-value"><input type="text" :value="lineList[currentLine].LINE_NAME || ''" class="form-input"
						 disabled placeholder="" /></view>
				</view>
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<!-- <image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image> -->
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./producOffline.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 4em !important;
	}
</style>
