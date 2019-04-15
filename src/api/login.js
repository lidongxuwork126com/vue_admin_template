import request from '@/utils/request'
import {getStore} from "@/utils";

export function login(account, pass) {
  return request({
    url: '/api/loginIn',
    method: 'post',
    data: {
      account,
      pass
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/userInfo',
    method: 'post',
    data: {
      "uid": getStore('uid')
    }
  })
}

export function logout() {
  return request({
    url: '/api/logOut',
    method: 'post'
  })
}
