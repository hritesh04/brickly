import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

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
    this.client = new S3Client({
      endpoint: process.env.OBJECT_STORE_URL || "",
      region: "us-east-1",
      credentials: {
        accessKeyId: "minioadmin",
        secretAccessKey: "minioadmin",
      },
      forcePathStyle: true,
    });
    // this.client.
    return this.client;
  }
  async getFile(key: string) {
    const client = await this.getClient();
    const command = new GetObjectCommand({
      Bucket: "assets",
      Key: key,
    });
    const res = await client.send(command);
    return res.Body;
  }
  uploadDir() {}
}
