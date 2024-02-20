const packageModel = require("../models/package");

module.exports = {
    // getAllUsers,
    createPackage, 
    fetchPackage, 
    getAllPackages,
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
  
  async function fetchPackage(req, res) {
    // const userName = req.params.username;
    const packageId = req.body.packageId;
    console.log(packageId)
    try {
      const packageData = await packageModel.fetchOnePackage(packageId);
      res.json(packageData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errMsg: err.message });
    }
  }
  

  async function getAllPackages(req, res) {
    try {
      const allPackagesData = await packageModel.fetchAll();
      res.json(allPackagesData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errMsg: err.message });
    }
  }
  