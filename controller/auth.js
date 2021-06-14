const {response} = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const user = require('../models/user');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const isEmail = await User.findOne({email});
        if(isEmail){
            return res.status(400).json({
                ok: false,
                msg: 'This email is register'
            });
        }

        const user = new User(req.body);

        //Encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

const login = async (req, res = response) => {
    
    const {email, password} = req.body;

    try {
        const userDB = await User.findOne({email});
         
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: "No email"
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: "No password"
            });
        }

        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            userDB,
            token
        });
   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const renewToken = async (req, res = response) => {
    
    const userDB = await user.findById(req.uid);
    const token = await generateJWT(req.uid);

    res.json({
        ok: true,
        user: userDB,
        token: token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}