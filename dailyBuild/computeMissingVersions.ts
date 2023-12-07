//@ts-ignore
const { exec } = require("child_process");
import { fetchVersionsHistory } from "./fetchVersionsHistory";

const fetchAvailableVersions = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec(
      "npm show react-native versions --json",
      (err: string, stdout: string, stderr: string) => {
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
          resolve(JSON.parse(versions));
        } catch (parseError) {
          reject(`JSON parse error: ${parseError}`);
        }
      }
    );
  });
};

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
