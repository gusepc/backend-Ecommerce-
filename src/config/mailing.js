import mailer from "nodemailer";
import config from "./config.js";

class MailingManager {
  constructor() {
    this.client = mailer.createTransport({
      service: config.service,
      hosting: config.host,
      port: 587,
      auth: {
        user: config.mail,
        pass: config.password,
      },
    });
  }
  sendSimpleMail = async (req, { from, to, subject, html, attachments = [] }) => {
    let result = await this.client.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });
    req.logger.info("correo enviado exitosamente");
    console.log(result);
    return result;
  };
}

export default MailingManager;
