<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">点检维修</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						设备名称
					</view>
					<view class="form-value disabled">
						<input disabled class="form-input" type="text" v-model="netData.NAME" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						设备状态
					</view>
					<view class="form-value disabled">
						<input disabled class="form-input" type="text" :value="getStatus(netData.STATUS)" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						设备分类
					</view>
					<view class="form-value disabled">
						<input disabled class="form-input" type="text" v-model="netData.CATEGORY_NAME" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						设备编码
					</view>
					<view class="form-value disabled">
						<input disabled class="form-input" type="text" v-model="netData.PRODUCT_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						存放地点
					</view>
					<view class="form-value disabled">
						<input disabled class="form-input" type="text" v-model="netData.STATION_NAME" placeholder=" ">
					</view>
				</view>
				<u-subsection class="mycsub" :list="[{name: '设备维修记录'}, {name: '维修配件记录'}]" :current="currentSubsection" @change="handleChangeSub"></u-subsection>
				<div style="height: 20rpx"></div>
				<!-- <div style="padding: 0 0 10px 0;font-size: 14px;color: #666;">
					设备维修记录
				</div> -->
				<u-table v-if="currentSubsection === 0" style="overflow-x: auto;" :style="{
					height: tableHeight + 'px'
				}">
					<u-tr style="width: 1800rpx">
						<u-th style="width: 300rpx;flex: 2;">维修编号</u-th>
						<u-th style="width: 300rpx;flex: 2">维修人员</u-th>
						<u-th style="width: 400rpx;flex: 3;">维修开始时间</u-th>
						<u-th style="width: 400rpx;flex: 3">维修内容</u-th>
						<u-th style="width: 400rpx;flex: 3">维修结果</u-th>
					</u-tr>
					<u-tr style="width: 1800rpx" v-for="(item, index) in list" :key="item.ID" @click.native="changePeiJianList(item.ID)" :class="{
						activex: currentListId === item.ID
					}">
						<u-td style="width: 300rpx;flex: 2;">{{ item.REPAIR_CODE }}</u-td>
						<u-td style="width: 300rpx;flex: 2">{{ item.REPAIR_USER }}</u-td>
						<u-td style="width: 400rpx;flex: 3;">{{ item.BEGINTIME }}</u-td>
						<u-td style="width: 400rpx;flex: 3">{{ item.REPAIR_CONTENT }}</u-td>
						<u-td style="width: 400rpx;flex: 3">{{ getStatusText(item.REPAIR_STATUS) }}</u-td>
					</u-tr>
				</u-table>
				<!-- <div style="padding: 10px 0 10px 0;font-size: 14px;color: #666;">
					维修配件记录
				</div> -->
				<u-table v-if="currentSubsection === 1" style="overflow-x: auto;" :style="{
					height: tableHeight + 'px'
				}">
					<u-tr style="width: 800rpx">
						<u-th style="width: 400rpx;flex: 2;">配件名称</u-th>
						<u-th style="width: 400rpx;flex: 2">配件规格</u-th>
					</u-tr>
					<u-tr style="width: 800rpx" v-for="item in peiJianList" :key="item.ID">
						<u-td style="width: 400rpx;flex: 2;">{{ item.COMPONENT_NAME }}</u-td>
						<u-td style="width: 400rpx;flex: 2">{{ item.COMPONENT_MODEL }}</u-td>
					</u-tr>
				</u-table>
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn primary" @tap="handleKeep">
					<text class="tix">维修设备</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./SfcsEquipRepairHead.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em!important;
	}
	
	.activex {
		background-color: rgba(238, 245, 254, 1)!important;
	}
</style>
