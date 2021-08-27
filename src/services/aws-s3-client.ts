import { DateTime } from "luxon";
import { nanoid } from 'nanoid';
import { default as S3 } from "aws-sdk/clients/s3";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import { extractFileExtention } from "../helpers/file-extension";

export class S3Client {

  protected client: S3;

  constructor() {
    this.client = new S3({
      signatureVersion: 'v4',
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION
    });
  }

  public put(data: any, fileName: string, mimeType: string, encoding: string): Promise<ManagedUpload.SendData> {
    return this.client.upload({
      Bucket: `${process.env.AWS_S3_BUCKET}/${this.getLocation()}`,
      Key: fileName,
      Body: data,
      ContentType: `${mimeType}; charset=utf-8`,
      ACL: 'public-read',
      CacheControl: 'max-age=60',
      ContentEncoding: encoding
    }).promise();
  }

  getLocation(): string {
    const yearMonthFolder = DateTime.now().toFormat('YYYY/MM')
    return `uploads/${yearMonthFolder}`;
  }

  async getUploadSignedUrl(fileName: string) {
    const fileNamePrefix = nanoid(12);
    const extension = extractFileExtention(fileName);
    return await this.client.getSignedUrlPromise('putObject', {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${this.getLocation()}/${fileNamePrefix}.${extension}`,
      ACL: 'public-read'
    })
  }

}