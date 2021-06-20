<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">辅料回温查询</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="subsection-con">
				<u-subsection class="mycsub" :list="subsection" :current="currentSubsection" @change="handleChangeSubsection"></u-subsection>
			</view>
			<view class="con-con" v-if="currentSubsection === 0">
				<u-table style="overflow-x: auto;"  :style="{
					height: tableHeight + 'px'
				}">
					<u-tr style="width: 1300rpx;">
						<!-- <u-th style="width: 200rpx;flex: 1">瓶号</u-th> -->
						<u-th style="width: 400rpx;flex: 2">已回温时长</u-th>
						<u-th style="width: 400rpx;flex: 3">回温开始时间</u-th>
						<u-th style="width: 300rpx;flex: 2">锡膏编码</u-th>
					</u-tr>
					<u-tr style="width: 1300rpx;background:#008200 !important" v-for="(item, index) in mainTable" :key="item.RESOURCE_NO" >
					<!-- <u-tr style="width: 1300rpx;" v-for="(item, index) in mainTable" :key="item.RESOURCE_NO" :class="{
						yellowRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) < 24 && parseFloat(item.Warm_Time_H) >= 23 : false,
						redRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 24 : false,
						greenRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 4 && parseFloat(item.Warm_Time_H) < 23 : false,
					}"> -->
						<u-td :class="{
						yellowRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) < 24 && parseFloat(item.Warm_Time_H) >= 23 : false,
						redRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 24 : false,
						greenRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 4 && parseFloat(item.Warm_Time_H) < 23 : false,
					}" style="width: 300rpx;overflow: hidden;line-height: 21px;flex: 2">{{ item.Warm_Time }}（{{ item.Warm_Time_H }}h）</u-td>
						<u-td :class="{
						yellowRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) < 24 && parseFloat(item.Warm_Time_H) >= 23 : false,
						redRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 24 : false,
						greenRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 4 && parseFloat(item.Warm_Time_H) < 23 : false,
					}" style="width: 400rpx;overflow: hidden;line-height: 21px;flex: 3">{{ item.BEGIN_OPERATION_TIME }}</u-td>
						<u-td  :class="{
						yellowRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) < 24 && parseFloat(item.Warm_Time_H) >= 23 : false,
						redRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 24 : false,
						greenRow: item.Warm_Time_H ? parseFloat(item.Warm_Time_H) >= 4 && parseFloat(item.Warm_Time_H) < 23 : false,
					}" style="width: 300rpx;overflow: hidden;line-height: 21px;flex: 2">{{ item.RESOURCE_NO }}</u-td>
					</u-tr>
				</u-table>
			</view>
			<view class="con-con" v-if="currentSubsection === 1">
				<u-table style="overflow-x: auto;" :style="{
					height: tableHeight + 'px'
				}">
					<u-tr style="width: 1700rpx;">
						
						<!-- <u-th style="width: 200rpx;flex: 1">瓶号</u-th> -->
						<u-th style="width: 300rpx;flex: 2">所在线体</u-th>
						<u-th style="width: 400rpx;flex: 3">已使用时长</u-th>
						<u-th style="width: 400rpx;flex: 3">使用开始时间</u-th>
						<u-th style="width: 400rpx;flex: 2">锡膏编码</u-th>
					</u-tr>
					<!-- <u-tr style="width: 1700rpx;" v-for="(item, index) in mainTable1" :key="item.RESOURCE_NO" :class="{
						yellowRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) < 24 && parseFloat(item.USED_Time_H) >= 23 : false,
						redRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) >= 24 : false
					}"> -->
					<u-tr style="width: 1700rpx;" v-for="(item, index) in mainTable1" :key="item.RESOURCE_NO">
						<!-- <u-td style="width: 200rpx;overflow: hidden;line-height: 21px;flex: 1">{{ item.Bottle_NO }}</u-td> -->
						<u-td :class="{
						yellowRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) < 24 && parseFloat(item.USED_Time_H) >= 23 : false,
						redRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) >= 24 : false
					}" style="width: 300rpx;overflow: hidden;line-height: 21px;flex: 2;">{{ item.LINE_NAME }}</u-td>
						<u-td :class="{
						yellowRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) < 24 && parseFloat(item.USED_Time_H) >= 23 : false,
						redRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) >= 24 : false
					}" style="width: 400rpx;overflow: hidden;line-height: 21px;flex: 3">{{ item.USED_Time }}（{{ item.USED_Time_H }}h）</u-td>
						<u-td :class="{
						yellowRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) < 24 && parseFloat(item.USED_Time_H) >= 23 : false,
						redRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) >= 24 : false
					}" style="width: 400rpx;overflow: hidden;line-height: 21px;flex: 3;">{{ item.BEGIN_OPERATION_TIME }}</u-td>
						<u-td :class="{
						yellowRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) < 24 && parseFloat(item.USED_Time_H) >= 23 : false,
						redRow: item.USED_Time_H ? parseFloat(item.USED_Time_H) >= 24 : false
					}" style="width: 400rpx;overflow: hidden;line-height: 21px;flex: 2">{{ item.RESOURCE_NO }}</u-td>
					</u-tr>
				</u-table>
			</view>
		</view>

	</gracePage>
</template>

<script src="./AccessoryQuery.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.subsection-con {
		padding: 5px 0;
	}
	
	.u-table {
		border-bottom: 1px solid rgb(228, 231, 237);
		border-right: 1px solid rgb(228, 231, 237);
	}
	
	.yellowRow {
		background-color: #E6A23C!important;
	}
	
	.redRow {
		background-color: #F56C6C!important;
	}
	
	.greenRow {
		background-color: #00b16f!important;
	}
	
	.currentRow {
		background-color: rgba(238, 245, 254, 1)!important;
	}
</style>