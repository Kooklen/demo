import {
    // uploadFileByInput,
    // getFileInfoByParams,
    delFile,
  } from "_u/file-manager";
/**
 * 操作page的mixin，默认情况下会混入一个filter和handlePageChange方法
 */
export const handlePageMixin = (getDataFnKey = 'getDataList') => {
    return {
        data() {
            return {}
        },
        methods: {
            // 页码 or 显示页数 改变时触发
            handlePageChange(e) {
                console.log(e, "handlePageChange111");
                // this[filterKey] = Object.assign(this[filterKey], e);
                // if (this.pageQuery) {
                //     this[getDataFnKey]();
                // }
            },
        }
    }
}


/**
 * 下拉区域的mixin，通过请求去加载provinces 下的city，city下的area
 */
export const handleAreaQuest = () => {
    return {
        data() {
            return {}
        },
        methods: {
            async loadData(item, callback) {
                console.log(item);
                item.loading = true;

                if (item.type === "provinces") {
                    let res = await this.$api.common.dictGetCities({
                        provinceId: item.value.split(",")[0],
                    });
                    // console.log(res, "provinces - mixin");
                    item.children = res.data.data.map((ele) => {
                        return {
                            value: ele.id + "," + ele.cityName,
                            label: ele.cityName,
                            loading: false,
                            children: [],
                            type: "city",
                            ...ele
                        };
                    });
                } else if (item.type === "city") {
                    let res = await this.$api.common.dictGetAreas({
                        cityId: item.value.split(",")[0],
                    });
                    // console.log(res, "city");
                    item.children = res.data.data.map((ele) => {
                        return {
                            value: ele.id + "," + ele.areaName,
                            label: ele.areaName,
                            type: "area",
                            ...ele
                        };
                    });
                }
                item.loading = false;
                callback();
            },
        }
    }
}


/**
 * 文件上传相关的mixin
 */
export const handleFileMixin = () => {
    return {
        data() {
            return {
                delImgList: []
            }
        },
        methods: {
            // 删除附件
            async handleSaveImgEditing() {
                // 删除图片
                await this.delImgList.forEach((img) => {
                    delFile(img.fileTicket);
                });
            },
        }
    }
}
