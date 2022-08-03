
const nodemailer = require("nodemailer");

const sendResponse = async (option) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "260886f58cd4e4", // generated ethereal user
          pass: "ffdfd342cd52a6", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Housing Company" <housingcompany@mailtrap.io>', // sender address
        to: `${option.email}`, // list of receivers
        subject: `${option.subject}`, // Subject line
        // text: "Hello world?", // plain text body
        html: `<p> Please change your password via clicking this safe link <a href="${option.url}" target="_blank"> ${option.url} </a> </p>`, // html body
      });

      console.log("Message sent: %s", info.messageId);

}

module.exports = sendResponse;