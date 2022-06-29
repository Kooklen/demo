/** 表格相关的一些方法 */

import u from './index'

/**
 * 获取columns格式化对象
 * @param title iview表格columns配置对象的title
 * @param key iview表格columns配置对象的key
*/
export const col = (title, key, config) => {
  return {
    title, key, render: (h, params) => {
      return h('span', null, u.tool.hasVal(params.row[key]))
    }, ...config
  };
}

/**
 * 获取columns格式化数组
 * @param arr [['title1', 'key1'], ['title2', 'key2'], ['title3', 'key3']]
*/
export const cols = arr => {

  var defaultOption = {
    align: "center",
  }
  return arr.map(arr2 => {
    let [title, key, option] = arr2
    return {
      title, key, render: (h, params) => {
        return h('span', null, u.hasVal(params.row[key]))
      }, ...defaultOption, ...option
    };
  })
}

// 获取操作按钮render
export const textBtns = (h, arr, fn) => {
  let ret = h('span', {}, '-');
  if (arr.length) {
    ret = h('div', {}, arr.map((item, index) => {
      let options = {} // 其余配置项
      if (typeof item === 'object') {
        item.value = item.value ? item.value : index;
        options = item.options ? item.options : {}
      } else if (typeof item === 'string') {
        item = { label: item, value: index }
      }
      return h('span', {
        ...options,
        class: 'm-text-btn', on: {
          click: () => {
            fn.call(null, item.value, item)
          }
        }
      }, item.label)
    }))
  }

  return ret;
}

export default {
  col,
  cols,
  textBtns
}