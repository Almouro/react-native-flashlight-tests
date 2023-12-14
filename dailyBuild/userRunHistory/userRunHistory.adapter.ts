import { HistoryResult } from "./types";

export const adaptHistoryToVersions = (history: HistoryResult): string[] => {
  return history[0].result.data.testRuns
    .sort(
      (a, b) => new Date(a.tag.date).getTime() - new Date(b.tag.date).getTime()
    )
    .map((data) => data.tag.name);
};
