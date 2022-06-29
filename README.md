# turboBrain

## Project setup
```
npm install / cnpm i
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 开发规范
### 0. 规范说明
优先级A: 必要的

优先级B: 强烈推荐的

优先级C: 推荐的

### 1. 命名规范（优先级A）
1.1 文件夹/普通文件命名统一使用小写和短横线命名 (kebab-case)，包括js、css、html、图片等文件；

1.2 组件文件命名统一使用驼峰式命名（PascalCase），首字母需大写，且尽量避免使用单个单词；

1.3 变量命名统一使用驼峰式命名（PascalCase），除了类以外其它普通变量首字母小写，类名首字母大写；

1.4 常量命名全部使用大写字母，使用下划线分割；

1.5 组件name属性，建议使用组件文件名同名，如VideoViewer.vue的name为"VideoViewer"；如果是Index.vue组件，使用外层文件名来做驼峰命名，如video-viewer/Index.vue，name为"VideoViewer";

1.6 组件根标签建议加一个与组件名同名的类名，如VideoViewer.vue组件，根标签设置`<div class="video-viewer"></div>`，方便开发调试；

1.7 html的class命名，统一使用小写和短横线命名 (kebab-case)，如`<div class="content-wrapper"></div>`；

### 2. css规范（优先级C）
参考 [BEM命名规范](https://blog.csdn.net/chenmoquan/article/details/17095465)

### 3. js规范（优先级B）
参考 [JavaScript编程风格](http://wangdoc.com/javascript/features/style.html)

### 4. vue规范（优先级B）
参考 [Vue 风格指南](https://cn.vuejs.org/v2/style-guide/#%E4%BC%98%E5%85%88%E7%BA%A7-A-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E5%BF%85%E8%A6%81%E7%9A%84-%E8%A7%84%E9%81%BF%E9%94%99%E8%AF%AF)


### 项目的表单写法
+ Form
```js
      <!-- <Form ref="form_container" :rules="ruleValidate" :model="form">
        <FormItem prop="centerName" label="分中心名称:">
          <IviewInput v-model="form.centerName"></IviewInput>
        </FormItem>
        <FormItem required prop="dataSetHistoryId" label="所在区域:">
          <IviewSelect
            v-model="form.dataSetHistoryId"
            :optionList="selectList"
          ></IviewSelect>
        </FormItem>
        <FormItem required label="详细地址:">
          <IviewInput type="textarea" v-model="form.descStr"></IviewInput>
        </FormItem>
        <FormItem label="中心联系人：">
          <IviewInput v-model="form.descStr"></IviewInput>
        </FormItem>
        <FormItem required label="联系人手机号：">
          <IviewInput v-model="form.descStr" type="tel"></IviewInput>
        </FormItem>
        <FormItem required label="联系人身份证号：">
          <IviewInput v-model="form.descStr" type="tel"></IviewInput>
        </FormItem>
        <FormItem required label="选择系统:">
          <IviewCheckboxGroup
            v-model="form.runMode"
            :optionList="checkBoxList"
          ></IviewCheckboxGroup>
        </FormItem>
        <FormItem required label="管理范围:">
          <IviewRadioGroup
            v-model="form.runMode"
            :radioList="radioList"
          ></IviewRadioGroup>
        </FormItem>
      </Form> -->
```


### 实现一键换肤的方案

- 主要思路是通过
css3定义全局的变量 --theme-sub-color-1 --theme-sub-color-2 ...
document.documentElement.style.getPropertyValue 获取当前主题颜色名
document.documentElement.style.getPropertyValue 改变当前主题颜色名

(更多思路参考)[https://blog.csdn.net/lxy869718069/article/details/104000240?spm=1001.2014.3001.5506]

- 实现
1. 在src\assets\style\reset.css中定义了 --theme-color 变量
2. 在vue文件中通过修改--theme-color的值做到一键换肤,目前使用的是sessionStorage来存储，后面看需求是否需要修改成存在数据库中
```js
    // 可全局搜索一下 themeColorInit changeSkin

    // 主题初始化
    themeColorInit() {
      let themeColor = sessionStorage.getItem("theme-color");
      if (!themeColor) {
        themeColor = "#1A45B8";
        sessionStorage.setItem("theme-color", themeColor);
      }
      document.documentElement.style.setProperty("--theme-color", themeColor);
    },

    // 换肤  目前使用的是随机换
    changeSkin() {
      let newThemeColor = ["#1A45B8", "#1AB8A5", "#FFBD08", "#B8321A"][
        Math.floor(Math.random() * 4)
      ];
      let oldThemeColor =
        document.documentElement.style.getPropertyValue("--theme-color");
      if (oldThemeColor !== newThemeColor) {
        document.documentElement.style.setProperty(
          "--theme-color",
          newThemeColor
        );
        sessionStorage.setItem("theme-color", newThemeColor);
      }
    },
```

缺陷： （src\components\iview\config\iview.less）覆盖 iview 默认样式不能使用这个，iview组件库样式覆盖不允许使用计算的样式
```js
// 即 在 src\components\iview\config\iview.less 中，以下写法是会报错：iview不允许使用计算的样式
@primary-color             : var(--theme-color); 
```
只能在公共样式文件中定义公共属性 ,到组件中去覆盖；

