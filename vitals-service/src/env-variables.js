const os = require('os');

const envVariables = {
  serviceId: process.env.NAME || "vitals-service",
  ver: process.env.VERSION || "0.0.1",

  env: process.env.ENV || "development",
  port: process.env.SERVICE_PORT || 8080,
  contextPath: process.env.CONTEXT_PATH || "/vitals-service",

  rootTenantId: process.env.ROOT_TENANTID || "in",

  dateFormat: process.env.DATEFORMAT || "DD/MM/YYYY",
  timeZone: process.env.TIMEZONE || "Asia/Kolkata",

  hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET || "",
  hasuraUrl: process.env.HASURA_URL || "",

  services: {
    encryptionServiceHost:
      process.env.ENCRYPTION_SERVICE_HOST || "http://localhost:8013",
    encryptionServiceEncryptUrl: "/egov-enc-service/crypto/v1/_encrypt",
    encryptionServiceDecryptUrl: "/egov-enc-service/crypto/v1/_decrypt",
    encryptionServiceHashUrl: "/egov-enc-service/crypto/v1/_hash",
  },

  kafka: {
    // Unused
    kafkaBootstrapServer:
      process.env.KAFKA_BOOTSTRAP_SERVER || "localhost:9092",

    kafkaConsumerEnabled: process.env.KAFKA_CONSUMER_ENABLED || true,
  },
  googleService: {
    spreadsheetId:
      process.env.GOOGLE_SHEET_ID ||
      "1WXuhd0zC7Ly-8Smjkzpg8QVG8CPtc6Zv-tXmptVnPgw",
    scopes:
      process.env.SCOPES || "https://www.googleapis.com/auth/spreadsheets",
    client_email:
      process.env.CLIENT_EMAIL ||
      "swasth@my-project-58821-sheet.iam.gserviceaccount.com",
    private_key: process.env.PRIVATE_KEY || " ",
    value_input_option: process.env.VALUE_INPUT_OPTION || "RAW",
  },
};

module.exports = envVariables;