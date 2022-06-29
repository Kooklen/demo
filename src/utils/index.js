import * as tool from './tool'
import * as datetime from './datetime'
import * as dom from './dom'
import * as tree from './tree'
import * as array from './array'
import * as table from './table'

const utils = {
  ...tool,
  ...datetime,
  ...dom,
  tree: {
    ...tree
  },
  array: {
    ...array
  },
  table: {
    ...table
  }
}

import Clipboard from 'clipboard';

function clipboardSuccess() {
    console.log("复制成功")
}
function clipboardError() {
    console.log("复制失败")
}

export const handleCopy=(text, event, onSuccess, onError)=> {
    event = event || {};
    const clipboard = new Clipboard(event.target, {
        text: () => text,
    });
    clipboard.on('success', () => {
        onSuccess ? onSuccess() : clipboardSuccess();
        clipboard.off('error');
        clipboard.off('success');
        clipboard.destroy();
    });
    clipboard.on('error', () => {
        onError ? onError() : clipboardError();
        clipboard.off('error');
        clipboard.off('success');
        clipboard.destroy();
    });
    clipboard.onClick(event);
}

export default utils;