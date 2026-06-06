import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import logger from "firebase-functions/logger";

// Set the Node.js version and region
setGlobalOptions({ region: "us-central1" });

export const getThingsBoardToken = onRequest(
  { secrets: ["THINGSBOARD_USERNAME", "THINGSBOARD_PASSWORD", "THINGSBOARD_DEVICE_ID"] },
  async (req, res) => {
    // Enable CORS
    res.set("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
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
      logger.error("ThingsBoard credentials or Device ID not set in secrets");
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
        const errorData = await response.text();
        logger.error("ThingsBoard login failed", { status: response.status, errorData });
        res.status(401).json({ error: "ThingsBoard authentication failed" });
        return;
      }

      const data = await response.json();
      res.status(200).json({ 
        token: data.token,
        deviceId: deviceId
      });
    } catch (error) {
      logger.error("Error connecting to ThingsBoard", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
