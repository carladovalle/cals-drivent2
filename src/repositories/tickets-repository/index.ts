import { prisma } from "@/config";

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

const ticketsRepository = {
  findTicketsTypes,
  findTickets
};

export default ticketsRepository;