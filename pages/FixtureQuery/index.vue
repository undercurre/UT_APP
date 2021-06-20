<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">夹具查询</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工单号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="listQuery2.WO_NO" placeholder=" " @focus="autoFocus = true;"
						 :focus="autoFocus" @blur="autoFocus = false" @confirm="getSmtWo">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						产品编号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="listQuery1.CODE" placeholder=" " @focus="autoFocusNext = true;"
						 :focus="autoFocusNext" @blur="autoFocusNext = false" @confirm="getMesTongsInfo">
					</view>
				</view>
				<view class="form-item">
					<u-table style="position: relative;">
						<u-tr style="position: sticky;top: 0;">
							<u-th style="width: 175rpx;">工装编号</u-th>
							<u-th style="width: 175rpx;">工装类别</u-th>
							<u-th style="width: 175rpx;">状态</u-th>
							<u-th style="width: 175rpx;">储位</u-th>
						</u-tr>
						<u-tr v-for="(item, index) in list" :key="index">
							<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.CODE }}</u-td>
							<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ getCateGory(item.TONGS_TYPE) }}</u-td>
							<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ getStatus(item.STATUS) }}</u-td>
							<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.STORE_NAME }}</u-td>
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
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">领用</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./FixtureQuery.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}

	.x-list {
		padding: 20rpx 20rpx;
	}

	.x-label {
		display: flex;
		font-size: 16px;
		color: #888;
		line-height: 1;
		align-items: center;
		padding-bottom: 20rpx;
	}

	.x-text {
		font-size: 32rpx;
		color: #444444;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		lines: 1;
	}
</style>
