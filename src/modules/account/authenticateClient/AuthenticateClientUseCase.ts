import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Verificar se username está cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error("Username or password invalid!")
    } 
    
    // Verificar se a senha corresponde
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    // Gerar o Token
    const token = sign({ username }, "fea80f2db003d4ebc4536023814aa885", {
      subject: client.id,
      expiresIn: "1d"
    })

    return {
      token
    }
  }
}