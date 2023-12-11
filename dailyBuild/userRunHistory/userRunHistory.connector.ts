import { adaptHistoryToVersions } from "./userRunHistory.adapter";
import { fetchHistory, fetchNumberOfTests } from "./userRunHistory.api";

export const fetchVersionsHistory = async (): Promise<string[]> => {
  const numberOfTests = await fetchNumberOfTests();
  const historyData = await fetchHistory(numberOfTests);
  return adaptHistoryToVersions(historyData);
};
