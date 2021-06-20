<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">飞达维修</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<!-- 料架 -->
			<graceBottomDialog :show="FeederShow" v-on:closeDialog="closeDialog1">
				<view class="grace-space-between" slot="btns">
					<view class="grace-dialog-buttons" @tap="closeDialog1">取消</view>
					<view class="grace-dialog-buttons" style="color:#00B26A;" @tap="confirm1">确定</view>
				</view>
				<view slot="content" class="dialog-content" style="padding: 0 10px;box-sizing: border-box;">
					<view class="search-head">
						<view class="search">
							<icon type="search" size="16"></icon>
							<input type="text" v-model="Feederform.Key" placeholder="请输入关键字">
						</view>
						<view class="search-btn" @tap="handleToSearch1">搜索</view>
					</view>
					<view class="grace-table grace-margin-top dialog-table">
						<view style="height: 100%;">
							<view class="grace-theader grace-bg-blue">
								<text class="grace-td grace-bold" style="width: 15%;background: #e8eaec;color: #333333;">选择</text>
								<text class="grace-td grace-bold" style="width: 85%;background: #e8eaec;color: #333333">料架</text>
							</view>
							<radio-group>
								<view class="grace-tbody" v-for="(item, index) in FeederTable" :key="index">
									<view class="grace-td" style="width: 15%;">
										<radio :value="index.toString()" @tap="ListClick1(item)" />
									</view>
									<view class="grace-td" style="width: 85%; overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.NAME}}</view>
								</view>
							</radio-group>
						</view>
					</view>
					<uni-pagination class="pageInation" style="width: 100%;" show-icon="true" :total="totalFeeder" @change="changeReason1" :current="Feederform.Page">
					</uni-pagination>
				</view>
			</graceBottomDialog>
			<!-- 根本原因 -->
			<graceBottomDialog :show="ReasonShow" v-on:closeDialog="closeDialog2">
				<view class="grace-space-between" slot="btns">
					<view class="grace-dialog-buttons" @tap="closeDialog2">取消</view>
					<view class="grace-dialog-buttons" style="color:#00B26A;" @tap="confirm2">确定</view>
				</view>
				<view slot="content" class="dialog-content" style="padding: 0 10px;box-sizing: border-box;">
					<view class="search-head">
						<view class="search">
							<icon type="search" size="16"></icon>
							<input type="text" v-model="Reasonform.Key" placeholder="请输入关键字">
						</view>
						<view class="search-btn" @tap="handleToSearch2">搜索</view>
					</view>
					<view class="grace-table grace-margin-top dialog-table">
						<view style="height: 100%;">
							<view class="grace-theader grace-bg-blue">
								<text class="grace-td grace-bold" style="width: 15%;background: #e8eaec;color: #333333;">选择</text>
								<text class="grace-td grace-bold" style="width: 32.5%;background: #e8eaec;color: #333333">编码</text>
								<text class="grace-td grace-bold" style="width: 52.5%;background: #e8eaec;color: #333333">描述</text>
							</view>
							<radio-group>
								<view class="grace-tbody" v-for="(item, index) in ReasonTable" :key="index">
									<view class="grace-td" style="width: 15%;">
										<radio :value="index.toString()" @tap="ListClick2(item)" />
									</view>
									<view class="grace-td" style="width: 32.5%">{{item.CODE}}</view>
									<view class="grace-td" style="width: 52.5%; overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.NAME}}</view>
								</view>
							</radio-group>
						</view>
					</view>
					<uni-pagination class="pageInation" style="width: 100%;" show-icon="true" :total="totalReason" @change="changeReason2" :current="Reasonform.Page">
					</uni-pagination>
				</view>
			</graceBottomDialog>
			<!-- 损坏部件 -->
			<graceBottomDialog :show="DamageShow" v-on:closeDialog="closeDialog3">
				<view class="grace-space-between" slot="btns">
					<view class="grace-dialog-buttons" @tap="closeDialog3">取消</view>
					<view class="grace-dialog-buttons" style="color:#00B26A;" @tap="confirm3">确定</view>
				</view>
				<view slot="content" class="dialog-content" style="padding: 0 10px;box-sizing: border-box;">
					<view class="search-head">
						<view class="search">
							<icon type="search" size="16"></icon>
							<input type="text" v-model="Reasonform.Key" placeholder="请输入关键字">
						</view>
						<view class="search-btn" @tap="handleToSearch3">搜索</view>
					</view>
					<view class="grace-table grace-margin-top dialog-table">
						<view style="height: 100%;">
							<view class="grace-theader grace-bg-blue">
								<text class="grace-td grace-bold" style="width: 15%;background: #e8eaec;color: #333333;">选择</text>
								<text class="grace-td grace-bold" style="width: 32.5%;background: #e8eaec;color: #333333">编码</text>
								<text class="grace-td grace-bold" style="width: 52.5%;background: #e8eaec;color: #333333">描述</text>
							</view>
							<radio-group>
								<view class="grace-tbody" v-for="(item, index) in DamageTable" :key="index">
									<view class="grace-td" style="width: 15%;">
										<radio :value="index.toString()" @tap="ListClick3(item)" />
									</view>
									<view class="grace-td" style="width: 32.5%">{{item.CODE}}</view>
									<view class="grace-td" style="width: 52.5%; overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.NAME}}</view>
								</view>
							</radio-group>
						</view>
					</view>
					<uni-pagination class="pageInation" style="width: 100%;display: block;" show-icon="true" :total="totalDamage" @change="changeReason3"
					 :current="Damageform.Page">
					</uni-pagination>
				</view>
			</graceBottomDialog>
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						料架
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.FEEDER" placeholder=" " :focus="autoFocus" @confirm="feederClick">
					</view>
					<view style="width:50rpx;height:50rpx;margin-left: 10px;">
						<image @tap="feeClick" style="width:100%;height: 100%;" src="../../static/menu_imgs/search.png"></image>
					</view>
				</view>
				<view class="form-item" v-if="FeeRepairList.length !== 0">
					<view class="form-label align-right">
						维修项目
					</view>
					<radio-group>
						<view v-for="(item, index) in FeeRepairList" :key="index">
							<radio :value="index.toString()" @tap="FeeRadioClick(item)" />{{item.NAME}}</radio>
						</view>
					</radio-group>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						根本原因
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.REASON_CODE" placeholder=" " :focus="autoFocus">
					</view>
					<view style="width:50rpx;height: 50rpx;margin-left: 10px;">
						<image @tap="ReasonClick" style="width:100%;height: 100%;" src="../../static/menu_imgs/search.png"></image>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						损坏部件
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.DAMAGE_PART" placeholder=" " :focus="autoFocus">
					</view>
					<view style="width:50rpx;height: 50rpx;margin-left: 10px;">
						<image @tap="DamageClick" style="width:100%;height: 100%;" src="../../static/menu_imgs/search.png"></image>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						维修方法
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.METHOD" placeholder=" " :focus="autoFocus">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">线体</view>
					<view class="form-value">
						<input type="text" :value="RepairList[RepairList.length - 1] ? RepairList[RepairList.length - 1].LINE_NAME : ''" class="form-input" disabled placeholder=" " />
					</view>
				</view>
				<view class="form-item" style="align-items: center">
					<view class="form-label align-right">
						维修结果
					</view>
					<view class="form-value">
						<picker mode="selector" :range="defectCodeList" @change="handleChangeDefectCode" range-key="NAME">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="defectCodeList[defectCodeIndex] ? defectCodeList[defectCodeIndex].NAME : ' '" placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item form-div">
					<view class="fonrm-text">
						本月维修次数：{{RepairCountByMonth}}
					</view>
					<view class="fonrm-text">
						总计维修次数：{{RepairTotalCount}}
					</view>
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
					<text class="tix">保存</text>
				</view>
			</div>

		</view>
	</gracePage>
