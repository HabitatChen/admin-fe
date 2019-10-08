import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

// 页面
import ProductList from './index/index.jsx'
import ProductSave from './save.jsx'
import ProductDetail from './index/detail.jsx'
import CategoryList from "page/product/category/index.jsx"
import CategoryAdd from "page/product/category/add.jsx"

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
        <Route path='/product-category/index/:categoryId?' component={CategoryList} />
        <Route path='/product-category/add' component={CategoryAdd} />
        <Redirect from='/product' to='/product/index' exact />
        <Redirect from='/product-category' to='/product-category/index' exact />
      </Switch>
    )
  }
}

export default ProductRouter


