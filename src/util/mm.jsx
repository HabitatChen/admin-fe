
class CUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type        : param.type || 'get',
        url         : param.url || '',
        dataType    : param.dataType || 'json',
        data        : param.data || null,
        success     : (res) => {
          // 数据请求成功
          if (res.status === 0) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if (res.status === 10) {
            // 未登陆
            this.doLogin()
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        }
        ,
        error        : (err) => {
          console.log(err)
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
  }
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }
  // 获取url参数
  getUrlParam(name) {
    // xxx.com?param=123&params1=456
    let queryString = window.location.search.split('?')[1] || '',
        reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result      = queryString.match(reg)
    return result ? decodeURIComponent(result[2]) : null

  }
  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || '好像哪里不对')
  }

  /**
   * 存入本地
   * @param name
   * @param data
   */
  setStorage(name, data) {
    let dataTye = typeof data
    // json 类型
    if (dataTye === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    }
    // 基础类型
    else if (['number', 'string', 'boolean'].indexOf(dataTye) >= 0) {
      window.localStorage.setItem(name, data)
    }
    // 其他不支持的类型
    else {
      alert('该类型不能用于存储')
    }
  }
  /**
   * 取出存储的内容
   * @param name
   * @returns {string|any}
   */
  getStorage(name) {
    let data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    }
    else {
      return ''
    }
  }
  /**
   * 删除本地存储
   * @param name
   */
  removeStorage(name) {
    window.localStorage.removeItem(name)
  }
}

export default CUtil