/**
 * 公共方法
 */

// 存储内容
function set(key, value) {
    uni.setStorageSync(key, value)
}

// 读取内容
function get(key) {
    return uni.getStorageSync(key)
}


module.exports = {
    baseUrl: "https://1930.mzth.cn/api/",
    set: set,
    get: get,
}
