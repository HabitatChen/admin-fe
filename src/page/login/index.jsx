import React from 'react'
import User  from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'
import './index.scss'

const _user = new User()
const _mm = new MUtil()

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || ''
    }
  }

  componentWillMount() {
    document.title = '登录 - MMall Admin'
  }

  handleInputChange(e) {
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState({
      [inputName]: inputValue
    })
  }

  /**
   * 表单提交 数据层和视图层分离
   */
  onSubmit() {
    let { username, password } = this.state,
        loginInfo              = { username,password },
        checkResult            = _user.checkLoginInfo(loginInfo)
    // 验证通过
    if (checkResult.status) {
      _user.login(loginInfo).then((res) => {
        _mm.setStorage('userInfo', res)
        this.props.history.push(this.state.redirect)
      }, (errMsg) => {
        _mm.errorTips(errMsg)
      })
    }
    // 未通过验证
    else {
      _mm.errorTips(checkResult.msg)
    }
  }

  /**
   * 监听回车事件
   * @returns e
   */
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit()
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登陆 - Ck 登陆系统系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group form-item">
                <input
                  value={this.state.username}
                  name='username'
                  onChange={(e) => {this.handleInputChange(e)}}
                  className="form-control"
                  onKeyUp={ e => this.onInputKeyUp(e)}
                  placeholder="请输入用户名" />
              </div>
              <div className="form-group form-item">
                <input
                  value={this.state.password}
                  onChange={(e) => {this.handleInputChange(e)}}
                  name='password'
                  type="password"
                  onKeyUp={ e => this.onInputKeyUp(e)}
                  className="form-control"
                  placeholder="请输入密码" />
              </div>
              <button
                onClick={() => {this.onSubmit()}}
                className="btn btn-lg btn-primary btn-block" >登陆</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login