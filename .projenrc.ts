import { awscdk } from 'projen';
import { TrailingComma } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkTypeScriptApp({
    authorName: 'PhalanxHead',
    cdkVersion: '2.39.0',
    defaultReleaseBranch: 'main',
    name: 'CdkAppForNewbies',
    projenrcTs: true,
    description: 'An app for newbies that shows off the CDK anatomy',
    appEntrypoint: 'infra/main.ts',
    lambdaAutoDiscover: false,

    prettier: true,
    prettierOptions: {
        settings: {
            printWidth: 140,
            tabWidth: 4,
            singleQuote: true,
            semi: true,
            trailingComma: TrailingComma.ES5,
        },
    },

    depsUpgrade: false,

    eslint: true,

    deps: ['@aws-sdk/client-s3', 'aws-lambda'],
    devDeps: ['prettier-eslint', '@types/aws-lambda', 'esbuild@^0', 'cdk-dia'],
});

project.addTask('diagram', {
  exec: 'cdk-dia --target docs\\stack_diagram.png'
})

project.synth();
