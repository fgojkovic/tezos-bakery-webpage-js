"use client";
import { useEffect, useState } from "react";
import { ACCOUNT_ENDPOINT } from "../lib/bakerApi";

export default function BakerStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ACCOUNT_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch bakery status");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="mb-4">Checking bakery status...</div>;
  if (error) return <div className="mb-4 text-red-600">{error}</div>;

  let color = status === "active" ? "green" : status === "deactivated" ? "red" : "yellow";
  let label = status === "active" ? "Online & Operational" : status === "deactivated" ? "Offline / Deactivated" : status;

  return (
    <div className={`mb-4 flex items-center space-x-2`}>
      <span className={`inline-block w-3 h-3 rounded-full bg-${color}-500`}></span>
      <span className="font-semibold">Bakery Status:</span>
      <span className={`text-${color}-700 font-bold`}>{label}</span>
    </div>
  );
}
