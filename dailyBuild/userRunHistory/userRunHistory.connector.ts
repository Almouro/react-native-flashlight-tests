import axios from "axios";
import { HistoryResult } from "./types";
import {
  BASE_API_URL,
  RN_TEST_PROJECT_ID,
  TEST_NAME,
  URL_OPTIONS,
} from "../constants";

const fetchHistory = async (numberOfTests: number): Promise<HistoryResult> => {
  console.log("fetching test history...");
  try {
    const params = {
      batch: 1,
      input: JSON.stringify({
        "0": {
          projectId: RN_TEST_PROJECT_ID,
          testName: TEST_NAME,
          pageSize: numberOfTests,
        },
      }),
    };

    const res = await axios.get(`${BASE_API_URL}${URL_OPTIONS}`, { params });
    return res.data;
  } catch (error) {
    console.error(error);
  }
  throw new Error("An unexpected error occured while fetching history");
};

const fetchNumberOfTests = async (): Promise<number> => {
  console.log("fetching number of tests...");
  try {
    const params = {
      batch: 1,
      input: JSON.stringify({
        "0": {
          projectId: RN_TEST_PROJECT_ID,
          testName: TEST_NAME,
          pageSize: 1,
        },
      }),
    };

    const res = await axios.get(`${BASE_API_URL}${URL_OPTIONS}`, { params });

    return res.data[0].result.data.totalCount;
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
  const numberOfTests = await fetchNumberOfTests();
  const historyData = await fetchHistory(numberOfTests);
  return adaptHistoryToVersions(historyData);
};