const packageSchema = require('../daos/package');

module.exports = {
    createOnePackage
};


async function createOnePackage(data) {
    // const userData =  await userDao.findOne({ userName: username });
    const newPackage = await packageSchema.create(data);
    return newPackage;
}