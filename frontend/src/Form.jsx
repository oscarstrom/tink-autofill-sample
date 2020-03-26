import React from 'react'
import { useForm } from 'react-hook-form'
import './Style.css'

function Form (props) {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => { console.log(data) }
  const autofillValues = props.location.state
  const tinkAutofillURL = 'https://link.tink.com/1.0/authorize/?client_id=74ab7a0de1704bdf8f072cfdf3096f40&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=accounts:read,identity:read&market=SE&locale=en_US'

  return <div>
    <p className="description" >Enter the following information to complete your request</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="formLabel">Name</p>
      <input name="name" className="formInput" defaultValue = {autofillValues ? autofillValues.account.holderName : ''} ref={register} />
      <p className="formLabel">Account number</p>
      <input name="account_number" className="formInput" defaultValue = {autofillValues ? autofillValues.account.accountNumber : ''} ref={register} />
      {autofillValues
        ? <input className="submitButton" type="submit" value="Submit"/>
        : <input className="submitButton" type="button" value="Or autofill with Tink" onClick={() => window.location.href = tinkAutofillURL } />}
    </form>
  </div>
}

export default Form
