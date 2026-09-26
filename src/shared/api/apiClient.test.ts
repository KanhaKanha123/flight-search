import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "./ApiError";
import { apiGet } from "./apiClient";

describe("apiGet", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed JSON when the request succeeds", async () => {
    const data = {
      Airports: [],
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    await expect(apiGet("/data/airports.json")).resolves.toEqual(data);
  });

  it("throws ApiError when the response is not successful", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 500,
      }),
    );

    await expect(apiGet("/data/airports.json")).rejects.toBeInstanceOf(
      ApiError,
    );
  });

  it("includes the response status in ApiError", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 404,
      }),
    );

    try {
      await apiGet("/missing.json");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);

      if (error instanceof ApiError) {
        expect(error.status).toBe(404);
      }
    }
  });
});
