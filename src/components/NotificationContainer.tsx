import React from "react";
import { X, CheckCircle, XCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../contexts/NotificationContext";

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getNotificationStyle = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "from-green-700/20 to-green-800/10",
          border: "border-green-500/30",
          iconColor: "text-green-400",
          glow: "shadow-[0_0_15px_rgba(34,197,94,0.4)]",
        };
      case "error":
        return {
          bg: "from-red-700/20 to-red-800/10",
          border: "border-red-500/30",
          iconColor: "text-red-400",
          glow: "shadow-[0_0_15px_rgba(239,68,68,0.4)]",
        };
      case "info":
        return {
          bg: "from-blue-700/20 to-blue-800/10",
          border: "border-blue-500/30",
          iconColor: "text-blue-400",
          glow: "shadow-[0_0_15px_rgba(59,130,246,0.4)]",
        };
      default:
        return {
          bg: "from-gray-700/20 to-gray-800/10",
          border: "border-gray-500/30",
          iconColor: "text-gray-300",
          glow: "shadow-[0_0_15px_rgba(156,163,175,0.3)]",
        };
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-3">
      <AnimatePresence>
        {notifications.map((n) => {
          const style = getNotificationStyle(n.type);

          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${style.border} bg-gradient-to-br ${style.bg} backdrop-blur-md ${style.glow} text-slate-200 shadow-lg`}
            >
              {n.type === "success" && (
                <CheckCircle className={`w-5 h-5 ${style.iconColor}`} />
              )}
              {n.type === "error" && (
                <XCircle className={`w-5 h-5 ${style.iconColor}`} />
              )}
              {n.type === "info" && (
                <Info className={`w-5 h-5 ${style.iconColor}`} />
              )}

              <span className="flex-1 text-sm font-medium tracking-wide">
                {n.message}
              </span>

              <button
                onClick={() => removeNotification(n.id)}
                className="hover:scale-110 transition-transform text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
