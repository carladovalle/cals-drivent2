import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPayment(userId: number, ticketId: number) {

  await validateTicket(userId, ticketId);

  const payment = await paymentsRepository.findPayments(ticketId);

  return payment;
}

async function validateTicket(userId: number, ticketId: number) {

  const ticket = await ticketsRepository.findById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const id = ticket.Enrollment.userId;

  if (id !== userId) {
    throw unauthorizedError();
  }

  return ticket;

}

const paymentsService = {
  getPayment
};

export default paymentsService;