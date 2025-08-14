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

  static async getLocations(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      const locations = await prisma.location.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      if (!locations) {
        return res.status(404).json({ error: "Location not found" });
      }
      return res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve location" });
    }
  }
}