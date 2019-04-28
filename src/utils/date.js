// 获取10位, 时间秒数
export function dateSeconds(d = new Date()){
  if (typeof d === 'number' || typeof d === 'string'){
    d = new Date(d);
  }
  return Number(d.getTime().toString().substr(0, 10));
}

// 把10位秒数, 格式化成Date对象
export function formatDate(d){
  return new Date(d * 1000);
}


// 获取上午好, 下午好, 晚上好
export function getSayGood(){
  let now = new Date(),hour = now.getHours();
  if (hour < 6) {
    return "凌晨好";
  } else if (hour < 9) {
    return "早上好";
  } else if (hour < 12) {
    return "上午好"
  } else if (hour < 14) {
    return "中午好"
  } else if (hour < 17) {
    return "下午好";
  } else if (hour < 19) {
    return "傍晚好";
  } else if (hour < 22) {
    return "晚上好";
  } else {
    return "夜里好";
  }
}
