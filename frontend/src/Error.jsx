import React from 'react'
import './Style.css'

function Error (props) {
  return <div>
    <p className="heading" >Error: {props.error}</p>
    <p className="subheading">Message: {props.message}</p>
    <a className="button" href="/form">Try again</a>
  </div>
}

export default Error
