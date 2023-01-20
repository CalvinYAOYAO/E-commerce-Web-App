'use strict';
console.log('Loading paymentProcessing microservice');



exports.handler = async (event) => {

    var body = JSON.parse(event.body);
    var paymentInfo = body.paymentInfo;
    var card_num = paymentInfo.card_num;
    var exp = paymentInfo.exp;
    var cvv = paymentInfo.cvv;

    var responseBody = {
        isValid: true,
        confirmation_Num: "34EKG67Z"
    };
    
    let response = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "my custom header value",
            // CORS policy: allow access from all domain region
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(responseBody)
    };
    
    return response
};
