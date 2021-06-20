<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">MSD管控作业</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content" style="padding-bottom: 0;">
				<view class="form-item">
					<view class="form-label align-right">
						物料条码
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="formData.ReelCode" :focus="autoFocus" placeholder=" " @confirm="handleCheckReelCode">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						操作位置
					</view>
					<view class="form-value">
						<picker mode="selector" :range="MSDLOCAL" range-key="DESCRIPTION" @change="handlerChangeLocal" v-model="localIndex">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="MSDLOCAL[localIndex] ? MSDLOCAL[localIndex].DESCRIPTION : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						操作动作
					</view>
					<view class="form-value" :class="{
						disabled: !checkOk
					}">
						<picker :disabled="!checkOk" mode="selector" :range="handleFilterOperating()" range-key="MSG_CN_DESC" @change="handlerChangeAction"
						 v-model="actionIndex">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="MSDAction[actionIndex] ? MSDAction[actionIndex].MSG_CN_DESC : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<div class="block-choose">
					<u-table v-if="actionList.length">
						<u-tr>
							<u-th>选择</u-th>
							<u-th>温度</u-th>
							<u-th>湿度</u-th>
							<u-th>时间</u-th>
						</u-tr>
						<u-tr v-for="item in actionList" :key="ID">
							<u-td><radio :value="item.ID" :checked="formData.MSDBakeRuleID === item.ID" @click="formData.MSDBakeRuleID = item.ID" style="transform:scale(0.8)" /></u-td>
							<u-td>{{ item.BAKE_TEMPERATURE }}</u-td>
							<u-td>{{ item.BAKE_HUMIDITY }}</u-td>
							<u-td>{{ item.BAKE_TIME }}</u-td>
						</u-tr>
					</u-table>
				</div>
				<!-- <view class="form-item">
					<view class="form-label align-right" style="color: #fff;">
						xxx
					</view>
					<view class="form-value no-border" style="justify-content: flex-end;align-items: center;display: flex;">
						<div class="checkBlock">
							<checkbox value="1" :checked="false"></checkbox>
							<text class="checkedValue">锁定</text>
						</div>
					</view>
				</view> -->
			</view>
			<div class="toolbar-bottom" style="width: 750rpx;margin-left: -25rpx;position: relative;border-bottom: 1px solid #1482fa;;">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">取消</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm">
						<text class="tix">确定</text>
					</view>
				</div>
			</div>
			<div class="status-bar">当前状态</div>
			<div class="form-content" style="padding: 0;">
				<view class="form-item">
					<view class="form-label align-right">
						元件料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="netData[1].ReelPartNO" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						MSD等级
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="netData[1].PartLevelCode" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						元件厚度
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="netData[1].PartThickness" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						当前操作
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="getActionHandler" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						当前区域
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="getAreaHandler" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						开始时间
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="netData[1].BeginTime || ''" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						管控时间
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="netData[1].RatedControlTime || ''" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						暴露时间
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="netData[1].TotalOpenTimeAfterBake || ''" disabled placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						剩余时间
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" :value="netData[1].RatedControlTime - netData[1].TotalOpenTimeAfterBake"
						 disabled placeholder=" ">
					</view>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./MSDControlOperations.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}

	.block-choose {
		min-height: 200rpx;
		margin: 20rpx 0;
		width: 100%;
		border: 1px solid #E5E5E5;
		background: #FFF7CC;
		box-sizing: border-box;
		padding: 10rpx;
	}

	.checkedValue {
		font-size: 16px;
		color: #fff;
		line-height: 1;
		margin-left: 10rpx;
	}

	.checkBlock {
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		width: 250rpx;
		box-sizing: border-box;
		background: #f14000;
	}

	.status-bar {
		position: relative;
		height: 70rpx;
		font-size: 16px;
		color: #fff;
		background: #009c50;
		display: flex;
		padding: 0 25rpx;
		margin-left: -25rpx;
		width: 750rpx;
		box-sizing: border-box;
		align-items: center;
		line-height: 1;
		margin-top: 20rpx;
	}
</style>
