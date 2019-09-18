import React from 'react'

class PageTitle extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    document.title = this.props.title + '-' + 'CccK'
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className='page-header' style={{marginLeft: '10px'}}>{this.props.title}</h1>
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}

export default PageTitle