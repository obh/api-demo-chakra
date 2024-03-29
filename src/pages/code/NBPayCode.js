import React from 'react'
import { useSelector } from 'react-redux'
import PrismCode from '../../components/Prismcode';

function TransformMapToCurl(payload){
    var general = {
        "order_token": "TTb06dKJGhWa20VTcm1n",
        "payment_method" : {
            "netbanking" : { 
                "channel": "link",
                "netbanking_bank_code": payload.netbanking_bank_code
            }
        }
    }
    return general
}

function ComputePayload(curlBody){
  const staticPayload = [
    "curl  --request POST", 
    " --url https://sandbox.cashfree.com/pg/orders/pay",
    " --header 'Content-Type: application/json'",
    " --header 'x-api-version: 2021-05-21'",
    " --data '"  
  ]
  return staticPayload.join('\n') + JSON.stringify(curlBody, null, 2) + "'\n";
}

function ListenToHook(){
    const nbPayload = useSelector((state) => state.counter.nbPay)
    const lineEdited = 2
    const curlBody = TransformMapToCurl(nbPayload)

    const curl = ComputePayload(curlBody)
    const lineHighlight = 7 + lineEdited

    return <PrismCode code={curl} language="js" highlightStart={lineHighlight} highlightEnd={lineHighlight} />
}

const NBPayCode = () => (
    <pre>
        <ListenToHook/>
    </pre>
)

export default NBPayCode