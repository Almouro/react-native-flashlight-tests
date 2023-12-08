import { fetchAvailableVersions } from "./fetchAvailableVersions";
import { fetchVersionsHistory } from "./fetchVersionsHistory";

export const computeMissingVersions = async (
  startVersion: string
): Promise<string[]> => {
  const computedVersions = await fetchVersionsHistory();

  const allVersions = await fetchAvailableVersions();

  if (!allVersions.includes(startVersion)) {
    throw new Error(
      `startVersion ${startVersion} is not available in npm registry`
    );
  }

  const availableVersions = allVersions.slice(
    allVersions.indexOf(startVersion)
  );

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

  console.log("untested versions were identified");
  console.log("versions found :", missingVersions);

  return missingVersions;
};
