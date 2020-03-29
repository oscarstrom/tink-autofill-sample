import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Error from '../common/Error'
import qs from 'querystring'
import '../common/Style.css'

function Callback (props) {
  const [cookie, setCookie] = useCookies(['token'])
  const [error, setError] = useState(null)
  const history = useHistory()
  const queryString = props.location.search

  const getQueryStringParameters = querystring => qs.parse(querystring.slice(1))
  const handleError = (error, message) => setError(<Error error={error} message={message} />)
  const requestToken = authorizationCode => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/authorize',
      data: {
        authorizationCode
      }
    }).then(
      resp => {
        if (resp.data.errorCode) {
          handleError(resp.data.errorCode, resp.data.errorMessage)
        } else {
          setCookie('token', resp.data, { path: '/' })
          history.push('/accounts')
        }
      }
    )
      .catch(
        error => handleError(error.message, error.message)
      )
  }

  useEffect(() => {
    var queryStringParameters = getQueryStringParameters(queryString)

    if (queryStringParameters.code) {
      const authorizationCode = queryStringParameters.code
      requestToken(authorizationCode)
    } else if (queryStringParameters.error) {
      handleError(queryStringParameters.error, queryStringParameters.message)
    } else {
      history.push('/form')
    }
  }, [])
  return <div>
    {error
      ? <div>
        {error}
      </div>
      : <div>
        <div className="spinner"><Spinner animation="border" variant="info" /></div>
      </div>}
  </div>
}

export default Callback
