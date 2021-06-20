<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">采集过站</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工位：
					</view>
					<view class="form-value">
						<picker  mode="selector" :range="zhichengList" range-key="OPERATION_SITE_NAME" @change="handleChangeZhiCheng">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="zhichengList[zhichengIndex] ? zhichengList[zhichengIndex].OPERATION_SITE_NAME : ''" placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						输入数据：
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="enterVal" placeholder=" " :focus="autoFocus" @confirm="EnterCheckRee">
					</view>
				</view>
			</view>
			<view class="view-status" style="background-color: #fff;box-shadow: 0 1px 10rpx #e5e5e5;" >
				<view class="view-item" v-for="(item, index) in statusList" :key="index" :class="{active: checkStatusIndex === index}"
				 @tap="handleChangeStatus(index)">{{ item.SBU_CHINESE }}</view>
			</view>
			<view class="form-item u-table-data" v-if="checkStatusIndex === 0" style="margin-top: 20rpx;">
				<u-table style="position: relative;">
					<u-tr style="position: sticky;top: 0;">
						<u-th style="width: 140rpx">部件名称</u-th>
						<u-th style="width: 180rpx">应收集数量</u-th>
						<u-th style="width: 180rpx">已收集数量</u-th>
						<u-th style="width: 140rpx">部件料号</u-th>
						<u-th style="width: 140rpx">数据格式</u-th>
					</u-tr>
					<u-tr v-for="(item, index) in collectList" :key="index">
						<u-td style="width: 280rpx;overflow: hidden;line-height: 21px;">{{ item.OBJECT_NAME }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.NEED_ASSEMBLY_QTY }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.COLLECTED_QTY }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.DATA_FORMAT }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.PART_NO }}</u-td>
					</u-tr>
				</u-table>
			</view>
			<view v-else style="border: 1px solid #e5e5e5;width: 100%;margin-top: 20rpx;height: 400rpx;overflow: auto;">
			{{NewsInfo}}
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">退出</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>
<script src="./CollectProducts.js"></script>

<style scoped lang="scss">
@import '~@/styles/publics.scss';
.form-label {
	width: 6em!important;
}
.form-content{
	padding-bottom: 0rpx;
}
.u-table-data{
	overflow: auto;
	height: 770rpx;
}
.view-status {
	height: 100rpx;
	position: relative;
	// margin-left: -25rpx;
	width: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
	// padding: 0 30rpx;
	box-shadow: none !important;
}
.view-item {
	width: 20%;
	height: 100%;
	color: #666;
	font-size: 32rpx;
	line-height: 1;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.view-item.active:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2rpx;
	background-color: #009c50;
	width: 100%;
}
.view-item.active {
	color: #009c50;
}
.u-th,
.u-td {
    vertical-align: bottom;
    border-bottom: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	display: inline-block;
}
</style>
