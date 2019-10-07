import React      from 'react'

import Product    from 'service/product-service.jsx'
import MUtil      from 'util/mm.jsx'
import './category-select.scss'

const _product = new Product()
const _mm   = new MUtil()


class CategorySelector extends React.Component {
  // 构造方法
  constructor(props) {
    super(props) // 继承父级指针
    this.state = {
      firstCategoryList : [],
      firstCategoryId   : 0,
      secondCategoryList: [],
      secondCategoryId  : 0
    }
  }

  componentWillReceiveProps(nextProps) {
    let categoryIdChange        = nextProps.categoryId !== this.props.categoryId
    let parentCategoryIdChange  = nextProps.parentCategoryId !== this.props.parentCategoryId
    // 数据没有发生变化的时候 直接不做处理
    if (!categoryIdChange && !parentCategoryIdChange) {
      return
    }
    console.log('nextProps', nextProps)
    // 假如只有一级品类 没有二级品类
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId  : nextProps.categoryId,
        secondCategoryId : 0
      }, () => {
        this.loadFirstCategory()
      })
    } else {
      // 如果有两层 渲染的同时需要把两层的列表渲染出来
      this.setState({
        firstCategoryId  : nextProps.parentCategoryId,
        secondCategoryId : nextProps.categoryId
      }, () => {
        this.loadFirstCategory()
        parentCategoryIdChange && this.loadSecondCategory()
      })
    }

  }

  componentDidMount() {
    this.loadFirstCategory()
  }

  /**
   * 加载一级分类
   */
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }

  /**
   * 加载二级分类
   */
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }

  /**
   * 选择一级品类
   */
  onFirstCategoryChange(e) {
    if (this.props.readOnly) {
      return
    }
    let newValue = e.target.value || 0
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      // 更新二级分类
      this.loadSecondCategory()
      this.onPropsCategoryChange()
    })
  }

  /**
   * 选择二级品类
   * @param e
   */
  onSecondCategoryChange(e) {
    if (this.props.readOnly) {
      return
    }
    let newValue = e.target.value || 0
    this.setState({
      secondCategoryId: newValue,
    }, () => {
      // 更新二级分类
      this.onPropsCategoryChange()
    })
  }

  /**
   * 把结果传递给父级组件
   */
  onPropsCategoryChange() {
    // 是否有该函数
    let categoryChangeable = typeof this.props.onCategoryChange === 'function'
    if (this.state.secondCategoryId) {
      categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    } else {
      // 如果只有一级分类
      categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }

  render() {
    return(
      <div className="col-md-10">
        <select className='form-control cate-select'
                value={this.state.firstCategoryId}
                readOnly={this.props.readOnly}
                onChange={(e) => {this.onFirstCategoryChange(e)}}
        >
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map((category, index) => {
              return (
                <option value={category.id} key={index}>{category.name}</option>
              )
            })
          }
        </select>
        {
          this.state.secondCategoryList.length > 0 ? (
            <select className='form-control cate-select'
                    value={this.state.secondCategoryId}
                    readOnly={this.props.readOnly}
                    onChange={(e) => {this.onSecondCategoryChange(e)}}
            >
              <option value="">请选择二级分类</option>
              {
                this.state.secondCategoryList.map((category, index) => {
                  return (
                    <option value={category.id} key={index}>{category.name}</option>
                  )
                })
              }
            </select>
          ) : null
        }


      </div>
    )
  }
}

export default CategorySelector


