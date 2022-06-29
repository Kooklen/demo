
// 获取时间元素列表
export const getTimeEleList = function (date, time) {
  if (!date || !(date instanceof Date)) {
    date = new Date();
  }
  var y = date.getYear() + 1900;
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var H = date.getHours();
  var M = date.getMinutes();
  var S = date.getSeconds();
  return time ? [H, M, S] : [y, m, d, H, M, S];
}

/**
 * 格式化事件
 * Date对象转化为字符串形式
 * */
export const formatTime = function (time, s1 = '-', s2 = ':', interval) {
  if (!time) {
    time = new Date();
  }
  var y = time.getYear() + 1900;
  var m = time.getMonth() + 1;
  var d = time.getDate();
  // interval暂时不要使用！
  if (typeof s1 === 'number') {
    interval = s1;
    s1 = '-';
  }
  if (interval) {
    d = d + interval;
  }
  var H = time.getHours();
  var M = time.getMinutes();
  var S = time.getSeconds();
  var dateStr = y + s1 + (m > 9 ? m : '0' + m) + s1 + (d > 9 ? d : '0' + d);
  var timeStr = (H > 9 ? H : '0' + H) + s2 + (M > 9 ? M : '0' + M) + s2 + (S > 9 ? S : '0' + S);
  var timeStr2 = (H > 9 ? H : '0' + H) + s2 + (M > 9 ? M : '0' + M);
  return [dateStr + " " + timeStr, dateStr, timeStr, timeStr2];
}


// 输入年、月、日、日期间隔，返回 '3/15' 这样的格式
export const getFormatDate = function (interval, y, m, d) {
  if (!interval) interval = 0;
  let date, m2, d2;
  if (!y || !m || !d) {
    let today = new Date();
    y = today.getFullYear();
    m = today.getMonth();
    d = today.getDate();
  }

  date = new Date(y, m, d + interval);

  m2 = date.getMonth();
  d2 = date.getDate();

  return `${m2 + 1}/${d2}`;
}

// 输入年、月、日、日期间隔，返回 '昨天，今天，明天，周三，周四' 这样的格式
export const getFormatDay = function (interval = 0) {
  let ret;
  if (interval === 0) {
    ret = '今天';
  } else if (interval === -1) {
    ret = '昨天';
  } else if (interval === 1) {
    ret = '明天';
  } else {
    let today = new Date();
    let y = today.getFullYear();
    let m = today.getMonth();
    let d = today.getDate();

    let date = new Date(y, m, d + interval);

    let day = date.getDay();

    switch (day) {
      case 0:
        ret = '周日';
        break;
      case 1:
        ret = '周一';
        break;
      case 2:
        ret = '周二';
        break;
      case 3:
        ret = '周三';
        break;
      case 4:
        ret = '周四';
        break;
      case 5:
        ret = '周五';
        break;
      case 6:
        ret = '周六';
        break;
    }
  }

  return ret;
}

// 输入时间戳 or Date 对象，返回时间间隔列表
export const getTimeInterval = function (start, end, format, unit) {
  if (start) {
    let t, y, m, d, H, M, S;
    let floor = Math.floor.bind(Math);
    if (start && !end) {
      end = new Date();
    }
    // 如果是Date对象
    if (typeof start === 'object' && start instanceof Date) {
      start = start.getTime();
    }

    if (typeof end === 'object' && end instanceof Date) {
      end = end.getTime();
    }

    t = (end - start) / 1000;
    y = floor(t / (60 * 60 * 24 * 365));

    t = t % (60 * 60 * 24 * 365);
    m = floor(t / (60 * 60 * 24 * 30));

    t = t % (60 * 60 * 24 * 30);
    d = floor(t / (60 * 60 * 24));

    t = t % (60 * 60 * 24);
    H = floor(t / (60 * 60));

    t = t % (60 * 60);
    M = floor(t / 60);

    S = Math.round(t % 60);

    let arr = [y, m, d, H, M, S];
    if (unit) {
      arr = getUnit(arr);
    }
    return format ? '' : arr ;
  } else {
    return [];
  }
};

export const getUnit = (arr) => {
  let str = '', unit = '';
  for (let i = 0; i < arr.length; i ++) {
    switch (i) {
      case 0:
        unit = '年';
        break;
      case 1:
        unit = '月';
        break;
      case 2:
        unit = '天';
        break;
      case 3:
        unit = '小时';
        break;
      case 4:
        unit = '分';
        break;
      case 5:
        unit = '秒';
        break;
      default:
        break;
    }
    if (arr[i]) {
      str += arr[i] + unit;
    }
  }
  return str;
};

/**
* 获取两个日期相隔天数
* @param {String} start开始时间
* @param {String} end结束时间
* @returns {Number} betweenDay两个日期的相隔天数
*/
export const countDay = (start, end) => {
  start = new Date(start);
  end = new Date(end);
  // 开始时间比结束时间大
  if (end.getTime() - start.getTime() < 0) return;
  let betweenDay =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  return betweenDay;
};

/**
 * 获取本周的某一天的日期，如周一、周日的日期
 * @param {Number} weekday，0周日，1周一，2周二，7周日
 */
export const getWeekdayDate = function (weekday) {
  let now = new Date();
  let day = now.getDay(); // 5

  let [y, m, d] = getTimeEleList();
  return formatTime(new Date(y, m - 1, d + (weekday - day)))[1];
}


export const ages = function (str) {
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (r == null) return false;
  var d = new Date(r[1], r[3] - 1, r[4]);
  if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
    var Y = new Date().getFullYear();
    return Y - r[1];
  }
  return ("没有输入正确的时间格式");
}