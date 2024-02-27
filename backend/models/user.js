const userSchema = require('../daos/user');

module.exports = {
    createOneUser, 
    findUser,
    editUser,  
    deleteOneUser, 
};

async function createOneUser(data) {
    // const userData =  await userDao.findOne({ userName: username });
    const newUser = await userSchema.create(data);
    return newUser;
}

async function findUser(data) {
    try {
        const user = await userSchema.findOne({ $or: [{ email: data.email }, { _id: data.id }] });
        return user; // Return the user object or null if not found
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Rethrow the error to be caught by the controller
    }
}

async function editUser(data) {
    try {
        const user = await userSchema.findOneAndUpdate({ email: data.email }, {... data }, {new :true});
        return user; 
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Rethrow the error to be caught by the controller
    }
}

async function deleteOneUser(email) {
    try {
        const user = await userSchema.findOneAndDelete({ email });
        return user; // Return the user object or null if not found
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Rethrow the error to be caught by the controller
    }
}
