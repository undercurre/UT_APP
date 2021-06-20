<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">开工作业</text></view>
			</view>
		</graceHeader>
	
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">出库单号</view>
					<view class="form-value">
						<input ref="woNo" :focus="autoFocus" v-model="wo_code" type="text" name="woNo"
						 class="form-input" placeholder="" @confirm="handleSearchWoCode"></input>
					</view>
				</view>
				<view class="form-item" v-if="wo_code">
					<view class="form-label align-right">工单</view>
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
					<view class="form-label align-right">工单</view>
					<view class="form-value">
						<input ref="woNo" :focus="autoFocus_2" v-model="formData.woNo" type="text" name="woNo"
						 class="form-input" placeholder="" @confirm="sendTextMsg"></input>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">料号</view>
					<view class="form-value disabled">
						<input ref="part_no" v-model="part_no" type="text" class="form-input" :disabled="true" />
					</view>
				</view>
				<!-- <view class="form-item">
					<view class="form-label align-right">名称</view>
					<view class="form-value disabled">
						<input ref="name" v-model="name" @input="selection = false" type="text" class="form-input" :disabled="true" />
					</view>
				</view> -->
				<view class="form-item">
					<view class="form-label align-right">制程</view>
					<view class="form-value">
						<picker mode="selector" :range="processlist" @change="processClick">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :style="{
								color: processlist[processIndex] ? '#333' : 'rgb(158, 158, 158)'
						}"
								 :value="processlist[processIndex] ? processlist[processIndex] : '' " placeholder=" ">
								</input>
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">线别</view>
					<view class="form-value disabled">
						<input type="text" :value="lineList[currentLine].LINE_NAME || ''" class="form-input" disabled placeholder="" />
					</view>
				</view>
				<!-- <view class="form-item">
					<view class="form-label align-right">任务数量</view>
					<view class="form-value no-border flex" style="justify-content: space-between;">
						<graceNumberBox style="margin-left: 10rpx;" @change="handleChangeQty" inputPadding="0" btnFontSize="20px" btnSize="30rpx" inputColor="#444444" inputHeight="60rpx"
						 inputFontSize="18px" width="100px" :value="formData.TARGET_QTY"></graceNumberBox>
					</view>
				</view> -->
				<view class="form-item">
					<view class="form-label align-right">任务数量</view>
					<view class="form-value no-border flex" style="justify-content: space-between;">
						<graceNumberBox style="margin-left: 10rpx;" @change="handleChangeQty" inputPadding="0" btnFontSize="20px" btnSize="30rpx" inputColor="#444444" inputHeight="60rpx"
						 inputFontSize="18px" width="100px" :value="formData.TARGET_QTY" :maxNum = "formData.MaxTAGET_QTY" disabled ="true"></graceNumberBox>
						 <view class="insX">
						 	<checkbox-group @change="checkAllHelper" class="insX-check">
						 		<checkbox value="1" :checked="formData.keepWo ? true : false"></checkbox>
						 		<text class="insT">续接工单</text>
						 	</checkbox-group>
						 </view>
					</view>
				</view>
				<!-- <view class="form-item">
					<view class="form-label align-right">拼板数</view>
					<view class="form-value no-border flex" style="justify-content: space-between;">
						<graceNumberBox style="margin-left: 10rpx;" @change="handleChange" inputPadding="0" btnFontSize="20px" btnSize="30rpx" inputColor="#444444" inputHeight="60rpx"
						 inputFontSize="18px" width="100px" :value="formData.multNo"></graceNumberBox>
						 <view class="insX">
						 	<checkbox-group @change="checkAllHelper" class="insX-check">
						 		<checkbox value="1" :checked="formData.keepWo ? true : false"></checkbox>
						 		<text class="insT">续接工单</text>
						 	</checkbox-group>
						 </view>
					</view>
				</view> -->
				<u-subsection class="mycsub" :list="[{name: '已选工单'}, {name: '消息区'}, {name: '制程详情'}]" :current="currentActive" @change="handleChangeSub"></u-subsection>
				<div style="padding-top: 10px;">
					<!-- 已选工单区域 -->
					<view :style="{
						height: msgContentHeight + 'px'
					}" v-if="currentActive === 0">
						<u-table style="overflow-x: auto;height: 100%">
							<u-tr style="width: 1300rpx;">
								<u-th style="width: 200rpx;flex: 1">&nbsp;</u-th>
								<u-th style="width: 400rpx;flex: 2">工单</u-th>
								<u-th style="width: 400rpx;flex: 3">料号</u-th>
								<u-th style="width: 300rpx;flex: 2">任务数量</u-th>
							</u-tr>
							<u-tr style="width: 1300rpx;" v-for="(item, index) in dataList" :key="item.woNo" :class="{
								currentRow: index === currentRow
							}" @click.native.stop="handleClickTr(item, index)">
								<u-td style="width: 200rpx;overflow: hidden;line-height: 21px;flex: 1">
									<checkbox-group @change="handleChangeCheckBox($event, item, index)">
										<label>
											<checkbox :value="item.woNo" :checked="checkedList.indexOf(item.woNo) !== -1" />
										</label>
									</checkbox-group>
								</u-td>
								<u-td style="width: 300rpx;overflow: hidden;line-height: 21px;flex: 2">{{ item.woNo }}</u-td>
								<u-td style="width: 400rpx;overflow: hidden;line-height: 21px;flex: 3">{{ item.partNo }}</u-td>
								<u-td style="width: 300rpx;overflow: hidden;line-height: 21px;flex: 2">{{ item.TARGET_QTY }}</u-td>
							</u-tr>
						</u-table>
					</view>
					<view class="msg-content-x" :style="{
						height: msgContentHeight + 'px'
					}" v-if="currentActive === 1">
						<div class="content-item" :class="{
						successX: item.type === 'success',
						errorX: item.type === 'error'
					}" v-for="(item, index) in msgList" :key="index">
							<span class="left">{{ item.msg }}</span>
						</div>
					</view>
					<view :style="{
						height: msgContentHeight + 'px'
					}" v-if="currentActive === 2" style="overflow-y: auto;">
						<u-table>
								<u-tr v-for="item in routeConfigList" :key="item.ID">
									<u-td>{{ item.CURRENT_DESC }}</u-td>
								</u-tr>
							</u-table>
					</view>
				</div>
			</view>
		</view>
		<!-- 尾部 -->
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<!-- <view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view> -->
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view>
				<view class="toolbar-btn success" @tap="handleSubmitData">
					<text class="tix">提交</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./StartJob2.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 5em !important;
	}
	
	.toolbar-btn {
		width: 32% !important;
	}
	
	// .toolbar-bottom {
	// 	padding: 0 5px!important;
	// 	padding-top: 8px !important;
	// }
	
	.insX-check {
		display: flex;
		align-items: center;
	}
	
	.insT {
		font-size: 16px;
		color: #444444;
	}
	
	.currentRow {
		background-color: rgba(238, 245, 254, 1)!important;
	}
</style>
