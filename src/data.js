import { ValidateOrderId } from './components/Validation'

let InputData = [
    {
        "type": "string",
        "inputParamKey": "order_id",
        "inputName": "Order Id",
        "inputDescription": "OrderID is used to track the payment",
        "value" : "order_" + Date.now(),
        "inputValidator": ValidateOrderId
    },
    {
        "type": "object",
        "groupName": "Customer Details",
        "groupKey": "customer_details",
        "groupDescription": "You need to send customer details for every order.",
        "properties": [
            {   
                "type": "string",
                "inputName": "Email",
                "inputParamKey": "customer_email",
                "value": "techsupport@cashfree.com",
                "inputValidator": ValidateOrderId
            },
            {
                "type": "string",
                "inputName": "Phone",
                "inputParamKey": "customer_phone",
                "value": "9993412345",
                "inputValidator": ValidateOrderId
            }
        ]
    }, 
    {
        "type": "string",
        "inputParamKey": "order_amount",
        "inputName": "Order Amount",
        "value" : 10,
        "inputValidator": ValidateOrderId
    },
    {
        "type": "string",
        "inputParamKey": "order_currency",
        "inputName": "Order Currency",
        "value" : "INR",
        "inputValidator": ValidateOrderId
    },
    {
        "type": "object",
        "groupName": "Additional order details",
        "groupKey": "order_meta",
        "groupDescription": "Additional info for payment processing",
        "properties": [
            {   
                "type": "string",
                "inputName": "Return url",
                "inputDescription": "Card and net banking payments require customers to be redirected to banks OTP \
                    page and then be redirected back to merchant website. The returnURL specifies where customer \
                    will return to on your page.",
                "inputParamKey": "return_url",
                "value": "https://ngrok.io/return_cashfree?order={order_id}&token={order_token}",
                "inputValidator": ValidateOrderId
            },
            {
                "type": "string",
                "inputName": "Notification URL",
                "inputParamKey": "notify_url",
                "value": "https://ngrok.io/notify_cashfree?order={order_id}&token={order_token}",
                "inputValidator": ValidateOrderId
            }
        ]
    }, 
]

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


export default InputData