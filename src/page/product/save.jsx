import React from 'react'
import PageTitle from "component/pageTitle/index.jsx"
import CategorySelector from './index/category-select.jsx'
import FileUploader from "util/file-uploader/index.jsx"
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
import './save.scss'
import RichEditor from "util/rich-editor/index.jsx"
import Product    from 'service/product-service.jsx'
const _product = new Product()


class ProductSave extends React.Component {
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
        res.defaultDetail = res.detail
        this.setState(res)
      }, err => {
        _mm.errorTips(err)
      })
    }
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
   * 父级组件获得子组件的选中值
   * @param categoryId        二级品类ID
   * @param parentCategoryId  一级品类ID
   */
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId
    })
  }

  /**
   * 上传成功
   * @param res
   */
  onUploadSuccess(res) {
    let tempImageList = this.state.subImages
    tempImageList.push(res.data)
    this.setState({
      subImages: tempImageList
    })
  }

  /**
   * 上传失败
   * @param err
   */
  onUploadErr(err) {
    _mm.errorTips(err.message || '上传图片错误')
  }

  /**
   * 删除图片
   * @param e
   * @param index
   */
  onImageDelete(e, index) {
    // 如果通过 e 来传递index 的话
    // let index = e.target.getAttribute('index')
    let subImages = this.state.subImages
    subImages.splice(index, 1)
    this.setState({
      subImages
    })

  }

  /**
   * 富文本编辑器值变化
   * @param value
   */
  onRichEditorChange(value) {
    this.setState({
      detail: value
    })
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
  /**
   * 提交表单
   * @param e
   */
  onSubmit(e) {
    let product = {
      name       : this.state.name,
      subtitle   : this.state.subtitle,
      categoryId : parseInt(this.state.categoryId),
      subImages  : this.getSubImagesString(),
      detail     : this.state.detail,
      price      : parseInt(this.state.price),
      stock      : parseInt(this.state.stock),
      status     : this.state.status,
    }
    let productCheckResult = _product.checkProduct(product)
    // 说明是编辑
    if (this.state.id) {
      product.id = this.state.id
    }
    // 表单验证成功
    if (productCheckResult.status) {
      _product.saveProduct(product).then(res => {
        _mm.successTips(res)
        this.props.history.push('/product/index')
      }, err => {
        _mm.errorTips(err)
      })
    } else {
      // 表单验证失败
      _mm.errorTips(productCheckResult.msg)
    }
  }

  render() {
    return(
      <div id='page-wrapper'>
        <PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                name='name'
                value={this.state.name}
                onChange={(e) => {this.onValueChange(e)}}
                placeholder="请输入商品名称"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                name='subtitle'
                value={this.state.subtitle}
                onChange={(e) => {this.onValueChange(e)}}
                type="text" className="form-control" placeholder="请输入商品描述" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}}
            />

          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  name='price'
                  onChange={(e) => {this.onValueChange(e)}}
                  type="number"
                  value={this.state.price}
                  className="form-control"
                  placeholder="价格"
                  aria-describedby="basic-addon2"/>
                  <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  name='stock'
                  value={this.state.stock}
                  onChange={(e) => {this.onValueChange(e)}}
                  type="number" className="form-control" placeholder="库存"
                       aria-describedby="basic-addon2"/>
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
                      <i className="fa fa-close" onClick={(e) => {this.onImageDelete(e, index)}}/>
                    </div>

                  )
                }) : <div>请上传图片</div>
              }
            </div>
            <div className="col-md-10 col-md-offset-2">
              <FileUploader
                onSuccess={(res) => {this.onUploadSuccess(res)}}
                onErr={(err) => {this.onUploadErr(err)}}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={(value) => {this.onRichEditorChange(value)}}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button onClick={(e) => {this.onSubmit(e)}} type="click" className="btn btn-primary">提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave

