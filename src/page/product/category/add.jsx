import React      from 'react'
import PageTitle  from "component/pageTitle/index.jsx"
import Product       from 'service/product-service.jsx'
import MUtil      from 'util/mm.jsx'

const _product = new Product()
const _mm   = new MUtil()

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryList : [],
      parentId     : 0,
      categoryName : ''
    }
  }

  componentDidMount() {
    this.loadCategoryList()
  }
  /**
   * 请求品类列表信息
   */
  loadCategoryList() {
    _product.getCategoryList().then(res => {
      this.setState({
        categoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }

  /**
   * 简单字段的改变 如商品名称、描述、价格、库存
   * @param e
   */
  onValueChange(e) {
    let name = e.target.name
    let value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }

  /**
   * 提交表单
   * @param e
   */
  onSubmit(e) {
    let categoryName = this.state.categoryName
    // 如果品类不为空 直接提交
    if (categoryName) {
      _product.saveCategory({
        parentId     : this.state.parentId,
        categoryName : this.state.categoryName
      }).then(res => {
        _mm.successTips(res)
        this.props.history.push('/product-category/index')
      }, err => {
        _mm.errorTips(err)
      })
    } else {
      // 否则 提示错误
      _mm.errorTips('请输入品类名称')
    }
  }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title="品类列表" />
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">所属品类</label>
                <div className="col-md-5">
                  <select
                    onChange={(e) => {this.onValueChange(e)}}
                    name="parentId"
                    className='form-control'>
                    <option value="0">根品类/</option>
                    {
                      this.state.categoryList.map((category, index) => {
                        return (<option value={category.id} key={index}>根品类/{category.name}</option>)
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">品类名称</label>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    name='categoryName'
                    value={this.state.name}
                    onChange={(e) => {this.onValueChange(e)}}
                    placeholder="请输入品类名称"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button onClick={(e) => {this.onSubmit(e)}} type="click" className="btn btn-primary">提交</button>
                </div>
              </div>
            </div>

          </div>
        </div>
     </div>
    )
  }
}

export default CategoryAdd