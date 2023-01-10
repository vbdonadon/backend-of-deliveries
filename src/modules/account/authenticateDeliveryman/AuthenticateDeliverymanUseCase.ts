import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Verificar se username está cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error("Username or password invalid!")
    }
    
    // Verificar se a senha corresponde
    const passwordMatch = compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }
    
    // Gerar o Token
    const token = sign({ username }, "fea80f2db003d4adq4536023814aa885", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return {
      token
    }
  }
}