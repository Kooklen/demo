import Vue from "vue"
import { Message, Spin } from 'iview';

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, format, type) => {
  let d;
  if (timeStamp) {
    d = new Date(timeStamp)
  } else {
    d = new Date()
  }
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const day = getHandledValue(d.getDate())
  const hour = getHandledValue(d.getHours())
  const minute = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  if (!type) {
    type = '-'
  }
  const ymd = [year, month, day].map(formatNumber)
  switch (format) {
    case 'yyyymmdd':
      return [year, month, day].map(formatNumber).join(type)
    case '年月日':
      return ymd[0] + '年' + ymd[1] + '月' + ymd[2] + '日'
    case 'yyyymm':
      return [year, month].map(formatNumber).join(type)
    case 'mmdd':
      return [month, day].map(formatNumber).join(type)
    case 'mmdd hhmm':
      return [month, day].map(formatNumber).join(type) + ' ' + [hour, minute].map(formatNumber).join(':')
    case 'yyyy':
      return year
    case 'mm':
      return [month].map(formatNumber)
    case 'dd':
      return [day].map(formatNumber)
    case 'yyyymmddhhmmss':
      return [year, month, day].map(formatNumber).join(type) + ' ' + [hour, minute, second].map(formatNumber).join(':')
    case 'yyyymmddhhmm':
      return [year, month, day].map(formatNumber).join(type) + ' ' + [hour, minute].map(formatNumber).join(':')
    case 'hhmmss':
      return [hour, minute, second].map(formatNumber).join(':')
    case 'hhmm':
      return [hour, minute].map(formatNumber).join(':')
    case 'hh':
      return [hour].map(formatNumber)
    case 'mi':
      return [minute].map(formatNumber)
    default:
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * demo:yyyy-MM-dd hh:mm:ss.S
 * @param  {[type]} fmt  [description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export const dateFormat = (fmt, date) => {
  let thisDate = date || new Date();
  let o = {
    'M+': thisDate.getMonth() + 1, // 月份
    'd+': thisDate.getDate(), // 日
    'h+': thisDate.getHours(), // 小时
    'm+': thisDate.getMinutes(), // 分
    's+': thisDate.getSeconds(), // 秒
    'q+': Math.floor((thisDate.getMonth() + 3) / 3), // 季度
    's': thisDate.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (thisDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

// 获取url参数
export const getUrlParams = (url) => {
  if (!url) {
    url = document.location.toString()
  }
  var urlArr = url.split('?');
  console.log(urlArr, '--urlArr')
  if (urlArr.length < 1) return {};
  // urlArr = urlArr[1].split('&');
  // let urlObj = {}
  // urlArr.map(item => {
  //   let arr = item.split('=');
  //   let key = arr[0], val = arr[1];
  //   urlObj[key] = decodeURI(decodeURI(val))
  // })
  let reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  let urlObj = {}
  // console.log(reg.exec(urlArr[1]), 'reg.exec(urlArr[1]')
  while (reg.exec(urlArr[1])) {
    urlObj[RegExp.$1] = decodeURIComponent(RegExp.$2)
  }
  return urlObj
}

export const setUrlParams = (obj) => {
  let params = '';
  for (let key in obj) {
    params += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  return params;
}

/**
 * 获取字符串中符合要求的字符个数
 * @param {str} 字符串
 * @param {reg} 正则表达式
 */
export const getStrNum = (str, reg) => {
  return str && str.match(reg).length
}

/**
 * 函数防抖
 * @param {Function} func 回调函数
 * @param {Number} timeout 时间
 */
export function debounce(func, timeout = 1000) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      func.apply(that, args)
    }, timeout)
  }
}

/**
 * 节流函数
 */
export function throttle(fn, delay = 1000) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, args);
      prev = Date.now();
    }
  }
}

/**
 * 常用于cascader
 * 根据子级类型查找所有匹配的父级类型
 * id: 子级ID
 * data: 匹配数据
 * prop: 匹配的类型,默认用ID匹配
 */
