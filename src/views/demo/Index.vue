<template>
  <div id="app">


    <dragTreeTable
        :data="treeData"
        :onDrag="onTreeDataChange"
        fixed
        border
        hightRowChange
        onlySameLevelCanDrag
        OpenAll
    >
    </dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "drag-tree-table";

export default {
  name: "app",
  data() {
    return {
      treeData: {
        columns: [
          {
            type: 'selection',
            title: '菜单名称',
            field: 'applicationClassifyName',
            width: 200,
            align: 'center',
            formatter: (item) => {
              return '<a>' + item.name + '</a>'
            }
          },
          {
            title: '操作',
            type: 'action',
            width: 200,
            align: 'center',
            actions: [
              // {
              //   text: '查看角色',
              //   onclick: (item) => {
              //     // item是当前行的数据
              //     console.log(item)
              //   },
              //   formatter: (item) => {
              //     return '<i>查看角色</i>'
              //   }
              // },
              {
                text: '编辑',
                onclick: (item) => {
                  // item是当前行的数据
                  console.log(item)
                },
                formatter: (item) => {
                  return '<i>编辑</i>'
                }
              }
            ]
          },
        ],
        lists: [
          {
            "id": 1,
            "applicationClassifyName": "全部分类",
            "parentId": -1,
            "classifyHierarchy": -1,
            "del": 0,
            "classifyChild": [
              {
                "id": 2,
                "applicationClassifyName": "一级分类1",
                "parentId": 1,
                "classifyHierarchy": 1,
                "del": 0,
                "classifyChild": [
                  {
                    "id": 5,
                    "applicationClassifyName": "二级分类1",
                    "parentId": 2,
                    "classifyHierarchy": 2,
                    "del": 0,
                    "classifyChild": [
                      {
                        "id": 8,
                        "applicationClassifyName": "三级分类1",
                        "parentId": 5,
                        "classifyHierarchy": 3,
                        "del": 0,
                        "classifyChild": []
                      }
                    ]
                  },
                  {
                    "id": 10,
                    "applicationClassifyName": "二级分类11",
                    "parentId": 2,
                    "classifyHierarchy": 2,
                    "del": 0,
                    "classifyChild": []
                  },
                  {
                    "id": 16,
                    "applicationClassifyName": "test",
                    "parentId": 2,
                    "classifyHierarchy": 2,
                    "del": 0,
                    "classifyChild": []
                  }
                ]
              },
              {
                "id": 3,
                "applicationClassifyName": "一级分类2",
                "parentId": 1,
                "classifyHierarchy": 1,
                "del": 0,
                "classifyChild": [
                  {
                    "id": 6,
                    "applicationClassifyName": "二级分类2",
                    "parentId": 3,
                    "classifyHierarchy": 2,
                    "del": 0,
                    "classifyChild": [
                      {
                        "id": 9,
                        "applicationClassifyName": "三级分类2",
                        "parentId": 6,
                        "classifyHierarchy": 3,
                        "del": 0,
                        "classifyChild": []
                      },
                      {
                        "id": 18,
                        "applicationClassifyName": "test",
                        "parentId": 6,
                        "classifyHierarchy": 3,
                        "del": 0,
                        "classifyChild": []
                      }
                    ]
                  },
                  {
                    "id": 17,
                    "applicationClassifyName": "test",
                    "parentId": 3,
                    "classifyHierarchy": 2,
                    "del": 0,
                    "classifyChild": []
                  }
                ]
              },
              {
                "id": 4,
                "applicationClassifyName": "一级分类3",
                "parentId": 1,
                "classifyHierarchy": 1,
                "del": 0,
                "classifyChild": [
                  {
                    "id": 7,
                    "applicationClassifyName": "二级分类3",
                    "parentId": 4,
                    "classifyHierarchy": 2,
                    "del": 0,
                    "classifyChild": []
                  }
                ]
              },
              {
                "id": 15,
                "applicationClassifyName": "test",
                "parentId": 1,
                "classifyHierarchy": 1,
                "del": 0,
                "classifyChild": []
              }
            ]
          }
        ],
        custom_field: {
          id: 'id',
          name:'applicationClassifyName',
          // order: 'sort',
          lists: 'classifyChild',
          parent_id: 'parentId',
        }
      }
    };
  },
  components: {
    dragTreeTable
  },
  methods: {
    onTreeDataChange(list) {
      this.treeData.lists = list;
    }
  },
};
</script>

<style scoped>
#app {
  width: 900px;
  height: 900px;
}
</style>