const packageModel = require("../models/package");

module.exports = {
    // getAllUsers,
    createPackage, 
    fetchPackage, 
    getAllPackages,
    editPackage, 
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
    const packageId = req.query.id;
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
  
  async function editPackage(req, res) {
    try {
        const packageId = req.query.id;
        const updateData = req.body;
        const updatedPackage = await packageModel.updatePackage(packageId, updateData);

        // Check if the package was updated successfully
        if (!updatedPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }

        // Send the updated package as response
        return res.json(updatedPackage);
    } catch (error) {
        // Handle errors
        console.error('Error editing package:', error);
        return res.json({ error: 'Internal server error' });
    }
}