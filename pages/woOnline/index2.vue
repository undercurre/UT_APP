<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工单上线</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						出库单号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" :maxlength="-1" v-model="wo_code" placeholder=" " :focus="autoFocus" @confirm="handleSearchWoCode">
					</view>
				</view>
				<view class="form-item" v-if="wo_code">
					<view class="form-label align-right">
						工单
					</view>
					<view class="form-value">
						<picker mode="selector" :range="woList" range-key="CODE" @change="handleChooseWo">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :style="{
								color: woList[woIndex] ? '#333' : 'rgb(158, 158, 158)'
						}"
								 :value="woList[woIndex] ? woList[woIndex].CODE : '' " placeholder=" ">
								</input>
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item" v-if="!wo_code">
					<view class="form-label align-right">
						工单
					</view>
					<view class="form-value">
						<input class="form-input" type="text" :maxlength="-1" v-model="wo_no" placeholder=" " :focus="autoFocus_2" @confirm="checkWorkInfo">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="workInfo.PART_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						名称
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="workInfo.MODEL" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						面板
					</view>
					<view class="form-value">
						<picker mode="selector" :range="MBlist" @change="pickerMB">
							<div class="picker-s">
								<input class="form-input" :style="{
									color: MBlist[MBlistIndex] ? '#333' : 'rgb(158, 158, 158)'
								}"
								 disabled type="text" :value="MBlist[MBlistIndex] ? MBlist[MBlistIndex] : ''" placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right" style="height: 60rpx;">
						拼板数
					</view>
					<view class="form-value no-border" style="height: 60rpx;display: flex;align-items: center;">
						<graceNumberBox style="margin-left: 10rpx;height: 100%;" inputPadding="0px"  @change="handleChange" btnFontSize="20px" btnSize="30rpx" inputColor="#444444" inputHeight="60rpx" inputFontSize="18px" width="100px" :value="pingBan_num"></graceNumberBox>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						机台
					</view>
					<view class="form-value no-border">
						
					</view>
				</view>
				<view class="grace-form mysticky">
					<scroll-view :scroll-x="true" class="mylist">
						<scroll-view :scroll-y="true" class="mylist">
							<view class="mycell" v-for="item in list" :key="item.ID">
								<view class="x-list">
									<checkbox-group style="width: auto;" @change="handleCheckBox(item.SMT_NAME)">
										<checkbox class="x-checkbox" :value="item.ID.toString()" :checked="checkedList.indexOf(item.SMT_NAME) !== -1"></checkbox>
									</checkbox-group>
				
									<text class="x-text">{{ item.SMT_NAME }}</text>
								</view>
							</view>
						</scroll-view>
					</scroll-view>
				</view>
				<view class="grace-form-item" style="margin-bottom: 150rpx">
					<text class="grace-form-label" style="width: 30rpx;"></text>
					<view class="g-fb" style="background-color: yellow;width: 300rpx;height: 60rpx;padding-left: 20rpx;display: flex;align-items: center;padding-top: 2rpx;padding-bottom: 2rpx;">
						<graceCheckBtn checkedColor="#3688ff" justifyContent="flex-start" :checked="isXujie" @change="checkIsXujie" :size="46"><text
							 class="grace-text">续接工单</text></graceCheckBtn>
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
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view>
			</div>

		</view>
	</gracePage>
</template>

<script src="./woOnline2.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
	
	.grace-form-item {
		padding: 10rpx 0;
	}
	
	.mysticky {
		// margin-top: 30rpx;
		border: 2rpx solid #e5e5e5;
		margin-bottom: 5rpx;
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
	}
	
	.x-text {
		font-size: 16px;
		color: #444444;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		lines: 1;
	}
	
	.grace-text {
		font-size: 16px;
		color: #555;
		text-align: right;
		margin-right: 25rpx;
	}

	
</style>
