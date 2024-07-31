export const BASE_API_URL =
  "https://us-central1-bam-flashlight.cloudfunctions.net/api/";
export const URL_OPTIONS = "trpc/getUserRunHistory";
export const RN_TEST_PROJECT_ID = "61582a54-5f3b-44bb-8323-dd83e5ddef51";
export const SCENARIO = "FlatListExample";
export const START_VERSION = {
  OLD_ARCH: "0.68.0",
  NEW_ARCH: "0.70.0-rc.0",
};
export const IGNORED_VERSIONS = [
  "0.70.0-rc.0", // build failing
  "0.70.0-rc.3", // build crashing for new arch
  "0.72.0-rc.2", // build crashing for both arch
  "0.72.0-rc.3", // build crashing for both arch
  "0.74.0-nightly-20231110-9b33e752c", // build crashing for new arch
  "0.74.0-nightly-20240212-2090fe5cf", // build failing for new arch
  "0.75.0-rc.0", // build failing for both arch
  "0.75.0-rc.1", // build failing for both arch
  "0.75.0", // build failing for both arch because of missing @react-native-community/template
  "0.76.0-nightly-20240822-81a41ec97", // doesn't build, fixed by https://github.com/facebook/react-native/commit/524a3f0476f9e0185bbbdc470cfd2aa34420bae6
  "1000.0.0",
];
export const MAXIMUM_VERSIONS_TO_BUILD = 15;
