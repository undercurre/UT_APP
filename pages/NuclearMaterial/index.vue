<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">核料</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right">
							工单：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="Form.WoNo" placeholder=" " @focus="autoFocus = true;"
							 :focus="autoFocus" @blur="autoFocus = false;" @confirm="getWoNo">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							物料：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="Form.REELCODE" placeholder=" " @focus="autoFocusNext = false;"
							 :focus="autoFocusNext" @blur="autoFocusNext = false;">
							<!-- @confirm="getFeida"<textarea class="form-input" style="height: 140rpx;" v-model="Form.CHECK_REMARKS" placeholder=" "></textarea> -->
						</view>
					</view>
					<view class="form-item">
						<u-table style="position: relative;overflow: auto;" :style="{
					height: msgContentHeight + 'px'
				}">
							<u-tr class="u-tr" style="position: sticky;top: 0;">
								<u-th class="u-tr" style="width: 300rpx">料号</u-th>
								<u-th class="u-tr" style="width: 300rpx">型号</u-th>
								<u-th class="u-tr" style="width: 200rpx">数量</u-th>
								<u-th class="u-tr" style="width: 300rpx">已核数量</u-th>
								<u-th class="u-tr" style="width: 200rpx">状态</u-th>
							</u-tr>
							<u-tr class="u-tr"  v-for="(item, index) in list" :key="index">
								<u-td class="u-tr" style="width: 300rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{item.PART_CODE||'暂无信息' }}</u-td>
								<u-td class="u-tr" style="width: 300rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{ item.PART_NAME||'暂无信息' }}</u-td>
								<u-td class="u-tr" style="width: 200rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{ item.QTY||'0' }}</u-td>
								<u-td class="u-tr" style="width: 300rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;" :style="{color: item.FEEDER_TYPE_TOTAL == 40 ? '#179415' : '#EF5757'}">{{ item.CHECK_QTY||'暂无信息' }}</u-td>
								<u-td class="u-tr" style="width: 200rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{ item.STATUS||'暂无信息' }}</u-td>
							</u-tr>
						</u-table>
					</view>
					<uni-pagination class="pageInation" style="width: 100%;display: block;" show-icon="true" :total="totalCount" @change="changeReason3"
					 :current="Form.Page">
					</uni-pagination>
				</view>
			</view>
			<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">关闭</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm">
						<text class="tix">提交</text>
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
</style>
