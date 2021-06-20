<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">下架</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<graceDialog title="切分条码" closeBtnColor="#1482fa" :show="checked" v-on:closeDialog="cancel">
				<view class="grace-space-between" slot="btns">
					<view class="grace-dialog-buttons" @tap="cancel">取消</view>
					<view class="grace-dialog-buttons" style="color:#1482fa;" @tap="confirm">确定</view>
				</view>
				<view class="form-content " slot="content" style="padding: 0 10px;box-sizing: border-box;">
					<view class="form-item">
						<view class="form-label align-right">
							料号
						</view>
						<view class="form-label">
							323
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							型号
						</view>
						<view class="form-label">
							332
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							总数
						</view>
						<view class="form-label">
							12
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							切分数量
						</view>
						<view class="form-value ">
							<input class="form-input" type="number" v-model.trim="FormSub.SUN" placeholder=" ">
						</view>
					</view>
				</view>
			</graceDialog>
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工单
					</view>
					<view class="form-value ">
						<input class="form-input" type="text" v-model.trim="form.WO_NO" placeholder=" " @focus="autoFocus = true;" :focus="autoFocus"
						 @blur="autoFocus = false;" @confirm="getLoadData(0)">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						物料条码
					</view>
					<view class="form-value ">
						<input class="form-input" type="text" v-model.trim="form.CODE" placeholder=" " @focus="autoFocusNaN = false;"
						 :focus="autoFocusNaN" @blur="autoFocusNaN = false;" @confirm="getLoadData(1)">
					</view>
					<view class="form-label align-right" style="display: flex;justify-content: flex-end;padding: 0;">
						<u-checkbox  v-model="checkedBox">切分</u-checkbox>
					</view>
				</view>

				<view class="form-item">
					<u-table style="position: relative;overflow: auto;" :style="{
					height: msgContentHeight + 'px'
				}">
						<u-tr class="u-tr" style="position: sticky;top: 0;">
							<u-th class="u-tr" style="width: 350rpx">料号</u-th>
							<u-th class="u-tr"style="width: 400rpx">条码</u-th>
							<u-th class="u-tr" style="width: 200rpx">储位</u-th>
							<u-th class="u-tr" style="width: 150rpx">数量</u-th>
							<!-- <u-th class="u-tr" style="width: 18%;flex: 0 0 18%;">点检数量</u-th> -->
							<!-- <u-th class="u-tr" style="width: 14%;flex: 0 0 14%;">条码</u-th> -->
						</u-tr>
						 <u-tr class="u-tr"  v-for="(item, index) in list" :key="index">
							<u-td class="u-tr" style="width: 350rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{ item.PART_CODE }}</u-td>
							<u-td class="u-tr" style="width: 400rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{ item.REEL_CODE }}</u-td>
							<u-td class="u-tr" style="width: 200rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{ item.STORAGE }}</u-td>
							<u-td class="u-tr" style="width: 150rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 21px;">{{ item.QTY }}</u-td>
							<!-- <u-td class="u-tr" style="width: 18%;flex: 0 0 18%;overflow: hidden;line-height: 21px;"  :style="{color: item.FEEDER_TYPE_TOTAL == 40 ? '#179415' : '#EF5757'}">{{ item.CHECK_QTY||0 }}</u-td> -->
							<!-- <u-td class="u-tr" style="width: 14%;flex: 0 0 14%;overflow: hidden;line-height: 21px;"><text class="detail" @tap="detailClick(item)">明细</text></u-td> -->
						</u-tr>
					</u-table>
				</view>
					<uni-pagination  class="pageInation" style="display: block;" show-icon="true" :total="totalCount" @change="changeReason3"
					 :current="form.Page">
					</uni-pagination>
				
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">提交</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./index.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}

	.form-txt {
		font-size: 32rpx;
		border: none !important;
		line-height: 60rpx;
	}
</style>
