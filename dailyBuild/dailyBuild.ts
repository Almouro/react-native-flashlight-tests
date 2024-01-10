import { computeMissingVersions } from "./computeMissingVersions";
import axios from "axios";
import {
  MAXIMUM_VERSIONS_TO_BUILD,
  SCENARIO,
  START_VERSION,
} from "./constants";

const GH_TOKEN_DISPATCH_ACTION = process.env.GH_TOKEN_DISPATCH_ACTION;

const build = async ({
  new_arch,
  scenario,
  version,
}: {
  version: string;
  new_arch: boolean;
  scenario: string;
}): Promise<void> => {
  console.log(`Triggering build for ${version}...`);

  await axios.post(
    "https://api.github.com/repos/almouro/wip-wip/actions/workflows/build.yaml/dispatches",
    {
      ref: "main",
      inputs: {
        new_arch,
        rn_version: version,
        scenario,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${GH_TOKEN_DISPATCH_ACTION}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  console.log(`Build triggered successfully for ${version}`);
};

const buildForMissingVersions = async (
  newArch: boolean,
  maxVersions: number
) => {
  // This is copy pasted from build.yaml
  const testName = `${SCENARIO}_cache10s_${newArch ? "New-arch" : "Old-arch"}`;
  const missingVersions = await computeMissingVersions(testName, START_VERSION);
  if (missingVersions.length > maxVersions) {
    console.log(
      `more than ${maxVersions} untested React Native versions were identified, only the 15 latest will be kept`
    );
  }
  const versionsToBuild = missingVersions.slice(-maxVersions);
  if (GH_TOKEN_DISPATCH_ACTION === undefined) {
    throw new Error("please set GH_TOKEN_DISPATCH_ACTION env variable");
  }

  for (const versionName of versionsToBuild) {
    await build({
      version: versionName,
      new_arch: newArch,
      scenario: SCENARIO,
    });
  }
};

const run = async () => {
  await buildForMissingVersions(false, MAXIMUM_VERSIONS_TO_BUILD);
  await buildForMissingVersions(true, MAXIMUM_VERSIONS_TO_BUILD);
};

run();
