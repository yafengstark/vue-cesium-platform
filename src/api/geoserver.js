/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'ageoserver/geoserver/rest';


// ---------- mark --------------
// 1、获取标注
export const getSystemStatus  = () => ajax(BASE_URL + '/about/system-status', {}, "");


