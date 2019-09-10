import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'
import './index.scss'
import bike from './assets/bike.jpg'

class App extends React.Component {
  render() {
    return(
      <div>

        <div>
          <i className='fa fa-address-book' />
        </div>
        <h1>hello</h1>
        world
        hello
        <img src={bike} alt=""/>
      </div>

    )
  }

}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)


