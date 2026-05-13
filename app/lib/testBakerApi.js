// Simple script to test all TzKT API endpoints used in the app
// Run with: node app/lib/testBakerApi.js

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const endpoints = [
  require("./bakerApi").TZKT_API_BASE + "/head",
  require("./bakerApi").ACCOUNT_ENDPOINT,
  require("./bakerApi").ACCOUNT_OPERATIONS_ENDPOINT + "&limit=1",
  require("./bakerApi").REWARDS_ENDPOINT,
  // Add more endpoints as needed
];

(async () => {
  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      const status = res.status;
      let info = "";
      try {
        const json = await res.json();
        info = Array.isArray(json) ? `Array(${json.length})` : typeof json;
      } catch {
        info = "Non-JSON response";
      }
      if (status === 200) {
        console.log(`[OK]   ${url} — Status: ${status} — ${info}`);
      } else {
        console.error(`[FAIL] ${url} — Status: ${status} — ${info}`);
      }
    } catch (e) {
      console.error(`[ERROR] ${url} — ${e.message}`);
    }
  }
})();
