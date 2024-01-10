import axios from "axios";
import { HistoryResult } from "./types";
import { BASE_API_URL, RN_TEST_PROJECT_ID, URL_OPTIONS } from "../constants";

export const fetchHistory = async (
  testName: string,
  numberOfTests: number
): Promise<HistoryResult> => {
  console.log("fetching test history...");
  const params = {
    batch: 1,
    input: JSON.stringify({
      "0": {
        projectId: RN_TEST_PROJECT_ID,
        testName,
        pageSize: numberOfTests,
      },
    }),
  };

  const res = await axios.get(`${BASE_API_URL}${URL_OPTIONS}`, { params });
  return res.data;
};

export const fetchNumberOfTests = async (testName: string): Promise<number> => {
  console.log("fetching number of tests...");
  const params = {
    batch: 1,
    input: JSON.stringify({
      "0": {
        projectId: RN_TEST_PROJECT_ID,
        testName,
        pageSize: 1,
      },
    }),
  };

  const res = await axios.get(`${BASE_API_URL}${URL_OPTIONS}`, { params });

  return res.data[0].result.data.totalCount;
};
