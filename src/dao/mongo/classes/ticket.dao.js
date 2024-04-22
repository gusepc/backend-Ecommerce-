import ticketModel from "../models/ticket.model.js";

class TicketManager {
  constructor() {}
  async addTicket(ticket) {
    try {
      return await ticketModel.create(ticket);
    } catch (error) {}
  }
}

export default TicketManager;
