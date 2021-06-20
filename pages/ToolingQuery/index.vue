<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装查询</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right">
							工装编号：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="formlist.CODE" placeholder=" " @focus="autoFocus = true;"
							 :focus="autoFocus" @blur="autoFocus = false;" @confirm="getFeida">
						</view>
					</view>
					<view class="list-block" >
						<view class="item-block"  v-for="(item,index) in List" :key="index">
							<view class="item-info">
								<view class="info-left">
									<view class="info-year">
										工装编号：
									</view>
								</view>
								<view class="info-right info-inventory">
									{{item.CODE}}
								</view>
							</view>
							<view class="item-info">
								<view class="info-left">
									工装名称：
								</view>
								<view class="info-right">
									{{item.MES_TONGS_TYPE}}
								</view>
							</view>
							<view class="item-info">
								<view class="info-left">
									型号：
								</view>
								<view class="info-right">
									{{item.TONGS_MODEL}}
								</view>
							</view>
							<view class="item-info">
								<view class="info-left">
									资产类别：
								</view>
								<view class="info-right">
									<text v-if="item.ASSET_CLASSES == 0">固定资产</text>
									<text v-else>非固定资产</text>
								</view>
							</view>
							<view class="item-info">
								<view class="info-left">
									状态：
								</view>
								<view class="info-right">
									{{item.STATUS}}
								</view>
							</view>
							<view class="item-info">
								<view class="info-left">
									借用人：
								</view>
								<view class="info-right">
									{{item.PRINCIPAL}}
								</view>
							</view>
							
							<view class="item-info">
								<view class="info-left">
									储位：
								</view>
								<view class="info-right">
									{{item.STORE_NAME}}
								</view>
							</view>
							<view class="item-info">
								<view class="info-left" style="width: 200rpx;">
									验证确认时间：
								</view>
								<view class="info-right">
									<text v-if="item.INSPECTION_TIME !=='0001-01-01 00:00:00'">{{item.INSPECTION_TIME}}</text>
								</view>
							</view>
							<view class="item-info">
								<view class="info-left" style="width: 180rpx;">
									验证确认人：
								</view>
								<view class="info-right">
									{{item.INSPECTION_USER}}
									
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">关闭</text>
					</view>
					<view class="toolbar-btn warning" @tap="resetFormData(true)">
						<text class="tix">清除</text>
					</view>
				</div>
			</view>
		</gracePage>
	</view>
</template>

<script src="./index.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 6em !important;
	}
	.detail{
		background: #1890FF;
		color: #fff;
	    border-radius: 8rpx;
	}
	.item-block {
		box-shadow: 0 0 20rpx #E5E5E5;
		padding: 20rpx 20rpx;
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
