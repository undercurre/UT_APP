<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">上架</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						储位
					</view>
					<view class="form-value ">
						<input class="form-input" type="text" v-model.trim="form.STORAGE" placeholder=" "  @focus="autoFocus = true;"
							 :focus="autoFocus" @blur="autoFocus = false;">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						物料条码
					</view>
					<view class="form-value ">
						<input class="form-input" type="text" v-model.trim="form.CODE" placeholder=" " @focus="autoFocusNaN = false;"
							 :focus="autoFocusNaN" @blur="autoFocusNaN = false;"  @confirm="getLoadData">
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
						</u-tr> 
					</u-table>
				</view>
				<uni-pagination class="pageInation" style="display: block;" show-icon="true" :total="totalCount" @change="changeReason3"
				 :current="form.Page">
				</uni-pagination>
				<!-- <view class="form-item">
					<view class="form-label align-right">
						料号
					</view>
					<view class="form-value">
						<picker mode="selector" :range="NameList" range-key="CHINESE" @change="handlePickeLine">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="NameList[NameIndex] ? NameList[NameIndex].CHINESE : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view> -->
				<!-- <view class="form-item">
					<view class="form-label align-right">
						状态
					</view>
					<view class="form-value disabled">
						<picker mode="selector" disabled :range="STATUSList" range-key="CODE" @change="handleSTATUS">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="STATUSList[STATUSIndex] ? STATUSList[STATUSIndex].CODE : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view> -->
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
