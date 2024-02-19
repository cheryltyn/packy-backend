const packageModel = require("../models/package");

module.exports = {
    // getAllUsers,
    createPackage
};

async function createPackage(req, res) {
    // const userName = req.params.username;
    const body = req.body;
    console.log(body)
    try {
      const packageData = await packageModel.createOnePackage(body);
      res.json(packageData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errMsg: err.message });
    }
  }
  