/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'

/**
 *
 * @param url
 * @param data
 * @param token
 * @param type
 * @returns {Promise}
 */
export default function ajax (url, data={}, token, type='GET') {

  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise;
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请

      promise = axios.get(url, { headers: { Authorization: token }})
    } else {
      // 发送post请求
      promise = axios.post(url, data,  { headers: { Authorization: token }})
    }

    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

/*
const response = await ajax()
const result = response.data

const resule = await ajax()
 */