export const getFathersById = (id, data, prop = 'id') => {
  var arrRes = []
  const rev = (data, id) => {
    for (var i = 0, length = data.length; i < length; i++) {
      const node = data[i]
      if (node[prop] === id) {
        arrRes.unshift(node[prop])
        return true
      } else {
        if (node.children && node.children.length) {
          if (rev(node.children, id)) {
            arrRes.unshift(node[prop])
            return true
          }
        }
      }
    }
    return false
  }
  rev(data, id)
  return arrRes
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  var isIE = isExplorer('MSIE');
  var isEdge = ua.indexOf("Edge") > -1 && !isIE;
  var isIE11 = ua.indexOf('Trident') > -1 && ua.indexOf("rv:11.0") > -1;

  if (isIE) return 'IE'
  else if (isEdge) return 'IE'
  else if (isIE11) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

// 判断域名是否是https
export const isHttps = () => {
  let protocol = document.location.protocol;
  return protocol === 'https:';
}

// 返回姓和名。
export const getFirstName = (fullname) => {
  let hyphenated = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人',
    '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶',
    '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒',
    '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官', '司寇', '巫马', '公西', '颛孙',
    '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐',
    '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', '公户', '公玉', '公仪',
    '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖',
    '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', '子桑',
    '即墨', '达奚', '褚师'
  ];
  let hyset = new Set(hyphenated);
  let vLength = fullname.length;
  // 前为姓,后为名
  let lastname = ''
  let firstname = '';
  if (vLength > 2) {
    var preTwoWords = fullname.substr(0, 2);
    // 取命名的前两个字,看是否在复姓库中
    if (hyset.has(preTwoWords)) {
      firstname = preTwoWords;
      lastname = fullname.substr(2);
    } else {
      firstname = fullname.substr(0, 1);
      lastname = fullname.substr(1);
    }
  } else if (vLength === 2) {
    // 全名只有两个字时,以前一个为姓,后一下为名
    firstname = fullname.substr(0, 1);
    lastname = fullname.substr(1);
  } else {
    firstname = fullname;
  }
  return [firstname, lastname];
}

/**
 * 分割污染指标文本的字母和数字，如传入'PM2.5' => ['PM', '2.5']
 * @param {String} str 指标文本
 */
// 请使用v-aqi指令切割AQI指标
export const splitIndex = (str) => {
  if (!str || !str.trim()) {
    console.warn('splitIndex不能传空字符！');
    return [];
  }
  let index = str.length;

  for (let letter of str) {
    if (parseInt(letter)) {
      index = str.indexOf(letter);
      break;
    }
  }

  let str1 = str.slice(0, index);
  let str2 = str.slice(index);

  return [str1, str2];
}

/**
 * 约等数字
 * @param {Number} num 需要处理的数字
 * @param {Int} d 保留的小数位
 */
export const toFixed = (num, d) => {
  d = d || 0; // 默认不保留小数
  if (num && num !== 0) {
    return num.toFixed(d);
  } else {
    return '-';
  }
}

/**
 * 导出
 * @param {Object} obj(url,params,fileName,intercept)
 * obj {
 *   @param {String} url 接口链接
 *   @param {Object} params 接口参数
 *   @param {String} fileName 导出文件名
 *   @param {String} method 导出请求方式
 *   @param {Object} body 导出请求体
 *   @param {String} intercept 拦截导出的对象 {String<err>:请求返回的数据信息,String<message>:拦截导出的提示信息 如不传则使用err}
 * }
 */
export const exportExcel = (obj) => {
  let { url, params, fileName, method, body, fileType, intercept } = obj;
  method = method || 'get'
  // 可以使用函数返回值中捕获请求失败进行以下转换处理 如在响应内即使用 intercept
  // .catch(err => {
  //   let reader = new FileReader();
  //   reader.addEventListener("loadend", e => {
  //  // 拿到读取结果转成对象获取响应信息
  //     if (JSON.parse(e.target.result).code.includes("40401")) {
  //       this.$Message.warning("未找到模板！");
  //     }
  //   });
  //   reader.readAsText(err.data);
  // 下载文件
  console.log(fileType, 'fileType')
  const downloadFile = (res) => {
    let url = window.URL.createObjectURL(
      new Blob([res.data], {
        type: fileType || 'application/vnd.ms-excel;charset=utf-8'
      })
    );
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName || '文件.xls');
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
  return Vue.prototype.$axios[method](
    url,
    {
      ...body,
      params
    },
    {
      responseType: "blob",
    },
  ).then(res => {
    // 读取返回内容 拦截导出 提示信息
    if (intercept) {
      let reader = new FileReader();
      reader.addEventListener("loadend", e => {
        // 拿到读取结果
        if (e.target.result.includes(intercept.err)) {
          Vue.prototype.$Message.warning(intercept.message || intercept.err);
        } else {
          downloadFile(res);
        }
      });
      reader.readAsText(res.data);
      // 下载文件
    } else {
      downloadFile(res);
    }
  })
}

