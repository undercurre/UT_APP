<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装领用</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">工单号</view>
					<view class="form-value">
						<input ref="WoNo" v-model="formData.WoNo" type="text" name="WoNo" class="form-input" :focus="autoFocus" @confirm="getMesTongsInfo"></input>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">产品编号</view>
					<view class="form-value">
						<input ref="PartNo" v-model="formData.PartNo" type="text" name="PartNo" class="form-input" :focus="autoFocusNext"
						 @confirm="getMesStoreInfo"></input>
					</view>
				</view>
				<view>
					<u-table style="position: relative;height: 900rpx;overflow: auto;">
						<u-tr style="position: sticky;top: 0;overflow: scroll;">
							<u-th style="width: 800rpx">储位</u-th>
							<u-th style="width: 800rpx">工装类别</u-th>
							<u-th style="width: 800rpx">工装编号</u-th>
						</u-tr>
						<u-tr v-for="item in List" :key="item.ID">
							<u-td style="width: 800rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{item.StoreName}}</u-td>
							<u-td style="width: 800rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{item.TongsType}}</u-td>
							<u-td style="width: 800rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{item.Code}}</u-td>
						</u-tr>
					</u-table>
				</view>
			</view>
			
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">退出</text>
				</view>
				<view class="toolbar-btn primary" @tap="ReceiveClick">
					<text class="tix">领用</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./first.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
</style>
