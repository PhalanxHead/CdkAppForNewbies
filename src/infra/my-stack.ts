import { Stack, StackProps } from 'aws-cdk-lib';
import { Architecture, IFunction } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Bucket, BucketEncryption, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface MyStackProps extends StackProps {}

export class MyStack extends Stack {
    readonly myCoolBucket: IBucket;
    readonly myReadLambda: IFunction;
    readonly myWriteLambda: IFunction;

    constructor(scope: Construct, id: string, props: MyStackProps) {
        super(scope, id, props);

        this.myCoolBucket = new Bucket(this, 'my-cool-bucket', {
            encryption: BucketEncryption.KMS_MANAGED,
        });

        this.myReadLambda = new NodejsFunction(this, 'my-s3-reading-lambda', {
            entry: 'src/app/read-function-handler.ts',
            environment: {
                BUCKET_NAME: this.myCoolBucket.bucketName,
            },
            architecture: Architecture.ARM_64,
            logRetention: RetentionDays.ONE_DAY,
        });
        this.myCoolBucket.grantRead(this.myReadLambda);

        this.myWriteLambda = new NodejsFunction(this, 'my-s3-writing-lambda', {
            entry: 'src/app/write-function-handler.ts',
            environment: {
                BUCKET_NAME: this.myCoolBucket.bucketName,
            },
            architecture: Architecture.ARM_64,
            logRetention: RetentionDays.ONE_DAY,
        });
        this.myCoolBucket.grantWrite(this.myWriteLambda);
    }
}
