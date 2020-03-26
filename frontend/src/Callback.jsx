import React from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import qs from 'querystring'
import './Style.css'

function getQueryStringParameters (querystring) {
  var queryStringParameters = qs.parse(querystring.slice(1))
  return queryStringParameters
}

function Callback (props) {
  const [cookie, setCookie] = useCookies(['token'])
  const history = useHistory()

  useEffect(() => {
    var queryStringParameters = getQueryStringParameters(props.location.search)

    if (queryStringParameters.code) {
      var code = queryStringParameters.code
      axios({
        method: 'post',
        url: 'http://localhost:8080/authorize',
        data: {
          code: code
        }
      }).then(
        resp => {
          setCookie('token', resp.data, { path: '/' })
          history.push('/accounts')
        }
      )
    }
  }, [])
  return <div>
    <p className="description"> Authenticating </p> <Spinner animation="border" variant="info"/>
  </div>
}

export default Callback
