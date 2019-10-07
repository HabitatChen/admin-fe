import React from 'react'
import PageTitle from "component/pageTitle/index.jsx"
import CategorySelector from './category-select.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
import '../save.scss'
import Product    from 'service/product-service.jsx'
const _product = new Product()


class ProductDetail extends React.Component {
  // 构造方法
  constructor(props) {
    super(props) // 继承父级指针
    this.state = {
      id                : this.props.match.params.pid || '',
      categoryId        : 0,   // 二级分类ID
      parentCategoryId  : 0,   // 一级分类ID
      subImages         : [],
      detail            : '',
      name              : '',
      subtitle          : '',
      stock             : '',
      price             : '',
      status            : 1 // 1: 在售
    }
  }

  componentDidMount() {
    this.loadProduct()
  }

  loadProduct() {
    // 有ID的时候说明是编辑，需要表单回填
    if (this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        if (res.subImages !== null) {
          let images = res.subImages && res.subImages.split(',')
          res.subImages = images.map(imgUri => {
            return {
              uri: imgUri,
              url: res.imageHost + imgUri
            }
          })
        } else {
          res.subImages = []
        }
        this.setState(res)
        console.log('res')
        console.log(res)
      }, err => {
        _mm.errorTips(err)
      })
    }
  }



  /**
   * 把subImages变化一下
   * @returns {string[]}
   */
  getSubImagesString() {
    return this.state.subImages.map(item => {
      return item.uri
    }).join(',')
  }

  render() {
    return(
      <div id='page-wrapper'>
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="form-control-static">
                { this.state.name }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <p className="form-control-static">
                { this.state.subtitle }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
            />

          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  readOnly
                  value={this.state.price}
                  />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  readOnly
                  value={this.state.stock}
                  />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">上传图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length ? this.state.subImages.map((item, index) => {
                  return (
                    <div className='img-con'>
                      <img src={item.url} key={index}/>
                    </div>

                  )
                }) : <div>暂无图片</div>
              }
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}} />
          </div>

        </div>
      </div>
    )
  }
}

export default ProductDetail

