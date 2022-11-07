'use strict';
console.log('Loading orderProcessing microservice');

const axios = require('axios');
const storeData = require('./storeData');

exports.handler = async (event, context) => {
    // var list = [
    //         {id: 1,
    //         quantity: 1},
    //         {id: 2,
    //         quantity: 2}
    //     ];

    var body = JSON.parse(event.body);
    var order = body.order;
    var checkStock = (inventory, order) => {
        var items = order.items;
        var quantities = order.quantities;
        for (var i in items) {
            var itemId = items[i];
            var product = inventory.find(obj => obj.id === itemId);
            if (quantities[i] > product.stock) return false;
        }
        return true;
    }

    var paymentConfirm_Num;

    // call the API of paymentProcess
    await axios.post('https://kfqvfmukae.execute-api.us-east-1.amazonaws.com/test/paymentprocessing', {
        paymentInfo: {
            card_num: order.card_num,
            exp: order.exp,
            cvv: order.cvv
        }
    }).then(res => {
        paymentConfirm_Num = res.data.confirmation_Num;
    });

    //call the API of inventory
    var responseBody;
    await axios.get('https://57bg18w306.execute-api.us-east-2.amazonaws.com/v1/inventory').then(res => {
        if (checkStock(res.data.inventory, order)) {
            storeData(order, paymentConfirm_Num);
            responseBody = {
                isValid: true,
                message: "Order successfully！",
                confirmNum: "ABC123456"
            }
        }else {
            responseBody = {
                isValid: false,
                message: "Error: Inventory shortage!"  
            }
        }
        // // to see how the event looks like
        // responseBody.input = event;
    });
    
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

    console.log("Loading function");
    var AWS = require("aws-sdk");

    // exports.handler = function(event, context) {
        var eventText = "PineApple wants to initiate shipping";
        console.log("Received event:", eventText);
        var sns = new AWS.SNS();
        var params = {
            Message: eventText, 
            Subject: "Test SNS From Lambda",
            TopicArn: "arn:aws:sns:us-east-1:566566672071:Shipping_Processing_Topic"
        };
        sns.publish(params, context.done);
    // };
    
    return response
};
