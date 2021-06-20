<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">明细</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<!-- <view class="form-item"> -->
						<view class="form-item">
							<view class="form-label align-right">
								物料：
							</view>
							<view class="form-value">
								<input class="form-input" type="text" v-model="Form.REEL_CODE" placeholder=" " @focus="autoFocus = true;"
								 :focus="autoFocus" @blur="autoFocus = false;" @confirm="getFeida">
							</view>
						</view>
						<view class="form-item" style="justify-content: space-around;">
							<view class="form-label align-right">
								总数：{{QTY}}
							</view>
							<view class="form-label align-right">
								已核对：{{CHECK_QTY}}
							</view>
						</view>
					<!-- </view> -->
					<view class="form-item">
						<u-table style="position: relative;height: 960rpx;overflow: auto;">
							<u-tr style="display: -webkit-box;position: sticky;top: 0;">
								<u-th style="width: 30%;flex: 0 0 30%;">条码</u-th>
								<u-th style="width: 30%;flex: 0 0 30%;">物料号</u-th>
								<!-- <u-th style="width: 13%;flex: 0 0 13%;">型号</u-th> -->
								<u-th style="width: 20%;flex: 0 0 20%;">数量</u-th>
								<u-th style="width: 20%;flex: 0 0 20%;">操作</u-th>
								<!-- <u-th style="width: 19%;flex: 0 0 19%;">点检时间</u-th> -->
							</u-tr>
							<u-tr  style="display: -webkit-box;" v-for="(item, index) in list" :key="index">
								<u-td style="width: 30%;flex: 0 0 30%;overflow: hidden;line-height: 21px;">{{item.REEL_CODE}} </u-td>
								<u-td style="width: 30%;flex: 0 0 30%;overflow: hidden;line-height: 21px;">{{ item.PART_NO }}</u-td>
								<!-- <u-td style="width: 13%;flex: 0 0 13%;overflow: hidden;line-height: 21px;">{{ item.FEEDER }}</u-td> -->
								<u-td style="width: 20%;flex: 0 0 20%;overflow: hidden;line-height: 21px;">{{ item.QTY }}</u-td>
								<u-td style="width: 20%;flex: 0 0 20%;overflow: hidden;line-height: 21px;"><text class="delete"  @tap="deleteClick(item)">删除</text></u-td>
								<!-- <u-td style="width: 19%;flex: 0 0 19%;overflow: hidden;line-height: 21px;">{{ item.CHECK_TIME }}</u-td> -->
							</u-tr>
						</u-table>
					</view>
					<uni-pagination class="pageInation" style="width: 100%;display: block;" show-icon="true" :total="totalCount" @change="changeReason3"
					 :current="Form.Page">
					</uni-pagination>
				</view>
			</view>
			<!-- <view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">关闭</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm">
						<text class="tix">确定</text>
					</view>
				</div>
			</view> -->
		</gracePage>
	</view>
</template>

<script src="./NuclearDetails.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 6em !important;
	}
	.form-content{
		padding-bottom: 0px;
	}
	.delete{
		background: red;
		color: #fff;
	    border-radius: 8rpx;
	}
</style>

