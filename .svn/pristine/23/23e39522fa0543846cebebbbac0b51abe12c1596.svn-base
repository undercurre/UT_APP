<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">SMT生产信息</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content" style="padding-bottom: 10rpx;">
				<view class="form-item">
					<text class="form-label align-right">工单</text>
					<view class="form-value disabled"><input type="text" v-model="netData.WO_NO" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">料号</text>
					<view class="form-value disabled"><input type="text" v-model="netData.PART_NO" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">名称</text>
					<view class="form-value disabled"><input type="text" v-model="netData.MODEL" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">线体</text>
					<view class="form-value disabled"><input type="text" :value="lineList[currentLine].LINE_NAME || ''" class="form-input"
						 disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">机台</text>
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
					<text class="form-label align-right">面板</text>
					<view class="form-value disabled"><input type="text" v-model="netDataNext.PCB_SIDE" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">上线日期</text>
					<view class="form-value disabled"><input type="text" v-model="netDataNext.START_TIME" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">节拍时间</text>
					<view class="form-value disabled"><input type="text" v-model="netDataNext.HI_OUTPUT_TIME" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">标准产能</text>
					<view class="form-value disabled"><input type="text" v-model="netDataNext.STANDARD_CAPACITY" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">预计工时</text>
					<view class="form-value disabled"><input type="text" v-model="netDataNext.WORKING_HOURS" class="form-input" disabled placeholder=" " /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">预计完成时间</text>
					<view class="form-value disabled"><input type="text" v-model="netDataNext.FISHEDTIME" class="form-input" disabled placeholder=" " /></view>
				</view>
			</view>
		</view>
	</gracePage>
</template>

<script src="./ProductionInformation.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 7em !important;
	}
</style>
