import {
  LuX,
  LuBell,
  LuTriangleAlert,
  LuInfo,
  LuCircleCheck,
} from "react-icons/lu";

const mockNotifications = [
  {
    id: 1,
    type: "info",
    title: "Real-time stream active",
    message: "Successful connection established with the field node.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "System Calibrated",
    message: "Ultrasonic sensor baseline has been successfully verified.",
    time: "2h ago",
    read: true,
  },
  {
    id: 3,
    type: "warning",
    title: "Signal Fluctuation",
    message: "Brief latency detected in the WebSocket stream. Monitoring continues.",
    time: "Yesterday",
    read: true,
  },
];

export default function NotificationDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-sm bg-surface shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-outline-variant/20 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LuBell size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface">
                  Notifications
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Stay updated with TideWatch
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary cursor-pointer"
            >
              <LuX size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mockNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`relative flex gap-4 rounded-2xl border p-4 transition-all hover:border-primary/30 ${notif.read ? "border-outline-variant/10 bg-surface" : "border-primary/20 bg-primary/5"}`}
              >
                {!notif.read && (
                  <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />
                )}

                <div
                  className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    notif.type === "warning"
                      ? "bg-amber-100 text-amber-600"
                      : notif.type === "error"
                        ? "bg-red-100 text-red-600"
                        : notif.type === "success"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {notif.type === "warning" && <LuTriangleAlert size={20} />}
                  {notif.type === "error" && <LuTriangleAlert size={20} />}
                  {notif.type === "success" && <LuCircleCheck size={20} />}
                  {notif.type === "info" && <LuInfo size={20} />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-bold ${notif.read ? "text-on-surface" : "text-primary"}`}
                    >
                      {notif.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                    {notif.message}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-outline">
                    {notif.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <footer className="border-t border-outline-variant/20 p-4">
            <button className="w-full rounded-xl bg-surface-container-low py-3 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/10 cursor-pointer">
              Mark all as read
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
}
