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
  const [attributes, setAttributes] = useState({});
  const [latestTs, setLatestTs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ws = useRef(null);
  const token = useRef(null);
  const cmdIdCounter = useRef(1);

  // 1. Declare subscribeToDevice first (or use function declaration)
  const subscribeToDevice = useCallback((entityId, entityType = "DEVICE") => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const tsCmdId = cmdIdCounter.current++;
    const attrCmdId = cmdIdCounter.current++;
    
    const subscribeCmd = {
      tsSubCmds: [
        {
          entityType,
          entityId,
          scope: "LATEST_TELEMETRY",
          cmdId: tsCmdId,
        },
      ],
      historyCmds: [],
      attrSubCmds: [
        {
          entityType,
          entityId,
          scope: "SERVER_SCOPE",
          cmdId: attrCmdId,
        },
      ],
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
      setIsLoading(false);
      setError(null);
      console.log("ThingsBoard WebSocket Connected");

      const deviceId = import.meta.env.VITE_THINGSBOARD_DEVICE_ID;
      if (deviceId) {
        subscribeToDevice(deviceId);
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Handle both telemetry and attribute updates
      if (data.data) {
        setIsLoading(false);
        // ThingsBoard Telemetry API returns 'subscriptionId' corresponding to 'cmdId'
        const isAttrUpdate = data.subscriptionId % 2 === 0; // Based on our counter logic

        if (isAttrUpdate) {
          const flattenedAttrs = {};
          Object.keys(data.data).forEach(key => {
            flattenedAttrs[key] = data.data[key][0][1];
          });
          setAttributes((prev) => ({
            ...prev,
            ...flattenedAttrs,
          }));
        } else {
          setTelemetry((prev) => ({
            ...prev,
            ...data.data,
          }));

          const firstKey = Object.keys(data.data)[0];
          if (firstKey && data.data[firstKey].length > 0) {
            setLatestTs(data.data[firstKey][0][0]);
          }
        }
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      setIsLoading(false);
      console.log("ThingsBoard WebSocket Disconnected");
    };

    ws.current.onerror = (err) => {
      setIsLoading(false);
      setError("WebSocket Error");
      console.error("TB WS Error:", err);
    };
  }, [subscribeToDevice]);

  // 3. Declare login third
  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    console.log("TB: Attempting login to", TB_REST_URL);
    try {
      const response = await fetch(`${TB_REST_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setIsLoading(false);
        const errorData = await response.text();
        console.error("TB: Login failed status:", response.status, "Body:", errorData);
        throw new Error(`ThingsBoard login failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("TB: Login successful");
      token.current = data.token;
      connectWebSocket();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      console.error("TB: Connection process failed:", err);
    }
  }, [connectWebSocket]);

  // Auto-login on mount (enables public telemetry on landing page)
  useEffect(() => {
    const tbUser = import.meta.env.VITE_THINGSBOARD_USERNAME;
    const tbPass = import.meta.env.VITE_THINGSBOARD_PASSWORD;
    
    if (tbUser && tbPass && !token.current) {
      login(tbUser, tbPass);
    } else {
      setIsLoading(false);
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [login]);

  const value = {
    telemetry,
    attributes,
    latestTs,
    isConnected,
    isLoading,
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
