/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Request } from "express";
// import { UserType } from "./user.type";

export interface CustomRequest extends Request {
  user?: any;
}
