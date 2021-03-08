import {
	message
} from 'ant-design-vue';
import urlApi from "./request/urlApi.js"
export default {
	randoms() { //生成随机uuid
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		function getTime() {
			return new Date().getTime();
		}
		function prefixInteger(num, length) {
			return (Array(length).join('0') + num).slice(-length);
		}
		return "z" + prefixInteger(getTime(), 15) + S4() + S4() + S4() + S4();
	},
	telphone(phone) { //手机号码验证
		if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
			return false;
		} else {
			return true;
		}
	},
	getDate(){           ///获取当前时间
	    var date = new Date();
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    if (month < 10) {
	        month = "0" + month;
	    }
	    if (day < 10) {
	        day = "0" + day;
	    }
	    var nowDate = year + "年" + month + "月" + day+'日';
	    return nowDate;
	},
	regMoney(val, type) { //金额验证
		val = val.replace(/[^\d\.]/g, '');
		//必须保证第一个为数字而不是.
		val = val.replace(/^\./g, '');
		//前两位不能是0加数字
		val = val.replace(/^0\d[0-9]*/g, '');
		//保证只有出现一个.而没有多个.
		val = val.replace(/\.{2,}/g, '.');
		//保证.只出现一次，而不能出现两次以上
		val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
		//只能输入两位小数
		if (type == 1) {
			val = val.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');
		} else {
			val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
		}
		return val;
	},
	regMoneyOnes(vals,num) { ///保留一位小数
    var maxNums = 12;
		vals = vals.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
		vals = vals.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
		vals = vals.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		if(num==2){
			vals = vals.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
		}else{
			vals = vals.replace(/\D*(\d*)(\.?)(\d{0,3})\d*/,'$1$2$3');    //保留3位小数
		}
    var posDot = vals.indexOf(".");//返回指定字符在此字符串中第一次出现处的索引
    if (posDot < 0) {//不包含小数点
        if (vals.length > maxNums) {
            vals = vals.substring(0, maxNums);
        }
    }else{
      if (posDot > maxNums) {
          if (vals.length > maxNums) {
              vals= vals.substring(0, maxNums);
          }
      }
    }
		if (vals.indexOf(".") < 0 && vals != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
			vals = parseFloat(vals);
		}
		return vals;
	},
	loginReg(phone) {
		if (phone == '') {
			message.error("请输入手机号码");
			return false;
		} else if (!this.telphone(phone)) {
			message.error("请输入正确的手机号码");
			return false;
		} else {
			return true;
		}
	},
	getType(file, type) { //截取文件名及类型
		var filename = file;
		if (type == ",") {
			var index1 = filename.lastIndexOf(".");
		} else {
			var index1 = filename.lastIndexOf("/") + 1;
		}
		var index2 = filename.length;
		var type = filename.substring(index1, index2);
		return type;
	},
	getSchool(callback) { //获取学校
		urlApi.CommonGetSchool().then((res) => {
			if (res.code == 1) {
				callback(res.data)
			}
		})
	},
	phoneCheck(rule, value, callbackFn) {
		const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
		if (!reg.test(value)) {
			callbackFn('请输入正确的手机号码')
			return
		}
		callbackFn()
	},
	rounds(num, iCount) { //保留几位小数
		// iCount 保留几位小数
		var srcValue = num;
		var zs = true;
		//判断是否是负数
		if (srcValue < 0) {
			srcValue = Math.abs(srcValue);
			zs = false;
		}
		var iB = Math.pow(10, iCount);
		//有时乘100结果也不精确
		var value1 = srcValue * iB;
		var anumber = new Array();
		var anumber1 = new Array();
		var fvalue = value1;
		var value2 = value1.toString();
		var idot = value2.indexOf(".");
		//如果是小数
		if (idot != -1) {
			anumber = srcValue.toString().split(".");
			//如果是科学计数法结果
			if (anumber[1].indexOf("e") != -1) {
				return Math.round(value1) / iB;
			}
			anumber1 = value2.split(".");
			if (anumber[1].length <= iCount) {
				return parseFloat(num, 10);
			}
			var fvalue3 = parseInt(anumber[1].substring(iCount, iCount + 1), 10);
			if (fvalue3 >= 5) {
				fvalue = parseInt(anumber1[0], 10) + 1;
			} else {
				//对于传入的形如111.834999999998 的处理（传入的计算结果就是错误的，应为111.835）
				if (fvalue3 == 4 && anumber[1].length > 10 && parseInt(anumber[1].substring(iCount + 1, iCount + 2), 10) == 9) {
					fvalue = parseInt(anumber1[0], 10) + 1;
				} else {
					fvalue = parseInt(anumber1[0], 10);
				}
			}
		}
		//如果是负数就用0减四舍五入的绝对值
		if (zs) {
			return fvalue / iB;
		} else {
			return 0 - fvalue / iB;
		}
	},
	PAGE_LINES: ['15', '20', '25', '30'],
	REG: {
		PRICE: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
		PHONE: /^1(3|4|5|6|7|8|9)\d{9}$/
	}
}
