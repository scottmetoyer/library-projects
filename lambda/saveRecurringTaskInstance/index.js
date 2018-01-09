var AWS = require('aws-sdk');
var uuidv1 = require('uuid/v1');

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    var tableName = "RecurringTaskInstances";
    var datetime = new Date().getTime().toString();
    var item = {};
    var params = JSON.parse(event.body);
    // var params = event.body;

    if (params.id == null || params.id == '') {
        // Generate a new id
        item.id = uuidv1();
    } else {
        item.id = params.id;
    }

    item.created = datetime;
    params.name != null ? item.name = params.name : null;
    params.description != null ? item.description = params.description : null;
    params.owner != null ? item.owner = params.owner : null;
    params.schedule != null ? item.schedule = params.schedule : null;

    docClient.put({
            "TableName": tableName,
            "Item": item
        }, function(err, data) {
            if (err) {
                callback(null, {
                    "isBase64Encoded": false,
                    "statusCode": 400,
                    "headers": {
                        "Access-Control-Allow-Origin": "*"
                    },
                    "body": JSON.stringify(err)
                });
            } else {
                callback(null, {
                    "isBase64Encoded": false,
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*"
                    },
                    "body": JSON.stringify({ id: item.id })
                });
            }
        });
};