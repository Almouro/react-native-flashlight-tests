//@ts-ignore
const { exec } = require("child_process");

export const fetchAvailableVersions = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec(
      "npm show react-native versions --json",
      (err: string, stdout: string, stderr: string) => {
        if (err) {
          reject(`exec error: ${err}`);
          return;
        }

        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }

        try {
          const versions = stdout;
          resolve(JSON.parse(versions));
        } catch (parseError) {
          reject(`JSON parse error: ${parseError}`);
        }
      }
    );
  });
};
