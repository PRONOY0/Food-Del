const loginmail = (username) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Successful || TOMATO</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: 'Outfit', sans-serif;
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
        border: 1px solid #ddd;
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
      a {
        text-decoration: none;
        color: tomato;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Login Successful - TOMATO</h2>
      </div>
      <div class="content">
        <p>Dear ${username},</p>
        <p>Your login to TOMATO was successful.</p>
        <p class="dashboard-link">
          To continue to Dashboard,
          <a href="http://localhost:3000/" target="_blank">Click here</a>
        </p>
        <p>
          Thank you for using our service. Enjoy exploring and ordering your
          favorite dishes!
        </p>
        <p>Support Team</p>
        <p>Tomato</p>
        <p>Email: support@tomato.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 TOMATO. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
};

module.exports = { loginmail };
