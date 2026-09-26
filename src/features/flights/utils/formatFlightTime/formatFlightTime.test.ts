import { describe, expect, it } from "vitest";
import { formatFlightTime } from "./formatFlightTime";

describe("formatFlightTime", () => {
  it("returns hours and minutes from the flight timestamp", () => {
    expect(formatFlightTime("2022-11-19T14:25:00")).toBe("14:25");
  });
});
