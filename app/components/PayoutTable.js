"use client";
import { useEffect, useState } from "react";
import { REWARDS_ENDPOINT, ACCOUNT_OPERATIONS_ENDPOINT, TZKT_API_BASE, BAKER_ADDRESS } from "../lib/bakerApi";

export default function PayoutTable() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [splitRewards, setSplitRewards] = useState({}); // { [cycle]: array|null }
  const [showAllRows, setShowAllRows] = useState(false);

  const DEFAULT_VISIBLE_ROWS = 10;

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


  // Fetch split rewards for a cycle on demand
  const handleCycleClick = (cycle) => {
    if (selectedCycle === cycle) {
      setSelectedCycle(null);
      return;
    }
    setSelectedCycle(cycle);
    if (!splitRewards[cycle]) {
      setLoading(true);
      fetch(`${TZKT_API_BASE}/rewards/split/${BAKER_ADDRESS}/${cycle}`)
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          setSplitRewards((prev) => ({ ...prev, [cycle]: data }));
          setLoading(false);
        })
        .catch(() => {
          setSplitRewards((prev) => ({ ...prev, [cycle]: null }));
          setLoading(false);
        });
    }
  };

  if (loading) return <div>Loading payouts...</div>;
  if (error) return <div>{error}</div>;

  const visiblePayouts = showAllRows ? payouts : payouts.slice(0, DEFAULT_VISIBLE_ROWS);
  const hasMoreRows = payouts.length > DEFAULT_VISIBLE_ROWS;

  // TzKT reward fields: cycle, block, timestamp, reward, etc.
  const getRewardAmount = (reward) => {
    if (reward.blockRewardsDelegated) return (reward.blockRewardsDelegated / 1_000_000).toFixed(2);
    if (reward.blockRewardsStakedOwn) return (reward.blockRewardsStakedOwn / 1_000_000).toFixed(2);
    if (reward.blockRewardsStakedEdge) return (reward.blockRewardsStakedEdge / 1_000_000).toFixed(2);
    if (reward.blockRewardsStakedShared) return (reward.blockRewardsStakedShared / 1_000_000).toFixed(2);
    if (reward.futureBlockRewards) return (reward.futureBlockRewards / 1_000_000).toFixed(2);
    if (reward.blockRewards) return (reward.blockRewards / 1_000_000).toFixed(2);
    return "-";
  };

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
              {visiblePayouts && visiblePayouts.length > 0 ? visiblePayouts.map((reward, i) => [
                <tr key={reward.cycle || reward.id || i} className={selectedCycle === reward.cycle ? "bg-blue-50" : "hover:bg-blue-50 transition"}>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="text-blue-600 underline hover:text-blue-800"
                      onClick={() => handleCycleClick(reward.cycle)}
                      disabled={loading}
                    >
                      {reward.cycle ?? "-"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b">{reward.block ?? reward.level ?? "-"}</td>
                  <td className="px-4 py-2 border-b">{reward.timestamp ? new Date(reward.timestamp).toLocaleString() : "-"}</td>
                  <td className="px-4 py-2 border-b">{getRewardAmount(reward)}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleCycleClick(reward.cycle)}
                      disabled={loading}
                    >
                      {selectedCycle === reward.cycle ? "Hide Split" : "View Split"}
                    </button>
                  </td>
                </tr>,
                selectedCycle === reward.cycle && (
                  <tr key={`split-${reward.cycle}`}>
                    <td colSpan={5} className="bg-blue-50 border-b p-0">
                      <div className="p-4">
                        {loading && <div>Loading split rewards...</div>}
                        {!loading && Array.isArray(splitRewards[reward.cycle]) && splitRewards[reward.cycle].length > 0 && (
                          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center mb-2">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 border-b">Address</th>
                                <th className="px-4 py-2 border-b">Amount (XTZ)</th>
                                <th className="px-4 py-2 border-b">Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {splitRewards[reward.cycle].map((split, idx) => (
                                <tr key={split.address || idx} className="hover:bg-blue-50 transition">
                                  <td className="px-4 py-2 border-b">{split.address}</td>
                                  <td className="px-4 py-2 border-b">{(split.amount / 1_000_000).toFixed(2)}</td>
                                  <td className="px-4 py-2 border-b">{split.type}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {!loading && (splitRewards[reward.cycle] === null || (Array.isArray(splitRewards[reward.cycle]) && splitRewards[reward.cycle].length === 0)) && (
                          <div>
                            <div className="text-gray-700 mb-2">No split rewards found for this cycle.</div>
                            <div className="text-xs text-gray-500">Cycle: {reward.cycle} | Block: {reward.block ?? reward.level ?? "-"} | Reward: {getRewardAmount(reward)} XTZ</div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              ]) : (
                <tr><td colSpan={5} className="px-4 py-2 text-center">No rewards found</td></tr>
              )}
            </tbody>
          </table>
          {hasMoreRows && (
            <div className="mt-3 flex justify-center">
              <button
                className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
                onClick={() => setShowAllRows((prev) => !prev)}
              >
                {showAllRows ? 'Show less' : `Show more (${payouts.length - DEFAULT_VISIBLE_ROWS} more rows)`}
              </button>
            </div>
          )}
        </div>

        {selectedCycle && (
          <div className="mb-8 p-4 border rounded bg-gray-50 w-full max-w-2xl mx-auto mt-6">
            <h4 className="font-bold mb-2 text-center">Reward Split for Cycle {selectedCycle}</h4>
            {loading && <div>Loading split rewards...</div>}
            {!loading && hasSplitRewards && (
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
            )}
            {!loading && hasNoSplitRewards && <div>No split rewards found for this cycle.</div>}
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full" onClick={() => setSelectedCycle(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
