import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"
import './Style.css'

function Form (props) {
  const [formValues, setFormValues] = useState({ holderName: '', accountNumber: '' })
  const [autofilled, setAutofilled] = useState(false)
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const redirectedProps = props.location.state
  const tinkAutofillURL = 'https://link.tink.com/1.0/authorize/?client_id=74ab7a0de1704bdf8f072cfdf3096f40&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=accounts:read,identity:read&market=SE&locale=en_US'
  const onSubmit = () => {
    if (autofilled) {
      history.push('./submitted')
    } else {
      window.location.href = tinkAutofillURL
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
