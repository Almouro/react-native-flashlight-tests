import { computeMissingVersions } from "./computeMissingVersions";
import * as fetchAvailableVersions from "./fetchAvailableVersions";
import * as fetchVersionsHistory from "./fetchVersionsHistory";

jest.spyOn(console, "log").mockImplementation(() => {});

jest
  .spyOn(fetchAvailableVersions, "fetchAvailableVersions")
  .mockResolvedValue([
    "0.69.8",
    "0.69.9",
    "0.69.10",
    "0.69.11",
    "0.70",
    "another version",
  ]);

describe("computeMissingVersions", () => {
  it("should return untested versions from the first one specified", async () => {
    jest
      .spyOn(fetchVersionsHistory, "fetchVersionsHistory")
      .mockResolvedValue(["0.69.10", "0.69.11"]);
    expect(await computeMissingVersions("0.69.9")).toEqual([
      "0.69.9",
      "0.70",
      "another version",
    ]);
  });
  it("should return an empty array if no untested version is found", async () => {
    jest
      .spyOn(fetchVersionsHistory, "fetchVersionsHistory")
      .mockResolvedValue([
        "0.69.8",
        "0.69.9",
        "0.69.10",
        "0.69.11",
        "0.70",
        "another version",
      ]);
    expect(await computeMissingVersions("0.69.8")).toEqual([]);
  });
  it("should throw an error if the start version is not available", async () => {
    jest
      .spyOn(fetchVersionsHistory, "fetchVersionsHistory")
      .mockResolvedValue(["0.69.10", "0.69.11", "0.70", "another version"]);
    await expect(computeMissingVersions("0.69.7")).rejects.toThrow(
      "startVersion 0.69.7 is not available in npm registry"
    );
  });
});
