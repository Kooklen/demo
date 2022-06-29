<template>
  <div>
    <el-tree
        :data="treeData"
        :last-level="3"
        @edit-click="handleEditClick"
        @delete-click="handleDeleteClick"
        @add-click="handleAddClick"/>
  </div>
</template>

<script>
export default {
  name: "Index.vue",
  data(){
    return{
      treeData:[
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
      ]
    }
  }
}
</script>

<style scoped>

</style>