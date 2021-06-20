<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">维修设备</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						维修结果
					</view>
					<view class="form-value">
						<picker mode="selector" :range="EquipStatusList" range-key="Text" @change="changeEquipStatus">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :style="{
								color: EquipStatusList[EquipStatusListIndex] ? '#333' : 'rgb(158, 158, 158)'
						}"
								 :value="EquipStatusList[EquipStatusListIndex] ? EquipStatusList[EquipStatusListIndex].Text : '' " placeholder=" ">
								</input>
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						维修内容
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="formData.REPAIR_CONTENT" placeholder=" " :focus="REPAIR_CONTENT">
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;padding: 0 0 10px 0;">
					<view style="font-size: 14px;color: #666;">
						维修配件
					</view>
					<u-button size="default" type="success" style="height: 32px;line-height: 32px;margin: 0" @click="handleAdd">新增</u-button>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						配件名称
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="DetailForm.COMPONENT_NAME" placeholder=" " :focus="COMPONENT_NAME">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						配件规格
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="DetailForm.COMPONENT_MODEL" placeholder=" " :focus="COMPONENT_MODEL">
					</view>
				</view>
				<u-table style="overflow-x: auto;" :style="{
					height: tableHeight + 'px'
				}">
					<u-tr style="width: 800rpx">
						<u-th style="width: 400rpx;flex: 2;">配件名称</u-th>
						<u-th style="width: 400rpx;flex: 2">配件规格</u-th>
						<u-th style="width: 200rpx;flex: 1">操作</u-th>
					</u-tr>
					<u-tr style="width: 800rpx" v-for="(item, index) in DetailList" :key="index">
						<u-td style="width: 400rpx;flex: 2;">{{ item.COMPONENT_NAME }}</u-td>
						<u-td style="width: 400rpx;flex: 2">{{ item.COMPONENT_MODEL }}</u-td>
						<u-td style="width: 200rpx;flex: 1"><u-button type="error" size="mini" @click="hanldeDelete(index)">删除</u-button></u-td>
					</u-tr>
				</u-table>
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn warning" @tap="resetForm">
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="handleSubmitForm">
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./SfcsEquipRepairHeadDo.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em!important;
	}
	
	.activex {
		background-color: rgba(238, 245, 254, 1)!important;
	}
</style>
