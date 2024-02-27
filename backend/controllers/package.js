const packageModel = require("../models/package");

module.exports = {
    // getAllUsers,
    createPackage, 
    fetchPackage, 
    getAllPackages,
    editPackage, 
    deletePackage, 
};

async function createPackage(req, res) {
    const userID = req.query.userid;
    const body = req.body;

    try {
      const packageData = await packageModel.createOnePackage(body, userID);
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
      const userId = req.query.userid;
      const packagefilter = req.query.filter;
      let allPackagesData = await packageModel.fetchAll(userId);
  
      if (allPackagesData.length === 0) {
        // If no packages are found, send a custom response
        return res.status(404).json({ message: 'No packages found for the specified user' });
      }
  
      // Filter allPackagesData based on packagefilter
      if (packagefilter === 'Beauty') {
        allPackagesData = allPackagesData.filter(package => package.packageType === 'Beauty');
      } else if (packagefilter === 'Fitness') {
        allPackagesData = allPackagesData.filter(package => package.packageType === 'Fitness');
      } else if (packagefilter !== 'All') {
        return res.status(400).json({ message: 'Invalid package filter' });
      }
  
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

async function deletePackage(req, res) {
  try {
      const packageId = req.query.id;
      const deletedPackage = await packageModel.deleteOnePackage(packageId);

      // Check if the package was updated successfully
      if (!deletedPackage) {
          return res.status(404).json({ error: 'Package not found' });
      }

      // Send the updated package as response
      return res.json(deletedPackage);
  } catch (error) {
      console.error('Error deleting package:', error);
      return res.json({ error: 'Internal server error' });
  }
}
