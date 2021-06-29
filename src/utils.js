"use strict";
const createOrUpdateMetaRole = async (
  instance,
  inputs,
  extras,
  serverlessAccountId
) => {
  // Create or update Meta Role for monitoring and more, if option is enabled.  It's enabled by default.
  if (inputs.monitoring || typeof inputs.monitoring === "undefined") {
    console.log("Creating or updating the meta IAM Role...");

    const roleName = `${instance.state.name}-meta-role`;

    const assumeRolePolicyDocument = {
      Version: "2012-10-17",
      Statement: {
        Effect: "Allow",
        Principal: {
          AWS: `arn:aws:iam::${serverlessAccountId}:root`, // Serverless's Components account
        },
        Action: "sts:AssumeRole",
      },
    };

    // Create a policy that only can access APIGateway and Lambda metrics, logs from CloudWatch...
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Resource: "*",
          Action: [
            "cloudwatch:Describe*",
            "cloudwatch:Get*",
            "cloudwatch:List*",
            "logs:Get*",
            "logs:List*",
            "logs:Describe*",
            "logs:TestMetricFilter",
            "logs:FilterLogEvents",
          ],
        },
      ],
    };

    const roleDescription = `The Meta Role for the Serverless Framework App: ${instance.name} Stage: ${instance.stage}`;

    const result = await extras.deployRole({
      roleName,
      roleDescription,
      policy,
      assumeRolePolicyDocument,
    });

    instance.state.metaRoleName = roleName;
    instance.state.metaRoleArn = result.roleArn;

    console.log(
      `Meta IAM Role created or updated with ARN ${instance.state.metaRoleArn}`
    );
  }
};

const getVpcConfig = (vpcConfig) => {
  if (vpcConfig == null) {
    return {
      SecurityGroupIds: [],
      SubnetIds: [],
    };
  }

  return {
    SecurityGroupIds: vpcConfig.securityGroupIds,
    SubnetIds: vpcConfig.subnetIds,
  };
};

module.exports = {
  createOrUpdateMetaRole,
  getVpcConfig,
};
