import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/user.repository";
import {
  RegisterInput,
} from "../schemas/user.schema";

export default class UserService {
  private repository = new UserRepository();

  async register(data: RegisterInput) {
    const existingUser =
      await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword =
      await bcrypt.hash(data.password, 10);

    return this.repository.create({
      ...data,
      password: hashedPassword,
    });
  }
  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      name: user.username,
      email: user.email,
    };
  }
}