class TicketDTO {
  constructor(ticket) {
    const year = ticket.date.getFullYear();
    const month = String(ticket.date.getMonth() + 1).padStart(2, "0");
    const day = String(ticket.date.getDate()).padStart(2, "0");
    const hours = String(ticket.date.getHours()).padStart(2, "0");
    const minutes = String(ticket.date.getMinutes()).padStart(2, "0");
    const seconds = String(ticket.date.getSeconds()).padStart(2, "0");

    const localDate = new Date(Date.UTC(year, ticket.date.getMonth(), day, hours, minutes, seconds));

    this.code = `${year}${month}${day}T${hours}${minutes}${seconds}Z${ticket.code}`;
    this.purchase_datetime = localDate.toISOString();
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
  }
}

export default TicketDTO;
