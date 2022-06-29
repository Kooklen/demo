import { camel2kebab } from './tool'

export const createElm = (tag) => {
  return document.createElement(tag);
}

export const createText = (text) => {
  return document.createTextNode(text);
}

export const queryElm = (selector) => {
  return document.querySelector(selector);
}

/**
 * 获取style字符串
 * @param {Object} style 样式对象
 */
export const formatStyle = (style, widthKey) => {
  let keys = Object.keys(style);
  let str = '';
  keys.forEach(key => {
    str += `${camel2kebab(key)}: ${style[key]}; `;
  })
  return widthKey ? `style="${str}"` : str;
}


export const px2rem = (pxNum) => pxNum / 16 + 'vw';