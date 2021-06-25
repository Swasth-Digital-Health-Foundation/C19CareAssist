import { KafkaClient, ConsumerGroup, Offset, ConsumerGroupOptions, Message } from 'kafka-node';
import kafkahandler from '../helpers/kafkahandler'
import logger from './logger';


class KafkaConsumer {
  private readonly kafkaHost: string;
  private readonly client: KafkaClient;
  private readonly consumerGroup: ConsumerGroup;
  private readonly offset: Offset;
  private readonly consumerGroupOptions: ConsumerGroupOptions;

  private readonly topics: string[];

  constructor() {
    this.topics = ['teststream', 'teststream2'];
    this.kafkaHost = 'localhost:9092';
    this.consumerGroupOptions = {
      kafkaHost: this.kafkaHost,
      autoCommit: true,
      groupId: 'TestGroup',
    };
    this.client = new KafkaClient({ kafkaHost: this.kafkaHost });
    this.consumerGroup = new ConsumerGroup(this.consumerGroupOptions, this.topics);
    this.offset = new Offset(this.client);
  }

  public subscribe = () => {
    this.offset.fetch([{ topic: this.topics[0], partition: 0, time: -1 }, {topic: this.topics[1], partition: 0, time: -1}], (error, offsets): void => {
      if (error) {
        return console.error(error);
      }
      logger.debug("Offsets"+ JSON.stringify(offsets));
      const min1 = Math.min.apply(null, offsets[this.topics[0]][0]);
      const min2 = Math.min.apply(null, offsets[this.topics[1]][0]);
      this.consumerGroup.setOffset(this.topics[0], 0, min1);
      this.consumerGroup.setOffset(this.topics[1], 0, min2);
    });

    this.consumerGroup.on('message', (message: Message): void => {
      kafkahandler.handleConsumerMessage(message);
    });

    this.consumerGroup.on('error', (error: Error): void => {
      logger.error(`Error in Kafka message consumer - ${error}`);
    });
  }
}

export default new KafkaConsumer();
