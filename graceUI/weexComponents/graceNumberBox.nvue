<template>
	<view class="grace-number-box" :style="{ width: width }">
		<text class="grace-number-box-doBtn" @tap.stop="reduce" :style="{ width: btnSize, height: btnSize, fontSize: btnFontSize, lineHeight: btnSize, color: btnColr }">-</text>
		<input
			class="grace-number-box-input"
			type="number"
			ref="range"
			@focus="handleFocus"
			:selection-start="selection ? selectionStart : 0"
			:selection-end="selection ? selectionEnd : -1"
			:value="inputNumber"
			:disabled="disabled"
			@input="input"
			:style="{
				backgroundColor: inputBG,
				height: inputHeight,
				lineHeight: inputHeight,
				fontSize: inputFontSize,
				color: inputColor,
				padding: inputPadding,
				borderRadius: inputBorderRadius
			}"
		/>
		<text class="grace-number-box-doBtn" @tap.stop="add" :style="{ width: btnSize, height: btnSize, fontSize: btnFontSize, lineHeight: btnSize, color: btnColr }">+</text>
	</view>
</template>
<script>
export default {
	name: 'graceNumberBox',
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		value: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			default: 0
		},
		maxNum: {
			type: Number,
			default: 999999
		},
		minNum: {
			type: Number,
			default: 0
		},
		datas: {
			type: String,
			default: ''
		},
		btnSize: {
			type: String,
			default: '60rpx'
		},
		btnFontSize: {
			type: String,
			default: '36rpx'
		},
		btnColr: {
			type: String,
			default: '#666666'
		},
		inputHeight: {
			type: String,
			default: '56rpx'
		},
		inputFontSize: {
			type: String,
			default: '26rpx'
		},
		inputColor: {
			type: String,
			default: '#333333'
		},
		inputBG: {
			type: String,
			default: '#F6F7F8'
		},
		inputPadding: {
			type: String,
			default: '10rpx'
		},
		inputBorderRadius: {
			type: String,
			default: '8rpx'
		},
		width: {
			type: String,
			default: '200rpx'
		}
	},
	data() {
		return {
			inputNumber: this.value,
			selection: false,
			selectionStart: 0,
			selectionEnd: 0
		};
	},
	watch: {
		value(val) {
			this.inputNumber = val;
		},
		inputNumber(val) {
			val = Number(val);
			if (val > this.maxNum) {
				val = this.maxNum;
				this.inputNumber = val;
			}
			if (val < this.minNum) {
				val = this.minNum;
				this.inputNumber = val;
			}
			this.$emit('change', [val, this.index, this.datas]);
		}
	},
	methods: {
		add: function() {
			var newVal = this.inputNumber + 1;
			this.inputNumber = Number(newVal);
		},
		reduce: function() {
			var newVal = this.inputNumber - 1;
			this.inputNumber = newVal;
		},
		input(e) {
			this.inputNumber = Number(e.detail.value);
			this.selection = false
		},
		handleFocus() {
			// TODO 这里有个bug ，应该是自动聚焦的问题
			const value = this.$refs.range.attr.value;
			const platform = uni.getSystemInfoSync().platform;
			if (platform === 'ios') {
				let timer = setTimeout(() => {
					this.$refs.range.setSelectionRange(0, value.toString().length);
					clearTimeout(timer);
				});
			} else {
				this.selectionStart = 0;
				this.selectionEnd = 0;
				let timer = setTimeout(() => {
					this.selection = true
					this.selectionStart = 0;
					this.selectionEnd = value.toString().length;
					console.log(this.selectionStart, this.selectionEnd)
					clearTimeout(timer)
				}) 
			}
		}
	}
};
</script>
<style scoped>
.grace-number-box {
	overflow: hidden;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
}
.grace-number-box-doBtn {
	text-align: center;
	color: #666666;
}
.grace-number-box-input {
	text-align: center;
	width: 700rpx;
	flex: 1;
}
</style>
