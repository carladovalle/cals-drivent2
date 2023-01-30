import { badRequestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {

  const ticketId = req.query.ticketId as string | undefined;
  const userId = req.userId;

  try {
    if (!ticketId) {
      throw badRequestError();
    }

    const payments = await paymentsService.getPayment(Number(ticketId), userId);

    res.status(200).send(payments);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
