import React     from 'react'
import PageTitle from "../component/pageTitle/index.jsx"
import { Link }  from 'react-router-dom'

class Error extends React.Component {
  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title="出错了!">
          <div className="row">
            <div className="col-md-12">
              <span>找不到该路径, </span>
              <Link to='/'>点我返回</Link>
            </div>
          </div>
        </PageTitle>
      </div>
    )
  }
}

export default Error