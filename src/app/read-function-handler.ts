import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export type ReadRequest = {
    fileName: string;
};

export const handler = async (event: { body?: string }): Promise<{ statusCode: number; body: string }> => {
    try {
        const request = JSON.parse(event.body ?? '') as ReadRequest;

        const s3Client = new S3Client({});
        const s3Response = await s3Client.send(
            new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: request.fileName,
            })
        );
        console.log('S3 Response', s3Response);

        return {
            statusCode: 200,
            body: JSON.stringify({ fileName: request.fileName, fileContent: s3Response.Body }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: 'Reading from S3 Failed!',
        };
    }
};
