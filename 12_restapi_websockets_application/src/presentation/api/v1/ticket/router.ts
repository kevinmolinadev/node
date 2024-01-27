import { Router } from "express";
import { TicketController } from "./controller";
import { TicketService } from "../../../services/ticker.service";

export class TicketRouter {
    static get routes() {
        const ticket = Router();
        const controller = new TicketController(
            new TicketService()
        );

        ticket.get('/', controller.getTickets);
        ticket.get('/last', controller.getLastTicketNumber);
        ticket.get('/pending', controller.pendingTickets);


        ticket.post('/', controller.createTicket);

        ticket.get('/draw/:desk', controller.drawTicket);
        ticket.put('/done/:ticketId', controller.ticketFinished);

        ticket.get('/working-on', controller.workingOn);

        return ticket;
    }
}