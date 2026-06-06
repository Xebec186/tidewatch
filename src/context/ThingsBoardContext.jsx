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
const FIREBASE_FUNCTION_URL = import.meta.env.VITE_FIREBASE_FUNCTION_URL;

export function ThingsBoardProvider({ children }) {
  const [telemetry, setTelemetry] = useState({});
  const [attributes, setAttributes] = useState({});
  const [latestTs, setLatestTs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ws = useRef(null);
  const token = useRef(null);
  const deviceIdRef = useRef(null);
  const cmdIdCounter = useRef(1);

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

  const connectWebSocket = useCallback(() => {
    if (!token.current) return;

    const wsUrlWithToken = `${TB_WS_URL}?token=${token.current}`;
    ws.current = new WebSocket(wsUrlWithToken);

    ws.current.onopen = () => {
      setIsConnected(true);
      setIsLoading(false);
      setError(null);
      console.log("ThingsBoard WebSocket Connected");

      if (deviceIdRef.current) {
        subscribeToDevice(deviceIdRef.current);
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.data) {
        setIsLoading(false);
        const isAttrUpdate = data.subscriptionId % 2 === 0;

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

  const login = useCallback(async () => {
    if (!FIREBASE_FUNCTION_URL) {
      console.warn("TB: FIREBASE_FUNCTION_URL not defined. Skipping connection.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    console.log("TB: Requesting session token from backend...");
    try {
      const response = await fetch(FIREBASE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`Token request failed: ${response.status}`);
      }

      const data = await response.json();
      token.current = data.token;
      deviceIdRef.current = data.deviceId;
      connectWebSocket();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      console.error("TB: Backend connection failed:", err);
    }
  }, [connectWebSocket]);

  useEffect(() => {
    if (!token.current) {
      login();
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
