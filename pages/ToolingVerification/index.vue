<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装检验计划</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="blocksearch" style="position: fixed;background-color: #fff;margin-left: -25rpx;width: 750rpx;box-sizing: border-box;padding: 0 25rpx;"
				 :style="{
					top: (50 + statusBarHeight) + 'px'
				}">
				<view class="modal-item">
					<picker style="width: 50%;" mode="date" @change="handlePickCreateBegin">
						<view style="text-align: left;font-size: 14px;width:100%" :style="{
							color: listQuery.START_TIME ? '#333' : 'rgb(138, 138, 138)' 
						}">{{listQuery.START_TIME ? listQuery.START_TIME : '开始时间'}}</view>
					</picker>
					<picker style="width: 50%;" mode="date" @change="handlePickCreateEnd">
						<view style="text-align: left;font-size: 14px; width:100%" :style="{
							color: listQuery.END_TIME ? '#333' : 'rgb(138, 138, 138)' 
						}">{{listQuery.END_TIME ? listQuery.END_TIME : '结束时间'}}</view>
					</picker>
					<icon type="clear" size="12" @tap="resetListQuery" v-if="isfilter"></icon>
				</view>
					<view class="search-btn" style="margin-left: 15rpx;" @tap="handleToSearch">搜索</view>
					<view class="search-btn" style="margin-left: 15rpx;background: #7AC756;" @tap="detailedClick">新增</view>
					<view class="search-btn" style="margin-left: 15rpx;background: rgb(255, 99, 43);" @tap="Review">审核</view>
				</view>
				<view class="view-status" style="position: fixed;background-color: #fff;box-shadow: 0 1px 10rpx #e5e5e5;" :style="{
					top: 'calc(44px + 100rpx + ' + statusBarHeight + 'px)'
				}">
					<view class="view-item" v-for="(item, index) in statusList" :key="index" :class="{active: checkStatusIndex === index}"
					 @tap="handleChangeStatus(index)">{{ item.SBU_CHINESE }}</view>
				</view>
				<view class="list-block" :style="{
					paddingTop: 'calc(44px + 100rpx + 30rpx + ' + statusBarHeight + 'px)'
				}">
					<view class="item-block" v-for="(item,index) in LoadData" :key="item.ID" @tap="handleToDetails(item,index)" :style="{border: index === ListIndex ? '2rpx solid #1890FF' : '2rpx solid transparent'}">
						<view class="item-info" style="border-bottom: 1px solid #E3E3E3;">
							<view class="info-Numbering">
								点检编号：{{item.CHECK_CODE}}
							</view>
							<view class="info-right info-status">
								<text v-if="item.CHECK_STATUS === 0">新增</text>
								<text v-if="item.CHECK_STATUS === 1">未审核</text>
								<text v-if="item.CHECK_STATUS === 2" style="color: #03A359">已审核</text>
							</view>
						</view>
						
						<view class="item-info">
							<view class="info-left">
								<view class="info-year">
									{{item.CHECK_YEAR}}年
								</view>
							</view>
							<view class="info-right info-inventory">
								{{item.CHECK_HEAD}}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								工装总数：
							</view>
							<view class="info-right">
								{{item.TONGS_QTY}}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								点检总数：
							</view>
							<view class="info-right">
								{{item.CHECK_QTY}}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left" style="color: #999999">
								点检人员：
							</view>
							<view class="info-right" style="color: #999999">
								{{item.CHECK_USER}}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left" style="color: #999999">
								点检时间：
							</view>
							<view class="info-right" style="color: #999999;display: flex;justify-content: space-between;">
								<view>
									{{item.CHECK_TIME}}
								</view>
								<view v-if="item.CHECK_STATUS !== 2" style="background: red;border: 1px solid red;" class="info-detailed" @tap="deleteClick(item)">
									删除
								</view>
								<view class="info-detailed" @tap="detailedClick(item)">
									详细
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</gracePage>
	</view>
</template>

<script src="./index.js"></script>

