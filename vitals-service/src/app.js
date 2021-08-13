const logger = require("./utils/logger");

const express = require('express'),
  bodyParser = require('body-parser'),
  envVariables = require('./env-variables'),
  port = envVariables.port;
  ivrService = require("../src/service/ivr-service");
  CronJob = require("cron").CronJob;

const createAppServer = () => {
const app = express();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,' + 'cid, user-id, x-auth, Cache-Control, X-Requested-With, datatype, *')
        if (req.method === 'OPTIONS') res.sendStatus(200)
        else next()
    })
    app.use(bodyParser.json({ limit: '10mb' }));
    // app.use(logger('dev'));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
    // app.use(cookieParser());
    app.use(envVariables.contextPath, require('./routes'));
    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500).send({"error" : err.stack});
    });
    module.exports = app;
    return app;
}

/**
 * 
 * Cron Job Starts Every Day at 11:59:59pm;
 *  
 */
const job = new CronJob(
  "59 59 23 * * *",
  async () => {
    logger.info(`Cron job start successfully! at ${new Date()}`);
    const result = await ivrService.main();
    if (result) {
      logger.info(`Cron job completed successfully! at ${new Date()}`);
    }
  },
  () => {
    /* This function is executed when the job stops */
    logger.info(`Cron job failed at ${new Date()}`);
    job.start();
  }
);
logger.info("Cron Job is running")
job.start();
const app = createAppServer();
app.listen(port, () => logger.info(`Vitals-Server is running on port ${envVariables.port} with contextPath: ${envVariables.contextPath}`));