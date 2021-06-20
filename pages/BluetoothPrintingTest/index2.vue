<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">蓝牙打印测试</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<div class="flex">
				<u-button type="primary" plain style="width: 46%;" @click="searchDevices" :loading="isLoading">{{ btfind }}</u-button>
				<u-button type="success" plain style="width: 46%;" @click="printTest">打印测试</u-button>
			</div>
			<div>
				<div class="txt">未配对蓝牙设备</div>
				<div class="bluetoothList">
					<div class="bluetoothItem" v-for="item in vlist1" :key="item.id" @click="searchDevices(item.id)">
						{{ item.label || '未知设备' }}
						<text>点击配对</text>
					</div>
				</div>
			</div>
			<div>
				<div class="txt">已配对蓝牙设备</div>
				<div class="bluetoothList">
					<div class="bluetoothItem" v-for="item in vlist2" :key="item.id" @click="onConn(item)">
						{{ item.label || '未知设备' }}
						<text v-if="item.isSet">选择此打印机</text>
					</div>
				</div>
			</div>
		</view>
	</gracePage>
</template>

<script src="./BluetoothPrintingTest2.js"></script>

<style scoped lang="scss">
	.flex {
		display: flex;
		align-items: center;
		padding: 10px 25rpx;
		background: #fff;
		width: 750rpx;
		margin-left: -25rpx;
		box-sizing: border-box;
		box-shadow: 0rpx 0rpx 4rpx #e5e5e5;
	}
	.txt {
		font-size: 14px;
		color: #999;
		line-height: 1.5;
		padding: 10px 0;
	}
	.bluetoothList {
		height: 500rpx;
		background: #fff;
		overflow-y: auto;
	}
	.bluetoothItem {
		font-size: 14px;
		line-height: 34px;
		color: #999;
		// background: #fafafa;
		padding: 0 10px;
	}
	.bluetoothItem:active {
		background: #FFF7CC;
	}
</style>

<style>
	page {
		background: #fafafa;
	}
</style>
