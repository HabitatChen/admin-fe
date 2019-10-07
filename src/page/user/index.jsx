import React      from 'react'
import PageTitle  from "../component/pageTitle/index.jsx"
import { Link }   from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import User       from 'service/user-service.jsx'
import MUtil      from 'util/mm.jsx'
import TableList from "util/tableList/index.jsx"

const _user = new User()
const _mm   = new MUtil()

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum      : 1,
      list         : []
    }
  }

  componentDidMount() {
    this.loadUserList()
  }

  /**
   * 请求用户列表信息
   */
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }

  /**
   * 当分页器当前页面改变
   * @param pageNum 当前页面
   */
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title="用户管理" />
        <TableList
          tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}
        >
          {
            this.state.list.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
              )
            })
          }
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
      </div>
    )
  }
}

export default UserList