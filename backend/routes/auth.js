const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const JWT_SEC = "secret";

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check wheather email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ errors: "email already exists" });
      }
      var salt = await bcrypt.genSaltSync(10);
      var safePass = await bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: safePass,
        email: req.body.email,
      });
      const data = {
        user:{
          id : user.id,
        }
      }
      const authtoken = jwt.sign(data,JWT_SEC);
      // res.json(user);
      res.json({authtoken});
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: "Server Error" });
    }
  }
);

module.exports = router;
