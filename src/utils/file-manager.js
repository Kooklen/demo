
import api from '@/api' // api相关
import Vue from 'vue'

// 标志字典（这里要跟app一致）
// let entityTypeDict = {
//   1: 'inspection', // 巡检记录
//   2: 'feedback', // 反馈记录
//   3: 'task' // 任务
// }

// 不同后缀名文件对应 base64 url 前缀
let base64Dict = {
  doc: 'data:application/msword;',
  docx: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;',
  pdf: 'data:application/pdf;',
}

/**
 * 获取文件base64
 * @param {string} fileTicket 查询文件的fileTicket
 * @param {string} type 查询文件类型，即扩展名
 */
export const getFileContent = (fileTicket, type) => {
  return new Promise((resolve, reject) => {
    api.file.getFileByTicket(null, [fileTicket]).then(res => {
      let { data } = res;
      let ext = type.toLowerCase();
      let baseb4prefix = base64Dict[ext] ? base64Dict[ext] : `data:image/${ext};`;
      resolve(baseb4prefix + 'base64,' + data.content);
    }).catch(err => {
      reject(err);
    });
  });
}

/** 删除文件 */
export const delFile = (ticket) => {
  let url = `/api/file-manager/v1/file-item/deleteByTicket?fileTicket=${ticket}`;
  return api.$axios.post(url)
}

/** 
 * 获取文件信息
 * @param {string} application 
 * @param {string} entityType 任务id，注意上传巡检记录图片时该参数不传
 * @param {string} entityId 可选值：inspection/feedback/task
 * @param {string} category 
 */
export const getFileInfoByParams = ({ application="superCloud", entityType, entityId, category, queryType = 1 }) => {
  return new Promise((resolve, reject) => {
    // {application}/{entityType}/{entityId}/{category} 
    api.file.getMultipleFile(null, [
      application,
      entityType,
      entityId,
      category
    ]).then(res => {
      let { data } = res;

      // 根据queryType来判断是否请求文件的base64，并放在文件的url字段中 
      queryType && data.forEach(async (item) => {
        let { type, fileTicket } = item;
        let data = await getFileContent(fileTicket, type);
        Vue.set(item, "url", data);
      });

      resolve(data);

    }).catch(err => {

      reject(err);
    });

  })

}


/** 上传文件
 * {application}/{entityType}/{entityId}/{category} 这四个是关键
 * application 在次项目默认为 superCloud
 */
export const uploadFileByInput = ({ application = 'superCloud', category, fileList, entityId, entityType,resourceOwnerName,resourceOwnerId }) => {
  return new Promise((resolve, reject) => {
    // 组装FormData
    let formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file); // 文件对象
    });

    // 拼接请求api
    let query = {
      application,
      category,
      entityId,
      entityType,
      // entityName: category,
      resourceOwnerId,
      resourceOwnerName,
      // compressPic: 1,
      resourceOwnerType: "superCloud",
      // savePath: 1 // 新加
    };

    let url = "/api/file-manager/v1/file-item/multiple-files?";

    Object.keys(query).forEach((key) => {
      url += key;
      url += "=";
      url += query[key];
      url += "&";
    });
    url = url.slice(0, -1);

    // 请求数据
    api.$axios.post(url, formData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}