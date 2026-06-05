import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const ThingsBoardContext = createContext();

const TB_HOST = import.meta.env.VITE_THINGSBOARD_HOST || "thingsboard.cloud";
const TB_WS_URL = `wss://${TB_HOST}/api/ws/plugins/telemetry`;
const TB_REST_URL = `https://${TB_HOST}/api`;

export function ThingsBoardProvider({ children }) {
  const [telemetry, setTelemetry] = useState({});
  const [latestTs, setLatestTs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const ws = useRef(null);
  const token = useRef(null);
  const cmdIdCounter = useRef(1);

  // 1. Declare subscribeToDevice first (or use function declaration)
  const subscribeToDevice = useCallback((entityId, entityType = "DEVICE") => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const cmdId = cmdIdCounter.current++;
    const subscribeCmd = {
      tsSubCmds: [
        {
          entityType,
          entityId,
          scope: "LATEST_TELEMETRY",
          cmdId,
        },
      ],
      historyCmds: [],
      attrSubCmds: [],
    };

    ws.current.send(JSON.stringify(subscribeCmd));
  }, []);

  // 2. Declare connectWebSocket second
  const connectWebSocket = useCallback(() => {
    if (!token.current) return;

    const wsUrlWithToken = `${TB_WS_URL}?token=${token.current}`;
    ws.current = new WebSocket(wsUrlWithToken);

    ws.current.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log("ThingsBoard WebSocket Connected");

      const deviceId = import.meta.env.VITE_THINGSBOARD_DEVICE_ID;
      if (deviceId) {
        subscribeToDevice(deviceId);
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.data) {
        setTelemetry((prev) => ({
          ...prev,
          ...data.data,
        }));

        const firstKey = Object.keys(data.data)[0];
        if (firstKey && data.data[firstKey].length > 0) {
          setLatestTs(data.data[firstKey][0][0]);
        }
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log("ThingsBoard WebSocket Disconnected");
    };

    ws.current.onerror = (err) => {
      setError("WebSocket Error");
      console.error("TB WS Error:", err);
    };
  }, [subscribeToDevice]);

  // 3. Declare login third
  const login = useCallback(
    async (username, password) => {
      try {
        const response = await fetch(`${TB_REST_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error("ThingsBoard login failed");

        const data = await response.json();
        token.current = data.token;
        connectWebSocket();
      } catch (err) {
        setError(err.message);
        console.error("TB Login Error:", err);
      }
    },
    [connectWebSocket],
  );

  // Auto-login on mount (enables public telemetry on landing page)
  useEffect(() => {
    const user = import.meta.env.VITE_THINGSBOARD_USERNAME;
    const pass = import.meta.env.VITE_THINGSBOARD_PASSWORD;

    if (user && pass && !token.current) {
      login(user, pass);
    }

    return () => {
      // Cleanup on unmount
      if (ws.current) ws.current.close();
    };
  }, [login]);

  const value = {
    telemetry,
    latestTs,
    isConnected,
    error,
    subscribeToDevice,
    login,
  };

  return (
    <ThingsBoardContext.Provider value={value}>
      {children}
    </ThingsBoardContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(ThingsBoardContext);
  if (!context) {
    throw new Error("useTelemetry must be used within a ThingsBoardProvider");
  }
  return context;
}
