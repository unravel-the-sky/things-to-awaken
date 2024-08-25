import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from "next";

export default async function awsUploader(req: NextApiRequest, res: NextApiResponse){
    const {method, body} = req;
    const s3Client = new S3({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        signatureVersion: 'v4'
    });

    const config = {
        api: {
          bodyParser: {
            sizeLimit: "10mb",
          },
        },
      };
		
		// do the shit
		if (method === 'POST') {
			try {
				const fileParams = {
						Bucket: process.env.AWS_BUCKET_NAME,
						Key: req.body?.file_key,
						Expires: 600,
						ContentType: req.body?.type
				}

				const url = await s3Client.getSignedUrlPromise('putObject', fileParams);

				return res.status(200).json({success: true, url: url})
			} catch (err){
					console.error('error happened while uploading: ', err)
					return res.status(400).json({success: false})
			}
		}
}