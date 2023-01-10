import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"

export interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    // Validar se o USERNAME existe
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if (deliverymanExists) {
      throw new Error("Deliveryman already exists!")
    }

    // Criptografar a senha
    const hashPassword = await hash(password, 10)
  
    // Salvar o client
    const client = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      }
    })

    return client
  }
}