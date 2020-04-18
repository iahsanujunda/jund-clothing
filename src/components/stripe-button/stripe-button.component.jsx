import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_PzPVYKi5bArzFzXrl3f4ZBBp0048RVBABR';

  const onToken = token => {
    console.log(token);
    alert('Payment success')
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='Jund Clothing Ltd.'
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
      billingAddress
      shippingAddress
      alipay
      allowRememberMe
    />
  )
};

export default StripeCheckoutButton;