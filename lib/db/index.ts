import { DB } from "kysely-codegen"; // this is the Database interface we defined earlier
import SQLite from "better-sqlite3";
import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from "kysely";

const dialect = new SqliteDialect({
  database: new SQLite("babyx-feed-tracker.db"),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
  plugins: [new ParseJSONResultsPlugin()],
});
