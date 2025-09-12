import { Channel, ChannelModel, connect, Connection } from "amqplib";
import { BuildMessage } from "../types";

export default class BuildQueue {
  private static instance: BuildQueue;
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  private constructor() {}
  static getInstance() {
    if (!this.instance) this.instance = new BuildQueue();
    return this.instance;
  }

  private async getChannel() {
    if (this.channel) return this.channel;
    this.connection = await connect(process.env.RABBITMQ_URL || "");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue("queue", { durable: false });
    console.log("Rabbit MQ Channel Created");
    return this.channel;
  }

  async push(data: BuildMessage) {
    const channel = await this.getChannel();
    const bufferData = JSON.stringify(data);
    channel.sendToQueue("queue", Buffer.from(bufferData));
  }
}
