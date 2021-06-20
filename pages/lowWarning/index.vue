<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">低水位预警</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<form  class="grace-nowrap grace-form">
				<view class="grace-form-row">
					<view class="grace-form-view">
						<view class="grace-form-item item-border">
							<text class="grace-form-label">楼层：</text>
							<picker mode="selector" :range="floorolist" @change="flooroClick">
								<view class="picker-view" :style="{
									color: floorolist[flooroIndex] ? '#333' : 'rgb(158, 158, 158)'
								}">{{ floorolist[flooroIndex] ? floorolist[flooroIndex] : '请选择楼层' }}</view>
							</picker>
							<text class="grace-select-menu-icon icon-allow-b"></text>
						</view>
						<view class="grace-form-item item-border">
							<text class="grace-form-label">线别：</text>
							<picker mode="selector" :range="Lineolist" @change="LineoClick">
								<view class="picker-view" :style="{
									color: Lineolist[listIndex] ? '#333' : 'rgb(158, 158, 158)'
								}">{{ Lineolist[listIndex] ? Lineolist[listIndex] : '请选择楼层' }}</view>
							</picker>
							<text class="grace-select-menu-icon icon-allow-b"></text>
						</view>
					</view>
				<view class="grace-nowrap grace-form-search" @click="searchoClick">
					<image class="grace-form-image" src="../../static/menu_imgs/search.png" ></image>
				</view>
				</view>
			</form>
			<view class="form-content">
				<view class="form-item">
					<scroll-view scroll-x>
						<u-table class="tableInfor"  style="position: relative;height: 900rpx;overflow: scroll;width: 1700rpx;">
							<u-tr style="position: sticky;top: 0;overflow: scroll;">
								<u-th style="width: 175rpx;">线别名称</u-th>
								<u-th style="width: 250rpx;">机号名称</u-th>
								<u-th style="width: 250rpx;">料卷</u-th>
								<u-th style="width: 200rpx;">站位</u-th>
								<u-th style="width: 300rpx;">站位料号</u-th>
								<u-th style="width: 175rpx;">置件数</u-th>
								<u-th style="width: 175rpx;">单位量</u-th>
								<u-th style="width: 175rpx;">PCB</u-th>
							</u-tr>
							<u-tr  v-for="(item, index) in tableData" :key="index">
								<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.LINE_NAME || '' }}</u-td>
								<u-td style="width: 250rpx;overflow: hidden;line-height: 21px;">{{ item.SMT_NAME || '' }}</u-td>
								<u-td style="width: 250rpx;overflow: hidden;line-height: 21px;">{{ item.REEL_ID || '暂无信息' }}</u-td>
								<u-td style="width: 200rpx;overflow: hidden;line-height: 21px;">{{ item.SLOT || '暂无信息' }}</u-td>
								<u-td style="width: 300rpx;overflow: hidden;line-height: 21px;">{{ item.PART_NO || '暂无信息' }}</u-td>
								<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.ONHAND_QTY || '暂无信息' }}</u-td>
								<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.UNIT_QTY || '暂无信息' }}</u-td>
								<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.PCB_COUNT || '暂无信息' }}</u-td>
							</u-tr>
						</u-table> 
										
					</scroll-view>
					
				</view>
			</view>
		</view>
		<!-- <view class="grace-stable" slot="gBody">
			<u-table style="position: relative;overflow-x: auto;">
				<u-tr style="position: sticky;top: 0;width: 1700rpx;">
					<u-th style="width: 175rpx;">线别名称</u-th>
					<u-th style="width: 250rpx;">机号名称</u-th>
					<u-th style="width: 250rpx;">料卷</u-th>
					<u-th style="width: 200rpx;">站位</u-th>
					<u-th style="width: 300rpx;">站位料号</u-th>
					<u-th style="width: 175rpx;">置件数</u-th>
					<u-th style="width: 175rpx;">单位量</u-th>
					<u-th style="width: 175rpx;">PCB</u-th>
				</u-tr>
				<div :style="{
					height: scrollHeight + 'px'
				}">
					<u-tr :class="{
						redx: !item.PCB_COUNT
					}" style="width: 1700rpx;" v-for="(item, index) in tableData" :key="index">
						<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.LINE_NAME || '' }}</u-td>
						<u-td style="width: 250rpx;overflow: hidden;line-height: 21px;">{{ item.SMT_NAME || '' }}</u-td>
						<u-td style="width: 250rpx;overflow: hidden;line-height: 21px;">{{ item.REEL_ID || '' }}</u-td>
						<u-td style="width: 200rpx;overflow: hidden;line-height: 21px;">{{ item.SLOT || '' }}</u-td>
						<u-td style="width: 300rpx;overflow: hidden;line-height: 21px;">{{ item.PART_NO || '' }}</u-td>
						<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.ONHAND_QTY || '' }}</u-td>
						<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.UNIT_QTY || '' }}</u-td>
						<u-td style="width: 175rpx;overflow: hidden;line-height: 21px;">{{ item.PCB_COUNT || '' }}</u-td>
					</u-tr>
				</div>
			</u-table>
			
			<!-- 数据表头 -->
			<view class="grace-stable-title grace-space-between">
				<scroll-view class="grace-scroll-table grace-scroll-x grace-stable-r" :scroll-left="scrollLeft" scroll-x>
					<text class="grace-stable-td grace-bold">线别名称</text>
					<text class="grace-stable-td grace-bold">机号名称</text>
					<text class="grace-stable-td grace-bold">料卷</text>
					<text class="grace-stable-td grace-bold">站位</text>
					<text class="grace-stable-td grace-bold">站位料号</text>
					<text class="grace-stable-td grace-bold">置件数</text>
					<text class="grace-stable-td grace-bold">单位量</text>
					<text class="grace-stable-td grace-bold">PCB板数</text>
				</scroll-view>
			</view>
			<!-- 数据主体 -->
			<view class="grace-view grace-grids" v-if="tableData.length == 0"><text class="grace-view-text">暂无数据</text></view>
			<view class="grace-stable-body grace-space-between" v-else>
				<scroll-view 
					class="grace-scroll-x grace-stable-r grace-stable-body-bj" 
					scroll-x
					:scroll-y="true"
					:style="{
						height: scrollHeight + 'px'
					}"
					@scroll="scroll"
				>
					<view class="grace-stable-body-row">
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.LINE_NAME | IsNull}}</text>
						</view>
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.SMT_NAME | IsNull}}</text>
						</view>
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.REEL_ID | IsNull}}</text>
						</view>
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.SLOT | IsNull}}</text>
						</view>
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.PART_NO | IsNull}}</text>
						</view>
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.ONHAND_QTY | IsNull}}</text>
						</view>
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.UNIT_QTY | IsNull}}</text>
						</view>
						<view class="grace-stable-body-cl">
							<text class="grace-stable-td" :class="{
							red: !item.PCB_COUNT ? 'red' : '' 
						}" v-for="(item, index) in tableData" :key="index">{{item.PCB_COUNT | IsNull}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</gracePage>
