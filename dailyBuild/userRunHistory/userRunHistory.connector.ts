import { adaptHistoryToVersions } from "./userRunHistory.adapter";
import { fetchHistory, fetchNumberOfTests } from "./userRunHistory.api";

export const userRunHistoryConnector = async (): Promise<string[]> => {
  const numberOfTests = await fetchNumberOfTests();
  const historyData = await fetchHistory(numberOfTests);
  return adaptHistoryToVersions(historyData);
};
