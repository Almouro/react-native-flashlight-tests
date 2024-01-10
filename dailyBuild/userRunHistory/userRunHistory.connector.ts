import { adaptHistoryToVersions } from "./userRunHistory.adapter";
import { fetchHistory, fetchNumberOfTests } from "./userRunHistory.api";

export const userRunHistoryConnector = async (
  testName: string
): Promise<string[]> => {
  const numberOfTests = await fetchNumberOfTests(testName);

  if (numberOfTests === 0) return [];

  const historyData = await fetchHistory(testName, numberOfTests);
  return adaptHistoryToVersions(historyData);
};
