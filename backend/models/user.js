const userSchema = require('../daos/user');

module.exports = {
    createOneUser, 
    findUser, 
};

async function createOneUser(data) {
    // const userData =  await userDao.findOne({ userName: username });
    const newUser = await userSchema.create(data);
    return newUser;
}

async function findUser(data) {
    try {
        const user = await userSchema.findOne({ email: data.email });
        return user; // Return the user object or null if not found
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Rethrow the error to be caught by the controller
    }
}


// async function fetchAll() {
//     try {
//         const allPackages = await packageSchema.find();
//         const formattedPackages = allPackages.map(pkg => {
//             const formattedExpiryDate = formatExpiryDate(pkg.expiryDate);
//             return { ...pkg.toObject(), expiryDate: formattedExpiryDate };
//         });
//         console.log(allPackages)
//         return formattedPackages;
//     } catch (error) {
//         throw error; // Forward any other errors
//     }
// }

// async function updatePackage(packageId, updateData) {
//     try {
//         const updatedPackage = await packageSchema.findOneAndUpdate(
//             { _id: packageId }, // Filter condition
//             updateData, // New data to update
//             { new: true } // Return the modified document
//         );

//         return updatedPackage;
//     } catch (error) {
//         throw error;
//     }
// }

// async function deleteOnePackage(packageId) {
//     try {
//         const deletedPackage = await packageSchema.deleteOne({ _id: packageId })

//         return deletedPackage;
//     } catch (error) {
//         throw error;
//     }
// }