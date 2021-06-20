<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">设备点检列表</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="blocksearch" style="position: fixed;background-color: #fff;margin-left: -25rpx;width: 750rpx;box-sizing: border-box;padding: 0 25rpx;"
				 :style="{
					top: (44 + statusBarHeight) + 'px'
				}">
					<view class="search">
						<icon type="search" size="16" color="#009c50"></icon>
						<input type="text" placeholder="请输入设备编号" v-model="listQuery.Key">
					</view>
					<view class="search-btn" style="margin-left: 15rpx;" @tap="handleToSearch">搜索</view>
					<image @click="openScanCode" src="../../static/saoma.png" mode="" class="icon-filter-x" style="display: block;width: 60rpx;height: 60rpx;margin-left: 15rpx;"></image>
					<image v-if="!isfilter" src="../../static/icon/filter_1.png" @click="showFilter = true" class="icon-filter-x"></image>
					<image v-if="isfilter" src="../../static/icon/filter_3.png" @click="showFilter = true" class="icon-filter-x"></image>
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
					<view class="item-block" v-for="item in LoadData" :key="item.ID" @tap="handleToDetails(item)">
						<view class="item-info">
							<view class="info-left">
								设备名称:
							</view>
							<view class="info-right" style="color: #009c50;">
								{{ item.EQUIP_Name || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								设备编号:
							</view>
							<view class="info-right" style="color: #009c50;">
								{{ item.PRODUCT_NO || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								设备分类:
							</view>
							<view class="info-right">
								{{ item.CATEGORY_Name || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								保养类型:
							</view>
							<view class="info-right" style="color: #009c50;">
								{{ getKeepType(item.KEEP_TYPE) }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								线别:
							</view>
							<view class="info-right">
								{{ item.Line_Name || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								点检编号:
							</view>
							<view class="info-right">
								{{ item.KEEP_CODE || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								点检时间:
							</view>
							<view class="info-right">
								{{ item.KEEP_TIME || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								点检人:
							</view>
							<view class="info-right">
								{{ item.KEEP_USER || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								审核状态:
							</view>
							<view class="info-right" :style="{
								color: getKeepCheckStatusColor(item.KEEP_CHECK_STATUS)
							}">
								{{ getKeepCheckStatus(item.KEEP_CHECK_STATUS) }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								审核人:
							</view>
							<view class="info-right">
								{{ item.KEEP_CHECKER || '' }}
							</view>
						</view>
						<view class="item-info">
							<view class="info-left">
								审核时间:
							</view>
							<view class="info-right">
								{{ item.KEEP_CHECK_TIME || '' }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</gracePage>
		<view class="modal" @click="showFilter = false" v-if="showFilter">
			<view class="modal-content" @click.stop="() => false">
				<view :style="{
					height: (44 + statusBarHeight) + 'px'
				}" style="background: #409EFF;color: #fff;font-size: 38rpx;line-height-step: 1;display: flex;align-items: center;padding: 0 25rpx;"></view>
				<div style="display: flex;justify-content: flex-end;box-sizing: border-box;padding: 10rpx 25rpx 0;">
					<icon @click="showFilter = false" type="cancel" size="26" />
				</div>

				<view class="modal-item">
					<view class="modal-tit">
						线体:
					</view>
					<view class="model-value">
						<picker style="width: 100%;" mode="selector" :range="LinesList" @change="handlePickLine" range-key="LINE_NAME">
							<view style="text-align: left;font-size: 14px;width: 100%;" :style=" { color: LinesList[LinesIndex] ? '#333' :
							 'rgb(138, 138, 138)' }">{{LinesList[LinesIndex] ? LinesList[LinesIndex].LINE_NAME : '请选择线体'}}</view>
						</picker>
					</view>
				</view>
				<view class="modal-item">
					<view class="modal-tit">
						保养类型:
					</view>
					<view class="model-value">
						<picker style="width: 100%;" mode="selector" :range="keepTypeList" @change="handlePickKeepType" range-key="label">
							<view style="text-align: left;font-size: 14px;width: 100%" :style="{
								color: keepTypeList[keepTypeIndex] ? '#333' : 'rgb(138, 138, 138)' 
							}">{{keepTypeList[keepTypeIndex] ? keepTypeList[keepTypeIndex].label : '请选择保养状态'}}</view>
						</picker>
					</view>
				</view>
				<view class="modal-item">
					<view class="modal-tit">
						创建日期（开始）:
					</view>
					<view class="model-value">
						<picker style="width: 100%;" mode="date" @change="handlePickCreateBegin">
							<view style="text-align: left;font-size: 14px;width:100%" :style="{
								color: listQuery.create_begin ? '#333' : 'rgb(138, 138, 138)' 
							}">{{listQuery.create_begin ? listQuery.create_begin : '请选择创建日期（开始）'}}</view>
						</picker>
					</view>
				</view>
				<view class="modal-item">
					<view class="modal-tit">
						创建日期（结束）:
					</view>
					<view class="model-value">
						<picker style="width: 100%;" mode="date" @change="handlePickCreateEnd">
							<view style="text-align: left;font-size: 14px; width:100%" :style="{
								color: listQuery.create_end ? '#333' : 'rgb(138, 138, 138)' 
							}">{{listQuery.create_end ? listQuery.create_end : '请选择创建日期（结束）'}}</view>
						</picker>
					</view>
				</view>
				<view class="modal-btn">
					<view class="modal-btn-item" style="color: #fff;background-color: #fa810f;border: none;" @tap="resetListQuery">重置</view>
					<view class="modal-btn-item" style="color: #fff;background: #009c50;border: none;" @tap="handleToSearch">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script src="./SfcsEquipKeepList.js"></script>

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
		flex-direction: column;
		align-items: flex-start;
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

	.search {
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		border: 1px solid #009c50;
		padding: 0 20rpx;
		height: 60rpx;
		box-sizing: border-box;
		flex: 1;
	}

	.search input {
		font-size: 14px;
		color: #333;
		line-height: 1;
		flex: 1;
		margin-left: 10rpx;
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
		font-size: 14px;
		color: #666;
		line-height: 34px;
		width: 200rpx;
	}

	.info-right {
		flex: 1;
		padding-left: 10rpx;
		font-size: 14px;
		color: #333;
		line-height: 34px;
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
</style>
