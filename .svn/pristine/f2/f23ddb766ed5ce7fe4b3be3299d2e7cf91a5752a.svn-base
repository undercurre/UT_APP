<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">条码库存切分</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<text class="form-label align-right">原条码</text>
					<view class="form-value">
						<input ref="oldBarcode" :maxlength="-1" type="text" :focus="autoFocus" @confirm="handleConfirmReelCode" v-model="formData.reelCode" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">料号</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.PART_NO" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">DateCode</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.DATE_CODE" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">数量</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.STOCK_QTY" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">供应商</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.VENDOR_NAME" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">品名</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.PART_NAME" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">规格</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.PART_DESCRIPTION" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">批号</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.LOT_CODE" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">切分量</text>
					<view class="form-value">
						<input ref="oldBarcode" :maxlength="-1" type="number" :focus="focusNext" @confirm="handleCheckBoxSplitQty" v-model="formData.splitQty" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">包装量</text>
					<view class="form-value">
						<input ref="oldBarcode" type="number" :maxlength="-1" :focus="focusThree" @confirm="handleCheckCaseQty" v-model="formData.caseQty" class="form-input" placeholder="" ></input>
					</view>
					<view style="padding-left: 10px;height: 56rpx;display: flex;align-items: center;">
						<checkbox-group @change="checkboxChange">
							<checkbox :checked="isInnerBoxLabel" value="1">内箱标签</checkbox>
						</checkbox-group>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn " @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn warning" @tap="resetFormData(true)">
					<text class="tix">清除</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./BarcodeInventoryCut.js"></script>

<style lang="scss" scoped>
	@import '~@/styles/publics.scss';
	
	.form-label {
		width: 5em !important;
	}
	
	
</style>
