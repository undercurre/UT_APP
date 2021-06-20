<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">设备明细</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right">
							设备编号：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="Form.EQUIPMENT_BODYMARK" placeholder=" " @focus="autoFocus = true;"
							 :focus="autoFocus" @blur="autoFocus = false;" @confirm="getFeida">
						</view>
					</view>
					<view class="form-item">
						<u-table style="position: relative;height: 900rpx;overflow: auto;">
							<u-tr class="u-tr" style="display: -webkit-box;position: sticky;top: 0;">
								<u-th class="u-tr" style="width: 20%;flex: 0 0 20%;">设备编号</u-th>
								<u-th class="u-tr"style="width: 20%;flex: 0 0 20%;">设备名称</u-th>
								<u-th class="u-tr" style="width: 20%;flex: 0 0 20%;">时间</u-th>
								<u-th class="u-tr" style="width: 20%;flex: 0 0 20%;">用户</u-th>
								<u-th class="u-tr" style="width: 20%;flex: 0 0 20%;">状态</u-th>
							</u-tr>
							<u-tr class="u-tr" style="display: -webkit-box;" v-for="(item, index) in list" :key="index">
								<u-td class="u-tr" style="width: 20%;flex: 0 0 20%;overflow: hidden;line-height: 21px;">{{item.NAME }}</u-td>
								<u-td class="u-tr" style="width: 20%;flex: 0 0 20%;overflow: hidden;line-height: 21px;">{{item.CATEGORY }}</u-td>
								<u-td class="u-tr" style="width: 20%;flex: 0 0 20%;overflow: hidden;line-height: 21px;">{{item.CHECK_TIME}}</u-td>
								<u-td class="u-tr" style="width: 20%;flex: 0 0 20%;overflow: hidden;line-height: 21px;">{{item.CHECK_USER}}</u-td>
								<u-td class="u-tr" style="width: 20%;flex: 0 0 20%;overflow: hidden;line-height: 21px;">{{item.KDETAIL_STATUS}}</u-td>
							</u-tr>
						</u-table>
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
						<text class="tix">提交</text>
					</view>
				</div>
			</view>
		</gracePage>
	</view>
</template>

<script src="./maintain.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 6em !important;
	}

	.detail {
		background: #1890FF;
		color: #fff;
		border-radius: 8rpx;
	}

	.item-block {
		box-shadow: 0 0 20rpx #E5E5E5;
		padding: 5rpx 20rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}

	.item-info {
		display: flex;
		align-items: center;
	}

	.info-left {
		font-size: 28rpx;
		color: #101010;
		/* line-height: 204px; */
		padding: 10rpx 0px;
		width: 160rpx;
	}

	.info-right {
		flex: 1;
		padding-left: 10rpx;
		font-size: 28rpx;
		color: #101010;
		padding: 10rpx 0px;
		/* line-height: 34px; */
	}
</style>
