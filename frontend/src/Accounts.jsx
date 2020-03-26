import React from 'react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import './Style.css'

function Accounts () {
  const [accounts, setAccounts] = useState([])
  const [cookies] = useCookies(['token'])
  const history = useHistory()

  useEffect(() => {
    if (cookies.token) {
      const accessToken = cookies.token.access_token
      axios({
        method: 'get',
        url: 'http://localhost:8080/accounts',
        params: {
          access_token: accessToken
        }
      }).then(resp => {
        setAccounts(resp.data.accounts)
      })
    } else {
      history.push('/')
    }
  }, [])

  const accountsList = accounts.map(account =>
    <div className="account" key={account.accountNumber} onClick={() => history.push({ pathname: '/', state: { account: account } })} >
      <span>{account.name}</span>
      <span className="accountNumber">{account.accountNumber}</span>
      <span className="accountBalance">{account.balance} {account.currencyCode}</span>
    </div>)
  return <div className="accountWrapper">
    <p className="description" >Select account to use</p>
    {accounts.length > 1 ? accountsList : <Spinner animation="border" variant="info" />}
  </div>
}

export default Accounts
