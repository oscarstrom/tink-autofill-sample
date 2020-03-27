import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './Style.css'

function Form (props) {
  const [formValues, setFormValues] = useState({ holderName: '', accountNumber: '' })
  const [autofilled, setAutofilled] = useState(false)
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const redirectedProps = props.location.state

  const redirectURL = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/url'
    }).then(resp => {
      window.location.href = resp.data
    })
  }

  const onSubmit = () => {
    if (autofilled) {
      history.push('./submitted')
    } else {
      redirectURL()
    }
  }

  useEffect(() => {
    if (redirectedProps && redirectedProps.account) {
      setFormValues(redirectedProps.account)
      setAutofilled(true)
    }
  }, [])

  return <div>
    <p className="heading" >Enter the following information to complete your request</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="subheading">Name</p>
      <input name="name" className="formInput" defaultValue = {formValues.holderName} ref={register} />
      <p className="subheading">Account number</p>
      <input name="account_number" className="formInput" defaultValue = {formValues.accountNumber} ref={register} />
      {autofilled
        ? <input className="button" type="submit" value="Submit"/>
        : <input className="button" type="submit" value="Or autofill with Tink" />}
    </form>
  </div>
}

export default Form
