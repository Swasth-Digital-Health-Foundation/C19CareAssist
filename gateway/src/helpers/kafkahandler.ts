import { Message } from 'kafka-node';
import Search from '../services/search'
import logger from '../utils/logger';
import {KafkaTopics} from '../constants/topics';

class KafkaHandler {
 
    handleConsumerMessage(message: Message) {
        try {
            const kafkaMessage = JSON.parse(JSON.stringify(message));
            logger.debug(`Consumed message - ${JSON.stringify(message)}`);
            if (kafkaMessage.topic === KafkaTopics.search) {
                logger.info(" In KafkaHandler.search")
                const response = new Search().getResults(kafkaMessage.value);
                if (response === null) {
                    throw new Error('Error from Search.getResults');
                }
            }        // add more topics
        }
        catch(error){
            logger.error('Error in kafkahandler' + error);
        }
    }
}

export default new KafkaHandler();