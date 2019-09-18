import React from 'react'
import PageTitle from "../component/pageTitle/index.jsx"

class Home extends React.Component {
  render() {
    return (
      <div id='page-wrapper'>
        <div className="row">
          <PageTitle title='首页' />
          <div className="col-md-12">
            body
          </div>
        </div>
      </div>
    )
  }
}

export default Home