import validator from 'validator';

const orderIdRegex = new RegExp(/^[ A-Za-z0-9_-]*$/)
const orderAmountRegex = new RegExp(/^\d+(\.\d{0,2})?$/)
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const phoneRegex = new RegExp(/^[6-9]\d{9}$/)
const cardExpiryMMRegex = new RegExp(/^[0-9]{2}$/)
const cvvRegex = new RegExp(/^[0-9]{3,4}$/)
const upiIdRegex = new RegExp(/\s([\w.-]*[@][\w]*)/)
const nbCodeRegex = new RegExp(/^30[0-9]{2}$/)

export function ValidateOrderId(orderId){
    if(!orderIdRegex.exec(orderId)){
        return [null, "Does not look like a correct orderId"]
    } 
    if(orderId.length > 50){
        return [null, "orderId cannot be more than 50 characters"]
    }
    return [orderId, null];
}

export function ValidateOrderAmount(orderAmount){
    if(!orderAmountRegex.exec(orderAmount)){
        return [null, "orderAmount should be two decimal places"]    
    } 
    let floatAmount = parseFloat(orderAmount)
    if(floatAmount > 200000){
        return [null, "orderAmount by default is capped. Please try a small amount."]
    }
    return [floatAmount, null]
}

export function ValidateOrderCurrency(orderCurrency){
    if(orderCurrency !== "INR"){
        return [null, "Please use INR as orderCurrency for this tutorial"]
    }
    return [orderCurrency, null]
}

export function ValidateCustomerEmail(email){
    if(!emailRegex.exec(email)){
        return [null, "It seems that email is not valid."]
    }
    return [email, null]
}

export function ValidateCustomerPhone(phone){
    if(!phoneRegex.exec(phone)){
        return [null, "Please try with a valid 10 digit Indian phone number. Ex - 99816512345"]
    }
    return [phone, null]
}

export function ValidateReturnUrl(returnUrl){
    if(!validator.isURL(returnUrl)){
        return [null, "It seems that the url is not valid."]
    }
    if(returnUrl.indexOf("{order_id}") === -1){
        return [null, "return_url must have the placeholder: {order_id}." + 
        "This will be replaced by actual order_id when redirection is happening!"]
    }
    if(returnUrl.indexOf("{order_token}") === -1){
        return [null, "return_url must have the placeholder: {order_token}." + 
        "This will be replaced by actual order_token when redirection is happening!"]
    }
    return [returnUrl, null]
}

export function ValidateNotifyUrl(notifyUrl){
    if(!validator.isURL(notifyUrl)){
        return [null, "It seems that the url is not valid."]
    }
    return [notifyUrl, null]
}

export function ValidateCard(cardNumber){
    if(!validator.isCreditCard(cardNumber)){
        return [null, "card_number does not seem valid"]
    }
    if(!valid_credit_card(cardNumber)){
        return [null, "card_number does not seem valid"]
    }
    return [cardNumber, null]
}

function valid_credit_card(value) {
// Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}

export function ValidateCardExpiryMM(cardExpiryMM){
    if(cardExpiryMM.length !== 2){
        return [null, "card_expry_mm is not valid"]
    }
    if(!cardExpiryMMRegex.exec(cardExpiryMM)){
        return [null, "card_expry_mm is not valid"]
    }
    let intVal = parseInt(cardExpiryMM)
    if(intVal < 0 || intVal > 12){
        return [null, "card_expry_mm is not valid"]
    }
    return [cardExpiryMM, null]
}

export function ValidateCardExpiryYY(cardExpiryYY){
    if(cardExpiryYY.length !== 2){
        return [null, "card_expry_yy is not valid"]
    }
    if(!cardExpiryMMRegex.exec(cardExpiryYY)){
        return [null, "card_expry_YY is not valid"]
    }
    let intVal = parseInt(cardExpiryYY)
    if(intVal < 21){
        return [null, "card_expry_yy is not valid"]
    }
    return [cardExpiryYY, null]
}

export function ValidateCardCVV(cvv){
    if(cvv.length < 3 || cvv.length > 4){
        return [null, "card_cvv is not valid"]
    }
    if(!cvvRegex.exec(cvv)){
        return [null, "card_cvv is not valid"]
    }
    return [cvv, null]
}

export function ValidateUPIChannel(channel){
    const isValid = (channel === "link" || channel === "collect" || channel === "qrcode")
    if(!isValid){
        return [null, "channel for UPI can be one of 'link', 'collect' or 'qrcode' "]
    }
    return [channel, null]
}

export function ValidateUPIID(upiId){
    if(!upiIdRegex.exec(upiId)){
        return [null, "upi_id is not valid"]
    }
    return [upiId, null]
}

export function ValidateNBCode(code){
    if(!nbCodeRegex.exec(code)){
        return [null, "netbanking_bank_code is not valid"]
    }
    return [code, null]
}

export function ValidateAppChannel(channel){
    let validChannels = new Set(["gpay", "phonepe", "amazonpay", "jiomoney", "airtelmoney"])
    if(!validChannels.has(channel)){
        return [null, "channel for App payments can only be " + Array.from(validChannels.values())]
    }
    return [channel, null]   
}

// export function Validate(param_id, value){
//     console.log("in validate call with param_id:", param_id)
//     if(param_id == "order_id"){
//         return ValidateOrderId(value)
//     }
// }

//export const {Validate}