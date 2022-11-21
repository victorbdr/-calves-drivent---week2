import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function getTicketsType(): Promise<TicketType[]> {
  const result = ticketsRepository.getTickets();
  if (!result) {
    throw notFoundError();
  }
  return result;
}
async function userChecks(userId: number) {
  const checkEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!checkEnrollment) {
    throw notFoundError();
  }

  const checkTicket = await ticketsRepository.getTicketsByEnrollment(checkEnrollment.id);
  if (!checkTicket) {
    throw notFoundError();
  }
  return checkTicket;
}
async function sendTicket(ticketTypeId: number, userId: number) {
  const checkEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!checkEnrollment) {
    throw notFoundError();
  }
  const send = await ticketsRepository.newTicket(userId, ticketTypeId);
  return send;
}
export default { getTicketsType, userChecks, sendTicket };
