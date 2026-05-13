"use client";
import { useEffect, useState } from "react";
import { REWARDS_ENDPOINT, ACCOUNT_OPERATIONS_ENDPOINT, TZKT_API_BASE, BAKER_ADDRESS } from "../lib/bakerApi";

export default function PayoutTable() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [splitRewards, setSplitRewards] = useState(null);

  useEffect(() => {
    fetch(REWARDS_ENDPOINT)
      .then(async (res) => {
        if (res.status === 404) {
          // fallback to account operations endpoint
          const accRes = await fetch(ACCOUNT_OPERATIONS_ENDPOINT + "&limit=10");
          if (!accRes.ok) throw new Error("No payouts found");
          return accRes.json();
        }
        return res.json();
      })
      .then((data) => {
        setPayouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load payouts");
        setLoading(false);
      });
  }, []);

  // Fetch split rewards for selected cycle
  useEffect(() => {
    if (!selectedCycle) {
      setSplitRewards(null);
      return;
    }
    setSplitRewards(null);
    setLoading(true);
    fetch(`${TZKT_API_BASE}/rewards/split/${BAKER_ADDRESS}/${selectedCycle}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        setSplitRewards(data);
        setLoading(false);
      })
      .catch(() => {
        setSplitRewards(null);
        setLoading(false);
      });
  }, [selectedCycle]);

  if (loading) return <div>Loading payouts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-6 text-center">Recent Baker Rewards</h3>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-4 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Cycle</th>
                <th className="px-4 py-2 border-b">Block</th>
                <th className="px-4 py-2 border-b">Timestamp</th>
                <th className="px-4 py-2 border-b">Reward (XTZ)</th>
                <th className="px-4 py-2 border-b">Split</th>
              </tr>
            </thead>
            <tbody>
              {payouts && payouts.length > 0 ? payouts.map((reward, i) => (
                <tr key={reward.cycle || reward.id || i} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2 border-b">
                    <button
                      className="text-blue-600 underline hover:text-blue-800"
                      onClick={() => setSelectedCycle(reward.cycle)}
                      disabled={loading}
                    >
                      {reward.cycle ?? reward.level ?? "-"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b">{reward.block ?? reward.hash ?? "-"}</td>
                  <td className="px-4 py-2 border-b">{reward.timestamp ? new Date(reward.timestamp).toLocaleString() : "-"}</td>
                  <td className="px-4 py-2 border-b">{reward.total ? (reward.total / 1_000_000).toFixed(2) : reward.reward ? (reward.reward / 1_000_000).toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setSelectedCycle(reward.cycle)}
                      disabled={loading}
                    >
                      View Split
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-4 py-2 text-center">No rewards found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedCycle && (
          <div className="mb-8 p-4 border rounded bg-gray-50 w-full max-w-2xl mx-auto mt-6">
            <h4 className="font-bold mb-2 text-center">Reward Split for Cycle {selectedCycle}</h4>
            {loading && <div>Loading split rewards...</div>}
            {!loading && splitRewards && Array.isArray(splitRewards) && splitRewards.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b">Address</th>
                    <th className="px-4 py-2 border-b">Amount (XTZ)</th>
                    <th className="px-4 py-2 border-b">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {splitRewards.map((split, idx) => (
                    <tr key={split.address || idx} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-2 border-b">{split.address}</td>
                      <td className="px-4 py-2 border-b">{(split.amount / 1_000_000).toFixed(2)}</td>
                      <td className="px-4 py-2 border-b">{split.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : !loading && splitRewards && splitRewards.length === 0 ? (
              <div>No split rewards found for this cycle.</div>
            ) : null}
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full" onClick={() => setSelectedCycle(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
