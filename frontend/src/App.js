import React from 'react'
import Form from './Form'
import Callback from './Callback'
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Accounts from './Accounts'
import './Style.css'

function App () {
  return (
    <div className="outerDiv">
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/callback" component={Callback} />
        <Route exact path="/accounts" component={Accounts} />
      </Switch>
    </div>
  )
}

export default App
