import { Database } from "@tableland/sdk";
const db = new Database();

async function getPet(tokenId) {
  const table = "game_store_80001_4440"; // "defi_pets_..."
  const root = `SELECT * FROM ${table}`;
  const where = `WHERE id = '${tokenId}'`;
  const statement = `${root} ${where}`;
  const pets = await db.prepare(statement).all();
  return pets.results;
}

export default async function handler(req, res) {
  const { tokenId } = req.query;
  const results = await getPet(tokenId);
  res.status(200).json({ tokenId, results });
}
