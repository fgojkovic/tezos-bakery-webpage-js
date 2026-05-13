"use client";
import { useEffect, useState } from "react";
import { BAKER_MISSED_BLOCKS_ENDPOINT, BAKER_ENDORSEMENTS_ENDPOINT, ACCOUNT_MISSED_BLOCKS_ENDPOINT, ACCOUNT_ENDORSEMENTS_ENDPOINT } from "../lib/bakerApi";

export default function AdvancedBakerStats() {
  const [missedBlocks, setMissedBlocks] = useState(null);
  const [endorsements, setEndorsements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(BAKER_MISSED_BLOCKS_ENDPOINT + "?limit=10").then(async (res) => {
        if (res.status === 404) {
          // fallback to account endpoint
          const accRes = await fetch(ACCOUNT_MISSED_BLOCKS_ENDPOINT + "?limit=10");
          if (!accRes.ok) return [];
          return accRes.json();
        }
        return res.json();
      }),
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
      .then(([missed, endorsed]) => {
        setMissedBlocks(missed);
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
          <h3 className="text-xl font-bold mb-4 text-center">Recent Missed Blocks</h3>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Level</th>
                  <th className="px-4 py-2 border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {missedBlocks && missedBlocks.length > 0 ? missedBlocks.map((block) => (
                  <tr key={block.level} className="hover:bg-red-50 transition">
                    <td className="px-4 py-2 border-b">{block.level}</td>
                    <td className="px-4 py-2 border-b">{new Date(block.timestamp).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={2} className="px-4 py-2 text-center">No missed blocks</td></tr>
                )}
              </tbody>
            </table>
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
