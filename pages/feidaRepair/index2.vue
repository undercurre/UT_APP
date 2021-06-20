<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">飞达报修</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<div id="myForm">
					<view class="form-item">
						<view class="form-label align-right">
							飞达
						</view>
						<view class="form-value">
							<input class="form-input" type="text" :focus="autoFocus" v-model="formData.feederNo" placeholder=" " @confirm="handleCheckFeeder">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							不良原因
						</view>
						<view class="form-value">
							<picker mode="selector" :range="defectCodeList" range-key="DESCRIPTION" @change="handleChangeDefectCode">
								<div class="picker-s">
									<input class="form-input" disabled type="text" :style="{
										color: defectCodeList[defectCodeIndex] ? '#333' : 'rgb(158, 158, 158)'
									}" :value="defectCodeList[defectCodeIndex] ? defectCodeList[defectCodeIndex].DESCRIPTION : '请选择不良原因'" placeholder=" ">
									<text class="grace-select-menu-icon icon-allow-b"></text>
								</div>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							飞达位置
						</view>
						<view class="form-value no-border">
						</view>
					</view>
				</div>
				<view class="grace-form mysticky">
					<scroll-view :scroll-y="true" :scroll-x="true" :style="{
							height: scrollHeight + 'px'
						}">
						<view class="mycell" v-for="(item, index) in locationList" :key="index">
							<view class="x-list">
								<radio-group style="width: auto;" @change="radioChange">
									<radio class="x-checkbox" :value="item.ID.toString()" :checked="formData.smtLineId === item.ID"></radio>
								</radio-group>
								<text class="x-text" style="white-space: nowrap;">{{ item.PLANT + item.LOCATION + item.LINE_NAME }}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">取消</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view>
			</div>

		</view>
	</gracePage>
</template>

<script src="./feidaRepair2.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}

	.mylist {
		width: 696rpx;
		/* min-height: 200rpx; */
	}

	.x-list {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		padding: 0 20rpx;
		border-bottom: 1rpx dashed #E5E5E5;
	}

	.x-text {
		font-size: 32rpx;
		color: #444444;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		lines: 1;
	}

	.grace-select-menu-icon {
		font-family: "grace-iconfont";
		margin-left: 10rpx;
		font-size: 22rpx;
	}

	.icon-allow-b:after {
		content: "\e603";
	}
	
	.mysticky {
		border: 1px solid #E5E5E5;
	}
</style>
