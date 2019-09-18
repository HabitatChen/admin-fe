import React from 'react'
import {Link, NavLink} from 'react-router-dom'

class SideNav extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="wrapper">
        <div className="navbar-default navbar-side">
          <div className="sidebar-collapse">
            <ul className="nav" >
              <li>
                <NavLink exact activeClassName='active-menu' className="" to="/">
                  <i className="fa fa-dashboard" />
                  <span>首页</span>
                </NavLink>
              </li>
              <li className='active'>
                <Link to='/product'>
                  <i className="fa fa-sitemap" />
                  <span>商品</span>
                  <span className="fa arrow" />
                </Link>
                <ul className="nav nav-second-level collapse in">
                  <li>
                    <NavLink exact to='/product' activeClassName='active-menu'>商品管理</NavLink>
                  </li>
                  <li>
                    <NavLink exact to='/product/category' activeClassName='active-menu'>品类管理</NavLink>
                  </li>
                </ul>
              </li>
              <li className='active'>
                <Link to='/order'>
                  <i className="fa fa-sitemap" />
                  <span>订单</span>
                  <span className="fa arrow" />
                </Link>
                <ul className="nav nav-second-level collapse in">
                  <li>
                    <NavLink exact to='/order' activeClassName='active-menu'>订单管理</NavLink>
                  </li>
                </ul>
              </li>
              <li className='active'>
                <Link to='/user'>
                  <i className="fa fa-sitemap" />
                  <span>用户</span>
                  <span className="fa arrow" />
                </Link>
                <ul className="nav nav-second-level collapse in">
                  <li>
                    <NavLink exact to='/user' activeClassName='active-menu'>用户管理</NavLink>
                  </li>
                </ul>
              </li>

            </ul>

          </div>

        </div>
      </div>
    )
  }
}

export default SideNav