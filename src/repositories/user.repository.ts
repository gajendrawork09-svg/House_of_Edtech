import prisma from "../lib/prisma";
import { RegisterInput } from "../schemas/user.schema";


export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: RegisterInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }
  
  async searchUsers(
  search: string,
  currentUserId: string
) {
  return prisma.user.findMany({
    where: {
      id: {
        not: currentUserId,
      },
      OR: [
        {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      username: true,
      email: true,
      image: true,
    },
    take: 10,
  });
}
}