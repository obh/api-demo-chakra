import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PrismCode } from '../../components/Prismcode';

function TransformMapToCurl(payload){
    var general = {
        "order_token": "TTb06dKJGhWa20VTcm1n",
        "payment_method" : {
            "app" : { 
                "channel": payload.channel,
                "phone": payload.phone
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
    const appPayload = useSelector((state) => state.counter.appPay)
    const lineEdited = useSelector((state) => state.counter.appPayUpdatedKey)
    const curlBody = TransformMapToCurl(appPayload)

    const curl = ComputePayload(curlBody)
    // number of static lines above this is 6
    const lineHighlight = 7 + lineEdited

    return <PrismCode code={curl} language="js" highlightStart={lineHighlight} highlightEnd={lineHighlight} />
}

const AppPayCode = () => (
    <pre>
        <ListenToHook/>
    </pre>
)

export default AppPayCode