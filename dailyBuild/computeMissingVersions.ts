//@ts-ignore
const { exec } = require("child_process");
import { fetchVersionsHistory } from "./fetchVersionsHistory";

const fetchAvailableVersions = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec(
      "npm show react-native versions --json",
      (err: string, stdout: string[], stderr: string) => {
        if (err) {
          reject(`exec error: ${err}`);
          return;
        }

        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }

        try {
          const versions = stdout;
          resolve(versions);
        } catch (parseError) {
          reject(`JSON parse error: ${parseError}`);
        }
      }
    );
  });
};

export const computeMissingVersions = async (): Promise<string[]> => {
  const computedVersions = await fetchVersionsHistory();

  const availableVersions = await fetchAvailableVersions();

  console.log("identifying new versions...");

  const indexOfLastComputedInAvailable = availableVersions.indexOf(
    computedVersions[computedVersions.length - 1]
  );

  if (computedVersions.length === 0 || availableVersions.length === 0) {
    return [];
  }

  if (indexOfLastComputedInAvailable === -1) {
    // Handle the case where the last computed version isn't in available versions
    return [];
  }

  const versionsAfterLastComputed = availableVersions.slice(
    indexOfLastComputedInAvailable + 1
  );

  console.log("untested versions were identified");

  return versionsAfterLastComputed;
};

computeMissingVersions();
