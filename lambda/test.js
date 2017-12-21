// test.js
// Test AWS Lambda function for Library Projects app

exports.testHandler = function( event, context, callback) {
  console.log('Successfully called the function');
  callback(null, "returned some success message");
};