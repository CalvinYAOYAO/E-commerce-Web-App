// Based on Youbute video https://www.youtube.com/watch?v=Ut5CkSz6NR0
// Build a CRUD Serverless API with AWS Lambda, API Gateway and a DynamoDB from Scratch

const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'product-inventory';
const productPath = '/product';
const productsPath = '/products';

exports.handler = async function(event) {
    console.log('Request event: ', event);
    let response;
    switch(true) {
        case event.httpMethod === 'GET' && event.path === productPath:
            response = await getProduct(event.queryStringParameters.id);
            break;
        case event.httpMethod === 'GET' && event.path === productsPath:
            response = await getProducts();
            break;
        case event.httpMethod === 'POST' && event.path === productPath:
            response = await saveProduct(JSON.parse(event.body));
            break;
        case event.httpMethod === 'PATCH' && event.path === productPath:
            const requestbody = JSON.parse(event.body);
            response = await modifyProduct(requestbody.id, requestbody.updateKey, requestbody.updateValue);
            break;
        case event.httpMethod === 'DELETE' && event.path === productPath:
            response = await deleteProduct(JSON.parse(event.body).id);
            break;
        default:
            response = buildResponse(404, 'Not found');
    }
    return response;
};

async function getProduct(id) {
    const params = {
        TableName: tableName,
        Key: {
            'id': parseInt(id)
        }
    }
    return await dynamodb.get(params).promise().then((response) => {
        return buildResponse(200, response.Item);
    }, (error) => {
        console.error('error of get product: ', error);
    });
};

async function getProducts() {
    const params = {
        TableName: tableName,
    }
    const allProducts = await scanDynamoRecords(params, []);
    const body = {
        products: allProducts
    }
    return buildResponse(200, body);
};

async function scanDynamoRecords(scanParams, itemArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
            return await scanDynamoRecords(scanParams, itemArray);
        }
        return itemArray;
    } catch(error) {
        console.error('error of scan db: ', error);
    }
};

async function saveProduct(requestBody) {
    const params = {
        TableName: tableName,
        Item: requestBody
    }
    return await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESSFUL',
            Item: requestBody
        }
        return buildResponse(200, body)
    }, (error) => {
        console.error('Save error: ', error);
    })
};

async function modifyProduct(id, updateKey, updateValue) {
    console.log("DEBUG ", id, updateKey, updateValue)
    const params = {
        TableName: tableName,
        Key: {
            'id': parseInt(id)
        },
        UpdateExpression: `set ${updateKey} = :value`,
        ExpressionAttributeValues: {
            ':value': updateValue
        },
        ReturnValues: 'UPDATED_NEW'
    }
    return await dynamodb.update(params).promise().then((response) => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            Item: response
        }
        return buildResponse(200, body)
    }, (error) => {
        console.error('Update error: ', error);
    })
};

async function deleteProduct(id) {
    const params = {
        TableName: tableName,
        Key: {
            'id': parseInt(id)
        },
        ReturnValues: 'ALL_OLD'
    }
    return await dynamodb.delete(params).promise().then((response) => {
        const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
        }
        return buildResponse(200, body)
    }, (error) => {
        console.error('Delete error: ', error);
    })
};

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
};