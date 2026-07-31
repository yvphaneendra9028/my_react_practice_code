const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully'
        });

    }
    catch (error) {
        res.status(500).json({
            message: 'Error from register controller',
            error: error.message
        });
    }
};


const generateToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
};


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });


        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }


        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
            const token = generateToken(user);
            res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
            });


       res.status(200).json({
    message: "Login successful",
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
});


    }
    catch (error) {

        res.status(500).json({
            message: 'Error from login controller',
            error: error.message
        });

    }

};
const logoutUser = (req,res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout successful"
    });
}


module.exports = {registerUser,loginUser,logoutUser};
