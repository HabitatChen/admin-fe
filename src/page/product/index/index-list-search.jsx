import React from 'react'

class ListSearch extends React.Component {
  // 构造方法
  constructor(props) {
    super(props) // 继承父级指针
    this.state = {
      searchType    : 'productId', // productId productName
      searchKeyword : '' // 搜索关键字
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
    let { searchType, searchKeyword } = this.state
    this.props.onSearch(searchType, searchKeyword)
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
              <select
                name='searchType'
                onChange={(e) => {this.onValueChange(e)}}
                className="form-control">
                <option value='productId'>按商品ID查询</option>
                <option value='productName'>按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input
                name='searchKeyword'
                onChange={(e) => {this.onValueChange(e)}}
                type="text"
                className="form-control"
                onKeyUp={(e) => {this.onSearchKeywordKeyUp(e)}}
                placeholder="关键字"/>
            </div>
            <button onClick={(e) => {this.onSearch(e)}} className="btn btn-primary">搜索</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListSearch


