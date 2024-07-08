exports.mailSender = async (email, subject, body) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  
    const mailOptions = {
      to: email,
      from: process.env.MAIL_USER,
      subject: `${subject}`,
      html: `${body}`,
    };
  
    await transporter.sendMail(mailOptions);
  };