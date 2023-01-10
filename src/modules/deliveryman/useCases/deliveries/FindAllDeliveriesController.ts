import { Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase();
    const result = await findAllDeliveriesUseCase.execute(id_deliveryman);

    return response.json(result)
  }
}