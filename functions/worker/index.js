'use strict';

const Lawos = require('lawos');
const AWS = require('aws-sdk');
const SQS = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports.handler = (event, context, callback) => {
  const queueUrl = "https://sqs.eu-west-1.amazonaws.com/" + require('alai').parse(context) + "/" + process.env.sqs;
  const Q = new Lawos(queueUrl, SQS);

  Q.item(
    item => new Promise(done => {
      done();
    })
  );

  Q.work(
    () => Promise.resolve(context.getRemainingTimeInMillis() < 1000)
  ).then(
    data => {
      console.log(data);

      callback(null, data);
    }
  );
};
