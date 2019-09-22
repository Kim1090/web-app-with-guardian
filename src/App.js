import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Header } from './Components'
import { HomePage, DetailPage } from './Pages'

class App extends Component {
  render () {
    return (
      <div className='container'>
        <Header history={this.props.history} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/detail' component={DetailPage} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
