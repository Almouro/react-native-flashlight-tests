import { computeMissingVersions } from "./computeMissingVersions";
import axios from "axios";
import {
  MAXIMUM_VERSIONS_TO_BUILD,
  SCENARIO,
  START_VERSION,
} from "./constants";

const GH_TOKEN_DISPATCH_ACTION = process.env.GH_TOKEN_DISPATCH_ACTION;

const build = async ({
  accessToken,
  new_arch,
  scenario,
  version,
}: {
  version: string;
  new_arch: boolean;
  scenario: string;
  accessToken: string;
}): Promise<void> => {
  console.log(`Triggering build for ${version}...`);

  try {
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
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    console.log(`Build triggered successfully for ${version}`);
  } catch (error) {
    console.error(error);
  }
};

const buildForMissingVersions = async (maxVersions: number) => {
  const missingVersions = await computeMissingVersions(START_VERSION);
  if (missingVersions.length > maxVersions) {
    console.log(
      `more than ${maxVersions} untested React Native versions were identified, only the 15 latest will be kept`
    );
  }
  const versionsToBuild = missingVersions.slice(-maxVersions);
  if (GH_TOKEN_DISPATCH_ACTION === undefined) {
    throw new Error("please set GH_TOKEN_DISPATCH_ACTION env variable");
  }

  versionsToBuild.forEach((vname) => {
    build({
      version: vname,
      new_arch: false,
      scenario: SCENARIO,
      accessToken: GH_TOKEN_DISPATCH_ACTION,
    });
  });
};

buildForMissingVersions(MAXIMUM_VERSIONS_TO_BUILD);
