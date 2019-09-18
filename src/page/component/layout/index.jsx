import React from 'react'
import './index.scss'
import SideNav from '../sideNav/index.jsx'
import TopNav from '../topNav/index.jsx'

class Layout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="wrapper">
        <TopNav/>
        <SideNav />

        {
          this.props.children
        }
      </div>
    )
  }
}

export default Layout