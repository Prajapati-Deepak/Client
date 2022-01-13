const { User } = require("../Models");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const { parse } = require("path/posix");
saltRounds = 8;

const signUp = async (req, res) => {
  console.log("came to sign up");
  console.log(req.body);
  try {
    console.log(req.body.email);
    console.log(Object.keys(req.body).length);
    let email = req.body.email;
    if (Object.keys(req.body).length !== 1) {
      //to store the incoming email and pass, and validate them
      console.log("reached api");
      let password = req.body.password;
      // var name = req.body.name;
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User({
          email: email,
          password: hash,
        });
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("saved");
            res.status(200).send("user registered");
          }
        });
      });
    } else {
      const findUser = await User.findOne({ email });
      if (findUser) return res.status(200).send("already registered");

      otp = Math.floor(Math.random() * 1000 + 1000);
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(
        "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"
      );
      const sendH = "Your OTP is " + otp;
      const msg = {
        to: email, // Change to your recipient
        from: "harshitgarg.edu@gmail.com", // Change to your verified sender
        subject: "MNIT Selling Platform",
        text: "Your OTP is " + otp,
        html: sendH,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });

      res.status(200).send({
        otp: otp,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const signIn = (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("reached to match password");
    console.log(email);
    console.log(password);
    User.findOne({ email: email }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          bcrypt.compare(password, foundUser.password, function (err, result) {
            if (result === true) {
              console.log("password matched in server");
              res.status(200).send();
            } else {
              console.log("password not  matched in server");
              res.status(200).send({ status: "wrong password" });
            }
          });
        } else {
          console.log("no user found ");
          res.status(200).send({ status: "user not found" });
        }
      }
    });
    console.log("returning from server");
  } catch (err) {
    console.log(err);
    res.status(400).send("error in login");
  }
};

module.exports = { signIn, signUp };