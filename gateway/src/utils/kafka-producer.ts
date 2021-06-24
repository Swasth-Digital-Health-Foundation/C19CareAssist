import { KafkaClient, HighLevelProducer, ProduceRequest } from 'kafka-node';
import logger from './logger';

class KafkaProducer {
  private readonly kafkaHost: string;
  private client: KafkaClient;
  private producer: HighLevelProducer;
  private topic: string;

  constructor() {
    this.topic = 'teststream';
    this.kafkaHost = 'localhost:9092';
    
  }

  

  public publish = (topic: string, message: string) => {
    this.topic = topic;
    this.client = new KafkaClient({ kafkaHost: this.kafkaHost });
    this.producer = new HighLevelProducer(this.client);
   /*  var topicsToCreate = [{
      topic: 'teststream2',
      partitions: 1,
      replicationFactor: 1
    }]
    this.client.createTopics(topicsToCreate, (error, result) => {

      if (error) {
        logger.error(error);
      }
      // result is an array of any errors if a given topic could not be created
    }) */
    this.producer.on('ready', (): void => {
      this.client.refreshMetadata([this.topic], (error: Error): void => {
        if (error) {
          logger.error('Error in KafkaProducer. Error refreshing client metadata' + error.message);
          throw error;
        }
        this.producer.send(
          [{ topic: this.topic, messages: [message] }],
          (error: Error, result: ProduceRequest): void => {
            if (error) {
              logger.error('Error in kafkaProducer.kafka. Error publishing data to kafka topic' + error.message)
              throw error;
            }
            logger.info('producer.ts - ' + JSON.stringify(result));
            // process.exit(1);
          },
        );
      },
      );
    });
    this.producer.on('error', (error: Error): void => {
      logger.error(`Error in Kafka message producer - ${error}`);
      throw error;
    });
  }
}

export default KafkaProducer;
