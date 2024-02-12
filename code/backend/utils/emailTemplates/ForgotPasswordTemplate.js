export const getOtpEmailTemplate = (otp, logoURL) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap" rel="stylesheet">
      <style>
          body {
              font-family: 'Lora', serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 560px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          }
          .center {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
          }
          .content {
              text-align: center;
              color: #333333;
          }
          .otp {
              font-size: 24px;
              color: #0866FF;
              margin-bottom: 20px;
          }
          .instructions {
              font-size: 16px;
              color: #666666;
              line-height: 1.6;
          }
          .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 3px solid #dddddd;
              color: #888888;
              font-size: 14px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="content">
              <img src="${logoURL}" alt="Logo" />
              <h1>OTP for Password Reset</h1>
              <p class="otp">${otp}</p>
              <p class="instructions">
                  Please enter the above One Time Password (OTP) to proceed with
                  resetting your password. This OTP is valid for 10 minutes.
              </p>
          </div>
          <div class="footer">
              <p>
                  If you did not request a password reset, please ignore this email or
                  contact support if you have questions.
              </p>
          </div>
      </div>
  </body>
  </html>
  `;
};


  