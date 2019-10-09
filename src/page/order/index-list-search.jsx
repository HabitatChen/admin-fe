import React from 'react'

class ListSearch extends React.Component {
  // 构造方法
  constructor(props) {
    super(props) // 继承父级指针
    this.state = {
      orderNumber: '', // productId productName
    }
  }

  /**
   * 搜索类型的改变/搜索值的改变
   * @param e
   */
  onValueChange(e) {
    let name = e.target.name
    let value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }

  /**
   * 点击搜索按钮触发事件, 从父组件传入方法
   */
  onSearch(e) {
    this.props.onSearch(this.state.orderNumber)
  }

  /**
   * 搜索按钮的回车事件
   * @param e
   */
  onSearchKeywordKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }

  render() {
    return(
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control">
                <option>按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input
                name='orderNumber'
                onChange={(e) => {this.onValueChange(e)}}
                type="text"
                className="form-control"
                onKeyUp={(e) => {this.onSearchKeywordKeyUp(e)}}
                placeholder="订单号"/>
            </div>
            <button onClick={(e) => {this.onSearch(e)}} className="btn btn-primary">搜索</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListSearch


