import React from 'react'
import PageTitle from "component/pageTitle/index.jsx"
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
import Order    from 'service/order-service.jsx'
import TableList from 'util/tableList/index.jsx'
import {Link} from "react-router-dom"
import './index.scss'
const _order = new Order()


class ProductDetail extends React.Component {
  // 构造方法
  constructor(props) {
    super(props) // 继承父级指针
    this.state = {
      orderNumber : this.props.match.params.orderNumber || '',
      orderInfo   : {}
    }
  }

  componentDidMount() {
    this.loadOrderDetail()
  }

  loadOrderDetail() {
    // 有ID的时候说明是编辑，需要表单回填
    _order.getOrderDetail(this.state.orderNumber).then(res => {
      this.setState({
        orderInfo: res
      })
    })
  }

  /**
   * 发货
   */
  onSendGoods(e) {
    if (window.confirm('是否该订单已经发货?')) {
      _order.sendGoods(this.state.orderNumber).then(res => {
        _mm.successTips('发货成功')
        this.loadOrderDetail()
      }, err => {
        _mm.errorTips(err)
      })
    }
  }

  render() {
    let { orderInfo } = this.state
    let receiverInfo = this.state.orderInfo.shippingVo || {}
    let productList = this.state.orderInfo.orderItemVoList || []
    let tableHead = [{
      name: '商品图片',
      width: '50%'
    },{
      name: '商品信息',
      width: '10%'
    },{
      name: '单价',
      width: '10%'
    },{
      name: '数量',
      width: '15%'
    },{
      name: '合计',
      width: '15%'
    }]
    return(
      <div id='page-wrapper'>
        <PageTitle title="订单详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="form-control-static">
                { orderInfo.orderNo }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">
                { orderInfo.createTime }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                { receiverInfo.receiverName }，
                { receiverInfo.receiverProvince } -
                { receiverInfo.receiverCity } -
                { receiverInfo.receiverAddress }
                { receiverInfo.receiverMobile || receiverInfo.receiverPhone }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">
                { orderInfo.statusDesc }
                {
                  orderInfo.status === 10
                  ? <button
                      onClick={(e) => {this.onSendGoods(e)}}
                      className='btn btn-detault btn-sm'
                    >立即发货</button>
                    : null
                }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">
                { orderInfo.paymentTypeDesc }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">
                ¥{ orderInfo.payment }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-10">
              <TableList
                tableHeads={tableHead}
              >
                {
                  productList.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            className='p-img'
                            src={`${orderInfo.imageHost}${product.productImage}`}
                            alt={product.productName}/>
                        </td>
                        <td>{product.productName}</td>
                        <td>¥{product.currentUnitPrice}</td>
                        <td>{product.quantity}</td>
                        <td>{product.totalPrice}</td>
                      </tr>
                    )
                  })
                }
              </TableList>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default ProductDetail

