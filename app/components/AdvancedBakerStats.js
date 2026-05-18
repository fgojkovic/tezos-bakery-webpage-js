"use client";
import { useEffect, useState } from "react";
import { BAKER_ENDORSEMENTS_ENDPOINT, ACCOUNT_ENDORSEMENTS_ENDPOINT, BAKER_ADDRESS, TZKT_API_BASE } from "../lib/bakerApi";

export default function AdvancedBakerStats() {
  const [nextBlock, setNextBlock] = useState(null);
  const [endorsements, setEndorsements] = useState(null);
  const [remainingTime, setRemainingTime] = useState("-");
  const [progress, setProgress] = useState(0); // 0 to 1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nextBlock?.timestamp) {
      setRemainingTime("-");
      setProgress(0);
      return;
    }

    // Try to estimate slot duration (Tezos block time is 30s, but baking slot can be further out)
    const target = new Date(nextBlock.timestamp).getTime();
    // Try to get the slot start time (now - (target-now) + 30s)
    // For a single slot, just use 30s window for visual effect
    const slotWindow = 30 * 1000;
    const slotStart = target - slotWindow;

    const formatRemaining = () => {
      const now = Date.now();
      const diffMs = target - now;

      // Progress bar: 0 at slotStart, 1 at target
      let prog = 1 - Math.max(0, Math.min(1, (target - now) / slotWindow));
      setProgress(prog);

      if (diffMs <= 0) {
        setRemainingTime("Any moment now");
        setProgress(1);
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (hours > 0) {
        setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
        return;
      }

      setRemainingTime(`${minutes}m ${seconds}s`);
    };

    formatRemaining();
    const intervalId = setInterval(formatRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [nextBlock]);

  useEffect(() => {
    const nextBakingEndpoint = `${TZKT_API_BASE}/rights/baking?baker=${BAKER_ADDRESS}&status=future&limit=1`;

    Promise.all([
      fetch(nextBakingEndpoint).then((res) => res.ok ? res.json() : []),
      fetch(BAKER_ENDORSEMENTS_ENDPOINT + "?limit=10").then(async (res) => {
        if (res.status === 404) {
          // fallback to account endpoint
          const accRes = await fetch(ACCOUNT_ENDORSEMENTS_ENDPOINT + "?limit=10");
          if (!accRes.ok) return [];
          return accRes.json();
        }
        return res.json();
      })
    ])
      .then(([next, endorsed]) => {
        setNextBlock(Array.isArray(next) && next.length > 0 ? next[0] : null);
        setEndorsements(endorsed);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load advanced stats");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading advanced stats...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 text-center">Next Available Block</h3>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-4">
            {nextBlock ? (
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Level</span>
                  <span className="font-semibold">{nextBlock.level ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Estimated Time</span>
                  <span className="font-semibold">
                    {nextBlock.timestamp ? new Date(nextBlock.timestamp).toLocaleString() : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Priority</span>
                  <span className="font-semibold">{nextBlock.priority ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Countdown</span>
                  <span className="font-semibold text-blue-700">{remainingTime}</span>
                </div>
                <div className="mt-2">
                  <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600">No upcoming baking slot available right now.</div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 text-center">Recent Endorsements</h3>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Level</th>
                  <th className="px-4 py-2 border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {endorsements && endorsements.length > 0 ? endorsements.map((endorsement) => (
                  <tr key={endorsement.level} className="hover:bg-green-50 transition">
                    <td className="px-4 py-2 border-b">{endorsement.level}</td>
                    <td className="px-4 py-2 border-b">{new Date(endorsement.timestamp).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={2} className="px-4 py-2 text-center">No endorsements</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
