const vitalService = require("../service/vitals-service");

exports.vitalAdd = async (req, res) => {
  try {
    let data = await vitalService.addVitals(req.body);
    if (data === (undefined || null)) return;
    return res.send({
      status:"success",
    });
  } catch {}
};
