import MUtil from 'util/mm.jsx'
const _mm = new MUtil()

class Product {
  /**
   * 获取商品列表信息
   */
  getProductList(listParam) {
    let url  = ''
    let data = {}
    if (listParam.listType === 'list') {
      url          = '/manage/product/list.do'
      data.pageNum = listParam.pageNum
    } else if (listParam.listType === 'search') {
      url                        = '/manage/product/search.do'
      data.pageNum               = listParam.pageNum
      data[listParam.searchType] = listParam.keyword
    }

    return _mm.request({
      type: 'post',
      url,
      data,
    })
  }
  /**
   * 变更商品销售状态
   * @param productInfo
   * @returns {Promise<unknown>}
   */
  setProductStatus(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    })
  }

  /*===========品类相关===============*/


  /**
   * 获得一级或者二级品类的值
   * @param parentCategoryId
   * @returns {Promise<unknown>}
   */
  getCategoryList(parentCategoryId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId || 0
      }
    })
  }

  /**
   * 检查表单保存商品的表单数据
   */
  checkProduct(product) {
    let result = {
      status: true,
      msg: '验证通过',
    }
    let { name, subtitle, categoryId, subImages, detail, price, stock, status } = product
    if (typeof name !== 'string' || product.name.length === 0) {
      return {
        status: false,
        msg: '商品名称不能为空'
      }
    }
    if (typeof subtitle !== 'string' || subtitle.length === 0) {
      return {
        status: false,
        msg: '描述不能为空'
      }
    }
    if (typeof price !== 'number' || price < 0) {
      return {
        status: false,
        msg: '请输入正确的商品价格'
      }
    }
    if (typeof stock !== 'number' || stock < 0) {
      return {
        status: false,
        msg: '请输入正确的库存数量'
      }
    }
    if (typeof categoryId !== 'number' || categoryId < 0) {
      return {
        status: false,
        msg: '请选择正确的商品品类'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    }
  }

  /**
   * 保存商品
   */
  saveProduct(product) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    })
  }

  /**
   * 获取商品详情
   */
  getProduct(id) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: id || 0
      }
    })
  }


}

export default Product