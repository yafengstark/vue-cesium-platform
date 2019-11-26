/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'http://127.0.0.1:8081/api/v1';


// ---------- mark --------------
// 1、获取标注
export const getmark = (token, pageIndex, name) => ajax(BASE_URL + '/getmark', {pageIndex, name}, token);

// 获取标注详情
export const getmarkDetail = (token, markId) => ajax(BASE_URL + '/getmarkdetail', {markId}, token);

// 删除标注
export const removeMark = (token, markId) => ajax(BASE_URL + '/removeMark', {markId}, token);

// 新建模标注
export const createMark = (token, target) => ajax(BASE_URL + '/addmark', target, token, 'POST');

// 修改标注位置
export const  resetMarkLocation = (token, markId, lon, lat) => ajax(BASE_URL + '/resetMarkLocation?markId=' + markId,
    {lon, lat}, token, 'POST');
export const  resetMarkDescription = (token, markId, description) => ajax(BASE_URL + '/resetMarkDescription?markId=' + markId,
    {description}, token, 'POST');

//  获取标注评论

// ----------- comment ---------------

export const getMarkComments = (token, markId) => ajax(BASE_URL + '/getMarkComments', {markId}, token);

export const postComment = (token, markId, content) => ajax(BASE_URL + '/addMarkCom?markId=' + markId, {content}, token, 'POST');

// --------- user ---------------
// 2、登录
export const login = (identity, password) => ajax(BASE_URL + '/login', {identity, password}, '', 'POST');

// 获取当前用户
export const getCurrentUser = (token) => ajax(BASE_URL + '/user/currentUser', {}, token);

// 获取用户部门统计数据
export const getUserDepartments = (token) => ajax(BASE_URL + '/user/getUserDepartments', {}, token);

// 2、修改用户信息
export const editUser = (token, username, summarize, description, mobile, phone, department) => ajax(BASE_URL + '/user/editUser',
    {username, summarize, description, mobile, phone, department}, token, 'POST');

export const resetPassword = (token, oldPassword, password, rePassword) => ajax(BASE_URL + '/user/password',
    {oldPassword, password, rePassword}, token, 'POST');

// ------------ department --------------------

//  分类码
export const getClazzCode = (token) => ajax(BASE_URL + '/getClazzCode',{}, token);

// ------------- 文件系统 ------------------

export const  getBuckets= () => ajax(BASE_URL + '/getBuckets',{}, '');