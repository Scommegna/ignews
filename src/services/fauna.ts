import { Client } from "faunadb";

// FaunaDB client
export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
});
