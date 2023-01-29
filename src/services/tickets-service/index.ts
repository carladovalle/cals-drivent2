import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Address, Enrollment } from "@prisma/client";

async function getTicketType() {
  const types = await ticketsRepository.findTicketsTypes();

  return types;
}

const ticketsService = {
  getTicketType
};

export default ticketsService;