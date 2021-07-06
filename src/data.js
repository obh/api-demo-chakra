import { ValidateOrderId } from './components/Validation'

//We can also compute lineNum by parsing this json, but I think that it might not be the best way
//because if we add linewraps, it might break. And there could be other issues as well. 
let InputData = [
    {
        "type": "string",
        "inputParamKey": "order_id",        
        "value" : "order_" + Date.now(),
        "lineNum": 1
    },
    {
        "type": "string",
        "inputParamKey": "order_amount",
        "value" : 10,
        "lineNum": 2
    },
    {
        "type": "string",
        "inputParamKey": "order_currency",
        "value" : "INR",
        "lineNum": 3

    },
    {
        "type": "object",
        "groupKey": "customer_details",
        "lineNum": 4,
        "properties": [
            {   
                "type": "string",
                "inputParamKey": "customer_email",
                "value": "techsupport@cashfree.com",
                "lineNum": 5,
            },
            {
                "type": "string",
                "inputParamKey": "customer_phone",
                "value": "9993412345",
                "lineNum": 6
            }
        ]
    }, 
    {
        "type": "object",
        "groupKey": "order_meta",        
        "lineNum": 8,
        "properties": [
            {   
                "type": "string",
                "inputParamKey": "return_url",
                "value": "https://ngrok.io/return_cashfree?order={order_id}&token={order_token}",
                "lineNum": 9,
            },
            {
                "type": "string",
                "inputParamKey": "notify_url",
                "value": "https://ngrok.io/notify_cashfree?order={order_id}&token={order_token}",
                "lineNum": 10,
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