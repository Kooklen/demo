<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div class="main">
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{color: []}, {background: []}], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{align: []}], // 对齐方式-----[{ align: [] }]
  // [{size: fontSizeStyle.whitelist}], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  // [{font: fonts}], // 字体种类-----[{ font: [] }]
  [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
  [{direction: 'ltl'}], // 文本方向-----[{'direction': 'rtl'}]
  [{direction: 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
  [{indent: '-1'}, {indent: '+1'}], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{list: 'ordered'}, {list: 'bullet'}], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{script: 'sub'}, {script: 'super'}], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  ['clean'], // 清除文本格式-----['clean']
  ['link', 'image'] // 链接、图片、视频-----['link', 'image', 'video']
]
export default {
  data() {
    return {
      content: '',
      editorOption: {
        placeholder: "请在这里输入",
      },
    }
  },
  methods: {
    onEditorBlur(editor, html, text) {
      // console.log('editor blur!', editor)
      // console.log(this.content)

    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({editor, html, text}) {
      // console.log('editor change!', editor, html, text)
      this.content = html
      // console.log(html)

    }
  },
  // get the current quill instace object.
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    // you can use current editor object to do something(quill methods)
    // console.log('this is current quill instance object', this.editor)
  }
}
</script>

<style lang="less" scoped>
.main {
  overflow: auto;
  width: 1068px;
  //height: 300px;
  //background-color: pink;
}

/deep/ .ql-editor {
  //background-color: #0abbad;
  //background-color: #f6f8fb;
  height: 150px;
}



</style>