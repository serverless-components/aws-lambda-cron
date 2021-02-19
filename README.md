# Serverless AWS Lambda Cron Component

This Serverless Framework Component is a ready-to-go Lambda function that runs on whatever schedule you want!

<br/>

- [x] **Never Pay For Idle** - No invocations, no cost. Averages $0.0000002-$0.0000009 per request.
- [x] **Zero Configuration** - All we need is your code, then just deploy (advanced config options are available).
- [x] **Fast Deployments** - Deploy to the cloud in seconds.
- [x] **Realtime Logging** - Rapidly develop on the cloud w/ real-time logs and errors in the CLI.
- [x] **Team Collaboration** - Collaborate with your teammates with shared state and outputs.

<br/>

# Quick Start

## Install

To get started with this component, install the latest version of the Serverless Framework:

```
npm install -g serverless
```

After installation, make sure you connect your AWS account by setting a provider in the org setting page on the [Serverless Dashboard](https://app.serverless.com).

## Initialize

The easiest way to start using the lambda-cron component is by initializing the `aws-lambda-cron` template. Just run this command:

```
serverless init aws-lambda-cron-template
cd aws-lambda-cron-template
```

You should now have a directory that looks something like this:

```
|- serverless.yml
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

For more configuration options for the `serverless.yml` file, [check out the Configuration section](#configuration-reference) below.

# Your code

All you need to do is add javascript file that exposes a method called `handler`, and the rest is up to you!

`src/index.js`

```js
const handler = async () => {
  return "we did it";
};

module.exports = {
  handler,
};
```

# Configuration Reference

The most important configuration option that's required is the `schedule` expression. This must be provided, and supports any of the expressions listed [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#:~:text=CloudWatch%20Events%20supports%20cron%20expressions%20and%20rate%20expressions.&text=For%20example,%20with%20a%20cron,hour%20or%20once%20every%20day.)

Examples:

```
schedule: rate(1 minute)
schedule: rate(1 day)
schedule: cron(0 12 * * ? *) // every day at 12:00pm UTC
```

Full reference:

```
component: aws-lambda-cron       # (required) name of the component. In that case, it's express. You will want to pin this to a specific version in production via semantic versioning, like this: lambda-cron@0.0.2. Run 'serverless registry lambda-cron' to see available versions.
name: my-lambda-cron             # (required) name of your express component instance.
org: serverlessinc               # (optional) serverless dashboard org. default is the first org you created during sign up.
app: myApp                       # (optional) serverless dashboard app. default is the same as the name property.
stage: dev                       # (optional) serverless dashboard stage. default is dev.

inputs:
  schedule:                      # (required) Cron expression or rate expression for how often your lambda should be triggered.
  src: ./                        # (optional) path to the source folder. default is a hello world app.
  memory: 512                    # (optional) lambda memory size.
  timeout: 10                    # (optional) lambda timeout.
  description: My Cron Lambda    # (optional) lambda & api gateway description.
  env:                           # (optional) env vars.
    FOO: 'bar'
  region: us-east-2              # (optional) aws region to deploy to. default is us-east-1.
```

# CLI Reference

## deploy

To deploy, simply run `deploy` from within the directory containing the `serverless.yml` file:

```
serverless deploy
```

If you'd like to know what's happening under the hood and see realtime logs, you can pass the `--debug` flag:

```
serverless deploy --debug
```

## dev (dev mode)

Instead of having to run `serverless deploy` every time you make changes you wanna test, you can enable **dev mode**, which allows the CLI to watch for changes in your source directory as you develop, and deploy instantly on save.

To enable dev mode, simply run the following command from within the directory containing the `serverless.yml` file:

```
serverless dev
```

Dev mode also enables live streaming logs from your Lambda Cron function so that you can see the results of your code changes right away on the CLI as they happen.

## info

Anytime you need to know more about your running Lambda Cron instance, you can run the following command to view the most critical info:

```
serverless info
```

This is especially helpful when you want to know the outputs of your instances so that you can reference them in another instance. It also shows you the status of your instance, when it was last deployed, how many times it was deployed, and the error message & stack if the latest deployment failed.

To dig even deeper, you can pass the `--debug` flag to view the state object of your component instance:

```
serverless info --debug
```

## remove

If you wanna tear down your entire Lambda Cron infrastructure that was created during deployment, just run the following command in the directory containing the `serverless.yml` file:

```
serverless remove
```

The Lambda Cron component will then use all the data it needs from the built-in state storage system to delete only the relevant cloud resources that it created.

Just like deployment, you could also specify a `--debug` flag for realtime logs from the GraphQL component running in the cloud:

```
serverless remove --debug
```
