<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">离线备料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="subsection-con">
					<u-subsection class="mycsub" :list="subsection" :current="subsectionIndex" @change="handleChangeSubsection"></u-subsection>
				</view>
				<view v-show="subsectionIndex === 0">
					<view class="form-item">
						<view class="form-label align-right">
							出库单号
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="wo_code" placeholder=" " :focus="autoFocus" @confirm="handleSearchWoCode">
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
							<input class="form-input" type="text" v-model="formData.WO_NO" placeholder=" " :focus="autoFocus_2" @confirm="handleScanWoNo">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							线体
						</view>
						<view class="form-value disabled"><input type="text" :value="lineList[currentLine].LINE_NAME || ''" class="form-input"
							 disabled placeholder="" /></view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							板面
						</view>
						<view class="form-value">
							<picker mode="selector" :range="MBlist" @change="handleChangePCB_Side">
								<div class="picker-s">
									<input class="form-input" disabled type="text" :value="MBlist[formData.PCB_Side] ? MBlist[formData.PCB_Side] : ''"
									 placeholder=" ">
									<text class="grace-select-menu-icon icon-allow-b"></text>
								</div>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							机台
						</view>
						<view class="form-value">
							<picker mode="selector" :range="stationList" @change="handleChangeStation" range-key="SMT_NAME">
								<div class="picker-s">
									<input class="form-input" :style="{
										color: stationList[stationIndex] ? '#333' : 'rgb(158, 158, 158)'
									}"
									 disabled type="text" :value="stationList[stationIndex] ? stationList[stationIndex].SMT_NAME : ' '" placeholder=" ">
									<text class="grace-select-menu-icon icon-allow-b"></text>
								</div>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							模组
						</view>
						<view class="form-value">
							<picker mode="selector" :range="StageList" @change="handleChangeStage">
								<div class="picker-s">
									<input class="form-input" disabled type="text" :value="StageList[formData.Stage] || StageList[formData.Stage] === 0 ? StageList[formData.Stage] : ''" placeholder=" ">
									<text class="grace-select-menu-icon icon-allow-b"></text>
								</div>
							</picker>
						</view>
					</view>
				</view>
				<view v-show="subsectionIndex === 1">
					<view class="form-item">
						<view class="form-label align-right">
							料槽
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="formData.SLOT" placeholder=" " :focus="checkSolt" @confirm="handleScanSlot">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							飞达
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="formData.FEED_ID" placeholder=" " :focus="checkFEED_ID" @confirm="handleCheckFeeder">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right" style="height: 60rpx;">
							位置
						</view>
						<view class="form-value no-border" style="height: 60rpx;display: flex;align-items: center;">
							<graceNumberBox style="margin-left: 10rpx;height: 100%;" inputPadding="0px" @change="handleChange" btnFontSize="20px"
							 btnSize="30rpx" inputColor="#444444" inputHeight="60rpx" inputFontSize="18px" width="100px" :value="formData.FEED_TYPE"></graceNumberBox>
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							料卷
						</view>
						<view class="form-value">
							<input class="form-input" :maxlength="-1" type="text" v-model="formData.REEL_ID" placeholder=" " :focus="checkFeederFlag" @confirm="handleCheckReel">
						</view>
					</view>
				</view>
				
				<!-- 消息区 -->
				<div class="titX">
					消息区：
				</div>
				<view class="msg-content-x" style="margin-top: 20rpx;" :style="{
					height: msgContentHeight + 'px'
				}">
					<div class="content-item" :class="{
					successX: item.type === 'success',
					errorX: item.type === 'error'
				}" v-for="(item, index) in msgList" :key="index">
						<span class="left">{{ item.msg }}</span>
					</div>
				</view>
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn success" @tap="clearFeederLot">
					<text class="tix">飞达卸料</text>
				</view>
				<view class="toolbar-btn warning" @tap="resetFormData(true)">
					<text class="tix">清除</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./OffLinePreparation2.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
	
	.subsection-con {
		padding: 5px 0;
	}
	
	.toolbar-btn {
		width: 32%!important;
	}
</style>
