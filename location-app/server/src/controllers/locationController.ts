import { Request, Response } from "express";
import prisma from "../db/db.config.js";

export class LocationController{
  static async createLocation(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { name, latitude, longitude } = req.body;
      const location = await prisma.location.create({
        data: {
          name,
          latitude: Number(latitude),
          longitude: Number(longitude),
          userId: Number(userId),
        },
      });
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ error: "Failed to create location" });
    }
  }
}