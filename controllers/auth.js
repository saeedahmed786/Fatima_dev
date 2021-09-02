const User = require("../models/user");
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GoogleClient);
const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const bcrypt = require('bcryptjs');
const { JwtSecret } = require("../config/dev");

exports.createOrUpdateUser = async (req, res) => {
  console.log(process.env.JwtSecret);
  // const { name, picture, email } = req.user;

  // const user = await User.findOneAndUpdate(
  //   { email },
  //   { name: email.split('@')[0], picture }, 
  //   { new: true }
  // );
  // if (user) {
  //   console.log("USER UPDATED", user);
  //   res.json(user);
  // } else {
  //   const newUser = await new User({
  //     email,
  //     name: email.split("@")[0],
  //     picture,
  //   }).save();
  //   console.log("USER CREATED", newUser);
  //   res.json(newUser);
  // }
  const { idToken } = req.body;
  googleClient
    .verifyIdToken({ idToken, audience: config.GoogleClient})
    .then(response => {
      const { email_verified, name, email } = response.payload;
      console.log(email);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          console.log(user);
          if (user) {
            const payload = {
              user: {
                  _id: user._id,
                  role: user.role,
                  email: user.email
              }
            }
            const token = jwt.sign(payload, config.JwtSecret, {
              expiresIn: '7d'
            });
            const { _id, email, role, name } = user;
            return res.json({
              token,
              user: {_id, email, role, name }
            });
          } else {
            let password = email + config.JwtSecret;
            let user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google'
                });
              }
              console.log(data);
              const payload = {
                user: {
                    _id: data._id,
                    role: data.role,
                    email: data.email
                }
              }
              const token = jwt.sign(
                payload,
                config.JwtSecret,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role }
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again'
        });
      }
    });
};

exports.register = async(req, res) => {
  const ifEmailAlreadyPresent = await User.findOne({email: req.body.email});
  if(ifEmailAlreadyPresent) {
      res.status(201).json({errorMessage: 'Email already exists. Please try another one.'});
  }
  else {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
      name: `${req.body.firstName} ${req.body.lastName}` ,
      email: req.body.email,
      password: hash
  });

  const saveUser = await user.save();
  if(saveUser) {
      res.status(200).json({successMessage: 'Account created successfuly!. Please Sign in.'});
  } else {
      res.status(400).json({errorMessage: 'Account not created. Please try again'});
  }
}
}
      
exports.login = async(req, res) => {
 const findUser = await User.findOne({email: req.body.email});
  if(findUser) {
      const checkPassword =  bcrypt.compareSync(req.body.password, findUser.password);
      if(checkPassword){
          const payload = {
              user: {
                  _id: findUser._id,
                  role: findUser.role,
                  email: findUser.email
              }
          }
          jwt.sign(payload, JwtSecret ,(err, token) => {
              if(err)  res.status(400).json({errorMessage: 'Jwt Error'})
  
          const {_id, name, role, email } = findUser;
          res.status(200).json({
            token,
            user: { _id, email, name, role }
             
          });
      });
      } else {
          res.status(201).json({errorMessage: 'Incorrect username or password.'})
      }

  } else {
      res.status(201).json({errorMessage: 'Incorrect username or password.'})
  }   
}

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};