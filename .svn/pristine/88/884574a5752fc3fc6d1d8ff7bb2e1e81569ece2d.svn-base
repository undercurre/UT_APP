<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装盘点明细</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right">
							储位编码：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="Storage" placeholder=" " @confirm="getStorage" :focus="autoFocus">
						</view>
					</view>
					<!-- <view class="form-item">
						<view class="form-label align-right">
							储位名称：
						</view>
						<view class="form-value disabled">
							<picker disabled mode="selector" :range="StorageList" range-key="NAME" @change="handlePickeLine">
								<div class="picker-s">
									<input class="form-input" disabled type="text" :value="StorageList[StorageIndex] ? StorageList[StorageIndex].NAME : ''"
									 placeholder=" ">
									<text class="grace-select-menu-icon icon-allow-b"></text>
								</div>
							</picker>
						</view>
					</view> -->
					<view class="form-item">
						<view class="form-label align-right">
							工装编码：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="Form.TONGS_BODYMARK" placeholder=" " :focus="checkReelFlag"
							 @confirm="getFeida">
						</view>
					</view>
					<view class="form-item" style="overflow: auto;">
						<t-table :style="{
					height: msgContentHeight + 'px'
				}">
							<t-tr style="position: sticky;top: 0;overflow: scroll;background-color: #FFFFFF;">
								<t-th style="width: 200rpx;overflow: hidden;">工装编码</t-th>
								<t-th style="width: 300rpx;overflow: hidden;">工装名称</t-th>
								<t-th style="width: 100rpx;overflow: hidden;">储位</t-th>
								<t-th style="width: 100rpx;overflow: hidden;">状态</t-th>
							</t-tr>
							<t-tr v-for="item in list" :key="item.CODE">
								<t-td style="width: 200rpx;overflow: hidden;" :whiteSpace="false">{{ item.CODE||'-'  }}</t-td>
								<t-td style="width: 300rpx;overflow: hidden;" :whiteSpace="false">{{ item.TONGS_TYPE||'-' }}</t-td>
								<t-td style="width: 100rpx;overflow: hidden;" :whiteSpace="false">{{ item.STORE_NAME||'-' }}</t-td>
								<t-td style="width: 100rpx;overflow: hidden;" :whiteSpace="false">
									<text style="color: red;" v-if="item.KDETAIL_STATUS == '未盘点'">未盘点</text>
									<text style="color: rgb(3, 163, 89);" v-else>已盘点</text>
								</t-td>
							</t-tr>
							<t-tr v-if="list&&list.length<=0">
								<t-td class="tableNull">暂无数据</t-td>
							</t-tr>
						</t-table>
					</view>
					<uni-pagination class="pageInation" style="display: block;" show-icon="true" :total="totalCount" :current="Form.Page"
					 @change="changeReason" v-if="Form.CHECK_CODE">
					</uni-pagination>
					<uni-pagination class="pageInation" style="display: block;" show-icon="true" :total="insertTotalCount" @change="insertChangeReason"
					 :current="insertFormData.Page" v-else>
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
</template>ž

<script src="./details.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 6em !important;
	}

	.detail {
		background: #1890FF;
		color: #fff;
		border-radius: 8rpx;
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
</style>
