<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">打印机设置</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">打印机</view>
					<view class="form-value">
						<picker mode="selector" :range="printerList" range-key="label" @change="handleChosenType">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :style="{
							color: printerList[printerIndex] ? '#333' : 'rgb(158, 158, 158)'
					}"
								 :value="printerList[printerIndex] ? printerList[printerIndex].label : '' " placeholder=" ">
								</input>
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				
				<view class="form-item" v-if="defaultPrinterType === 1">
					<view class="form-label align-right">
						打印机IP
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.IP" placeholder=" " :focus="autoFocus" @confirm="submitForm">
					</view>
				</view>
				
				<view v-if="defaultPrinterType === 2">
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
			</view>
		</view>
		<view v-if="defaultPrinterType === 1" class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn success" @tap="printTestWifi">
					<text class="tix">打印测试</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">保存</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./DefaultPrintSet.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 5em !important;
	}
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
		background: #fff;
	}
</style>
