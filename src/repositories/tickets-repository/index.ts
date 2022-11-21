import { prisma } from "@/config";

import { TicketStatus } from "@prisma/client";

async function getTickets() {
  const result = await prisma.ticketType.findMany();
  return result;
}

async function getTicketsByEnrollment(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function newTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
  });
}

export default { getTickets, getTicketsByEnrollment, newTicket };
