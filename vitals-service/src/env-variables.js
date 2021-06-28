const os = require('os');

const envVariables = {
    serviceId: process.env.NAME || 'vitals-service',
    ver: process.env.VERSION || '0.0.1',

    port: process.env.SERVICE_PORT || 8080,
    contextPath: process.env.CONTEXT_PATH || '/vitals-service',

    rootTenantId: process.env.ROOT_TENANTID || 'in',

    dateFormat: process.env.DATEFORMAT || 'DD/MM/YYYY',
    timeZone: process.env.TIMEZONE || 'Asia/Kolkata',

    hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET || '',
    hasuraUrl: process.env.HASURA_URL || '',

    services: {
        encryptionServiceHost: process.env.ENCRYPTION_SERVICE_HOST || 'http://localhost:1234',
        encryptionServiceEncryptUrl: '/egov-enc-service/crypto/v1/_encrypt',
        encryptionServiceDecryptUrl: '/egov-enc-service/crypto/v1/_decrypt',
        encryptionServiceHashUrl: '/egov-enc-service/crypto/v1/_hash'
    },

    kafka: {                                                                // Unused
        kafkaBootstrapServer: process.env.KAFKA_BOOTSTRAP_SERVER || 'localhost:9092',

        kafkaConsumerEnabled: process.env.KAFKA_CONSUMER_ENABLED || true,
    },

}

module.exports = envVariables;