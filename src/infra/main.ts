import { App } from 'aws-cdk-lib';
import { MyStack } from './my-stack';

const app = new App();

new MyStack(app, 'CdkAppForNewbies', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});

app.synth();
