import { version } from "typescript";
import { fetchAvailableVersions } from "./fetchAvailableVersions";
import { userRunHistoryConnector } from "./userRunHistory/userRunHistory.connector";

export const computeMissingVersions = async (
  startVersion: string
): Promise<string[]> => {
  const computedVersions = await userRunHistoryConnector();

  const allVersions = await fetchAvailableVersions();

  if (!allVersions.includes(startVersion)) {
    throw new Error(
      `startVersion ${startVersion} is not available in npm registry`
    );
  }

  const availableVersions = allVersions
    .slice(allVersions.indexOf(startVersion))
    .filter((version) => !version.includes("0.73.0-nightly"))
    .filter((version) => version !== "0.71.0-rc.0"); // remove 0.73.0-nightly versions and 0.71.0-rc.0 since they fail systematically

  const missingVersions: string[] = [];

  console.log("identifying new versions...");

  for (const version of availableVersions) {
    if (!computedVersions.includes(version)) {
      missingVersions.push(version);
    }
  }

  if (missingVersions.length === 0) {
    console.log("no new version to compute");
    return [];
  }

  console.log(
    `${missingVersions.length} untested version${
      missingVersions.length > 1 ? "s" : ""
    } were identified`
  );
  console.log("versions found :", missingVersions);

  return missingVersions;
};
