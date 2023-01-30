import { prisma } from "@/config";

type PaymentDataCreate = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

async function findPayments(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

async function createPayments(data: PaymentDataCreate) {
  return await prisma.payment.create({
    data,
  });
}

const paymentsRepository = {
  findPayments,
  createPayments
};

export default paymentsRepository;