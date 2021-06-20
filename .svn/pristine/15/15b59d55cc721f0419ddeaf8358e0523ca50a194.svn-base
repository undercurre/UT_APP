<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">条码复制</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						物料条码
					</view>
					<view class="form-value">
						<input :maxlength="-1" class="form-input" type="text" v-model="formData.barCode" placeholder=" " :focus="autoFocus" @confirm="handleCheckBarCode">
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">数量</text>
					<view class="form-value" :class="{
						disabled: isDisabled
					}">
						<input ref="oldBarcode" :disabled="isDisabled" :focus="focusQty" :maxlength="-1" type="text" v-model="netData.Qty" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">供应商</text>
					<view class="form-value disabled" v-if="isDisabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.VendorCode" class="form-input" placeholder="" ></input>
					</view>
					<view class="form-value" v-if="!isDisabled">
						<picker mode="selector" :range="Vendor" range-key="text" @change="handleChooseVendor">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :style="{
								color: Vendor[VendorIndex] ? '#333' : 'rgb(158, 158, 158)'
						}"
								 :value="Vendor[VendorIndex] ? Vendor[VendorIndex].value : '' " placeholder=" ">
								</input>
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">料号</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.PartNo" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">条码</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.ReelCode" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">批次</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.LotCode" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">生产日期</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.DateCode" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">备注</text>
					<view class="form-value disabled">
						<input ref="oldBarcode" disabled :maxlength="-1" type="text" v-model="netData.Remark" class="form-input" placeholder="" ></input>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">条码数</text>
					<view class="form-value">
						<input ref="oldBarcode" type="number" :maxlength="-1" :focus="focusNext" @confirm="handleCheckFrameQty" v-model="formData.frame_qty" class="form-input" placeholder="" ></input>
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
				<view class="toolbar-btn warning" @tap="resetFormData(true)">
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn success" @tap="toPrint">
					<text class="tix">打印</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./BarcodeCopy.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 5em!important;
	}
</style>
