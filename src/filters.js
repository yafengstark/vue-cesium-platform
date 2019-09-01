// 1. 导入Vue
import Vue from 'vue'
// 导入格式化时间的模块
import moment from 'moment'

// 定义全局的时间过滤器
Vue.filter('dateFormat', function (dateStr, formatStr = 'YYYY-MM-DD HH:mm:ss') {


  // 在过滤器的处理函数中，最后，必须 return 一个东西，这样，才是一个合法的过滤器

  return moment(datetimeFormat(dateStr)).format(formatStr)
})

function datetimeFormat(longTypeDate){
    var dateTypeDate = "";
    var date = new Date();
    date.setTime(longTypeDate);
    dateTypeDate += date.getFullYear(); //年
    dateTypeDate += "-" + getMonth(date); //月
    dateTypeDate += "-" + getDay(date); //日
    dateTypeDate += " " + getHours(date); //时
    dateTypeDate += ":" + getMinutes(date);  //分
    dateTypeDate += ":" + getSeconds(date);  //分
    return dateTypeDate;
}

//返回 01-12 的月份值
function getMonth(date){
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if(month<10){
        month = "0" + month;
    }
    return month;
}
//返回01-30的日期
function getDay(date){
    var day = "";
    day = date.getDate();
    if(day<10){
        day = "0" + day;
    }
    return day;
}
//小时
function getHours(date){
    var hours = "";
    hours = date.getHours();
    if(hours<10){
        hours = "0" + hours;
    }
    return hours;
}
//分
function getMinutes(date){
    var minute = "";
    minute = date.getMinutes();
    if(minute<10){
        minute = "0" + minute;
    }
    return minute;
}
//秒
function getSeconds(date){
    var second = "";
    second = date.getSeconds();
    if(second<10){
        second = "0" + second;
    }
    return second;
}