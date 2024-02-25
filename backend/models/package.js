const packageSchema = require('../daos/package');
const userSchema = require('../daos/user');

module.exports = {
    createOnePackage, 
    fetchOnePackage,
    fetchAll, 
    updatePackage, 
    deleteOnePackage, 
};

function formatExpiryDate(date) {
    return date.toLocaleDateString();
}

async function createOnePackage(data, userID) {
    try {
        const user = await userSchema.findById(userID);
        if (!user) {
            throw new Error('User not found');
        }

        const newPackage = await packageSchema.create(data);
        user.packages.push(newPackage._id);
        await user.save();
        return newPackage;
    } catch (error) {
        console.error('Error creating package:', error);
        throw error;
    }
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

async function fetchAll(userId) {
    try {
        const user = await userSchema.findById(userId).populate('packages');
        if (!user) {
            throw new Error('User not found');
        }

        const packages = user.packages.map(pkg => {
            const formattedExpiryDate = formatExpiryDate(pkg.expiryDate);
            return { ...pkg.toObject(), expiryDate: formattedExpiryDate };
        });

        return packages;
    } catch (error) {
        throw error;
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

async function deleteOnePackage(packageId) {
    try {
        const deletedPackage = await packageSchema.deleteOne({ _id: packageId })

        return deletedPackage;
    } catch (error) {
        throw error;
    }
}