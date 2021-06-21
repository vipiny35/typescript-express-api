import { RequestHandler } from "express";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User, UserModel } from "../../../entity/User";

export const RegisterUser: RequestHandler = async (req, res) => {
  try {

    const userExists = await UserModel.findOne({ phone: req.body.phone });
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
      accessToken: createAccessToken(user),
    });

  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error
    })
  }
};

export const LoginUser: RequestHandler = async (req, res) => {

  const user = await UserModel.findOne({ "email": 'email@test.com' })

  if (!user) {
    // throw no user found
    return
  }

  const valid = await compare('password', req.body.password);

  if (!valid) {
    // throw pwd not matched response
  }

  return {
    accessToken: createAccessToken(user),
    user
  };
}


const createAccessToken = async (user: User): Promise<string> => {
  return sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "30d"
  });
}


export const GetUser: RequestHandler = async (req, res) => {
  try {
    const user = await UserModel.findOne({ "email": 'email@test.com' })

    return res.status(200).send({
      sucess: true,
      response: user,
    });

  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error
    })
  }
}