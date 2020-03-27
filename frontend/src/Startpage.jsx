import React from 'react'
import './Style.css'

function Startpage () {
  return <div>
    <p className="heading" >Autofill</p>
    <p className="subheading">Automatically fill forms with customer data retreived from their accounts</p>
    <a className="button" href='/form'>Start journey</a>
  </div>
}

export default Startpage
