// Cookie权限管理
import Cookies from 'js-cookie'

// 登录时, 在cookie中, 存登录状态的jwt值
const TokenKey = 'feijidazhan';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
