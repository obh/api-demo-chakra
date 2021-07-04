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
    }
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