<style scoped>
	.modal-btn {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 25rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.modal-btn-item {
		font-size: 14px;
		line-height: 1;
		width: 47%;
		color: #1482fa;
		border: 1px solid #1482fa;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding: 15rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-item {
		padding: 0 25rpx;
		display: flex;
		align-items: center !important;
		align-items: flex-start;
		width: 65%;
		border: 2rpx solid #D9D9D9;
	    padding: 12rpx;
		border-radius: 8rpx;
	}

	.modal-tit {
		font-size: 14px;
		line-height: 36px;
		color: #666;
	}

	.model-value {
		border: 1px solid #1482fa;
		padding: 0 20rpx;
		height: 60rpx;
		border-radius: 8rpx;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 709;
	}

	.modal-content {
		position: absolute;
		right: 0;
		width: 90%;
		bottom: 0;
		top: 0;
		background: #fff;
		/* box-shadow: 0 0 20rpx #e5e5e5; */
	}

	/* 调整宫格大小 */
	.grace-grids-items {
		width: 250rpx;
		background-color: #ffffff;
		height: 90rpx;
		margin: 0 25rpx;
		border-style: solid;
		border-width: 2rpx;
		border-color: #999999;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #333;
	}

	.grace-grids-items:active {
		background-color: #007aff;
		color: #ffffff;
	}

	.icon-x {
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
	}

	.tix {
		line-height: 36rpx;
		font-size: 34rpx;
	}

	.grace-grids-icon {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 50rpx;
		color: #6b7375;
	}

	.grace-grids-text {
		line-height: 30rpx;
		font-size: 20rpx;
		margin-top: 2px;
		color: #6b7375;
	}

	.grace-footer-active {
		color: #3688ff !important;
	}

	.grace-grids-items2 {
		padding: 6rpx 0;
		width: 120rpx;
	}

	.grace-grids-icon2 {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 40rpx;
		color: #6b7375;
	}

	.grace-grids-text2 {
		line-height: 28rpx;
		font-size: 20rpx;
		margin-top: 2px;
		color: #6b7375;
	}

	.myfoot {
		/* background-image: linear-gradient(to right, #b100ff, #00b3ff) !important; */
		background: #409EFF;
		height: 130rpx;
		justify-content: center;
		align-items: center;
	}

	.marginTop {
		margin-top: 100rpx;
	}

	.logo {
		width: 250rpx;
		height: 68rpx;
	}

	.grace-form-label {
		width: 168rpx;
		font-size: 36rpx;
		color: #444444;
	}

	.grace-form-input {
		text-align: left;
		font-size: 36rpx;
		color: #333;
	}

	.grace-form-item {
		padding: 10rpx 0;
	}

	.item-border {
		/* 	border-bottom-color: #e5e5e5;
	border-bottom-width: 1rpx;
	border-style: solid; */
		border-bottom: 1rpx solid #E5E5E5;
	}

	.grace-login-three-items {
		width: 88rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 60rpx;
		color: #3688ff;
		text-align: center;
		margin: 10rpx;
	}

	.main-tit {
		color: #ffffff;
	}

	.flex-right {
		width: 700rpx;
		height: 100rpx;
		flex-direction: row;
		text-align: right;
		justify-content: flex-end;
	}

	.grace-text {
		font-size: 34rpx;
		color: #555;
		text-align: right;
		margin-right: 25rpx;
	}

	.sys-no {
		font-size: 32rpx;
		color: #555;
	}

	.g-fb {
		flex-direction: row;
	}

	.grace-body {
		margin-bottom: 140rpx;
	}

	/* .grace-form {
		position: sticky;
		top: 0;
	} */
	.mysticky {
		margin-top: 30rpx;
		border-top-width: 2rpx;
		border-top-color: #e5e5e5;
		margin-bottom: 180rpx;
		border-bottom-color: #e5e5e5;
		border-bottom-width: 2rpx;
		border-left-width: 2rpx;
		border-right-width: 2rpx;
		border-left-color: #e5e5e5;
		border-right-color: #e5e5e5;
		/* min-height: 200rpx; */
		/* 	position: sticky;
		bottom: 0; */
	}

	.mylist {
		width: 696rpx;
		/* min-height: 200rpx; */
	}

	.x-list {
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		padding: 0 20rpx;
	}

	.x-text {
		font-size: 32rpx;
		color: #444444;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		lines: 1;
	}

	.blocksearch {
		height: 100rpx;
		display: flex;
		align-items: center;
		/* border-bottom: 2rpx solid #e5e5e5; */
	}

	.search-btn {
		height: 60rpx;
		width: 120rpx;
		font-size: 14px;
		color: #fff;
		background: #009c50;
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
	}

	.icon-filter-x {
		display: block;
		width: 20px;
		height: 20px;
		margin-left: 30rpx;
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
	/* 盘点 */
	.info-Numbering{
		font-size: 28rpx;
		color: #999999;
	}
	/* 状态 */
	.info-status{
		font-size: 12px;
		color: rgb(255, 99, 43);
		text-align: right;
	}
	/* 年 */
	.info-year{
		font-size: 28rpx;
		color: #ffffff;
		text-align: center;
		background-color: #02AEFB;
		width: 120rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 12rpx 0px 12rpx 12rpx;
	}
    /* 盘点 */
	.info-inventory{
		color: #101010;
		font-size: 32rpx;
	}
	.info-detailed{
		border: 1px solid #01AEFB;
		border-radius: 40rpx;
		width: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #01AEFB;
		color: #FFFFFF
	}
	.view-status {
		height: 100rpx;
		position: relative;
		margin-left: -25rpx;
		width: 750rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.view-item {
		width: 20%;
		height: 100%;
		color: #666;
		font-size: 14px;
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
	.view-status{
	    justify-content: space-around;
	}
	.view-item.active {
	    background: #01AEFB;
	    color: #009c50;
	    color: #fff;
	    
	    border: none;
	}
	.view-item {
	    height: 55%;
		border-radius: 54rpx;
	    border: 2rpx solid #B3BFC3;
	}
	.view-item.active:after {
	    background: none;
	}
</style>
