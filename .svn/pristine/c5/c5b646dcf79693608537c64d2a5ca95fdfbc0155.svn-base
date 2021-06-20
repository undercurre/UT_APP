<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">查询开工工单</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
<!-- 					<view class="form-label align-right">工单</view> -->
					<view class="form-value">
						<input ref="woNo" :focus="autoFocus" v-model="formData.WO_NO" type="text" name="woNo"
						 class="form-input" placeholder="请扫描工单" @confirm="handleSearchWoNo"></input>
					</view>
					
				</view>
				<div style="overflow-y: auto;">
					<u-table style="overflow-x: auto;" :style="{
					height: msgContentHeight + 'px'
				}">
							<u-tr style="width: 900rpx;">
								<u-th style="width: 100rpx;flex: 1">选择</u-th>
								<u-th style="width: 400rpx;flex: 3">批次号</u-th>
								<u-th style="width: 400rpx;flex: 3">工单号</u-th>
							</u-tr>
							<u-tr v-for="(item, index) in list" :key="index" style="width: 900rpx;">
								<u-td style="width: 100rpx;overflow: hidden;line-height: 21px;flex: 1">
									<radio-group @change="radioChange">
										<radio :checked="checkedWoNo === item.WO_NO" :value="item.WO_NO"></radio>
									</radio-group>
								</u-td>
								<u-td style="width: 400rpx;overflow: hidden;line-height: 21px;flex: 3;">{{ item.LOC_NO }}</u-td>
								<u-td style="width: 400rpx;overflow: hidden;line-height: 21px;flex: 3">{{ item.WO_NO }}</u-td>
							</u-tr>
						</u-table>
				</div>
			</view>
		</view>
		<!-- 尾部 -->
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

<script src="./Search.js">
</script>

<style lang="scss" scoped>
	@import '~@/styles/publics.scss';
	.form-label {
		width: 4em !important;
	}
	
	.u-table {
		border-right: 1px solid rgb(228, 231, 237);
		border-bottom: 1px solid rgb(228, 231, 237);
	}
</style>
