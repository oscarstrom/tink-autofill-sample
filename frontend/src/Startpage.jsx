import React from 'react'
import './Style.css'
import { useHistory } from "react-router-dom"

function Startpage (props) {
  const history = useHistory()

  const resetDemonstration = () => {
    history.push('/form')
  }

  return <div>
    <p className="heading" >Autofill</p>
    <p className="subheading">Automatically fill forms with customer data retreived from their accounts</p>
    <button className="submitButton" onClick={() => resetDemonstration()}>Start journey</button>
  </div>
}

export default Startpage
