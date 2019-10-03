import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
import './index.scss'

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

import Layout from "./page/component/layout/index.jsx"
// 页面
import Home from './page/home/index.jsx'
import Login from './page/login/index.jsx'
import Error from './page/error/index.jsx'
import UserList from './page/user/index.jsx'


class App extends React.Component {
  // 构造方法
  constructor(props) {
    super(props) // 继承父级指针
    this.state = {
    }
  }

  render() {
    return(
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' render={(props) =>
            (
              <Layout>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/product' component={Home} />
                  <Route exact path='/product/category' component={Home} />
                  <Route exact path='/user/index' component={UserList} />
                  <Redirect exact from='/user' to='/user/index'/>
                  <Route component={Error} />
                </Switch>
              </Layout>
            )
          } />
        </Switch>

      </Router>
    )
  }

}

ReactDOM.render(
  <App/> ,
  document.getElementById('app')
)



