const express = require("express")
const db = require('./db')

const storeData = function(order, paymentConfirm_Num) {
    //test
    var email = order.email;
    var address = order.address;
    var shipping_method = order.shipping_method;
    var postal = order.postal;

    var card_num = order.card_num;
    var exp = order.exp;
    var cvv = order.cvv;

    var items = order.items;
    var quantities = order.quantities;

    // update db with order
    const paymentQry = db.query(`INSERT INTO PAYMENT_INFO (CARD_NUM, EXP_DATE, CVV, CONFIRMATION_NUM) VALUES ('${card_num}', '${exp}', '${cvv}', '${paymentConfirm_Num}');`);
    const paymentPrimaryKey = paymentQry.insertId;

    const shippingQry = db.query(`INSERT INTO SHIPPING_INFO (ADDRESS, SHIPPING_METHOD, POSTAL_CODE) VALUES ('${address}', '${shipping_method}', '${postal}')`);
    const shippingPrimaryKey = shippingQry.insertId;

    const orderQry = db.query(`INSERT INTO CUSTOMER_ORDER (CUSTOMER_EMAIL,SHIPPING_INFO_ID_FK,PAYMENT_INFO_ID_FK ) VALUES ('${email}', ${shippingPrimaryKey},${paymentPrimaryKey});`);
    const orderPrimaryKey = orderQry.insertId;
    items.forEach((itemId, index) =>
    {
        const quantityOfItem = quantities[index]
        const orderItemQry = db.query(`INSERT INTO CUSTOMER_ORDER_LINE_ITEM (ITEM_NUMBER,QUANTITY,CUSTOMER_ORDER_ID_FK ) VALUES (${itemId},${quantityOfItem},${orderPrimaryKey});`)
    });
};

module.exports = storeData;



