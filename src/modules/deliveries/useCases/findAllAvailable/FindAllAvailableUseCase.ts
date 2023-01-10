import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableUseCase {
  async execute() {
    const deliveriesAvailable = prisma.deliveries.findMany({
      where: {
        end_at: null,  
        id_deliveryman: null
      }
    })

    return deliveriesAvailable
  }
}