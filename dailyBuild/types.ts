type TestRunResult = {
  id: string;
  bundleId: string;
  tag: {
    name: string;
    date: string;
  };
  score: number;
  testName: string;
  status: string;
  triggeredAt: string;
  resultJsonUrl: string;
  fullVideoUrl: string;
  isPublic: boolean;
  deviceName: string;
  averageMetrics: {
    runtime: number;
    fps: number;
    cpu: number;
    ram: number;
    totalHighCpuTime: number;
    threads: {
      [key: string]: number;
    };
  };
};

export type HistoryResult = [
  {
    result: {
      data: TestRunResult[];
    };
  }
];
