import { KafkaClient, HighLevelProducer, ProduceRequest } from 'kafka-node';

class KafkaProducer {
  private readonly kafkaHost: string;
  private client: KafkaClient;
  private producer: HighLevelProducer;
  private readonly topic: string;

  constructor() {
    this.topic = 'teststream';
    this.kafkaHost = 'localhost:9092';
  }

  public publish = (message: string) => {
    this.client = new KafkaClient({ kafkaHost: this.kafkaHost });
    this.producer = new HighLevelProducer(this.client);
    this.producer.on('ready', (): void => {
      this.client.refreshMetadata([this.topic], (error: Error): void => {
        if (error) {
          throw error;
        }
        this.producer.send(
          [{ topic: this.topic, messages: [message] }],
          (error: Error, result: ProduceRequest): void => {
            error ? console.error(error) : console.log('producer.ts - ' + JSON.stringify(result));
            // process.exit(1);
          },
        );
      },
      );
    });

    this.producer.on('error', (error: Error): void => {
      console.error(`Error in Kafka message producer - ${error}`);
    });
  }
}

export default new KafkaProducer();
