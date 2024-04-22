import TicketManager from "../dao/mongo/classes/ticket.dao.js";

const ticketManager = new TicketManager();

function addTicket(ticket) {
  return ticketManager.addTicket(ticket);
}

export default {
  addTicket,
};
