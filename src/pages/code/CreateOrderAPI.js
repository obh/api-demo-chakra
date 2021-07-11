import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PrismCode } from '../../components/Prismcode';
import { DataToJson } from '../CreateOrderData';

//This method is required because the curl request could have many deepnested objects
//If we use the same object in the redux store, things will become complicated from
//a redux perspective. This is an easier and more manageble way to do it
function TransformMapToCurl(payload){
  return {
    "order_id" : payload.order_id,
    "order_amount": payload.order_amount,
    "order_currency": payload.order_currency,
    "customer_details": {
      "customer_email": payload.customer_email,
      "customer_phone": payload.customer_phone
    },
    "orders_meta": {
      "return_url": payload.return_url,
      "notify_url": payload.notify_url
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
    " --header 'x-client-id: <app id>'",
    " --header 'x-client-secret: <secret key>'",
    " --data '"  
  ]
  return staticPayload.join('\n') + JSON.stringify(curlBody, null, 2) + "'\n";
}

function ListenToHook(){
    const createOrderPayload = useSelector((state) => state.counter.createOrder)
    const lineEdited = useSelector((state) => state.counter.createOrderUpdatedKey)
    const curlBody = TransformMapToCurl(createOrderPayload)

    const curl = ComputePayload(curlBody)
    // number of static lines above this is 6
    const lineHighlight = 6 + ComputeLinetoHighlight(lineEdited)
    return <PrismCode code={curl} language="js" highlightStart={lineHighlight} highlightEnd={lineHighlight} />
}

const Code = () => (
    <pre>
        <ListenToHook/>
</pre>
)

export default Code