export function ValidateOrderId(order_id){
    console.log("validating order_id: ", order_id)
    return "";
}

export function Validate(param_id, value){
    console.log("in validate call with param_id:", param_id)
    if(param_id == "order_id"){
        return ValidateOrderId(value)
    }
}

//export const {Validate}