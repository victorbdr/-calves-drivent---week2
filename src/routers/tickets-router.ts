import { getAllTickets, postTicket, showTickets } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();
ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getAllTickets);
ticketsRouter.get("/", showTickets);
ticketsRouter.post("/", postTicket);

export { ticketsRouter };
