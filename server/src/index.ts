import express from "express";
import { db } from "./db";
import { body, query, validationResult } from "express-validator";
import { QueryResult } from "pg";

const { PORT, NODE_ENV } = process.env;

const app = express();

app.use(express.json());

app.get(
  "/dna/search",
  query("query")
    .exists()
    .matches(new RegExp(/^[ACTG]{1,255}$/)),
  query("distance").optional().isInt({ min: 0, max: 254 }),

  async (req, res) => {
    try {
      // If the validation rules fail, exit
      validationResult(req).throw();

      const searchQuery = req.query?.query;
      const distance = req.query?.distance;

      let result: QueryResult<any>;

      // If the distance param is set, we query using the levenshtein extension
      if (distance) {
        result = await db.query(
          // Also return the distance as a int so we can sort in the frontend
          `SELECT *, levenshtein (dna_string, $1) as distance FROM dna WHERE levenshtein (dna_string, $1) <= $2`,
          [searchQuery, distance]
        );
      } else {
        // Exact matches seem kinda silly so we do a LIKE search for the given query
        result = await db.query(`SELECT * FROM dna WHERE dna_string LIKE $1`, [
          "%" + searchQuery + "%",
        ]);
      }

      // Return the result
      res.json({
        result: result.rows,
      });
    } catch (e) {
      res.status(400).json({ result: [], errors: e ?? "Bad Request..." });
    }
  }
);

app.post(
  "/dna/create",
  body("dna_string").exists().matches(new RegExp("^[ACTG]{2,255}$")),
  async (req, res) => {
    try {
      // If the validation rules fail, exit
      validationResult(req).throw();

      const result = await db.query(
        `INSERT INTO dna (dna_string) VALUES ($1) RETURNING id, dna_string, created`,
        [req.body!.dna_string]
      );

      // This will only return one row, the entry we just added
      res.json({ result: result.rows });
    } catch (e) {
      res.status(400).json({ result: [], errors: e ?? "Bad Request..." });
    }
  }
);

// For now: disable open handle when running jest supertest mock
if (NODE_ENV !== "test") {
  app.listen(+(PORT ?? 8000), "0.0.0.0", () => {
    console.log(`DNA API listening on port ${PORT}`);
  });
}

export default app;
