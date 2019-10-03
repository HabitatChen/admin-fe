import React      from 'react'
import PageTitle  from "../component/pageTitle/index.jsx"
import { Link }   from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import User       from 'service/user-service.jsx'
import MUtil      from 'util/mm.jsx'

const _user = new User()
const _mm   = new MUtil()

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum      : 1,
      firstLoading : true,
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
      this.setState(res, () => {
        this.setState({
          firstLoading: false
        })
      })
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
        <PageTitle title="用户管理">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-striped table-border">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>电话</th>
                    <th>注册时间</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.list.length > 0
                    ? this.state.list.map((user, index) => {
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
                    : (
                      <tr>
                        <td colSpan='5' className='text-center'>
                          { this.state.firstLoading ? '正在加载数据...' : ' 没有找到响应的结果~' }
                        </td>
                      </tr>
                    )
                }

                </tbody>
              </table>
            </div>
          </div>
        </PageTitle>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
      </div>
    )
  }
}

export default UserList