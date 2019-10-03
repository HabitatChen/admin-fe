import React from 'react'
import User  from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'

const _user = new User()
const _mm = new MUtil()

import {Link} from 'react-router-dom'

class TopNav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: _mm.getStorage('userInfo').username || ''
    }
  }

  onLogout() {
    _user.logOut().then(res => {
        _mm.removeStorage('userInfo')
        window.location.href = '/login'
      }, errMsg => {
        _mm.errorTips(errMsg)
      }
    )
  }

  render() {
    return (
      <div id="wrapper">
        <div className="navbar navbar-default top-navbar">
          <div className="navbar-header">
            <Link className="navbar-brand" to='/'><b>In</b>sight</Link>
          </div>

          <ul className="nav navbar-top-links navbar-right">
            <li className="dropdown">
              <a className="dropdown-toggle" href="javascript:;">
                <i className="fa fa-user fa-fw"></i>
                {
                  this.state.username
                    ? <span>欢迎,{this.state.username}</span>
                    : <span>欢迎您</span>
                }
                <i className="fa fa-caret-down"></i>
              </a>
              <ul className="dropdown-menu dropdown-user">
                <li>
                  <span onClick={() => {this.onLogout()}}>
                    <i className="fa fa-sign-out fa-fw" />
                    <span> Logout </span>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default TopNav