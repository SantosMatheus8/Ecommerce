export interface EventProducer {
  sendMessage<T>(event: string, entity: T): Promise<void>
}
