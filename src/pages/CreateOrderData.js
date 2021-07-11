export function DataToJson(data){
    let outputMap = {}
    for(const l in data){
        let element = data[l]
        if(element.type == "string"){
            outputMap[element.inputParamKey] = element.value
        } else if (element.type == "object"){
            let innerMap = DataToJson(element.properties)
            outputMap[element.groupKey] = innerMap
        }
    }
    //console.log("map to json -> ", outputMap)
    return outputMap
}

//redux does not like non-seralizable things and it does not need to
//store all this extra stuff in the input data. So we will remove it 
export function ParseDataForRedux(data){
    let outData = JSON.parse(JSON.stringify(data));
    for(const l in outData){
        let element = data[l]
        if(element.type == "string"){
            delete element["inputValidator"]
        } else if(element.type == "object"){
            element.properties = ParseDataForRedux(element.properties)
            console.log("EHLO -> ", element.properties)
        }
    }  
    console.log("parsed data for redux -->", outData)  
    return outData
}

//export default InputData

export const stepData = [
    { 
         "title": "Create Order",
         "description": "Create an order and get an order token.",
    },
    {
        "title": "Order Pay",
        "description" : "Use the order token to complete payment.",
    },
    {
        "title": "Complete payment",
        "description": "Redirect user to a thank you page.",
    }
]

export const createOrderResponse = `{
    "cf_order_id": 498327264,
    "order_id": "order_18481uwTfzyNLoNc8RAC5ojOSv3Xv2a",
    "entity": "order",
    "order_currency": "INR",
    "order_amount": 1.01,
    "order_expiry_time": "2021-08-05T18:19:18+05:30",
    "customer_details": {
      "customer_id": "718234",
      "customer_name": null,
      "customer_email": "john@cashfree.com",
      "customer_phone": "9908734801"
    },
    "order_meta": {
      "return_url": null,
      "notify_url": "https://cashfree.com/pg/process_webhook",
      "payment_methods": null
    },
    "settlement_details": {
      "url": "https://prod.cashfree.com/pgnextgenapi-test/api/v1/settlements?order_id=order_18481uwTfzyNLoNc8RAC5ojOSv3Xv2a"
    },
    "payment_attempts": {
      "url": "https://prod.cashfree.com/pgnextgenapi-test/api/v1/payments?order_id=order_18481uwTfzyNLoNc8RAC5ojOSv3Xv2a"
    },
    "order_status": "ACTIVE",
    "order_token": "AqtC88khqWACIEPcXGgO",
    "order_note": null
  }
`


