<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">产线开工</text></view>
			</view>
		</graceHeader>

		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">工单</view>
					<view class="form-value">
						<input ref="woNo" :focus="autoFocus" v-model="formData.woNo" type="text" name="woNo"
						 class="form-input" placeholder="" @confirm="sendTextMsg"></input>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">料号</view>
					<view class="form-value">
						<input ref="part_no" v-model="part_no" type="text" class="form-input" :disabled="true" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">名称</view>
					<view class="form-value">
						<input ref="name" v-model="name" @input="selection = false" type="text" class="form-input" :disabled="true" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">制程</view>
					<view class="form-value">
						<picker mode="selector" :range="processlist" @change="processClick">
							<div class="picker-s">
								<input class="form-input" type="text" :style="{
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
					<view class="form-value">
						<input type="text" :value="lineList[currentLine].LINE_NAME || ''" class="form-input" disabled placeholder="" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">拼板数</view>
					<view class="form-value no-border flex" style="justify-content: space-between;">
						<graceNumberBox style="margin-left: 10rpx;" @change="handleChange" inputPadding="0" btnFontSize="20px" btnSize="30rpx" inputColor="#444444" inputHeight="60rpx"
						 inputFontSize="18px" width="100px" :value="puzzles"></graceNumberBox>
						 <view class="insX">
						 	<checkbox-group @change="checkAllHelper" class="insX-check">
						 		<checkbox value="1" :checked="stations ? true : false"></checkbox>
						 		<text class="insT">续接工单</text>
						 	</checkbox-group>
						 </view>
					</view>
				</view>
			</view>
		</view>
		<!-- 尾部 -->
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./producline.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 4em !important;
	}

	.toolbar-btn {
		width: 30% !important;
	}

	// .insX {
	// 	display: flex;
	// 	// width: 600rpx;
	// 	flex-direction: row;
	// 	align-items: center;
	// 	padding-left: 20rpx;
	// }

	.insX-check {
		display: flex;
		align-items: center;
	}

	.insT {
		font-size: 16px;
		color: #444444;
	}
</style>
