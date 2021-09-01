const config = require("../config/dev");
const admin = require("../firebase");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.authCheck = async (req, res, next) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer.split(' ')[1];
    if(!token) {
         res.status(404).json({errorMessage: 'No token. Access Denied'});
    }
    try {
        const decoded = jwt.verify(token, config.JwtSecret);
         req.user = decoded.user;
         next();      
    } catch (error) {
        res.status(400).json({errorMessage: 'You cannot access this route due to invalid token.'});
        
    }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};