/**
 * 转化json为URL（列表转字典）
 * import: Object
 * export: String
 **/
export const getUrlVars = (json) => {
  var params = Object.keys(json)
    .map(function (key) {
      if (json[key] === 0 && encodeURIComponent(key) === 'banStreet') {
        return encodeURIComponent(key) + "=" + '全部';
      } else {
        return encodeURIComponent(key) + "=" + json[key];
      }
    })
    .join("&");
  return params;
}

/**
 * 查找树形数据的整条内容
 * @param {Array} treeData 树形数据数组
 * @param {*} checkData  查找的数据 可以是一个数组
 * @param {Array[Object]} returnData 返回查找数据的数组对象
 * @param {String} checkName 查找的字段名 默认为id
 */
export const getTreeData = (treeData, checkData, returnData, checkName) => {
  // 判断要查找的数据是否为数组
  let checkDataType = Array.isArray(checkData);
  // 不传默认查找id字段
  checkName = checkName || 'id';
  for (let i = 0; i < treeData.length; i++) {
    let data = treeData[i][checkName];
    if (checkDataType ? checkData.includes(data) : data === checkData) {
      returnData.push(treeData[i]);
    }
    if (treeData[i].children && treeData[i].children.length) {
      getTreeData(treeData[i].children, checkData, returnData);
    }
  }
}
/**
 * 检查文件格式
 * @param {file} file 文件
 * @param {Array} formatList 格式列表
 * @param {String} errorMessage 提示内容
 * @returns {Boolean}
 */
export const checkFileFormat = (file, formatList, errorMessage) => {
  formatList = formatList || ["xls", "xlsx"]
  let fileType = file.name.split(".").pop(); // 文件后缀名
  if (!formatList.includes(fileType)) {
    errorMessage = errorMessage || '文件格式错误！'
    Vue.prototype.$Message.warning(errorMessage)
  }
  return formatList.includes(fileType);
}
/**
 * 检查文件大小
 * @param {file} file 文件
 * @param {Number} size 文件大小 单位KB
 * @param {String} errorMessage 提示内容
 * @returns {Boolean}
 */
export const checkFileSize = (file, size, errorMessage) => {
  size = size || 2048; // 默认文件大小限制
  let isfileSizeOver = file.size < (size * 1000);
  if (!isfileSizeOver) {
    let fileSize = (size / 1048).toFixed(0);
    // 默认错误提示
    errorMessage = errorMessage || `文件 ${file.name} 太大, 不能超过 ${fileSize}M!`
    Vue.prototype.$Message.warning(errorMessage)
  }
  return isfileSizeOver;
}

/**
 * 驼峰转横杠式
 * @param {String} str 驼峰式字符串
 * @return {String} 横杠式字符串
 */
export const camel2kebab = (str) => {
  let firstStep = true;
  return str.split('').reduce((a, b) => {
    a = /[A-Z]/.test(a) ? (firstStep ? '' : '-') + a.toLowerCase() : a;
    b = /[A-Z]/.test(b) ? '-' + b.toLowerCase() : b;
    firstStep && (firstStep = false);
    return a + b;
  })
}

/**
 * 获取style字符串
 * @param {Object} style 样式对象
 */
export const formatStyle = (style) => {
  let keys = Object.keys(style);
  let str = '';
  keys.forEach(key => {
    str += `${camel2kebab(key)}: ${style[key]}; `;
  })
  return `style="${str}"`;
}

/**
 * 一键粘贴
 * @param  {String} id [需要粘贴的内容]
 * @param  {String} attr [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
 *
 * range + selection
 *
 * 1.创建一个 range
 * 2.把内容放入 range
 * 3.把 range 放入 selection
 *
 * 注意：参数 attr 不能是自定义属性
 * 注意：对于 user-select: none 的元素无效
 * 注意：当 id 为 false 且 attr 不会空，会直接复制 attr 的内容
 */
