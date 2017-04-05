'use strict';

require('dotenv').load();

const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');

const transporter = nodemailer.createTransport(ses({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
}));

const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;

exports.handler = (event, context, cb) => {

  const senderName = event.name;
  const senderEmail = event.email;
  let message = event.message;

  // Format the message a replace newlines with <br>
  // Convert newlines in the message
  if (message != null) {
      message = message
        .replace("\r\n", "<br />")
        .replace("\r", "<br />")
        .replace("\n", "<br />");
  }

  const subject = `Contact Us Request From ${senderName}`;
  const htmlBody = `
    <html>
      <body>
        <p><b>New Contact Us Request</b></p>
        <p><b>From:</b> ${senderName} <${senderEmail}></p>
        <br>
        <p>${message}</p>
      </body>
    </html>
  `;

  const mailOpts = {
    from: fromEmail,
    to: toEmail,
    replyTo: senderEmail,
    subject: subject,
    html: htmlBody
  };

  transporter.sendMail(mailOpts, function(error, info){
      if(error){
          console.log(error);
      }
      console.log('email sent', mailOpts);
      cb(null, info);
  });

}
