import { Response, Request, NextFunction } from "express";
import { UserModel } from "../../../entity/User";

export const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userExists = await UserExists(req.body.phone);
    if (userExists) {
      return res.status(401).send({
        success: false,
        response: "User exists"
      })
    }

    const user = await UserModel.create({
      ...req.body,
    });

    return res.status(200).send({
      sucess: true,
      response: user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const UserExists = async (phone: string) => {
  return await UserModel.find({ phone: phone }) ? true : false;
}