export const copy = (id, attr) => {
  let target = null;

  if (attr) {
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    if (id) {
      let curNode = document.querySelector('#' + id);
      target.innerText = curNode[attr];
    } else {
      target.innerText = attr;
    }
    document.body.appendChild(target);
  } else {
    target = document.querySelector('#' + id);
  }

  try {
    let range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  } catch (e) {
    console.log(e, 'catch')
  }

  if (attr) {
    // remove temp target
    target.parentElement.removeChild(target);
  }
};

export const curHost = () => {
  return 'http://' + window.location.host;
};

export const showMsg = (type, msg) => {
  let name = type ? type : 'success',
    str = msg ? msg : '此功能暂未开发，敬请期待！';
  return Message[name](str);
};

export const isFullscreen = () => {
  return document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement || false;
};

/**
 * 导出
 * @param {Object} obj(url,params,fileName,intercept)
 * obj {
 *   @param {String} url 接口链接
 *   @param {Object} params 接口参数
 *   @param {String} fileName 导出文件名
 *   @param {String} method 导出请求方式
 *   @param {Object} body 导出请求体
 *   @param {String} intercept 拦截导出的对象 {String<err>:请求返回的数据信息,String<message>:拦截导出的提示信息 如不传则使用err}
 * }
 */
export const download = (obj) => {
  let { url, params, fileName, method, body, fileType, intercept } = obj;
  method = method || 'get';
  // 下载文件
  // application/zip
  // application/vnd.ms-excel;charset=utf-8
  const downloadFile = (res) => {
    let url = window.URL.createObjectURL(
      new Blob([res.data], {
        type: fileType || 'application/zip;charset=utf-8'
      })
    );
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName || '文件.zip');
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
  showSpin(1);
  return Vue.prototype.$axios[method](
    url,
    {
      ...body,
      params
    },
    {
      responseType: "blob",
      // headers: { 'Content-Type': 'application/json; application/octet-stream'},
    },
  ).then(res => {
    // 读取返回内容 拦截导出 提示信息
    if (intercept) {
      let reader = new FileReader();
      reader.addEventListener("loadend", e => {
        // 拿到读取结果
        if (e.target.result.includes(intercept.err)) {
          Vue.prototype.$Message.warning(intercept.message || intercept.err);
        } else {
          downloadFile(res);
        }
      });
      reader.readAsText(res.data);
      // 下载文件
    } else {
      downloadFile(res);
      showSpin()
    }
  }).catch(() => {
    showSpin()
  })
};

export const showSpin = (show) => {
  return show ? Spin.show({
    render: (h) => {
      return h('div', [
        h('Icon', {
          'class': 'demo-spin-icon-load',
          props: {
            type: 'ios-loading',
            size: 30
          }
        }),
        h('div', '')
      ])
    }
  }) : Spin.hide();
};


// 从一个对象获取相同key的值
export const objecToAnther = (obj, ahterObj) => {
  Object.keys(obj).forEach(key => {
    obj[key] = ahterObj[key]
  })
  return obj;
}

// 空值用 - 来表示
export const hasVal = function () {
  let val = Array.prototype.pop.call(arguments);
  if ([null, undefined, ''].includes(val)) {
    return '-'
  }
  return val;
}

/** 深克隆，对象或数组 */
export function deepCopy(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

/** 类型判断 */
export function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}


/* 规则初始化 */ 
export function ruleValidateInit(formArr,_this) {
  let obj = {};
  formArr.map((item) => {
    _this.$set(obj, item.prop, [
      {
        type: "any",
        required: true,
        message: `${item.label}不能为空`,
        trigger: "blur",
        validator: (rule, value) => {
          let typeStr = typeOf(value);
          if (typeStr === "string" || typeStr === "number") {
            return value !== "" && value !== undefined && value !== null;
          } else if (typeStr === "array") {
            if (item.prop === "area" && value.length > 0) {
              return value.every((ele) => {
                return ele !== "" && ele !== undefined && ele !== null;
              });
            } else {
              return value.length > 0;
            }
          }
        },
      },
    ]);
  });
  return obj
}