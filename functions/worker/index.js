'use strict';

const Lawos = require('lawos');
const AWS = require('aws-sdk');
const SQS = new AWS.SQS({apiVersion: '2012-11-05'});
const Lambda = new AWS.Lambda({apiVersion: '2015-03-31'});

module.exports.handler = (event, context, callback) => {
  const queueUrl = "https://sqs.eu-west-1.amazonaws.com/" + require('alai').parse(context) + "/" + process.env.sqs;
  const Q = new Lawos(queueUrl, SQS, Lambda);

  // Process every message with a Promise
  Q.item(item => new Promise(done => done()));

  // Process every list of messages with a lambda function
  Q.list(process.env.lambda);

  // Run until all messages are process or less than one second runtime is
  // left for the lambda function.
  Q.work(
    () => Promise.resolve(context.getRemainingTimeInMillis() < 1000)
  ).then(
    data => {
      console.log(data);

      callback(null, data);
    }
  );
};
