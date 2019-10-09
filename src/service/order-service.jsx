import MUtil from 'util/mm.jsx'
const _mm = new MUtil()

class Order {
  /**
   * 获取商品列表信息
   */
  getOrderList(listParam) {
    let url  = ''
    let data = {}
    if (listParam.listType === 'list') {
      url          = '/manage/order/list.do'
      data.pageNum = listParam.pageNum
    } else if (listParam.listType === 'search') {
      url                        = '/manage/order/search.do'
      data.pageNum               = listParam.pageNum
      data.orderNo               = listParam.orderNo
    }

    return _mm.request({
      type: 'post',
      url,
      data,
    })
  }

  /**
   * 获取订单详情
   * @param orderNumber 详情id
   */
  getOrderDetail(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNumber
      }
    })
  }

  sendGoods(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo: orderNumber
      }
    })
  }
}

export default Order