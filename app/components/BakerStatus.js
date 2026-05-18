"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { ShieldCheck, AlertTriangle, Clock3 } from "lucide-react";
import { ACCOUNT_ENDPOINT } from "../lib/bakerApi";

const STATUS_CONFIG = {
  active: {
    dotClass: "bg-emerald-500",
    ringClass: "ring-emerald-200",
    textClass: "text-emerald-700",
    icon: ShieldCheck,
    title: "Online & Operational",
    description: "The bakery is active and producing/endorsing as expected."
  },
  deactivated: {
    dotClass: "bg-red-500",
    ringClass: "ring-red-200",
    textClass: "text-red-700",
    icon: AlertTriangle,
    title: "Offline / Deactivated",
    description: "The bakery is currently deactivated and not baking."
  },
  default: {
    dotClass: "bg-amber-400",
    ringClass: "ring-amber-200",
    textClass: "text-amber-700",
    icon: Clock3,
    title: "Syncing / Unknown",
    description: "Yellow means the status is transitional or not yet confirmed by API."
  }
};

export default function BakerStatus({ compact = false }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ACCOUNT_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        // TzKT: 'active' is boolean, true means online
        if (typeof data.active === 'boolean') {
          setStatus(data.active ? "active" : "deactivated");
        } else if (data.status) {
          setStatus(data.status);
        } else {
          setStatus("unknown");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch bakery status");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm">
        Checking bakery status...
      </div>
    );
  }

  if (error) {
    return (
      <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 shadow-sm">
        {error}
      </div>
    );
  }

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.default;
  const StatusIcon = config.icon;
  const pulseClass = status === "active" ? "animate-pulse" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`mx-auto ${compact ? "max-w-2xl" : "max-w-3xl"}`}
    >
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white via-blue-50/70 to-white px-5 py-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className={`inline-flex h-4 w-4 rounded-full ring-4 ${config.dotClass} ${config.ringClass} ${pulseClass}`}></span>
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">Bakery Status</span>
          </div>
          <span className={`inline-flex items-center gap-2 text-base font-bold ${config.textClass}`}>
            <StatusIcon className="h-5 w-5" />
            {config.title}
          </span>
        </div>
        {!compact && (
          <p className="mt-2 text-sm text-slate-600">{config.description}</p>
        )}
      </div>
    </motion.div>
  );
}

BakerStatus.propTypes = {
  compact: PropTypes.bool
};
