import { message } from 'ant-design-vue';
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
	PAGE_LINES: ['15','20','25','30'],
	REG:{
		PRICE:/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
		PHONE:/^1(3|4|5|6|7|8|9)\d{9}$/
	},
	phoneCheck(rule, value, callbackFn) {
		const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
		if (!reg.test(value)) {
			callbackFn('请输入正确的手机号码')
			return
		}
		callbackFn()
	},

	timestampToTime(timestamp) {
	    var date = new Date(timestamp.length >=13 ? timestamp : timestamp* 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    var Y = date.getFullYear() + '-';
	       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	       var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	       var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
	       var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
	       var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
	    return Y+M+D+h+m+s;
	},
	getSmsCode(type){

	},
	regMoneyOnes(vals) { //保留3位小数
		vals = vals.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
		vals = vals.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
		vals = vals.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		// vals = vals.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入两个小数
		vals = vals.replace(/\D*(\d*)(\.?)(\d{0,3})\d*/,'$1$2$3');    //保留3位小数
		if (vals.indexOf(".") < 0 && vals != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
			vals = parseFloat(vals);
		}
		return vals;
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
  printStyles(){   //交接单样式
    var styles = `
        .titles{
          text-align: center;
          font-weight: bold;
          font-size: 24px;
          color: #000000;
          font-family:'微软雅黑';
          margin-bottom: 12px;
          transform: scale(1.2);
          box-sizing: border-box;
          padding-left: 60px;
        }
        .peersons{
         display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 40px 0 15px;
          font-size: 15px;
          color: #000000;
          font-family:'微软雅黑';
          margin-bottom: 10px;
        }
        .peersons>span{
           transform-origin:20% 50% !important;
          display: inline-block;
          transform: scale(0.9);
          white-space: nowrap;
        }
        .foots{
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          flex-wrap: wrap;
          font-family:'微软雅黑';
          padding: 0 60px 0 15px;
          font-size: 15px;
          margin-top:10px ;
          color: #000000;
        }
        .foots>span{
          font-family:'微软雅黑';
            transform-origin:20% 50% !important;
       display: inline-block;
       transform: scale(0.8);
       white-space: nowrap;
        }
        tbody>tr{
          height:47.5px !important;
        }
        thead>tr{
          height: 28px !important;
        }
        tbody>tr>td{
         height: 47.5px !important;
          font-size: 15px;
          position: relative !important;
        }
        tbody>tr>td>span{
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center;
          height: 47.5px !important;
          letter-spacing: 2px;
          word-break:break-all !important;
          transform: scale(0.8);
          font-family:'微软雅黑';
        }
        .headers>tr>td{
          width: 58.3px;height: 28px !important;
          font-size: 15px;
          box-sizing: border-box;
          padding: 0px 0;color: #000000;
          text-align: center;
        }
        .headers>tr>td>span{
          transform-origin:20% 50% !important;
          white-space: nowrap;
          letter-spacing: 5px;
          display: inline-block;
          transform: scale(0.8);
          font-family:'微软雅黑';
        }
        td{
          color: #000000;
          text-align: center;
        }
        #warrantTables{
          position:absolute;
          width: 100%;
          z-index: -1;
          top: 0;
          left: 0;
        }
        .lists{
          height:656px;
        }
      `
      return styles;
  }
}
