import { Request, Response } from "express";
import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { ZodCustomErrorReporter } from "../validation/CustomErrorReporter.js";
import { registerSchema } from "../validation/authValidation.js";

export class AuthController{
  static async register(req:Request, res:Response): Promise<Response> {
    try {
      const body = req.body;

      const payload = await registerSchema.parseAsync(body);

      const existingUser = await prisma.user.findUnique({
        where:{
          email: payload.email
        }
      })

      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      if(payload.password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);

        payload.password = hashedPassword;
      }

      const newUser = await prisma.user.create({
        data: {
          email: payload.email,
          password: payload.password
        }
      });

      return res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      if (error instanceof ZodError) {
				const reporter = new ZodCustomErrorReporter(error);

				return res.status(422).json({
					errors: reporter.createError()
				});
			}
			return res.status(500).json({
				status: 500,
				message: "Something went wrong... Please try again"
			});
    }
  }
}