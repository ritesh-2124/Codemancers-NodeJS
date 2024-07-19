import nodemailer from 'nodemailer';

export const sendCheckoutEmail = async (userEmail: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

  let mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Order Confirmation',
    text: 'Your order has been placed successfully!',
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending email:', error);
  }
};
