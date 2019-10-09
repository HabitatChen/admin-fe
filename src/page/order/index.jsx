import React      from 'react'
import PageTitle  from "component/pageTitle/index.jsx"
import { Link }   from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import Order    from 'service/order-service.jsx'
import MUtil      from 'util/mm.jsx'
import TableList  from "util/tableList/index.jsx"
import ListSearch from "./index-list-search.jsx"

const _order = new Order()
const _mm   = new MUtil()

class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum      : 1,
      list         : [],
      listType     : 'list', // list / search
      orderNumber  : ''
    }
  }

  componentDidMount() {
    this.loadOrderList()
  }

  /**
   * 请求用户列表信息
   */
  loadOrderList() {
    let listParam = {}
    listParam.listType = this.state.listType
    listParam.pageNum  = this.state.pageNum
    // 如果是搜索 需要传入搜索类型和搜索关键字
    if (this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNumber
    }
    // 请求接口
    _order.getOrderList(listParam).then(res => {
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
      this.loadOrderList()
    })
  }
  /**
   * 父级组件定义搜索方法
   * @param orderNumber     订单号
   */
  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search'
    this.setState({
      listType,
      pageNum: 1,
      orderNumber: orderNumber,
    }, () => {
      this.loadOrderList()
    })
  }

  render() {
    let tableHeads = [
      {
        name: '订单号',
        width: '10%'
      },{
        name: '收件人',
        width: '50%'
      },{
        name: '订单状态',
        width: '10%'
      },{
        name: '订单总价',
        width: '15%'
      },{
        name: '创建时间',
        width: '15%'
      },{
        name: '操作',
        width: '15%'
      },
    ]
    return (
      <div id='page-wrapper'>
        <PageTitle title="订单列表" />
        <ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}}/>
        <TableList
          tableHeads={tableHeads}
        >
          {
            this.state.list.map((order, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/order/detail/${order.orderNumber}`}>
                      {order.orderNo}
                    </Link>
                  </td>
                  <td>{order.receiverName}</td>
                  <td>{order.statusDesc}</td>
                  <td>{order.payment}</td>
                  <td>¥{order.createTime}</td>
                  <td>
                    <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
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

export default OrderList