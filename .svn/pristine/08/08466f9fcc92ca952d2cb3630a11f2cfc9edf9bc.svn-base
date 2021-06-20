<template>
	<div>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">辅料冷藏</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right">
							辅料条码
						</view>
						<view class="form-value">
							<input class="form-input" :maxlength="-1" type="text" v-model="form.REEL_NO" placeholder=" " :focus="autoFocus" @confirm="handleCheckReedID">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							冰箱储位
						</view>
						<view class="form-value disabled">
							<input class="form-input" type="text" disabled v-model="form.CN_DESC" placeholder="点击选择冰箱储位" @click="chooseLocation">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							批次号
						</view>
						<view class="form-value disabled">
							<input class="form-input" type="text" disabled v-model="form.BATCH_NO" placeholder=" ">
						</view>
						<image src="../../static/more.png" mode="" class="icon-s" @click="handleOpenPiCi" style="width: 60rpx;height: 60rpx;margin-left: 10rpx;"></image>
						<image src="../../static/shuaxin.png" mode="" class="icon-s" @click="updateBathNo" style="width: 60rpx;height: 60rpx;margin-left: 10rpx;"></image>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							作业员
						</view>
						<view class="form-value disabled">
							<input class="form-input" disabled type="text" v-model="form.OPERATOR" placeholder=" ">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							物料编号
						</view>
						<view class="form-value disabled">
							<view class="form-textarea">{{ reelInfo.PART_NO }}</view>
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							物料名称
						</view>
						<view class="form-value disabled">
							<view class="form-textarea">{{ reelInfo.PART_NAME }}</view>
						</view>
					</view>
					<!-- <view class="form-item">
						<view class="form-label align-right">
							物料描述
						</view>
						<view class="form-value">
							<view class="form-textarea">{{ reelInfo.PART_DESC }}</view>
						</view>
					</view> -->
					<view class="form-item">
						<view class="form-label align-right">
							物料描述
						</view>
						<view class="form-value disabled">
							<input type="text" disabled placeholder=" " v-model="form.REMARK">
						</view>
					</view>
					<u-table>
						<u-tr>
							<u-th style="width: 280rpx;display: inline-block;">批次号</u-th>
							<u-th style="width: 280rpx;display: inline-block;">锡膏条码</u-th>
							<u-th style="width: 280rpx;display: inline-block;">冰箱储位</u-th>
							<u-th style="width: 140rpx;display: inline-block;">作业人</u-th>
						</u-tr>
						<u-tr v-for="(item, index) in bathList1" :key="index">
							<u-td style="width: 280rpx;overflow: hidden;line-height: 21px;display: inline-block;">{{ item.BATCH_NO }}</u-td>
							<u-td style="width: 280rpx;overflow: hidden;line-height: 21px;display: inline-block;">{{ item.REEL_NO }}</u-td>
							<u-td style="width: 280rpx;overflow: hidden;line-height: 21px;display: inline-block;">{{ item.FRIDGE_LOC }}</u-td>
							<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;display: inline-block;">{{ item.OPERATOR }}</u-td>
						</u-tr>
						
					</u-table>
				</view>
			</view>

			<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">取消</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm">
						<text class="tix">保存</text>
					</view>
				</div>
			</view>


		</gracePage>
		<!-- modal -->
		<u-popup v-model="innerDrawer2" zIndex="99999" mode="bottom" length="90%">
			<div class="modal-content">
				<div class="search-x">
					<u-search placeholder=" " v-model="CHUWEI" :show-action="true" action-text="确定" :action-style="{
						fontSize: '16px'
					}" @custom="handleMakeSureLocation"></u-search>
				</div>
				<div class="modal-x">
					<u-radio-group v-model="checked" @change="radioChangeGroup">
						<div style="width: 100%;" v-for="item in PCmainTable" :key="item.VALUE">
							<u-radio shape="square" label-size="66" :name="item.VALUE">
								{{item.CN_DESC}}
							</u-radio>
						</div>
					</u-radio-group>
				</div>
			</div>
		</u-popup>
		<!-- modal2 -->
		<u-popup v-model="innerDrawer3" zIndex="99999" mode="bottom" length="90%">
			<div class="modal-content">
				<div class="search-x">
					<u-search placeholder=" " v-model="PICI" :show-action="true" action-text="确定" :action-style="{
						fontSize: '16px'
					}" @custom="handleMakeSurePici"></u-search>
				</div>
				<div class="modal-x">
					<u-radio-group v-model="checkedPici" @change="radioChangeGroupPici">
						<div style="width: 100%;" v-for="item in bathList" :key="item.ID">
							<u-radio shape="square"  label-size="40" :name="item.NAME">
								{{item.NAME}}
							</u-radio>
						</div>
					</u-radio-group>
				</div>
			</div>
		</u-popup>
	</div>
</template>

<script src="./SmtResourceProessFree.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}

	.modal-content {
		padding: 10rpx 25rpx;
	}

	.search-x {
		display: flex;
		align-items: center;
	}

	.modal-x {
		padding: 15rpx;
		height: 80vh;
		overflow: scroll;
	}
</style>

<style>
	.uicon-checkbox-mark::before {
		width: 40rpx;
		height: 40rpx;
	}
	
	.u-radio__icon-wrap {
		
	}
</style>
