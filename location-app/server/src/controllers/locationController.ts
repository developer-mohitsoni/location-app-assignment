import { Request, Response } from "express";
import prisma from "../db/db.config.js";
import multer from "multer";
import AdmZip from "adm-zip";
import { Location } from "../types/index.js";

export class LocationController{
  static async createLocation(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { name, latitude, longitude } = req.body as Location;

      if (!name || latitude === undefined || longitude === undefined){
        return res.status(400).json({ 
          message: 'name, latitude, longitude required' 
        });
      }

      const location = await prisma.location.create({
        data: {
          name,
          latitude: Number(latitude),
          longitude: Number(longitude),
          userId: Number(userId),
        },
      });
      res.status(201).json({loc: location});
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

  static async uploadLocation(req: Request, res: Response) {
    try {
      if(!req.file) return res.status(400).json({ message: 'No file uploaded' });

      const zip = new AdmZip(req.file.buffer)

      const entries = zip.getEntries();

      const textEntries = entries.filter((e)=> !e.isDirectory && e.entryName.toLowerCase().endsWith('.txt'));

      const nonText = entries.filter((e)=> !e.isDirectory && !e.entryName.toLowerCase().endsWith('.txt'));

      if(textEntries.length !== 1 || nonText.length > 0){
        return res.status(400).json({ message: 'ZIP must contain exactly one .txt file and nothing else' });
      }

      const content = textEntries[0].getData().toString('utf-8');
    const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    const startIndex = lines[0].toLowerCase().includes('name') ? 1 : 0;

    const locationsToCreate: { name: string; latitude: number; longitude: number }[] = [];

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length !== 3) {
        return res.status(400).json({ message: `Invalid line format at row ${i + 1}: "${line}"` });
      }
      const [name, latStr, lonStr] = parts;
      const latitude = Number(latStr);
      const longitude = Number(lonStr);
      if (!name || Number.isNaN(latitude) || Number.isNaN(longitude)) {
        return res.status(400).json({ message: `Invalid values at row ${i + 1}` });
      }
      locationsToCreate.push({ name, latitude, longitude });
    }

    const userId = req.user!.id;
    const created = await prisma.$transaction(
      locationsToCreate.map((loc) =>
        prisma.location.create({ data: { ...loc, userId } })
      )
    );

    return res.json({ added: created.length, locations: created });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Invalid ZIP or text format' });
    }
  }
}