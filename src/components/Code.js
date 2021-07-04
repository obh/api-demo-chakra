import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PrismCode } from './Prismcode';
import "../css/prism.css";
import { DataToJson } from '../data';


function ListenToHook(){
    const hostname = "http://gamma.cashfree.com/pgnextgenapi/api/v1/"
    const codePayload = useSelector((state) => DataToJson(state.counter.code))      

    let payload = {
        "order_amount" : 10.2
    }

    const curl = "curl --request POST \n " 
        + " --url " + hostname + "\n"
        + "  --header 'Content-Type: application/json' \n"
        + "  --header 'x-api-version: 2021-05-22' \n" 
        + "  --header 'x-client-id: 275432e3853bd165afbf5272'\n"
        + "  --header 'x-client-secret: e69507b023c6bc3141818602e8246671845c215'\n"
        + "  --data \n'" + JSON.stringify(codePayload, null, 2) + "'\n" 
    
    console.log("The map is --> ", JSON.stringify(codePayload, null, 2))
    console.log("Updated code after change in any input value!")
    return <PrismCode code={curl} language="js" />
}

const Code = () => (
    <pre>
        <ListenToHook/>
  {/* <code className="language-javascript">
        {`
    onSubmit(e) {
      e.preventDefault();
      const job = {
        title: 'Developer',
        company: 'Facebook' 
        };
      }
        `}
  </code> */}
</pre>
)

export default Code