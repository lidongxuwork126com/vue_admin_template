// 常用工具和方法
export function getUUid() {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 获取对象类型的LocalStroage的value值, 并且转化会obj返回
 */
export const getObjectStorage = (key) => {
  if (window.localStorage.getItem(key)){
    return JSON.parse(window.localStorage.getItem(key));
  } else {
    return null;
  }

};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

//保存cookie
export const setCookie = (name, value, days) => {
  let d = new Date;
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};
//获得cookie
export const getCookie = name => {
  let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
};
//删除cookie
export const deleteCookie = name => {
  setCookie(name, '', -1);
};

// 获取get上的参数
export const getSearchArg = argName => {
  let arr = window.location.href.split("?")[1];
  let argArr = arr.split("&");
  for (let i = 0; i < argArr.length; i++){
    let smallArgArr = argArr[i].split("=");
    if (smallArgArr[0] === argName){
      return decodeURIComponent(smallArgArr[1]);
    }
  }
  return "";
};

// 判断闰年 true
export const checkLeapYear = year => {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

// 格式化POST参数格式为key=vale&key=value
export const parmasPost = dataObj => {
  let sendStr = "";
  for (let prop in dataObj){
    sendStr += prop + "=" + dataObj[prop] + "&";
  }
  sendStr = sendStr.substr(0, sendStr.length - 1);
  return sendStr;
}

// 获取星座
export const getXingZhuo = (y, m, d) => {
  // y *= 1;
  // m *= 1;
  // d *= 1;
  // console.log(y, m, d);
  //星座定义
  var constellations = [
    {"Start": 120, "End": 218, "Name": "水平座"}, {"Start": 219, "End": 320, "Name": "双鱼座"},
    {"Start": 321, "End": 419, "Name": "白羊座"}, {"Start": 420, "End": 520, "Name": "金牛座"},
    {"Start": 521, "End": 621, "Name": "双子座"}, {"Start": 622, "End": 722, "Name": "巨蟹座"},
    {"Start": 723, "End": 822, "Name": "狮子座"}, {"Start": 823, "End": 922, "Name": "处女座"},
    {"Start": 923, "End": 1023, "Name": "天秤座"}, {"Start": 1024, "End": 1121, "Name": "天蝎座"},
    {"Start": 1123, "End": 1221, "Name": "射手座"}, {"Start": 1222, "End": 119, "Name": "摩羯座"}];


  /*
  判断日期有效性
  1,3,5,7,8,10,12为31天
  2月润年29，非润年28
  4,6,9,11为30天
  */
  var daysInMonth = [31, 99, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // //检测年份
  // if (y < 1970 || y > 2099) return "无法获取";

  //检测月份
  if (m < 1 || m > 12) return "错误";

  //检测日期
  var mDays = daysInMonth[m - 1];
  //如果是二月，要根据年份计算天数，不是二月时略过此计算
  if (m == 2) {
    mDays = GetSpecialDays(y)
  }

  //判断日数据是不是在月份的有效天范围
  if (d < 0 || d > mDays) return "错误";

  //好了，走到这一步，说明上面的验证都TM过了。
  //这才判断是哪一个星座
  //星座座标等于m*100 + d
  var pos = m * 100 + d;

  // console.log(pos);
  for (var i in constellations) {
    if (pos >= constellations[i].Start && pos <= constellations[i].End) {
      return constellations[i].Name;
    } else if (pos >= 1221 || pos <= 119){
      return "摩羯座";
    }
  }
}

//根据年份计算二月天数
export const GetSpecialDays = (y) => {
  if (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) {
    return 29;
  } else {
    return 28;
  }
}

// 查找所有子串 字符串出现的位置
export const searchSubStr = (str,subStr) => {
  let positions = [];
  let pos = str.indexOf(subStr);
  while(pos>-1){
    positions.push(pos);
    pos = str.indexOf(subStr,pos+1);
  }
  return positions;
}

// 生成获取UUID
export const getuuid = () => {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join(""); // 返回UUID
};

// 传入毫秒, 获取天数
export const getDaysByMillionTime = (time) => {
  var nowDate = new Date();
  return Math.floor((nowDate.getTime() - time * 1000) / 1000 / 60 / 60 / 24);
}

// 判断文件是否为图片
export const checkIsPng = (str) => {
  return ['image/gif', 'image/png', 'image/jpeg', 'image/jpg'].indexOf(str) > -1;
}

// 获取星期几
export const getWeekDay = (time) => {
  var mydate = new Date(time);
  var myddy = mydate.getDay();//获取存储当前日期
  var weekday = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  return weekday[myddy];
}

// 获取多少时间前
export const checkLastTime = (obj) => {
  // obj格式: "2018-09-19 12:01:02"
  // 需要转换成//格式
  obj = obj.replace("-", "/");
  var wDate = new Date(obj);
  var nowDate = new Date();
  var seconds = (nowDate.getTime() - wDate.getTime()) / 1000; // 秒数

  if (seconds < 60){ // 小于60秒
    return "刚刚";
  } else if ((Math.floor(seconds / 60)) < 60){
    return "分钟前";
  } else if ((Math.floor(seconds / 60 / 60)) < 24) {
    return Math.floor(seconds / 60 / 60) + "小时前";
  } else if (Math.floor(seconds / 60 / 60 / 24) < 30){
    return Math.floor(seconds / 60 / 60 / 24) + "天前";
  } else if (Math.floor(seconds / 60 / 60 / 24 / 30) < 12){
    return Math.floor(seconds / 60 / 60 / 24 / 30) + "月前";
  } else {
    return Math.floor(seconds / 60 / 60 / 24 / 30 / 12) + "年前";
  }

  // if (seconds / 60 <= 1) { // 1分钟前.
  //   return "1分钟前";
  // } else if (seconds / 60 <= 60){ // 多少分钟前
  //   if (Math.ceil(seconds / 60) === 60){
  //     return "1小时前";
  //   } else {
  //     return Math.ceil(seconds / 60) + "分钟前";
  //   }
  //   // 3601 / 60 => 60.016667 / 60 1.000
  // } else if (seconds / 60 / 60 <= 24){
  //   if (Math.ceil(seconds / 60 / 60) === 24){
  //     // console.log(123);
  //     return "1天前";
  //   } else {
  //     return Math.ceil(seconds / 60 / 60) + "小时前";
  //   }
  // } else if (seconds / 60 / 60 / 24 <= 30){
  //   var lastDay = wDate.getDate();
  //   var nowDay = nowDate.getDate();
  //   return Math.abs(nowDay - lastDay) + "天前";
  // } else if (seconds / 60 / 60 / 24 / 30 <= 12){
  //   var lastMonth = wDate.getMonth();
  //   var nowMonth = nowDate.getMonth();
  //   return Math.abs(nowMonth - lastMonth) + "月前";
  // } else {
  //   return nowDate.getFullYear() - wDate.getFullYear()  + "年前";
  // }
};

// app和web交互方法
export const openActivity = (activity, val = {}) => {
  const url = 'twinflames:' + JSON.stringify({
    name: 'open-activity',
    activity: activity,
    value: val
  });

  window.location.href = url;
};

export const onEvent = (event, val = {}) => {
  const url = 'twinflames:' + JSON.stringify({
    name: 'on-event',
    event: event,
    value: val
  });
  window.location.href = url
};

export const openUrl = (urlArg, title) => {
  const url = 'twinflames:' + JSON.stringify({
    name: 'open-html',
    url: urlArg,
    title: title
  });
  window.location.href = url
};

/**
 * 打开App
 */
export const openApp = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    MessageAlert.messageFunction('点击右上角按钮，选择[在浏览器打开]');
    return
  }
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    MessageAlert.messageFunction('请使用Android系统手机');
    return
  }
  if (navigator.userAgent.match(/android/i)) {
    window.setTimeout(function () {
      window.location.href = 'https://download.twinflames.cn?android'// android 下载地址
    }, 2000);
    return
  }
  window.location.href = 'https://download.twinflames.cn'
};

// app内协议跳转
export const androidOpenArr = () => {
  // android app协议
  window.location.href = 'scheme://cn.twinflames.app';
};


export default {
  setStore,
  getStore,
  removeStore,
  setCookie,
  getCookie,
  deleteCookie,
  checkLeapYear,
  getXingZhuo,
  searchSubStr,
  getuuid,
  getDaysByMillionTime,
  checkIsPng,
  getWeekDay,
  checkLastTime,
  openActivity,
  onEvent,
  openUrl,
  openApp,
  androidOpenArr
}


