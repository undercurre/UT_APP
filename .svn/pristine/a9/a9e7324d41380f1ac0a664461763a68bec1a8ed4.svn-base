<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">飞达盘点明细</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right">
							飞达编号：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="Form.FBODYMARK" placeholder=" " @focus="autoFocus = true;"
							 :focus="autoFocus" @blur="autoFocus = false;" @confirm="getFeida">
						</view>
					</view>
					<view class="form-item">
						<u-table style="position: relative;height: 1100rpx;overflow: auto;">
							<u-tr  style="position: sticky;top: 0;overflow: scroll;">
								<u-th style="width: 160rpx">序号</u-th>
								<u-th style="width: 250rpx">飞达编号</u-th>
								<u-th style="width: 250rpx">类型</u-th>
								<u-th style="width: 200rpx">尺寸</u-th>
								<u-th style="width: 200rpx">点检人</u-th>
								<u-th style="width: 250rpx">点检时间</u-th>
							</u-tr>
							<u-tr   v-for="(item, index) in list" :key="index">
								<u-td style="width: 160rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{index+1}} </u-td>
								<u-td style="width: 250rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{ item.FEEDER }}</u-td>
								<u-td style="width: 250rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{ item.FEEDER_TYPE }}</u-td>
								<u-td style="width: 200rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{ item.FEEDER_SIZE }}</u-td>
								<u-td style="width: 200rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{ item.CHECK_USER }}</u-td>
								<u-td style="width: 250rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px">{{ item.CHECK_TIME }}</u-td>
							</u-tr>
						</u-table>
					</view>
				</view>
			</view>
			<!-- <view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">关闭</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm">
						<text class="tix">确定</text>
					</view>
				</div>
			</view> -->
		</gracePage>
	</view>
</template>

<script src="./recording.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 6em !important;
	}
	.form-content{
		padding-bottom: 0px;
	}
</style>
