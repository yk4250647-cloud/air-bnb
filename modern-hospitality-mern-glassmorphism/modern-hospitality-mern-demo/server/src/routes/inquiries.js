import { Router } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Inquiry from "../models/Inquiry.js";
import mongoose from "mongoose";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../../data");
const dataFile = path.join(dataDir, "inquiries.json");

async function readLocal() {
  try { return JSON.parse(await fs.readFile(dataFile, "utf8")); }
  catch { return []; }
}
async function writeLocal(rows) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(rows, null, 2));
}
const makeRef = () => `MH-${Date.now().toString().slice(-7)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
const clean = (value, max = 4000) => String(value ?? "").trim().slice(0, max);

router.post("/", async (req, res, next) => {
  try {
    const body = req.body || {};
    const type = clean(body.type, 20);
    const name = clean(body.name, 120);
    const email = clean(body.email, 180).toLowerCase();
    const message = clean(body.message, 4000);
    if (!["booking", "contact", "partnership"].includes(type)) {
      return res.status(400).json({ message: "Please choose a valid inquiry type." });
    }
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 8) {
      return res.status(400).json({ message: "Please provide your name, a valid email, and a message of at least 8 characters." });
    }
    const record = {
      reference: makeRef(), type, status: "new", name, email,
      phone: clean(body.phone, 40), subject: clean(body.subject, 180),
      message, propertyId: clean(body.propertyId, 100),
      propertyName: clean(body.propertyName, 180), destination: clean(body.destination, 180),
      checkIn: clean(body.checkIn, 30), checkOut: clean(body.checkOut, 30),
      guests: Number(body.guests) || undefined,
      propertyType: clean(body.propertyType, 100),
      numberOfUnits: Number(body.numberOfUnits) || undefined,
      budget: clean(body.budget, 100),
      preferredContact: ["email", "phone", "whatsapp"].includes(body.preferredContact) ? body.preferredContact : "email",
      internalNotes: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    };
    if (mongooseConnected()) {
      const saved = await Inquiry.create(record);
      return res.status(201).json({ message: "Inquiry received.", inquiry: { reference: saved.reference } });
    }
    const rows = await readLocal();
    rows.unshift(record);
    await writeLocal(rows);
    return res.status(201).json({ message: "Inquiry received.", inquiry: { reference: record.reference } });
  } catch (error) { next(error); }
});

function mongooseConnected() {
  return mongoose.connection.readyState === 1;
}

router.get("/", async (_req, res, next) => {
  try {
    const rows = mongooseConnected()
      ? await Inquiry.find().sort({ createdAt: -1 }).lean()
      : await readLocal();
    res.json({ inquiries: rows });
  } catch (error) { next(error); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const status = clean(req.body?.status, 30);
    const internalNotes = clean(req.body?.internalNotes, 4000);
    if (status && !["new", "in-progress", "resolved", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }
    if (mongooseConnected()) {
      const update = { updatedAt: new Date() };
      if (status) update.status = status;
      if (internalNotes !== undefined) update.internalNotes = internalNotes;
      const item = await Inquiry.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ message: "Inquiry not found." });
      return res.json({ inquiry: item });
    }
    const rows = await readLocal();
    const item = rows.find((row) => row.reference === req.params.id);
    if (!item) return res.status(404).json({ message: "Inquiry not found." });
    if (status) item.status = status;
    if (internalNotes !== undefined) item.internalNotes = internalNotes;
    item.updatedAt = new Date().toISOString();
    await writeLocal(rows);
    res.json({ inquiry: item });
  } catch (error) { next(error); }
});

export default router;
