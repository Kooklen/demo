/**
 * 该文件主要是在ViewDesign上自定义一些方法
 */
import ViewDesign from 'view-design';

/**
* 参数：
* {string | Object} params
* 用法：
* 在ViewDesign.Spin中添加loading方法，在js代码中直接使用this.$spin.loading(params)，
* params不传时默认为"加载中..."，如果params类型为对象，与this.$spin.show(params)相同
*/
ViewDesign.Spin.loading = function (params) {
  params = params || '加载中...';
  if (typeof params === 'string') {
    let text = params;
    return ViewDesign.Spin.show({
      render: h => {
        return h("div", [
          h("Icon", {
            class: "demo-spin-icon-load",
            props: {
              type: "ios-loading",
              size: 20
            }
          }),
          h("div", text)
        ]);
      }
    })
  } else {
    return ViewDesign.Spin.show(params);
  }
}

export default ViewDesign