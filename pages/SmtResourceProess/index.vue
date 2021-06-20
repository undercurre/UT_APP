<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">辅料作业</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						辅料条码
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.resourceNo" placeholder=" " :focus="autoFocus" @confirm="handleCheckReelID2">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						当前作业流程
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" disabled v-model="netData.CURRENT_ROUTE" placeholder=" "></input>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						下一道流程作业
					</view>
					<view class="form-value" :class="{
						disabled: disabled
					}">
						<picker :disabled="disabled" mode="selector" :range="zhichengList" range-key="NEXT_ROUTE" @change="handleChangeZhiCheng">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="zhichengList[zhichengIndex] ? zhichengList[zhichengIndex].NEXT_ROUTE : ''" placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<div class="titX">
					消息区：
				</div>
				<view class="msg-content-x" :style="{
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
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">进入下一流程作业</text>
				</view>
			</div>
			<div class="toolbar-item" v-if="authBtnList.indexOf('ProcessResourceFinish') !== -1 || authBtnList.indexOf('ProcessResourceGiveOut') !== -1">
				<view class="toolbar-btn warning" @tap="useFinished" v-if="authBtnList.indexOf('ProcessResourceFinish') !== -1">
					<text class="tix">用完</text>
				</view>
				<view class="toolbar-btn danger" @tap="scrapped" v-if="authBtnList.indexOf('ProcessResourceGiveOut') !== -1">
					<text class="tix">报废</text>
				</view>
			</div>
			
		</view>
	</gracePage>
</template>

<script src="./SmtResourceProess.js"></script>

<style scoped lang="scss">
@import '~@/styles/publics.scss';
.form-label {
	width: 8em!important;
}
</style>
