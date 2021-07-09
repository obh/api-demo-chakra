import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PrismCode } from '../components/Prismcode';
import "../css/prism.css";

function TransformMapToCurl(updatedKey, payload){
    switch(updatedKey) {
        case "card_number":
        case "card_expiry_mm":
        case "card_expiry_yy":
        case "card_cvv":
            return {
                "order_token": "TTb06dKJGhWa20VTcm1n",
                "payment_method" : {
                    "card" : { 
                        "channel": "link",
                        "card_number": payload.card_number,
                        "card_holder_name": "hello",
                        "card_expiry_mm" : payload.card_expiry_mm,
                        "card_expiry_yy" : payload.card_expiry_yy,
                        "card_cvv" : payload.card_cvv
                    }
                }
            }
    }
}

function ComputeLinetoHighlight(key){
  switch(key){
    case "order_id":
      return 1
    case "order_amount":
      return 2
    case "order_currency":
      return 3
    case "customer_email":
      return 5
    case "customer_phone":
      return 6
    case "return_url": 
      return 8
    case "notify_url":
      return 9
    default:
      return -100 // no line to highlight
  }
}

function ComputePayload(curlBody){
  const staticPayload = [
    "curl  --request POST", 
    " --url https://gamma.cashfree.com/api/v1/orders",
    " --header 'Content-Type: application/json'",
    " --header 'x-api-version: 2021-05-22'",
    " --data '"  
  ]
  return staticPayload.join('\n') + JSON.stringify(curlBody, null, 2) + "'\n";
}

function ListenToHook(){
    const orderPayPayload = useSelector((state) => state.counter.orderPay)
    console.log("THIS IS orderPayPayload -->" , orderPayPayload)
    const lineEdited = useSelector((state) => state.counter.orderPayUpdatedKey)
    const curlBody = TransformMapToCurl(orderPayPayload)

    const curl = ComputePayload(curlBody)
    // number of static lines above this is 6
    const lineHighlight = 6 + ComputeLinetoHighlight(lineEdited)

    console.log("The map is --> ", JSON.stringify(curlBody, null, 2))
    console.log("Updated code after change in any input value!")

    return <PrismCode code={curl} language="js" highlightStart={lineHighlight} highlightEnd={lineHighlight} />
}

const OrderPayCode = () => (
    <pre>
        <ListenToHook/>
    </pre>
)

export default OrderPayCode