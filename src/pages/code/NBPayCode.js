import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PrismCode } from '../../components/Prismcode';

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
    " --url https://gamma.cashfree.com/api/v1/orders",
    " --header 'Content-Type: application/json'",
    " --header 'x-api-version: 2021-05-22'",
    " --data '"  
  ]
  return staticPayload.join('\n') + JSON.stringify(curlBody, null, 2) + "'\n";
}

function ListenToHook(){
    const nbPayload = useSelector((state) => state.counter.nbPay)
    const lineEdited = 2
    const curlBody = TransformMapToCurl(nbPayload)

    const curl = ComputePayload(curlBody)
    // number of static lines above this is 6
    const lineHighlight = 7 + lineEdited

    console.log("The map is --> ", JSON.stringify(curlBody, null, 2))
    console.log("Updated code after change in any input value!")

    return <PrismCode code={curl} language="js" highlightStart={lineHighlight} highlightEnd={lineHighlight} />
}

const NBPayCode = () => (
    <pre>
        <ListenToHook/>
    </pre>
)

export default NBPayCode