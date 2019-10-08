import React      from 'react'
import PageTitle  from "component/pageTitle/index.jsx"
import Product       from 'service/product-service.jsx'
import MUtil      from 'util/mm.jsx'
import TableList from "util/tableList/index.jsx"
import {Link} from "react-router-dom"

const _product = new Product()
const _mm   = new MUtil()

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list         : [],
      parentCategoryId: this.props.match.params.categoryId || 0
    }
  }

  componentDidMount() {
    this.loadCategoryList()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update')
    console.log(this.props.match.params.categoryId)
    let oldPath = prevProps.location.pathname
    let newPath = this.props.location.pathname
    let newId = this.props.match.params.categoryId || 0
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId
      }, () => {
        this.loadCategoryList()
      })
    }
  }

  /**
   * 请求品类列表信息
   */
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      })
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }

  /**
   * 修改名称
   * @param id
   * @param name
   */
  onUpdateName(id, name) {
    let newName = window.prompt('请输入新的名称', name)
    if (newName) {
      _product.updateCategoryName({
        categoryId: id,
        categoryName: newName
      }).then(res => {
        _mm.successTips(res)
        this.loadCategoryList()
      }, err => {
        _mm.errorTips(err)
      })
    }
  }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title="品类列表">
          <div className="page-header-right">
            <Link className='btn btn-primary' to='/product-category/add'>
              <i className="fa fa-puls" />
              <span> 添加品类 </span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList
          tableHeads={['品类ID', '品类名称', '操作']}
        >
          {
            this.state.list.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <a
                      onClick={(e) => {this.onUpdateName(category.id, category.name)}}
                      className="opear"
                    >修改名称</a>
                    {
                      category.parentId === 0
                        ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                        : null
                    }
                  </td>
                </tr>
              )
            })
          }
        </TableList>
      </div>
    )
  }
}

export default CategoryList