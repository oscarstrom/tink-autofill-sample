import React from 'react'
import Form from './Form'
import Callback from './Callback'
import Submitted from './Submitted'
import Accounts from './Accounts'
import Startpage from './Startpage'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Style.css'

function App (props) {
  const [cookies] = useCookies(['token'])
  return (
    <div className="outerDiv">
      <Switch>
        <Route exact path="/" component={Startpage} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/callback" component={Callback} />
        <Route exact path="/accounts">
          {cookies.token ? <Accounts /> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/submitted" component={Submitted} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  )
}

export default App
