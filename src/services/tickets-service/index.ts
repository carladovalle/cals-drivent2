import { badRequestError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketType() {
  const types = await ticketsRepository.findTicketsTypes();

  return types;
}

async function getTicket(userId:number) {
  
  const tickets = await ticketsRepository.findTickets(userId);

  if (!tickets) {
    throw notFoundError();
  }

  return tickets;
}

async function postTicket(userId: number, ticketTypeId: number) {

  if (!ticketTypeId) {
    throw badRequestError();
  }

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