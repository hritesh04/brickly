import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class ObjectStore {
  private static instance: ObjectStore;
  private client: S3Client | null = null;
  private constructor() {}
  static getInstance() {
    if (!this.instance) this.instance = new ObjectStore();
    return this.instance;
  }
  private async getClient() {
    if (this.client) return this.client;
    console.log(process.env.OBJECT_STORE_URL);
    this.client = new S3Client({
      endpoint: process.env.OBJECT_STORE_URL || "",
      region: "us-east-1",
      credentials: {
        accessKeyId: "minioadmin",
        secretAccessKey: "minioadmin",
      },
      forcePathStyle: true,
    });
    return this.client;
  }
  async uploadFile(buffer: Buffer, path: string, contentType: string) {
    const client = await this.getClient();
    const command = new PutObjectCommand({
      Bucket: "assets",
      Key: path,
      Body: buffer,
      ContentType: contentType,
    });
    const res = await client.send(command);
    console.log(res);
  }
}
