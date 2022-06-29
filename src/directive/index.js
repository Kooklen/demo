import Vue from 'vue'

/*
* @name: v-autoHide
* @params { Object }: 传入参数为一个对象，比如下拉框通过showDropdown变量来控制隐藏/显示，
  应该传入{showDropdown: showDropdown}
* @usage: <div v-autoHide="{showDropdown: showDropdown}" v-if="showDropdown"></div>
*/
Vue.directive('autoHide', {
  update(el, binding, vnode) {
    let key = Object.keys(binding.value)[0];
    let that = vnode.context;
    if (!el.__clickOutside__) {
      el.__clickOutside__ = function (e) {
        if (!el.contains(e.target)) {
          that[key] = false;
          document.removeEventListener("click", el.__clickOutside__);
        }
      };
    }
    document.removeEventListener("click", el.__clickOutside__);
    if (that[key]) {
      setTimeout(() => {
        document.addEventListener("click", el.__clickOutside__);
      }, 0);
    }
  },
  unbind(el) {
    document.removeEventListener('click', el.__clickOutside__);
    delete el.__clickOutside__;
  }
})