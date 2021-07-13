const { google } = require("googleapis");
const sheets = google.sheets("v4");
const envVariables = require('../env-variables');
const logger = require("../utils/logger");

class googleSheetManager {
  async saveDataToSheet(sheetData) {
    const authClient = this.authorize();
    const request = {
      spreadsheetId: envVariables.googleService.spreadsheetId,
      range: `${sheetData.sheetName}`,
      valueInputOption: envVariables.googleService.value_input_option,
      resource: {
        values: [sheetData.data],
      },
      auth: authClient,
    };

    try {
      const response = await sheets.spreadsheets.values.append(request);
      logger.info(`Spreadsheet Details: ${response.data}`)
      return response.data;
    } catch (err) {
      logger.error(err);
    }
  }

  authorize() {
    let buffer = new Buffer(envVariables.googleService.private_key, "base64");
    let private_key = buffer.toString("ascii");

    const authClient = new google.auth.JWT(
      envVariables.googleService.client_email,
      null,
      private_key,
      envVariables.googleService.scopes
    );
    return authClient;
  }
}

module.exports = new googleSheetManager();
