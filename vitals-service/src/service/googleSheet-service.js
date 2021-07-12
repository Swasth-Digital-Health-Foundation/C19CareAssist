const { google } = require("googleapis");
const sheets = google.sheets("v4");
const envVariables = require('../env-variables')

class googleSheetManager {
  async saveDataToSheet(sheetData) {
    const authClient = await this.authorize();
    const request = {
      spreadsheetId: envVariables.googleService.spreadsheetId,
      range: `${sheetData.sheetName}!A1`,
      valueInputOption: envVariables.googleService.value_input_option,
      resource: {
        values: [sheetData.data],
      },
      auth: authClient,
    };

    try {
      const response = await sheets.spreadsheets.values.append(request);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  authorize() {
    //decode base64
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
