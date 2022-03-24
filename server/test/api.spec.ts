import app from "../src/";
import request from "supertest";

describe("Check API endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("checks the create endpoint with valid input", async () => {
    const exampleString = "ACTGGGTG";

    await request(app)
      .post("/api/create")
      .send({ dna_string: exampleString })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(typeof response.body.result.id).toBe("number");
        expect(response.body.result.dna_string).toBe(exampleString);
      });
  });

  it("checks the create endpoint with invalid input", async () => {
    const exampleString = "PIPTEQQ";

    await request(app)
      .post("/api/create")
      .send({ dna_string: exampleString })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it("checks the search endpoint", async () => {
    const searchQuery = "ACT";

    await request(app)
      .get(`/api/search?query=${searchQuery}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.result.length > 0).toBe(true);
      });
  });
});
