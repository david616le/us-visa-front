import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Button } from 'antd'

class StripeForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit
    const { token } = await this.props.stripe.createToken({ name: 'Name' })
    const response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id,
    })

    if (response.ok) console.log('Purchase Complete!')
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <Button type="primary" onClick={this.submit}>
          PLACE ORDER
        </Button>
      </div>
    )
  }
}

export default injectStripe(StripeForm)
