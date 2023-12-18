// nodemailer configuration and transporter setup
import nodemailer from 'nodemailer';
import { get } from '../config'; // Import your config

// Configure nodemailer transporter
const emailConfig = get('local').email;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailConfig.username,
    pass: emailConfig.password
  }
});

// Function to send emails
export const sendEmail = (from, toList, subject, text) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: from,
      subject: subject,
      text: text
    };

    // Loop through the recipient list and send emails individually
    Promise.all(
      toList.map((to) => {
        return new Promise((resolve, reject) => {
          transporter.sendMail({ ...mailOptions, to }, (error, info) => {
            if (error) {
              console.error('Error sending email to', to, ':', error);
              reject(error); // Reject the promise if there's an error
            } else {
              console.log('Email sent to', to, ':', info.response);
              resolve(info); // Resolve the promise with the information on success
            }
          });
        });
      })
    )
      .then((results) => {
        resolve(results); // Resolve the main promise with results when all emails are sent
      })
      .catch((error) => {
        console.error('Error sending emails:', error);
        reject(error); // Reject the main promise if there's an error in sending any email
      });
  });
};
