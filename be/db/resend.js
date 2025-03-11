const { Resend } = require("resend");

if(!process.env.RESEND_API) {
    console.log("Provide resend-api in side the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({sendTo, subject,  html}) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "100xalumni@gmail.com",
            to: sendTo,
            subject: subject,
            html: html,
          });

          if (error) {
            console.log(error);
            return res.status(400).json({ error });
          }
          console.log({ data });
          return res.status(200).json({
            msg: "Email Sent To Your MailId",
            success: true,
            error: false
          })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error.message || error || "Something went wrong",
            success: false,
            error: true
        });
    }
}


module.exports = sendEmail;