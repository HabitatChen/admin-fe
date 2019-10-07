import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

// 页面
import ProductList from './index/index.jsx'
import ProductSave from './save.jsx'
import ProductDetail from './index/detail.jsx'

class ProductRouter extends React.Component {
  // 构造方法
  constructor(props) {
    super(props) // 继承父级指针
    this.state = {
    }
  }

  render() {
    return(
      <Switch>
        <Route path='/product/index' component={ProductList} />
        <Route path='/product/save/:pid?' component={ProductSave} />
        <Route path='/product/detail/:pid' component={ProductDetail} />
        <Redirect from='/product' to='/product/index' exact />
      </Switch>
    )
  }
}

export default ProductRouter


