import React from 'react'
import './Style.css'
import { useCookies } from 'react-cookie'
import { useHistory } from "react-router-dom"

function Submitted () {
  const [cookie, removeCookie] = useCookies(['token'])
  const history = useHistory()

  const resetDemonstration = () => {
    removeCookie('token')
    history.push('/')
  }

  return <div>
    <p className="heading" >Thats it!</p>
    <p className="subheading">Thank you for trying this autofill demonstration</p>
    <button className="button" onClick={() => resetDemonstration()}>Try again</button>
  </div>
}

export default Submitted
