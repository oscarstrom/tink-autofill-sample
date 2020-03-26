import React, { useState } from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Error from './Error'
import qs from 'querystring'
import './Style.css'

function getQueryStringParameters (querystring) {
  var queryStringParameters = qs.parse(querystring.slice(1))
  return queryStringParameters
}

function Callback (props) {
  const [cookie, setCookie] = useCookies(['token'])
  const [error, setError] = useState(null)
  const history = useHistory()
  const queryString = props.location.search

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
      var authorizationCode = queryStringParameters.code
      requestToken(authorizationCode)
    } else if (queryStringParameters.error) {
      handleError(queryStringParameters.error, queryStringParameters.message)
    } else {
      history.push('/')
    }
  }, [])
  return <div>
    {error
      ? <div>
        {error}
      </div>
      : <div>
        <p className="heading"> Authenticating </p> <Spinner animation="border" variant="info"/>
      </div>}
  </div>
}

export default Callback
