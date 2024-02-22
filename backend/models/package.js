const packageSchema = require('../daos/package');

module.exports = {
    createOnePackage, 
    fetchOnePackage,
    fetchAll, 
    updatePackage, 
};

function formatExpiryDate(date) {
    return date.toLocaleDateString();
}

async function createOnePackage(data) {
    // const userData =  await userDao.findOne({ userName: username });
    const newPackage = await packageSchema.create(data);
    return newPackage;
}

async function fetchOnePackage(packageId) {
    try {
        const existingPackage = await packageSchema.findOne({ _id: packageId });
        const formattedExpiryDate = formatExpiryDate(existingPackage.expiryDate);
        return { ...existingPackage.toObject(), expiryDate: formattedExpiryDate };
    } catch (error) {
        throw error; 
    }
}

async function fetchAll() {
    try {
        const allPackages = await packageSchema.find();
        const formattedPackages = allPackages.map(pkg => {
            const formattedExpiryDate = formatExpiryDate(pkg.expiryDate);
            return { ...pkg.toObject(), expiryDate: formattedExpiryDate };
        });
        return formattedPackages;
    } catch (error) {
        throw error; // Forward any other errors
    }
}

async function updatePackage(packageId, updateData) {
    try {
        const updatedPackage = await packageSchema.findOneAndUpdate(
            { _id: packageId }, // Filter condition
            updateData, // New data to update
            { new: true } // Return the modified document
        );

        return updatedPackage;
    } catch (error) {
        throw error;
    }
}