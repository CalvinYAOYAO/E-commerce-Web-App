'use strict';
console.log('Batch orderProcessing microservice');

const db = require('./db')
const axios = require('axios');
const storeData = require('./storeData');

exports.handler = async (event, context) => {
    console.log(event);

    // get all the orders need to process
    const orders = db.query(`
    SELECT col.ITEM_NUMBER as id, SUM(col.QUANTITY) as qty
    FROM CUSTOMER_ORDER co JOIN CUSTOMER_ORDER_LINE_ITEM col 
    ON co.id = col.CUSTOMER_ORDER_ID_FK
    WHERE co.STATUS = 'New'
    GROUP BY 1;
    `);

    console.log(orders);
    for (var i in orders) {
        let order = orders[i];
        console.log(order);
        console.log(order.id, order.qty);

        //call the API of inventory to reduce the stock according to the orders
        var responseBody;
        await axios.get('https://57bg18w306.execute-api.us-east-2.amazonaws.com/v2/product?id='+order.id).then(res => {
            console.log(res.data)
            let new_stock = res.data.stock - order.qty;
            axios.patch('https://57bg18w306.execute-api.us-east-2.amazonaws.com/v2/product', {
                        "id": order.id,
                        "updateKey": "stock",
                        "updateValue": new_stock
                    }).then(res => {
                console.log(res.data)
            });
        });
    };

    // update orders table to complete the orders need processing
    const done = db.query(`
    UPDATE CUSTOMER_ORDER 
    SET STATUS = 'Complete'
    WHERE STATUS = 'New';
    `);

    return;
};
