# Serverless AWS Lambda Cron Component

This Serverless Framework Component is a ready-to-go Lambda function that runs on whatever schedule you want!

Full README is available in the repo [here](https://github.com/serverless-components/aws-lambda-cron)

# Quick Start

## Install

To get started with this component, install the latest version of the Serverless Framework:

```
npm install -g serverless
```

## Initialize

The easiest way to start using the lambda-cron component is by initializing the `aws-lambda-cron` template. Just run this command:

```
serverless init aws-lambda-cron-template
cd aws-lambda-cron-template
```

This will create an empty `.env` file. Open that `.env` file and add your AWS credentials

```
# .env
AWS_ACCESS_KEY_ID=XXX
AWS_SECRET_ACCESS_KEY=XXX
```

You should now have a directory that looks something like this:

```
|- serverless.yml
|- .env
|- src/handler.js
```

The `serverless.yml` file is where you define your component config. It looks something like this:

```yml
component: aws-lambda-cron@dev
org: your-org-here
name: lambda-cron
inputs:
  src: ./src/
  schedule: rate(1 minute)
```

You can add your own code in `src` and run it at your own schedule!
