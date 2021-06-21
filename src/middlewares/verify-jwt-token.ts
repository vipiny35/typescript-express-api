import { Request } from "express";
import { verify } from "jsonwebtoken";
import { UserModel } from "../entity/User";

export const verifyJwtToken = async (req: Request) => {
  // console.log(req.ip);
  // console.log(req.header('x-forwarded-for'));
  // console.log(req.header('X-Real-IP'));
  const authorization: string = req.headers.authorization || '';

  if (authorization) {

    const token = authorization.split(" ")[1];

    try {
      const payload: any = await verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const user = await UserModel.findById(payload.userId).exec();
      if (user) {
        return { user: user };
      }
    } catch (e) {
      return { user: null };
    }

  }
  return { user: null };
}