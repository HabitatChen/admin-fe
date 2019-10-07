import React     from 'react'

// 通用表格组件
class BasicTableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFirstLoading: true
    }
  }

  componentWillReceiveProps() {
    // 列表只有在第一次挂在的时候 isFirstLoading 才会为true
    this.setState({
      isFirstLoading: false
    })
  }

  render() {
    // 表头信息
    let tableHeader = this.props.tableHeads.map((item, index) => {
      if (typeof item === 'object') {
        return <th width={item.width} key={index}>{item.name}</th>
      } else if (typeof item === 'string') {
        return <th key={item}>{item}</th>
      }
    } )
    // 列表信息
    let listBody = this.props.children
    // 列表信息
    let listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className='text-center'>
          {
            this.state.isFirstLoading ? '正在加载中...' : '没有找到对应数据'
          }
        </td>
      </tr>
    )
    let tableBody = listBody.length > 0 ? listBody : listInfo
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-border">
            <thead>
            {/*表头*/}
            <tr> { tableHeader } </tr>
            </thead>
            <tbody> { tableBody } </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default BasicTableList
