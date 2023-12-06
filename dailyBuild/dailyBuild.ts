import { HistoryResult } from "./types";

const fetchHistory = async (): Promise<unknown> => {
  try {
    const res = await fetch(
      "https://us-central1-bam-flashlight.cloudfunctions.net/api/trpc/getUserRunHistory?batch=1&input=%7B%220%22%3A%7B%22projectId%22%3A%2261582a54-5f3b-44bb-8323-dd83e5ddef51%22%2C%22testName%22%3A%22pokedex-4-columns%20-%20Old%20arch%22%7D%7D",
      { method: "GET" }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

const adaptHistoryToVersions = (history: HistoryResult): string[] => {
  return history[0].result.data.map((data) => data.tag.name);
};

const fetchVersionsHistory = async (): Promise<string[]> => {
  const historyData = (await fetchHistory()) as HistoryResult;
  return adaptHistoryToVersions(historyData);
};
fetchVersionsHistory();
