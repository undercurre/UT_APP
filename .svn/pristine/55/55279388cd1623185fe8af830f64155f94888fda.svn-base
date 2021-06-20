<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">设备点检</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						设备编码
					</view>
					<view class="form-value">
						<input :disabled="formData.ID && formData.ID !== '0'" class="form-input" type="text" v-model="formData.PRODUCT_NO" :focus="autoFocus" @confirm="handlePRODUCT_NO"
						 placeholder=" ">
					</view>
					<image src="../../static/saoma.png" disabled="formData.ID && formData.ID !== '0'" @click="openScanCode" mode="" class="icon-s"></image>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						设备名称
					</view>
					<view class="form-value disabled">
						<div class="picker-s">
							<input class="form-input" disabled type="text" :value="EquipmentList[EquipmentIndex] ? EquipmentList[EquipmentIndex].NAME : ' '"
							 placeholder=" ">
						</div>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-label align-right">
						设备类型
					</view>
					<view class="form-value" :class="{
						disabled: formData.ID
					}">
						<picker :disabled="true" mode="selector" :range="CategoryTypeList" range-key="CHINESE"
						 @change="handlePickCategoryType">
							<div class="picker-s">
								<input :style="{
									color: CategoryTypeList[CategoryTypeIndex] ? '' : '#999'
								}" class="form-input"
								 disabled type="text" :value="CategoryTypeList[CategoryTypeIndex] ? CategoryTypeList[CategoryTypeIndex].CHINESE : '请选择设备类型'"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-label align-right">
						线体描述
					</view>
					<view class="form-value disabled">
						<div class="picker-s">
							<input class="form-input" disabled type="text" :value="LinesList[LinesIndex] ? LinesList[LinesIndex].LINE_NAME : ' '"
							 placeholder=" ">
						</div>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-label align-right">
						保养类型
					</view>
					<view class="form-value" :class="{
						disabled: formData.ID && formData.ID !== '0'
					}">
						<picker :disabled="formData.ID && formData.ID !== '0'" mode="selector" :range="KeepTypeList" range-key="label"
						 @change="handlePickKeepType">
							<div class="picker-s">
								<input :style="{
									color: KeepTypeList[KeepTypeIndex] ? '' : '#999'
								}" class="form-input"
								 disabled type="text" :value="KeepTypeList[KeepTypeIndex] ? KeepTypeList[KeepTypeIndex].label : '请选择保养类型'"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item" v-if="formData.ID && formData.ID !== '0'">
					<view class="form-label align-right">
						设备状态
					</view>
					<view class="form-value" :class="{
						disabled: formData.ID && formData.ID !== '0'
					}">
						<picker :disabled="formData.ID && formData.ID !== '0'" mode="selector" :range="EquipStatusList" range-key="Text"
						 @change="handlePickEquipStatus">
							<div class="picker-s">
								<input :style="{
									color: EquipStatusList[EquipStatusIndex] ? '' : '#999'
								}" class="form-input"
								 disabled type="text" :value="EquipStatusList[EquipStatusIndex] ? EquipStatusList[EquipStatusIndex].Text : '请选择设备状态'"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item" v-if="formData.ID && formData.ID !== '0'">
					<view class="form-label align-right">
						点检编号
					</view>
					<view class="form-value disabled">
						<div class="picker-s">
							<input class="form-input" disabled type="text" :value="formData.KEEP_CODE"
							 placeholder=" ">
						</div>
					</view>
				</view>
				<view class="form-item" v-if="formData.ID && formData.ID !== '0'">
					<view class="form-label align-right">
						点检状态
					</view>
					<view class="form-value disabled">
						<div class="picker-s">
							<input class="form-input" :style="{
								color: getKeepCheckStatusColor(formData.KEEP_CHECK_STATUS)
							}" disabled type="text" :value="getKeepCheckStatus(formData.KEEP_CHECK_STATUS)"
							 placeholder=" ">
						</div>
					</view>
				</view>
				<view class="form-item" v-if="formData.ID && formData.ID !== '0'">
					<view class="form-label align-right">
						点检时间
					</view>
					<view class="form-value disabled">
						<div class="picker-s">
							<input class="form-input" disabled type="text" :value="formData.KEEP_TIME" placeholder=" ">
						</div>
					</view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)" v-if="!formData.ID || formData.ID === '0'">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn" @tap="goback" v-if="formData.ID && formData.ID !== '0'">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">{{ formData.ID && formData.ID !== '0' ? '查看点检' : '开始点检' }}</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./SfcsEquipKeep.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em!important;
	}
</style>
