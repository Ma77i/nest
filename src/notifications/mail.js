const nodemailer = require("nodemailer");

const config = require("../config");

const logger = require("../log/winston");

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: config.mail.GMAIL_ADDRESS,
        pass: config.mail.GMAIL_PWD
      }
    });
  }

  async send(template, email, firstName) {
    const mailOptions = {
      from: "<no-reply@ecoderce.com>",
      to: email,
      subject: `Nuevo pedido de ${firstName}, ${email}`,
      text: "Pedido realizado con exito",
      html: template
    };
    const response = await this.transporter.sendMail(mailOptions);
    logger.info(`Mail enviado, id: ${response.messageId}`);
  }

  async aNewUserMail(template) {
    const mailOptions = {
      to: config.mail.GMAIL_ADDRESS,
      subject: `Nuevo usuario registrado`,
      text: `Se ha registrado un nuevo usuario con exito`,
      html: template
    };
    const response = await this.transporter.sendMail(mailOptions);
    logger.info(response.envelope);
  }
}

module.exports = new MailSender();
