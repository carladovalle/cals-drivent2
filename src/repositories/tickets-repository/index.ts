import { prisma } from "@/config";
import { Prisma, TicketStatus } from "@prisma/client";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTickets() {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
  });
}

async function createTickets(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {ticketTypeId,
      status: TicketStatus.RESERVED,
      enrollmentId
    },
    include: {
      TicketType: true,
    }
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTickets,
  createTickets
};

export default ticketsRepository;