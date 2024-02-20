const packageSchema = require('../daos/package');

module.exports = {
    createOnePackage, 
    fetchOnePackage,
    fetchAll
};


async function createOnePackage(data) {
    // const userData =  await userDao.findOne({ userName: username });
    const newPackage = await packageSchema.create(data);
    return newPackage;
}

async function fetchOnePackage(packageId) {
    try {
        const existingPackage = await packageSchema.findOne({ _id: packageId });
        
        return existingPackage; // Return null if package not found
    } catch (error) {
        throw error; // Forward any other errors
    }
}

async function fetchAll() {
    try {
        const allPackage = await packageSchema.find();
        
        return allPackage; // Return null if package not found
    } catch (error) {
        throw error; // Forward any other errors
    }
}
