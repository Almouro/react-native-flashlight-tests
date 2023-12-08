import axios from "axios";
import { HistoryResult } from "./types";

const fetchHistory = async (): Promise<HistoryResult> => {
  console.log("fetching test history...");
  try {
    const res = await axios.get(
      "https://us-central1-bam-flashlight.cloudfunctions.net/api/trpc/getUserRunHistory?batch=1&input=%7B%220%22%3A%7B%22projectId%22%3A%2261582a54-5f3b-44bb-8323-dd83e5ddef51%22%2C%22testName%22%3A%22pokedex-4-columns%20-%20Old%20arch%22%7D%7D"
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
  throw new Error("An unexpected error occured while fetching history");
};

const adaptHistoryToVersions = (history: HistoryResult): string[] => {
  return history[0].result.data.testRuns
    .sort(
      (a, b) => new Date(a.tag.date).getTime() - new Date(b.tag.date).getTime()
    )
    .map((data) => data.tag.name);
};

export const fetchVersionsHistory = async (): Promise<string[]> => {
  const historyData = await fetchHistory();
  return adaptHistoryToVersions(historyData);
};
