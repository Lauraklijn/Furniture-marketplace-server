const { Router } = require("express");
const nodemailer = require("nodemailer");
const auth = require("../auth/middleware");

const router = new Router();

router.post("/sendMail", auth, async (request, response, next) => {
  console.log("send email??????????????", request.body);
  const { name, message, ownerEmail } = request.body;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // in order for this to work, the user MUST allow "Less secure app" AND disable two-step verification on Google Account
        user: "", // gmail
        pass: "", // password
      },
    });

    let mailOptions = {
      from: "", // user gmail
      to: `${ownerEmail}`, // destination
      subject: `Hi ${name} is interested in your product`,
      text: `${message}`,
    };

    console.log("mailOptions????????????????", mailOptions);

    transporter.sendMail(mailOptions, function (error, data) {
      if (error) {
        console.log("Error occurs", error);
      } else {
        console.log("Email sent!");
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
