const traigeService = require("../service/triage-service");

exports.triageAdd = async (req, res) => {
  try {
    let data = await traigeService.addVitals(req.body);
    if (data === (undefined || null)) return;
    return res.send({
      status: "success",
    });
  } catch {}
};
