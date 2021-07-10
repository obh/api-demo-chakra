import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PrismCode } from '../../components/Prismcode';

function TransformMapToCurl(payload){
    var general = {
        "order_token": "TTb06dKJGhWa20VTcm1n",
        "payment_method" : {
            "upi" : { 
                "channel": payload.channel                
            }
        }
    }
    if(payload.channel == "collect"){
        general["payment_method"]["upi"]["upi_id"] = payload.upi_id
    }
    return general
}

function ComputeLinetoHighlight(key){
  switch(key){
    case "channel":
      return 1
    case "upi_id":
      return 2
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
    const upiPayload = useSelector((state) => state.counter.upiPay)
    console.log("THIS IS orderPayPayload -->" , upiPayload)
    const lineEdited = useSelector((state) => state.counter.upiPayUpdatedKey)
    const curlBody = TransformMapToCurl(upiPayload)

    const curl = ComputePayload(curlBody)
    // number of static lines above this is 6
    const lineHighlight = 7 + ComputeLinetoHighlight(lineEdited)

    console.log("The map is --> ", JSON.stringify(curlBody, null, 2))
    console.log("Updated code after change in any input value!")

    return <PrismCode code={curl} language="js" highlightStart={lineHighlight} highlightEnd={lineHighlight} />
}

const UPIPayCode = () => (
    <pre>
        <ListenToHook/>
    </pre>
)

export default UPIPayCode