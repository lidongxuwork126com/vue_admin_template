import axios from "axios"
// 注意这里不用request, 防止response拦截判断, 因为这里是为了注入到前端一个key值, 用于请求api时拼接的参数值
export function getKey() {
  return axios.get("/news");
}
