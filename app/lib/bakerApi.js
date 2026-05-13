// Helper constants for Tezos Bakery API endpoints

export const TZKT_API_BASE = "https://api.tzkt.io/v1";
export const BAKER_ADDRESS = "tz1fazA9hbHB2Z6nntT9UhdGsAXTcfzzvDpj";



// Documented endpoints only
export const ACCOUNT_ENDPOINT = `${TZKT_API_BASE}/accounts/${BAKER_ADDRESS}`;
export const ACCOUNT_OPERATIONS_ENDPOINT = `${TZKT_API_BASE}/operations/baking?baker=${BAKER_ADDRESS}`;
export const ACCOUNT_PAYOUTS_ENDPOINT = `${TZKT_API_BASE}/operations/transaction?target=${BAKER_ADDRESS}&limit=20`;
// For rewards, use /rewards/split/{address} if available
export const REWARDS_ENDPOINT = `${TZKT_API_BASE}/rewards/bakers/${BAKER_ADDRESS}`;
