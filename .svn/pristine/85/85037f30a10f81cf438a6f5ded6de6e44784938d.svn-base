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
		<div slot="gBody">
			<div class="list-x" :style="{
				paddingBottom: !(formData.ID && formData.ID !== '0') ? '100rpx' : ''
			}">
				<div class="list-item" v-for="(item, index) in list" :key="item.ID">
					<view class="view-tit">
						<text>事项 - {{ index + 1 }}</text>
					</view>
					<view class="form-content">
						<view class="form-item">
							<view class="form-label align-right">
								保养内容事项
							</view>
							<view class="form-value" style="background: #FFF7CC;">
								<div class="form-textarea">{{list[index].KEEP_CONTENT || ' '}}</div>
							</view>
						</view>
						<view class="form-item">
							<view class="form-label align-right">
								保养工具辅料
							</view>
							<view class="form-value" style="background: #FFF7CC;">
								<div class="form-textarea">{{list[index].KEEP_TOOLS || ' '}}</div>
							</view>
						</view>
						<view class="form-item">
							<view class="form-label align-right">
								点检结果
							</view>
							<view class="form-value no-border">
								<radio-group @change="radioChange($event, index)" style="display: flex;align-items: center;margin-left: 10rpx;">
									<label style="display: flex;align-items: center;">
										<view>
											<radio :disabled="formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0'" :value="'1'" :checked="list[index].STATUS === '1'" />
										</view>
										<view style="font-size: 16px;color: #333;margin-left: 20rpx;">合格</view>
									</label>
									<label style="display: flex;align-items: center;margin-left: 20rpx;">
										<view>
											<radio :disabled="formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0'" :value="'0'" :checked="list[index].STATUS === '0'" />
										</view>
										<view style="font-size: 16px;color: #333;margin-left: 20rpx;">不合格</view>
									</label>
								</radio-group>
							</view>
						</view>
						<view class="form-item">
							<view class="form-label align-right">
								查看
							</view>
							<view class="form-value no-border">
								<view class="success x-button" @click="handleLookImages(item)">作业图</view>
							</view>
						</view>
						<view class="form-item">
							<view class="form-label align-right">
								描述
							</view>
							<view class="form-value" :class="{
								disabled: formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0'
							}">
								<input :disabled="formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0'" ref="MESSAGE" class="form-input" type="text" v-model="list[index].MESSAGE" placeholder="请输入描述">
							</view>
						</view>
						<view class="form-item">
							<view class="form-label align-right">
								审核备注
							</view>
							<view class="form-value" :class="{
								disabled: !(formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0')
							}">
								<input :disabled="!(formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0')" ref="MESSAGE" class="form-input" type="text" v-model="list[index].AUDITREMARKS" placeholder="请输入审核备注">
							</view>
						</view>
					</view>
				</div>
			</div>
			<div style="position: fixed;bottom: 130rpx;left: 0;width: 100%;padding: 0 10rpx;background: #fff;border-top: 1px solid #1482fa;" v-if="!(formData.ID && formData.ID !== '0') || (formData.ID && formData.KEEP_CHECK_STATUS === 0)">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right" style="width: 5em!important;">
							设备状态
						</view>
						<view class="form-value">
							<picker mode="selector" :range="EquipStatusList" range-key="Text"
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
				</view>
			</div>
		</div>
		
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn success" @tap="saveData(false)" v-if="formData.KEEP_CHECK_STATUS === '' || formData.KEEP_CHECK_STATUS === '' || formData.KEEP_CHECK_STATUS === null || formData.KEEP_CHECK_STATUS === undefined">
					<text class="tix">保存</text>
				</view>
				<view class="toolbar-btn" @tap="goback" v-if="formData.KEEP_CHECK_STATUS === 4 || formData.KEEP_CHECK_STATUS === '4'">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">返回</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitFormCheck" v-if="formData.KEEP_CHECK_STATUS === 4 || formData.KEEP_CHECK_STATUS === '4' || formData.KEEP_CHECK_STATUS === null || formData.KEEP_CHECK_STATUS === undefined">
					<text class="tix">提交</text>
				</view>
				<view class="toolbar-btn danger" @tap="submitFormCheckNo" v-if="formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0'">
					<text class="tix">拒绝</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitFormCheckOk" v-if="formData.KEEP_CHECK_STATUS === 0 || formData.KEEP_CHECK_STATUS === '0'">
					<text class="tix">审核</text>
				</view>
			</div>

		</view>
	</gracePage>
