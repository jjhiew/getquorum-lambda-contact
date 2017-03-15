'use strict';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('./config');

const fromEmail = config.from;
const user = config.user;
const pass = config.pass;

exports.handler = (event, context, cb) => {

  const type = event.type;
  const message = event.message;

  const transporter = nodemailer.createTransport(smtpTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
        user: user,
        pass: pass
    }
  }));

  const text = 'Text Goes here';

	const mailOptions = {
    from: fromEmail,
    to: 'jj@getquorum.com',
    subject: 'TEST',
    text: text
	};

	transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }

      cb(null, info);
  });

}
