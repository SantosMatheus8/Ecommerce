import { EventConsumer } from "../../domain/ports/eventConsumer";
import { User } from "../../domain/models/user";

import { Consumer } from "kafkajs";
import "dotenv/config";

type KafkaMessage = {
  value: Buffer
};

export class KafkaConsumer implements EventConsumer {
  private readonly subscribes: Record<string, (message: KafkaMessage) => Promise<void>>;

  constructor(
    private readonly consumer: Consumer
  ) {
    this.subscribes = {};
    console.log("Kafka consumer created");
  }

  async onForgotPassword(cbk: (user: User) => Promise<void>): Promise<void> {
    this.addSubscribe("user-forgot-password", cbk);
  }

  private addSubscribe<T>(topicName: string, cbk: (message: T) => Promise<void>): void {
    this.subscribes[topicName] = async(message: KafkaMessage) => {
      await cbk(JSON.parse(message.value.toString()));
    };
    console.log("User forgot password subscribed");
  }

  async start(): Promise<void> {
    await this.consumer.connect();
    console.log("Connected to Kafka broker");

    await this.consumer.subscribe({ topics: Object.keys(this.subscribes) });
    console.log(`Subscribed to topics: ${Object.keys(this.subscribes).join(",\n")}`);

    await this.consumer.run({
      eachMessage: async({ topic, message }) => {
        console.log(`Message received on topic ${topic}`);
        await this.subscribes[topic](message);
      },
    });
  }
}
