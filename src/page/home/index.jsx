import React     from 'react'
import PageTitle from "../component/pageTitle/index.jsx"
import { Link }  from 'react-router-dom'
import                '../component/layout/index.scss'
import                './index.scss'
import Statistic from 'service/statistic-service.jsx'
import MUtil     from 'util/mm.jsx'

const _statistic = new Statistic()
const _mm = new MUtil()

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userCount   : '-',
      productCount: '-',
      orderCount  : '-'
    }
  }

  componentDidMount() {
    this.loadCount()
  }

  /**
   * 获得首页初始化数据
   */
  loadCount() {
    _statistic.getHomeCount().then(res => {
      this.setState(res)
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }

  render() {
    return (
      <div id='page-wrapper'>
        <div className="row">
          <PageTitle title='首页' />
          <div className='col-md-12 countWrap'>
            <div className="col-md-4">
              <Link to='/user' className='color-box green'>
                <p className="count">{this.state.userCount}</p>
                <p className='desc'>
                  <i className="fa fa-user-o"/>
                  <span>用户总数</span>
                </p>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to='/product' className='color-box brown'>
                <p className="count">{this.state.productCount}</p>
                <p className='desc'>
                  <i className="fa fa-list"/>
                  <span>商品总数</span>
                </p>
              </Link>
            </div><div className="col-md-4">
            <Link to='/user' className='color-box blue'>
              <p className="count">{this.state.orderCount}</p>
              <p className='desc'>
                <i className="fa fa-check-square-o"/>
                <span>订单总数</span>
              </p>
            </Link>
          </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Home