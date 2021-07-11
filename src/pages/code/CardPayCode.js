import React from 'react'
import { useSelector } from 'react-redux'
import PrismCode from '../../components/Prismcode';

function TransformMapToCurl(payload){
    return {
        "order_token": "TTb06dKJGhWa20VTcm1n",
        "payment_method" : {
            "card" : { 
                "channel": "link",
                "card_number": payload.card_number,
                "card_holder_name": "test card",
                "card_expiry_mm" : payload.card_expiry_mm,
                "card_expiry_yy" : payload.card_expiry_yy,
                "card_cvv" : payload.card_cvv
            }
        }
    }
}

function ComputeLinetoHighlight(key){
  switch(key){
    case "card_number":
      return 1
    case "card_expiry_mm":
      return 3
    case "card_expiry_yy":
      return 4
    case "card_cvv":
      return 5
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
    const lineEdited = useSelector((state) => state.counter.orderPayUpdatedKey)
    const curlBody = TransformMapToCurl(orderPayPayload)

    const curl = ComputePayload(curlBody)
    // number of static lines above this is 6
    const lineHighlight = 8 + ComputeLinetoHighlight(lineEdited)
    return <PrismCode code={curl} language="js" highlightStart={lineHighlight} highlightEnd={lineHighlight} />
}

const OrderPayCode = () => (
    <pre>
        <ListenToHook/>
    </pre>
)

export default OrderPayCode