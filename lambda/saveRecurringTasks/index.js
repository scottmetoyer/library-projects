var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    var tableName = "RecurringTasks";
    var datetime = new Date().getTime().toString();
    var item = {};
    var params = JSON.parse(event.body);

    item.key = params.key.toUpperCase();
    item.created = datetime;

    params.name                 != null ?   item.name               = params.name : null;
    params.description          != null ?   item.description        = params.description : null;
    params.owner                != null ?   item.owner              = params.owner : null;
    params.lead                 != null ?   item.lead               = params.lead : null;
    params.hasProjectPlan       != null ?   item.hasProjectPlan     = params.hasProjectPlan : null;
    params.hasWiki              != null ?   item.hasWiki            = params.hasWiki : null;
    params.hasJiraProject       != null ?   item.hasJiraProject     = params.hasJiraProject : null;
    params.hasCodeRepository    != null ?   item.hasCodeRepository  = params.hasCodeRepository : null;
    params.projectPlanLink      != null ?   item.projectPlanLink    = params.projectPlanLink : null;
    params.wikiLink             != null ?   item.wikiLink           = params.wikiLink : null;
    params.jiraLink             != null ?   item.jiraLink           = params.jiraLink : null;
    params.codeRepositoryLink   != null ?   item.codeRepositoryLink = params.codeRepositoryLink : null;
    params.executionStatus      != null ?   item.executionStatus    = params.executionStatus : null;

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
                    "body": JSON.stringify(data)
                });
            }
        });
};