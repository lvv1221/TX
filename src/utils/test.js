// 开发插件示例
export const test = {}
test.install = (Vue, options) => {
  Vue.prototype.f1 = () => {
    console.log(111)
  }
}

