# SQS Worker for AWS Lambda with Lawos

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![license](https://img.shields.io/github/license/sbstjn/lawos-serverless.svg)](https://github.com/sbstjn/lawos-serverless)

Example usage of [Lawos](https://github.com/sbstjn/lawos) with [Serverless](https://serverless.com) to process messages from an Amazon SQS queue with AWS Lambda functions.

## Setup

 - Use CloudWatch Schedule to run Lambda function every minute
 - Use CloudWatch Alarms to run Lambda function if SQS contains more than 100 messages

## Install

```bash
$ > git clone git@github.com:sbstjn/lawos-serverless.git && cd lawos-serverless
$ > npm install
```

## Deployment

```bash
$ > npm run deploy
```

## Invoke worker

```bash
$ > npm run invoke
```

## Add noise to SQS

Use [wrk](https://github.com/wg/wrk) to add some messages to your SQS queue. You need to enable [anonymous access to sendMessage](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/acp-overview.html#anonQueues) for your queue first!

```
$ > wrk -c25 -d10 -t15 \
    -s helper/wrk.lua \
    https://sqs.eu-west-1.amazonaws.com/YourAccountID/dev-lawos-serverless-backlog
```
