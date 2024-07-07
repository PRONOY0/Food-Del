const signUpMail = (username) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to TOMATO!</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: Outfit;
        font-size: 1vw;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: tomato;
        color: white;
        text-align: center;
        padding: 10px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .content {
        padding: 20px;
        color: #333333;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        color: #999999;
        font-size: 12px;
      }

      li {
        list-style: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Welcome to TOMATO!</h2>
      </div>
      <div class="content">
        <p>Dear ${username},</p>
        <p>
          Welcome to TOMATO! We're thrilled to have you join our food delivery
          service.
        </p>
        <p>You can now enjoy:</p>
        <ul>
          <li>Exploring a variety of categories</li>
          <li>Ordering your favorite dishes</li>
          <li>Tracking your orders in real-time</li>
        </ul>
        <p>Thank you for choosing TOMATO. We look forward to serving you!</p>
        <p>Support Team</p>
        <p>Tomato</p>
        <p>Email: support@tomato.com</p>
        <p>Phone: (123) 456-7890,</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 TOMATO. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`
};

module.exports = {signUpMail}