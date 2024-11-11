const cdk = require('aws-cdk-lib');
const { WhiteOutSkiStack } = require('../lib/white-out-ski-stack');

const app = new cdk.App();
new WhiteOutSkiStack(app, 'WhiteOutSkiStack', {});
