import UserData from "../models/UserData.js";

export async function createSnapshot(req, res) {
  try {
    const userId = req.user.id;
    const { metadata = {}, route = "" } = req.body || {};
    const ip = req.ip || req.headers["x-forwarded-for"] || "";

    const snapshot = await UserData.create({
      user: userId,
      metadata,
      ip,
      route,
    });

    res.status(201).json(snapshot);
  } catch (error) {
    console.error("Error creating userdata snapshot", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMySnapshots(req, res) {
  try {
    const userId = req.user.id;
    const snapshots = await UserData.find({ user: userId }).sort({ createdAt: -1 }).limit(100);
    res.status(200).json(snapshots);
  } catch (error) {
    console.error("Error fetching userdata snapshots", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
