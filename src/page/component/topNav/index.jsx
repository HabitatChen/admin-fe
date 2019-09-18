import React from 'react'
import {Link} from 'react-router-dom'

class TopNav extends React.Component {

  constructor(props) {
    super(props)
  }

  onLogout() {

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
                <span>欢迎,xxxxxx</span>
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