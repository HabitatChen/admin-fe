import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
import './index.scss'

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

import Layout from "./page/component/layout/index.jsx"
// 页面
import Home from './page/home/index.jsx'

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
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/product' component={Home} />
            <Route exact path='/product/category' component={Home} />
          </Switch>
        </Layout>
      </Router>
    )
  }

}

ReactDOM.render(
  <App/> ,
  document.getElementById('app')
)



