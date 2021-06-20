<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">修改料卷数量</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						料盘
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="formData.reelID" placeholder=" " :focus="autoFocus" @confirm="handleCheckReel">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" disabled v-model="netData.PART_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						原数量
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" disabled v-model="netData.Quantity" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						新数量
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.qty" placeholder=" " :focus="checkReelFLag" @blur="handleCheckQty">
					</view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">退出</text>
				</view>
				<view class="toolbar-btn warning" @tap="resetFormData(true)">
					<text class="tix">清空</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">修改</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./modifyQuantity.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	
	.form-label {
		width: 4em !important;
	}
	
	.toolbar-btn {
		width: 32%!important;
	}
</style>
