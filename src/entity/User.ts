import { ObjectId } from "mongodb";
import { getModelForClass, prop } from "@typegoose/typegoose";

export enum UserRole {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export class User {

  readonly _id: ObjectId;

  readonly createdAt: Date;

  @prop()
  name: string;

  @prop({ required: true, unique: true })
  phone: string;

  @prop({ unique: true })
  email?: string;

  @prop()
  avatar?: string;

  @prop({ enum: UserRole, default: UserRole.NORMAL })
  role: UserRole;

  @prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
