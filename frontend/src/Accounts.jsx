import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Error from './Error'
import './Style.css'

function Accounts () {
  const [accounts, setAccounts] = useState([])
  const [error, setError] = useState(null)
  const [cookies] = useCookies(['token'])
  const history = useHistory()
  const accessToken = cookies.token.access_token

  const handleError = (error, message) => setError(<Error error={error} message={message} />)
  const handleSelectedAccount = account => history.push({ pathname: '/form', state: { account: account } })
  const requestAccounts = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/accounts',
      params: {
        accessToken
      }
    }).then(resp => {
      setAccounts(resp.data.accounts)
    }).catch(
      error => handleError(error.message, error.message)
    )
  }

  useEffect(() => {
    requestAccounts()
  }, [])

  const accountsList = accounts.map(account =>
    <div className="account" key={account.accountNumber} onClick={() => handleSelectedAccount(account)} >
      <span>{account.name}</span>
      <span className="accountNumber">{account.accountNumber}</span>
      <span className="accountBalance">{account.balance} {account.currencyCode}</span>
    </div>)
  return <div className="accountWrapper">
    {error ? <div>{error}</div>
      : <div>
        <p className="heading" >Select account to use</p>
        {accounts.length > 1 ? accountsList : <div className="spinner"><Spinner animation="border" variant="info" /></div>}
      </div>}
  </div>
}

export default Accounts
