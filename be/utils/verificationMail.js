const verificationEmail = ({ name, url }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                width: 100%;
                max-width: 600px;
                background: #ffffff;
                padding: 20px;
                margin: 40px auto;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            p {
                font-size: 16px;
                color: #555;
            }
            .button {
                display: inline-block;
                padding: 12px 20px;
                margin-top: 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                font-size: 16px;
                border-radius: 5px;
                font-weight: bold;
                transition: background 0.3s ease;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Verify Your Email</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for registering at <strong>100xalumni</strong>. Please verify your email to activate your account.</p>
            <a href="${url}" class="button">Verify Email</a>
            <p class="footer">If you did not request this, please ignore this email.</p>
        </div>
    </body>
    </html>
    `;
};

module.exports = verificationEmail;
