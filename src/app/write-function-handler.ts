import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export type WriteRequest = {
    fileName: string;
    fileContent: string;
};

export const handler = async (event: { body?: string }): Promise<{ statusCode: number; body: string }> => {
    try {
        const request = JSON.parse(event.body ?? '') as WriteRequest;

        const s3Client = new S3Client({});
        const s3Response = await s3Client.send(
            new PutObjectCommand({
                Body: request.fileContent,
                Bucket: process.env.BUCKET_NAME,
                Key: request.fileName,
            })
        );
        console.log('S3 Response', s3Response);

        return {
            statusCode: 200,
            body: 'Success',
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: 'Writing to S3 Failed!',
        };
    }
};
