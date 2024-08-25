import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import axios from "axios";
import { Agent } from "http";
import { v4 as uuidv4 } from "uuid";
import s3Client from "@/lib/s3";

axios.defaults.httpAgent = new Agent({ keepAlive: false });

export const getAwsUploadUrl = async ({
  file_key,
  type,
}: {
  file_key: string;
  type: string;
}) => {
  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file_key,
      ContentType: type,
    };

    const url = await getSignedUrl(s3Client, new PutObjectCommand(fileParams));

    return {
      success: true,
      url: url,
    };
  } catch (err) {
    console.error("error happened while uploading: ", err);
    return {
      success: false,
    };
  }
};

export const getAwsDownloadUrl = async ({ file_key }: { file_key: string }) => {
  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file_key,
      Expires: 600,
    };

    const url = await getSignedUrl(s3Client, new GetObjectCommand(fileParams));

    return {
      success: true,
      url: url,
      fileKey: file_key
    };
  } catch (err) {
    console.error("error happened while downloading file: ", err);
    return {
      success: false,
    };
  }
};

export const getFileUrl = (fileKey: string): string => {
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`
  return url;
};

export const uploadImage = async (file: File, orgName: string, location = 'logo') => {  
  const fileKey = `${location}/${orgName}-${uuidv4()}`;
  const fileType = file.type;

  const { success, url } = await getAwsUploadUrl({
    file_key: fileKey,
    type: fileType,
  });

  if (success && url) {
    const uploadUrl = url;
    const data = new Blob([file]);

    try {
      const res = await axios.put(uploadUrl, data, {
        headers: {
          "Content-Type": fileType,
          "Access-Control-Allow-Origin": "*",
        },
      });

      console.log("result is ", res);

      return fileKey;
    } catch (err) {
      console.warn("error happened: ", err);
    }
  }
};

export const uploadPdf = async (formDataEntryValue: FormDataEntryValue, orgName: string) => {
  const fileKey = `document/${orgName}-${uuidv4()}`;
  const fileType = 'application/pdf';

  const { success, url } = await getAwsUploadUrl({
    file_key: fileKey,
    type: fileType,
  });


  if (success && url) {
    const uploadUrl = url;

    let arrayBuffer = null; 

    if (formDataEntryValue instanceof Blob) {
      // Convert the Blob (or File) to an ArrayBuffer
      arrayBuffer = await formDataEntryValue.arrayBuffer();
  }

    try {
      const res = await axios.put(uploadUrl, arrayBuffer, {
        headers: {
          "Content-Type": fileType,
          "Access-Control-Allow-Origin": "*",
        },
        timeout: 60000, // Increase timeout
        maxBodyLength: Infinity, // For large files
        maxContentLength: Infinity // For large files
      });

      console.log("result is ", res);

      return fileKey;
    } catch (err) {
      console.warn("error happened: ", err);
    }
  }
}
