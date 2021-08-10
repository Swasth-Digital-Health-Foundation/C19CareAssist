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

  ivrUrl: process.env.IVR_URL || "",
  ivrApiKey: process.env.IVR_API_KEY || "",

  services: {
    encryptionServiceHost:
      process.env.ENCRYPTION_SERVICE_HOST || "http://localhost:8013",
    encryptionServiceEncryptUrl: "/egov-enc-service/crypto/v1/_encrypt",
    encryptionServiceDecryptUrl: "/egov-enc-service/crypto/v1/_decrypt",
    encryptionServiceHashUrl: "/egov-enc-service/crypto/v1/_hash",
  },

  googleService: {
    spreadsheetId: process.env.GOOGLE_SHEET_ID || "",
    ivr_spreadsheetId: process.env.GOOGLE_IVR_SHEET_ID || "",
    scopes: process.env.SCOPES || "",
    client_email: process.env.CLIENT_EMAIL || "",
    private_key: process.env.PRIVATE_KEY || " ",
    value_input_option: process.env.VALUE_INPUT_OPTION || "",
  },
};

module.exports = envVariables;