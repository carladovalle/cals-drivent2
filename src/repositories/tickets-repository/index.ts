import { prisma } from "@/config";
import { Prisma, TicketStatus } from "@prisma/client";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTickets(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },  
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

async function findById(id: number) {
  return await prisma.ticket.findUnique({
    where: {
      id
    },
    include: {
      Enrollment: true
    }
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTickets,
  createTickets,
  findById
};

export default ticketsRepository;