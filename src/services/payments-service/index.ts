import { badRequestError, notFoundError, unauthorizedError } from "@/errors";
import { PaymentData } from "@/protocols";
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

async function postPayment(paymentData: PaymentData, userId: number) {

  if (!paymentData.ticketId) {
    throw badRequestError();
  }

  if (!paymentData.cardData) {
    throw badRequestError();
  }

  const ticket = await validateTicket(userId, paymentData.ticketId);

  const { price } = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);

  const body = {
    ticketId: paymentData.ticketId,
    value: price,
    cardIssuer: paymentData.cardData.issuer,
    cardLastDigits: paymentData.cardData.number.toString().slice(-4),
  };

  const payment = await paymentsRepository.createPayments(body);

  await ticketsRepository.updateStatus(paymentData.ticketId);

  return payment;
}

const paymentsService = {
  getPayment,
  postPayment
};

export default paymentsService;