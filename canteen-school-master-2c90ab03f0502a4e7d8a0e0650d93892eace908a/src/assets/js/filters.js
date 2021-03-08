
/**
 * [dateFormat description]
 *
 * @param   {[String]}  fmt 转换的格式
 * @param   {[String,Number,Object]}  date  时间对象或者毫秒数
 * @description 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    例子：
    dateFormat("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    dateFormat("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @return  {[String]}    转换好的字符串数据
 */

export function dateFormat([fmt, date]) {
  if (!date) {
    return '--'
  }


  // 判断是否是Date对象
  if (date && typeof date == "object") {
  } else {
    date = new Date(Number(date));
  }
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}



/**
 *
 * 返回 key 对应的 value
 * @param {*} key
 * @param {*} obj
 *
 */
export function keyChangeValue([key, obj]) {
  var text;
  for (const i in obj) {
    if (i == key) {
      text = obj[i];
    }
  }
  return text;
}

/**
 * * 例子： list = [{ 'a':'1111', b:'2222' },{'a':'123','b':'324'}]
 *   {{ [111, list, a , b ] | filterFromObj }}
 *
 * * 根据 a=111 从数组 [{ 'a':'1111', b:'2222' },{'a':'123','b':'324'}] 查询,返回 b 的value
 *
 * @param {*string}  item
 * @param {*array}   list
 * @param    key
 * @param    value
 *
 *  */
export function filterFromObj([item, list, key, value]) {
  var text;
  list.map(o => {
    while (o[key] == item) {
      text = o[value];
      break;
    }
  });
  if (!text) {
    text = item;
  }
  return text;
}
