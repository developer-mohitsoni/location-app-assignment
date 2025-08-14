import { Request, Response } from "express";
import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { ZodCustomErrorReporter } from "../validation/CustomErrorReporter.js";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import jwt from "jsonwebtoken"

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

  static async login(req:Request, res:Response): Promise<Response> {
    try{

      const {email, password} = req.body;
  
      const payload = await loginSchema.parseAsync({email, password});
  
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email
        }
      });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isValidPassword = await bcrypt.compare(payload.password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  
      return res.status(200).json({ message: "Login successful", token: `Bearer ${token}` });
      
    }catch(error){
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