</template>

<script src="./lowWarning.js"></script>

<style scoped>
  /* 头部 */
	.main-tit {
		color: #ffffff;
	}
   /* 表单 */
	.grace-form {
		justify-content: space-between;
	}

	.grace-form-label {
		width: 168rpx;
		font-size: 32rpx;
		color: #444444;
	}
	.picker-view{
		text-align: left;
		font-size: 32rpx;
	}
   .grace-form-row{
		display: flex;
	}
	.grace-form-view {
		flex: 0.8;
	}

	.grace-form-item {
		padding: 10rpx 0;
	}

	.item-border {
	/* 	border-bottom-color: #e5e5e5;
		border-bottom-width: 1rpx;
		border-style: solid;
		border: 0; */
	}
	.grace-form-search {
		flex: 0.2;
		justify-content: center;
		align-items: center;
	}

	.grace-form-image {
		width: 50%;
		height: 30%;
	}
	/* 表格头 */
    .grace-scroll-table::-webkit-scrollbar{
	   width:0rpx;
	}
	.grace-stable-title {
		position: relative;
		margin-bottom: 0;
	}

	.grace-stable-body {
		padding-top: 0;
	}
	.grace-stable-body-cl{
		padding: 0rpx;
		margin: 0rpx;
		border-right: 0px!important;
	}
	.grace-stable-td{
		padding: 0rpx;
		margin: 0rpx;
		border-bottom: 0rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-overflow: ellipsis;
	}
	.grace-view{
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
	.grace-view-text{
		padding-top: 300rpx;
		font-size: 32rpx;
		color: #444444;
		text-align: center;
		background-color: #FFFFFF;
	}
	.grace-stable-r{
		width: 100% !important;
	}
	.grace-scroll-table {
		background-color: #CEDFEF !important;
	}
	.grace-stable-body-row{
		display: flex;
	}
	.grace-stable-body-bj{
      background-color: #008200;
	}
	.grace-select-menu-icon{font-family:"grace-iconfont"; margin-left:10rpx; font-size:22rpx;}
   .icon-allow-b:after{content:"\e603";}
	 
	 .red {
		 background-color: red!important;
		 border: 0px!important;
	 }
	 /* #ifdef APP-PLUS */
	 .tableInfor{
	 	   display: -webkit-box;
	 }
	 /* #endif */
</style>
<style>
	.redx {
		background-color: #ed4014!important;
	}
	
	.u-tr .u-td {
		color: #fff!important;
	}
	
	.u-tr {
		background-color: #19be6b;
	}
</style>
