<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">生产退料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工单号
					</view>
					<view class="form-value">
						<input class="form-input"  type="text" v-model="form.MO" placeholder=" " :focus="autoFocusMO" @confirm="getLoadMoData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						物料条码
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.reelCode" placeholder=" " :focus="autoFocus" @confirm="getLoadScraperData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						退料数量
					</view>
					<view class="form-value">
						<input class="form-input" type="number" v-model="form.QUANTITY" placeholder=" " :focus="autoFocusNewLocation" @confirm="getLoadQuantityData">
					</view>
				</view>
				
				<view class="form-item">
					<u-table style="position: relative;height: 740rpx;overflow: auto;">
						<u-tr class="u-tr" style="display: -webkit-box;position: sticky;top: 0;width: 1200rpx;">
							<u-th class="u-tr" style="width: 250rpx;">单据号</u-th>
							<u-th class="u-tr" style="width: 150rpx;">项次</u-th>
							<u-th class="u-tr" style="width: 400rpx;">料号</u-th>
							<u-th class="u-tr" style="width: 150rpx;">地点</u-th>
							<u-th class="u-tr" style="width: 200rpx;">应发数量</u-th>
							<u-th class="u-tr" style="width: 200rpx;">实发数量</u-th>
							<u-th class="u-tr" style="width: 200rpx;">剩退数量</u-th>
						</u-tr>
						<u-tr class="u-tr" style="display: -webkit-box;width: 1200rpx;" v-for="(item, index) in list" :key="index">
							<u-td class="u-tr" style="width: 250rpx;overflow: hidden;line-height: 21px;">{{ item.DOCNO }}</u-td>
							<u-td class="u-tr" style="width: 150rpx;overflow: hidden;line-height: 21px;">{{ item.LineNo }}</u-td>
							<u-td class="u-tr" style="width: 400rpx;overflow: hidden;line-height: 21px;">{{ item.PART_CODE }}</u-td>
							<u-td class="u-tr" style="width: 150rpx;overflow: hidden;line-height: 21px;">{{ item.WH }}</u-td>
							<u-td class="u-tr" style="width: 200rpx;overflow: hidden;line-height: 21px;">{{ item.IssueQty||0 }}</u-td>
					     	<u-td class="u-tr" style="width: 200rpx;overflow: hidden;line-height: 21px;">{{ item.IssuedQty||0 }}</u-td>
							<u-td class="u-tr" style="width: 200rpx;overflow: hidden;line-height: 21px;">{{ item.BACKQTY||0 }}</u-td>
						</u-tr>
					</u-table>
				</view>
				<uni-pagination class="pageInation" style="width: 100%;display: block;" show-icon="true" :total="totalCount" @change="changeReason3"
				 :current="form.Page">
				</uni-pagination>
				
			<!-- 	<view class="form-item">
					<view class="form-label align-right">
						物料料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.PART_CODE" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						物料规格
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.PART_DESC" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						领料单号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.DOCNO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						项次
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.LineNo" placeholder=" ">
					</view>
				</view>

				
				<view class="form-item">
					<view class="form-label align-right">
						库别
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.WH" placeholder=" ">
					</view>
				</view>
				 -->
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
		width: 5em!important;	
	}
</style>
