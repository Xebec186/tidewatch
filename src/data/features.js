import { LuBellRing, LuShieldCheck, LuWifi, LuGauge } from "react-icons/lu";
import { FiBarChart } from "react-icons/fi";
import { SiArduino } from "react-icons/si";

export const features = [
  {
    icon: LuBellRing,
    title: "Instant alerts",
    description:
      "Receive threshold-based warnings through connected notifications when tide levels become unsafe.",
  },
  {
    icon: FiBarChart,
    title: "Live readings",
    description:
      "Track tide measurements, patterns, and system status in a clean dashboard built for clarity.",
  },
  {
    icon: LuShieldCheck,
    title: "Reliable monitoring",
    description:
      "Designed for coastal safety, education, and small-scale deployments where affordable monitoring matters.",
  },
  {
    icon: LuWifi,
    title: "Connected system",
    description:
      "The proposal supports Wi-Fi and alert delivery so data can reach the right people quickly.",
  },
  {
    icon: LuGauge,
    title: "Threshold control",
    description:
      "Technical users can manage alert limits, device settings, and operational checks from the system.",
  },
  {
    icon: SiArduino,
    title: "Sensor-driven",
    description:
      "Built around an Arduino-based tide gauge concept using accessible components and practical deployment.",
  },
];
