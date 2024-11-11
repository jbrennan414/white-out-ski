const { Stack, Duration } = require('aws-cdk-lib');
const aws_dynamodb = require('aws-cdk-lib/aws-dynamodb');
const cdk = require('aws-cdk-lib');
const aws_lambda = require('aws-cdk-lib/aws-lambda');
const aws_apigateway = require('aws-cdk-lib/aws-apigateway');

class WhiteOutSkiStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a DynamoDB table
    const dynamoTable = new aws_dynamodb.Table(this, 'WhiteOutDbTable', {
      partitionKey: { name: 'reservation_date', type: aws_dynamodb.AttributeType.STRING },
      sortKey: { name: 'user_name', type: aws_dynamodb.AttributeType.STRING},
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    dynamoTable.addGlobalSecondaryIndex({
      indexName:'date-user_name-index',
      partitionKey: { name: 'reservation_date', type: aws_dynamodb.AttributeType.STRING },
      sortKey: { name: 'user_name', type: aws_dynamodb.AttributeType.STRING },
    })
    
    const readLambda = new aws_lambda.Function(this, "ReadLambda", {
      description: "GET methods from API Gateway for WhiteOut",
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromAsset("lib/lambda"),
      handler: "read.main",
        environment: {
          DYNAMO_TABLE_NAME: dynamoTable.tableName,
        },
    });

    const createLambda = new aws_lambda.Function(this, "CreateLambda", {
      description: "POST methods from API Gateway for WhiteOut",
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromAsset("lib/lambda"),
      handler: "create.main",
        environment: {
          DYNAMO_TABLE_NAME: dynamoTable.tableName,
        },
    });

    const deleteLambda = new aws_lambda.Function(this, "DeleteLambda", {
      description: "DELETE methods from API Gateway for WhiteOut",
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromAsset("lib/lambda"),
      handler: "delete.main",
        environment: {
          DYNAMO_TABLE_NAME: dynamoTable.tableName,
        },
    });

    dynamoTable.grant(readLambda, 'dynamodb:Scan');
    dynamoTable.grant(createLambda, 'dynamodb:PutItem');
    dynamoTable.grant(deleteLambda, 'dynamodb:DeleteItem');

    const api = new aws_apigateway.RestApi(this, 'WhiteOutAPI', {
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
      },
    });

    const readIntegration = new aws_apigateway.LambdaIntegration(readLambda);
    const createIntegration = new aws_apigateway.LambdaIntegration(createLambda);
    const deleteIntegration = new aws_apigateway.LambdaIntegration(deleteLambda);

    api.root.addMethod('GET', readIntegration);
    api.root.addMethod('POST', createIntegration);
    api.root.addMethod('DELETE', deleteIntegration);

  }
}

module.exports = { WhiteOutSkiStack }
