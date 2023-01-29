import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Address, Enrollment } from "@prisma/client";

async function getTicketType() {
  const types = await ticketsRepository.findTicketsTypes();

  return types;
}

async function getTicket() {
  const tickets = await ticketsRepository.findTickets();

  return tickets;
}

async function postTicket(userId: number, ticketTypeId: number) {

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const enrollmentId = enrollment.id;

  const response = await ticketsRepository.createTickets(enrollmentId, ticketTypeId);

  return response;
}

const ticketsService = {
  getTicketType,
  getTicket,
  postTicket
};

export default ticketsService;