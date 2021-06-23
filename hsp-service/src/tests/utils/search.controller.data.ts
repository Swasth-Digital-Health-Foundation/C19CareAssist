class SearchTestData {
  readonly response = {
    services: [{
      speciality: 'physician',
      consultation: {
        languages: ['english'],
        supportedchannels: [{ id: 2, name: 'audio' }],
        consult_time: '2021-06-21T10:08:42.854+00:00'
      },
      provider: {
        id: '1mg-HSP',
        type: 'HSP',
        name: '1mg HSP',
        api: {
          type: 'base',
          url: 'https://stagapi.1mgdoctors.com/api/v1/bhs'
        }
      },
      fulfillment_schedule_type: 'asap'
    }]
  };

  readonly gatewayPublicKey: string = 'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQW93QlMrV1JNN0Jhak9haWlESWFyb3dqeVRvOUhpdVJyZy91SlVIY2c0cWx1WXQ1WHR3c2kKUmIrbnlWUSs1aG1WSDZOc3cvWVpEVnF4ZXBTTFVwelE2OXBnOVNia2VoU01tbjM3YW9QWm1NalQ5d1UybEtHKwpBYjB2cHFrdnZERnZMVzBrZm5yR1BWUU1TQWhlbHJMSWxSQkJ2VXZHWXBZSjdOSFhxMHF3dVNZQklpZlN3RXNwCjFLV0kwMHdkTHhxemJWQURNVTZSOFhGNE9yNVgyYkxYd2xycHNsbk5SVGhRemdTTUFXbjQvY01VYVd5bjVKSkYKTFo1ZkQrb2tJMys4WnpIS2dRTjVrd1Y2eEZRVFNyWkEzVk1UZEFNcVhRaFZ4L1U1VjRMNnE1MXI4amthTlVZaApYczRNTEwvdXRvWHVtc2JOTUpTaWp6amhQa3NMZ1lqS1pRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0=';
  readonly apiToken: string = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjQ0NDAxNTYzNDYsImRhdGEiOnsiaWQiOjIsIm5hbWUiOiJOZXcgSFNQIiwidHlwZXMiOlt7Im5hbWUiOiJoc3AiLCJpZCI6MiwiY3JlYXRlZCI6IjIwMjEtMDYtMjNUMDg6MTI6MzYuMzIzWiJ9XX0sImlhdCI6MTYyNDQzOTU1NiwiaXNzIjoiaGVhbHRoZ2F0ZXdheSJ9.K_PBA66XbxqBeC1Mk417uLIE_aRsr9fz0jPaXr20Tx3Wj-fSbRUqbYAhSqj9t_GfreTbOhH_AYLs3Fl1SYfdIlIPM0Bq4T4ihGAUhdpp_5JFbpKGCVlVDPjYKsAZDdx6lQuoG_Fvpgd7tUKzpgfEy_zOHQt0t_vrAOTroXz8S-8-snheMa30F5NINexNYin62EvFW61Ufp_gC0G6KTXc3kLae6Q_rJwmkDxqe7zwKs-mkX9EKyz3jSmN8k4zYyhT2msOMdQ9PPNwVebHnlPJwz85te4RZZVocreyP38NVF4itATcZqV4i290mRWJjz_SGaKychqdC_ixhcV0nB823g';
}

export default new SearchTestData();