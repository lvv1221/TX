// 全局方法开发示例
export default {
  findIndex (obj,arr) {
    for (let i = 0; i<arr.length; i++) {
      if (obj === arr[i]) {
        return i
      }
    }
  },
  countShow (arr) {
    let showCount = 0
    for (let w of arr) {
      if (w.show === true) {
        showCount++
      }
    }
    return showCount
  }
}
