import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function getAllTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTicketsType();
    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND);
  }
}

export async function showTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticketUser = await ticketsService.userChecks(userId);
    return res.send(ticketUser).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  try {
    const send = await ticketsService.sendTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(send);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
