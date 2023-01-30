import { prisma } from "@/config";

async function findPayments(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

const paymentsRepository = {
  findPayments
};

export default paymentsRepository;