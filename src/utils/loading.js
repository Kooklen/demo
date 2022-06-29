import { Spin } from 'iview';
import { debounce } from "_u/tool"
let needLoadingRequestCount = 0;

function startLoading(text) {
    Spin.show({
      render: (h) => {
        return h('div', [
          h('Icon', {
            'class': 'demo-spin-icon-load',
            props: {
              type: 'ios-loading',
              size: 30
            }
          }),
          h('div', text ? text : '加载中')
        ])
      }
    });
  }

  function endLoading() {
    if (needLoadingRequestCount === 0) {
      Spin.hide();
    }
  }

export function showFullScreenLoading(text) {
  if (needLoadingRequestCount === 0) {
    startLoading(text)
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    debounce(endLoading(), 1000)
  }
}