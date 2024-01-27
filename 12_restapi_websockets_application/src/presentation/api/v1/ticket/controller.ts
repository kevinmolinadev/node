import { Request, Response } from "express";
import { TicketService } from "../../../services/ticker.service";

export class TicketController {
    constructor(
        private readonly service:TicketService,
    ) { }


    public getTickets = (req: Request, res: Response) => {
        res.json(this.service.tickets);
    }

    public getLastTicketNumber = (req: Request, res: Response) => {
        res.json(this.service.lastTicketNumber);
    }

    public pendingTickets = (req: Request, res: Response) => {
        res.json(this.service.pendingTickets);
    }

    public createTicket = (req: Request, res: Response) => {
        res.status(201).json(this.service.createTicket());
    }

    public drawTicket = (req: Request, res: Response) => {
        const { desk } = req.params;
        res.json(this.service.drawTicket(desk));
    }

    public ticketFinished = (req: Request, res: Response) => {
        const { ticketId } = req.params;

        res.json(this.service.onFinishedTicket(ticketId));
    }

    public workingOn = (req: Request, res: Response) => {
        res.json(this.service.lastWorkingOnTickets);
    }

}