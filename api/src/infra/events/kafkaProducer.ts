import { EventProducer } from "../../domain/ports/eventProducer";
import { Producer } from "kafkajs";

export class KafkaProducer implements EventProducer {
  constructor(
    private readonly producer: Producer
  ) {}

  async sendMessage<T>(event: string, entity: T): Promise<void> {
    await this.producer.connect();

    await this.producer.send({
      topic: event,
      messages: [{ value: JSON.stringify(entity) }],
    });

    await this.producer.disconnect();
  }
}
