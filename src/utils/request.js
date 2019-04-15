// 封装的网络请求
import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'
import {dateSeconds} from "@/utils/date"
import {getUUid} from "@/utils"
import Jsencrypt from 'jsencrypt'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  config => {
    // 如果token有值
    if (store.getters.token) {
      // 让每个请求携带自定义token(jwt) 请根据实际情况自行修改
      config.headers['Authorization'] = getToken();
    }

    // AuthCode (API权限)
    let jsencrypt = new Jsencrypt();
    jsencrypt.setPublicKey(pKey);
    config.headers['AuthCode'] = jsencrypt.encrypt(window.key+"/"+dateSeconds()+"/"+getUUid());
    return config
  },
  error => {
    Promise.reject(error)
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // code为20000代表程序错误
    if (res.result === 20000) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject('error')
      // code为30000代表权限错误
    } else if (res.result === 30000) {
      MessageBox.confirm(
        res.msg,
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // 登出
        store.dispatch('FedLogOut').then(() => {
          // 为了重新实例化vue-router对象 避免bug
          location.reload()
        })
      });
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
);

export default service
