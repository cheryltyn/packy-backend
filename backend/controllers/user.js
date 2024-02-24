const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const { createJWT } = require('../util/security');

module.exports = {
    // getAllUsers,
    createUser, 
    userLogin, 
};

async function createUser(req, res) {
    // const userName = req.params.username;
    const body = req.body;
    console.log(body)
    try {
      const userData = await userModel.createOneUser(body);
      const token = createJWT(userData, "CHERYLISAMAZING");
      console.log(token)
      res.json(token);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errMsg: err.message });
    }
}

async function userLogin(req, res) {
    const body = req.body;
    try {
        const user = await userModel.findUser(body);
        console.log(body.password)
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        console.log(user.password)
        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: error.message });
    }
}