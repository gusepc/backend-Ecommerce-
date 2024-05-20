import MailingManager from "../config/mailing.js";

const mailingManager = new MailingManager();

function sendSimpleMail(req, info) {
  return mailingManager.sendSimpleMail(req, info);
}

export default { sendSimpleMail };
