import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function findTickets(id: number) {
  return await prisma.ticket.findFirst({
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
  return await prisma.ticket.create({
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

async function findTicketTypeById(id: number) {
  return await prisma.ticketType.findUnique({
    where: {
      id,
    },
    select: {
      price: true,
    },
  });
}

async function updateStatus(id: number) {
  return await prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTickets,
  createTickets,
  findById,
  findTicketTypeById,
  updateStatus
};

export default ticketsRepository;