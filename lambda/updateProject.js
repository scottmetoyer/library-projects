console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context, callback) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "Projects";
    var datetime = new Date().getTime().toString();

    dynamodb.putItem({
            "TableName": tableName,
            "Item": {
                "name": {
                    "S": event.name
                },
                "device": {
                    "S": event.device
                },
                "timedate": {
                    "N": datetime
                },
                "latitude": {
                    "N": event.lat
                },
                "longitude": {
                    "N": event.lon
                }
            }
        }, function(err, data) {
            if (err) {
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
                context.succeed('SUCCESS');
            }
        });
}