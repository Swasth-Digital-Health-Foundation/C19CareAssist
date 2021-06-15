import { KafkaClient, ConsumerGroup, Offset, ConsumerGroupOptions, Message } from 'kafka-node';


class KafkaConsumer {
  private readonly kafkaHost: string;
  private readonly client: KafkaClient;
  private readonly consumerGroup: ConsumerGroup;
  private readonly offset: Offset;
  private readonly consumerGroupOptions: ConsumerGroupOptions;

  private readonly topic: string;

  constructor() {
    this.topic = 'teststream';
    this.kafkaHost = 'localhost:9092';
    this.consumerGroupOptions = {
      kafkaHost: this.kafkaHost,
      autoCommit: true,
      groupId: 'TestGroup',
    };
    this.client = new KafkaClient({ kafkaHost: this.kafkaHost });
    this.consumerGroup = new ConsumerGroup(this.consumerGroupOptions, this.topic);
    this.offset = new Offset(this.client);
  }

  public subscribe = () => {
    this.offset.fetch([{ topic: this.topic, partition: 0, time: -1 }], (error, offsets): void => {
      if (error) {
        return console.error(error);
      }
      console.log(offsets);
      const min = Math.min.apply(null, offsets[this.topic][0]);
      this.consumerGroup.setOffset(this.topic, 0, min);
    });

    this.consumerGroup.on('message', (message: Message): void => {
      console.log(`Consumed message - ${JSON.stringify(message)}`);
    });

    this.consumerGroup.on('error', (error: Error): void => {
      console.error(`Error in Kafka message consumer - ${error}`);
    });
  }
}

export default new KafkaConsumer();