</template>

<script src="./SmtFeederRepair.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}

	.form-div {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: rgb(54, 123, 33);
	}

	.fonrm-text {
		font-size: 32rpx !important;
		color: rgb(100, 236, 72);
	}

	.grace-form-body {
		width: 75% !important;
	}

	.pickerS {
		color: #999999;
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.grace-form-list {
		text-align: left;
		font-size: 32rpx;
	}

	.content1 {
		padding: 20rpx;
		text-align: center;
		line-height: 100rpx;
		background: #F8F8F8;
	}

	.grace-space-between {}

	.grace-dialog-buttons {
		// width: 150rpx;
		width: auto;
		padding: 0px 30rpx;
		line-height: 88rpx;
		height: 88rpx;
		display: block;
		overflow: hidden;
		text-align: center;
		font-size: 32rpx;
		color: #999999;
	}

	.dialog-content {
		width: 100%;
		height: 890rpx;
		// margin: 0rpx 5%;
	}

	.search-head {
		display: flex;
	}

	.search {
		display: flex;
		align-items: center;
		width: 80%;
		border-radius: 10rpx;
		border: 2rpx solid #E5E5E5;
		padding: 0 20rpx;
		height: 60rpx;

	}

	.search input {
		font-size: 28rpx;
		color: #333;
		line-height: 1;
		flex: 1;
		margin-left: 10rpx;
	}

	.search-btn {
		height: 60rpx;
		width: 20%;
		font-size: 28rpx;
		color: #fff;
		background: #409EFF;
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
	}

	.dialog-table {
		height: 700rpx;
	}

	.grace-td {
		line-height: 60rpx;
		font-size: 28rpx;
	}

	.uni-pagination__btns {
		width: 100%;
	}
</style>
