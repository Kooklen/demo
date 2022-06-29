/*
管辖范围 - 企业 manageRange
企业证照类型 companyLicensesType
合作类型 cooperationType
服务状态 serveStatus
管辖范围 - 分中心 manageRangeCenter
*/
// 管辖范围 - 企业
let manageRange = [
    {
        value: 1,
        label: '仅本企业'
    },
    {
        value: 2,
        label: '特定企业'
    },
]

// 管辖范围 - 分中心
let manageRangeCenter = [
    {
        value: 1,
        label: '仅本中心'
    },
    {
        value: 2,
        label: '特定分中心'
    },
]

// 企业证照类型
let companyLicensesType = [
    {
        value: 1,
        label: '营业执照'
    },
    {
        value: 2,
        label: '非营业执照'
    },
]

// 合作类型
let cooperationType = [
    {
        value: 1,
        label: '签约'
    },
    {
        value: 2,
        label: '使用'
    },
]

// 服务状态
let serveStatus = [
    {
        value: '1',
        label: '启用'
    },
    {
        value: '0',
        label: '停用'
    },
]

// 企业类型
let enterpriseType = [
    {
        value: '0',
        label: '科研单位'
    },
    {
        value: '1',
        label: '民营企业'
    },
    {
        value: '2',
        label: '事业单位'
    },
    {
        value: '3',
        label: '政府部门'
    },
    {
        value: '4',
        label: '个人'
    },
]



let total = {
    manageRange,
    companyLicensesType,
    cooperationType,
    serveStatus,
    enterpriseType,
    manageRangeCenter
}

/** 
    * 获取静态字段，根据字段筛选label
    * @param {[string]} objectKey [description]
    * @param {[string,number]} value [description]
**/
function getWant(objectKey = "", value = undefined) {

    if (objectKey) {
        if (total[objectKey]) {

            if ( value === undefined ) {
                return total[objectKey]
            } else {
                // if (typeof value === 'string' || typeof value === 'number') 
                let arr = total[objectKey].filter(item => {
                    // 双等
                    return item.value == value
                })

                if (arr.length > 0) {
                    return arr[0].label;
                } else {
                    console.warn(`${objectKey} 中不存在 值为${value}的 匹配项`)
                    return '-'
                }
            }

        } else {
            console.warn(`不存在该 ${objectKey} 对象`)
        }
    } else {
        console.warn('未选择任何objectKey')
        return;
    }

}

export default getWant