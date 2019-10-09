import React      from 'react'
import PageTitle  from "component/pageTitle/index.jsx"
import { Link }   from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import Product    from 'service/product-service.jsx'
import MUtil      from 'util/mm.jsx'
import TableList  from "util/tableList/index.jsx"
import ListSearch from "./index-list-search.jsx"
import './index.scss'

const _product = new Product()
const _mm   = new MUtil()

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum      : 1,
      list         : [],
      listType     : 'list'
    }
  }

  componentDidMount() {
    this.loadProductList()
  }

  /**
   * 请求用户列表信息
   */
  loadProductList() {
    let listParam = {}
    listParam.listType = this.state.listType
    listParam.pageNum  = this.state.pageNum
    // 如果是搜索 需要传入搜索类型和搜索关键字
    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType
      listParam.keyword    = this.state.searchKeyword
    }
    // 请求接口
    _product.getProductList(listParam).then(res => {
      this.setState(res)
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
      this.loadProductList()
    })
  }

  /**
   * 改变商品状态 上架/下架
   * @param e
   * @param status
   */
  onSetProductStatus(e, productId, status) {
    let newStatus = status == 1 ? 2 : 1
    let confirmTips = status == 1 ? '确定要下架该商品?' : '确定要上架该商品?'
    if (window.confirm(confirmTips)) {
      _product.setProductStatus({
        productId,
        status: newStatus
      }).then(res => {
        _mm.successTips(res)
        this.loadProductList()
      }, err => {
        _mm.errorTips(err)
      })
    }
  }

  /**
   * 父级组件定义搜索方法
   * @param searchType     搜索类型
   * @param searchKeyword  搜索关键字
   */
  onSearch(searchType, searchKeyword) {
    let listType = searchKeyword === '' ? 'list' : 'search'
    this.setState({
      listType,
      pageNum: 1,
      searchType,
      searchKeyword
    }, () => {
      this.loadProductList()
    })
  }

  render() {
    let tableHeads = [
      {
        name: '商品ID',
        width: '10%'
      },{
        name: '商品信息',
        width: '50%'
      },{
        name: '价格',
        width: '10%'
      },{
        name: '状态',
        width: '15%'
      },{
        name: '操作',
        width: '15%'
      },
    ]
    return (
      <div id='page-wrapper'>
        <PageTitle title="商品列表">
          <div className="page-header-right">
            <Link className='btn btn-primary' to='product/add'>
              <i className="fa fa-puls" />
              <span> 添加商品 </span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
        <TableList
          tableHeads={tableHeads}
        >
          {
              this.state.list.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>
                      <p>{product.name}</p>
                      <p>{product.subtitle}</p>
                    </td>
                    <td>¥{product.price}</td>
                    <td>
                      <p> { product.status == 1 ? '在售' : '已下架' } </p>
                      <button className='btn btn-xs btn-warning' onClick={(e) => {this.onSetProductStatus(e,product.id, product.status)}}>{ product.status == 1 ? '下架' : '上架' }</button>
                    </td>
                    <td>
                      <Link className='opear' to={`/product/detail/${product.id}`}>详情</Link>
                      <Link className='opear' to={`/product/save/${product.id}`}>编辑</Link>
                    </td>
                  </tr>
                )
              })
          }
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
      </div>
    )
  }
}

export default ProductList