import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
// import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { error } from "firebase-functions/logger";

initializeApp();
// const db = getFirestore();

setGlobalOptions({ region: "africa-south1" });

/**
 * ThingsBoard Login and Device ID Fetcher
 * Used by frontend to get a session token without exposing credentials.
 */
export const getThingsBoardToken = onRequest(
  {
    secrets: [
      "THINGSBOARD_USERNAME",
      "THINGSBOARD_PASSWORD",
      "THINGSBOARD_DEVICE_ID",
    ],
    cors: true, // Let Firebase handle CORS automatically
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const host = process.env.VITE_THINGSBOARD_HOST || "thingsboard.cloud";
    const username = process.env.THINGSBOARD_USERNAME;
    const password = process.env.THINGSBOARD_PASSWORD;
    const deviceId = process.env.THINGSBOARD_DEVICE_ID;

    if (!username || !password || !deviceId) {
      error("ThingsBoard credentials or Device ID not set in secrets");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    try {
      const response = await fetch(`https://${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        res.status(401).json({ error: "ThingsBoard authentication failed" });
        return;
      }

      const data = await response.json();
      res.status(200).json({ token: data.token, deviceId });
    } catch (error) {
      error("Error connecting to ThingsBoard", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

/**
 * Webhook to receive Alarms from ThingsBoard Rule Engine.
 * Stores them in Firestore for persistent notification history.
 */
// export const receiveThingsBoardAlarm = onRequest(async (req, res) => {
//   // Only allow POST
//   if (req.method !== "POST") {
//     res.status(405).send("Method Not Allowed");
//     return;
//   }

//   const alarmData = req.body;
//   info("Received Alarm from ThingsBoard:", alarmData);

//   // Expected payload structure from TB Rule Engine:
//   // {
//   //   "type": "Extreme High Tide",
//   //   "severity": "CRITICAL",
//   //   "details": { "value": 2.85 },
//   //   "status": "ACTIVE_UNACK"
//   // }

//   try {
//     const notification = {
//       title: alarmData.type || "System Alert",
//       message: alarmData.message || `An alarm was triggered: ${alarmData.type}`,
//       type: alarmData.severity === "CRITICAL" ? "error" : "warning",
//       createdAt: new Date().toISOString(),
//       read: false,
//       source: "thingsboard",
//       details: alarmData.details || {},
//     };

//     await db.collection("notifications").add(notification);

//     res.status(200).send("Notification stored");
//   } catch (error) {
//     error("Error storing notification:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
