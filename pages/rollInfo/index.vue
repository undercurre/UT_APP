<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">料卷信息</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						条码
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="formData.reelCode" placeholder=" " :focus="autoFocus" @confirm="handleCheckReel">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.PART_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						Lot No
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.LotCode" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						Vendor
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.VendorName" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						Date Code
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.DateCode" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						名称
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.PART_NAME" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						数量
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.Quantity" placeholder=" ">
					</view>
				</view>
				<!-- <view class="form-item">
					<view class="form-label align-right">
						库存数
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.CaseQty" placeholder=" ">
					</view>
				</view> -->
				<view class="form-item">
					<view class="form-label align-right">
						状态
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.STATUS_NAME" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						描述
					</view>
					<view class="form-value disabled">
						<view class="form-input" v-model="netData.PART_DESC" style="height: 240rpx;"></view>
						<!-- <input class="form-input" disabled type="text" v-model="netData.PART_DESC" placeholder=" "> -->
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
				<view class="toolbar-btn warning" @tap="resetForm(true)">
					<text class="tix">清除</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./rollInfo.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 6em !important;
	}
</style>