</template>

<script src="./SfcsEquipKeepCheck.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em!important;
	}

	.x-button {
		font-size: 14px;
		color: #fff;
		width: 150rpx;
		border-radius: 8rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10rpx;
	}

	.list-x {
		margin-bottom: 140rpx;
	}
    .list-item{
		
	}
	.form-content {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	
	.form-label {
		width: 30% !important;
	}

	/* 调整宫格大小 */
	.grace-grids-items {
		width: 250rpx;
		background-color: #ffffff;
		height: 90rpx;
		margin: 0 25rpx;
		border-style: solid;
		border-width: 2rpx;
		border-color: #999999;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #333;
	}

	.grace-grids-items:active {
		background-color: #007aff;
		color: #ffffff;
	}

	.icon-x {
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
	}

	.tix {
		line-height: 36rpx;
		font-size: 34rpx;
	}

	.grace-grids-icon {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 50rpx;
		color: #6b7375;
	}

	.grace-grids-text {
		line-height: 30rpx;
		font-size: 20rpx;
		margin-top: 2px;
		color: #6b7375;
	}

	.grace-footer-active {
		color: #3688ff !important;
	}

	.grace-grids-items2 {
		padding: 6rpx 0;
		width: 120rpx;
	}

	.grace-grids-icon2 {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 40rpx;
		color: #6b7375;
	}

	.grace-grids-text2 {
		line-height: 28rpx;
		font-size: 20rpx;
		margin-top: 2px;
		color: #6b7375;
	}

	.myfoot {
		/* background-image: linear-gradient(to right, #b100ff, #00b3ff) !important; */
		background: #409EFF;
		height: 130rpx;
		justify-content: center;
		align-items: center;
	}

	.marginTop {
		margin-top: 100rpx;
	}

	.logo {
		width: 250rpx;
		height: 68rpx;
	}

	.grace-form-label {
		width: 168rpx;
		font-size: 36rpx;
		color: #444444;
	}

	.grace-form-input {
		text-align: left;
		font-size: 36rpx;
		color: #333;
	}

	.grace-form-item {
		padding: 10rpx 0;
	}

	.item-border {
		/* 	border-bottom-color: #e5e5e5;
	border-bottom-width: 1rpx;
	border-style: solid; */
		border-bottom: 1rpx solid #E5E5E5;
	}

	.grace-login-three-items {
		width: 88rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 60rpx;
		color: #3688ff;
		text-align: center;
		margin: 10rpx;
	}

	.main-tit {
		color: #ffffff;
	}

	.flex-right {
		width: 700rpx;
		height: 100rpx;
		flex-direction: row;
		text-align: right;
		justify-content: flex-end;
	}

	.grace-text {
		font-size: 34rpx;
		color: #555;
		text-align: right;
		margin-right: 25rpx;
	}

	.sys-no {
		font-size: 32rpx;
		color: #555;
	}

	.g-fb {
		flex-direction: row;
	}

	.grace-body {
		margin-bottom: 140rpx;
	}

	/* .grace-form {
		position: sticky;
		top: 0;
	} */
	.mysticky {
		margin-top: 30rpx;
		border-top-width: 2rpx;
		border-top-color: #e5e5e5;
		margin-bottom: 180rpx;
		border-bottom-color: #e5e5e5;
		border-bottom-width: 2rpx;
		border-left-width: 2rpx;
		border-right-width: 2rpx;
		border-left-color: #e5e5e5;
		border-right-color: #e5e5e5;
		/* min-height: 200rpx; */
		/* 	position: sticky;
		bottom: 0; */
	}

	.mylist {
		width: 696rpx;
		/* min-height: 200rpx; */
	}

	.x-list {
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		padding: 0 20rpx;
	}

	.x-text {
		font-size: 32rpx;
		color: #444444;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		lines: 1;
	}

	.view-tit {
		height: 70rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: rgb(76,210,249);
		position: relative;
		width: 750rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
	}

	.view-tit text {
		color: #1482fa;
		font-size: 15px;
		line-height: 1.5;
		font-weight: bold;
	}
</style>
