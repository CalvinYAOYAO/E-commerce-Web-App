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
    console.log(event);
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

    console.log("Shipping SNS Notification");
    var AWS = require('aws-sdk');
    AWS.config.update({region: 'us-east-1'});
    var params = {
        Message: "PineApple wants to initiate shipping",
        TopicArn: "arn:aws:sns:us-east-1:566566672071:Shipping-Topic"
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    await publishTextPromise.then(
        function(data) {
            console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function(err) {
            console.error(err, err.stack);
        });
    
    return response;
};
