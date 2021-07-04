import { ValidateOrderId } from './components/Validation'

let InputData = [
    {
        "type": "string",
        "inputParamKey": "order_id",
        "inputName": "Order Id",
        "value" : Date.now(),
        "inputValidator": ValidateOrderId
    },
    {
        "type": "object",
        "groupName": "Customer Details",
        "groupKey": "customer_details",
        "groupDescription": "Customer details for this order",
        "properties": [
            {   
                "type": "string",
                "inputName": "customer_email",
                "inputParamKey": "customer_email",
                "value": "techsupport@cashfree.com",
                "inputValidator": ValidateOrderId
            },
            {
                "type": "string",
                "inputName": "customer_phone",
                "inputParamKey": "customer_phone",
                "value": "9993412345",
                "inputValidator": ValidateOrderId
            }
        ]
    }
]

export function DataToJson(data){
    let outputMap = {}
    for(const element of data){
        if(element.type == "string"){
            //outputMap.set(element.inputParamKey, element.value)
            outputMap[element.inputParamKey] = element.value
        } else if (element.type == "object"){
            let innerMap = DataToJson(element.properties)
            //outputMap.set(element.groupKey, innerMap)
            outputMap[element.groupKey] = innerMap
        }
    }
    console.log("map to json -> ", outputMap)
    return outputMap
}


export default InputData