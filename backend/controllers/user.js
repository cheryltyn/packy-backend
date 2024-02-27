const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const { createJWT } = require('../util/security');
const { clippingParents } = require("@popperjs/core");

module.exports = {
    // getAllUsers,
    createUser, 
    userLogin, 
    editUser, 
    deleteUser, 
    getUser, 
};

async function createUser(req, res) {
    // const userName = req.params.username;
    const body = req.body;

    try {
      const userData = await userModel.createOneUser(body);
      const token = createJWT(userData, "CHERYLISAMAZING");
    res.json({ success: true, user: userData });
    } catch (err) {
      console.log(err);
      res.status(500).json({ errMsg: err.message });
    }
}

async function userLogin(req, res) {
    const body = req.body;
    try {
        const user = await userModel.findUser(body);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = createJWT({ user }, "CHERYLISAMAZING"); 

        return res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: error.message });
    }
}

async function editUser(req, res) {
    const userData = req.body;
    console.log(userData)
    try {
        // Edit the user using userModel.editUser
        const updatedUserData = await userModel.editUser(userData);
        
        if (!updatedUserData) {
            // Handle case when user is not found
            return res.status(404).json({ message: 'User not found' });
        }
        // const token = createJWT(updatedUserData);
        // return res.json({ token, message: 'User information updated successfully' });
        return updatedUserData
    } catch (error) {
        // Handle database or server errors
        console.error('Error editing user:', error);
        res.status(500).json({ error: 'Failed to edit user' });
    }
}


async function deleteUser(req, res) {
    const email = req.query.email; //might want to change this to userID eventually 
    try {
        const deletedUser = await userModel.deleteOneUser(email);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

async function getUser(req, res) {
    const user = req.query; 

    try {
        const fetchedUser = await userModel.findUser(user);
        if (!fetchedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(fetchedUser)
        return fetchedUser; 
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}
