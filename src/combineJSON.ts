import { BoardInfo } from "./types";
import * as fs from "fs";
import { isDir, getJsonFiles } from "./utils";

export function isBoardInfo(input: unknown): input is BoardInfo {
  // flesh this out
  return true;
}

export function combineJSON(path: string): void {
  // check if path is directory
  isDir(path);
  debugger;
  // check if dir contains .json files
  const jsonFilePaths = getJsonFiles(path);
  // for each json:

  const combined: BoardInfo = {
    boards: [],
    _metadata: { total_boards: 0, total_vendors: 0 },
  };

  const boardNames: string[] = [];
  const vendors: string[] = [];

  for (const path of jsonFilePaths) {
    console.log(path);
    let boardInfo: BoardInfo;
    try {
      const obj = JSON.parse(fs.readFileSync(path, "utf-8"));
      if (!isBoardInfo(obj)) {
        console.warn(`${path} is not in the correct JSON format`);
        continue;
      }
      boardInfo = obj;

      // iterate through each board, and add to combined if not already in
      boardInfo.boards.forEach((board) => {
        const { name, vendor } = board;
        if (!boardNames.includes(name)) {
          boardNames.push(name);
          combined.boards.push(board);
          combined._metadata.total_boards++;

          if (!vendors.includes(vendor)) {
            vendors.push(vendor);
            combined._metadata.total_vendors++;
          }
        }
      });
    } catch (e) {
      console.error(e);
      continue;
    }
  }

  // sort the boards array
  combined.boards.sort((a, b) => {
    const aVal = a.vendor + a.name;
    const bVal = b.vendor + b.name;
    if (aVal < bVal) {
      return -1;
    }
    if (aVal > bVal) {
      return 1;
    }
    return 0;
  });

  // write out json

  try {
    const data = JSON.stringify(combined, null, "\t");
    const outputDir = `${path}/res`;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(`${outputDir}/output.json`, data);
    console.log(`Output written to ${outputDir}`);
  } catch (e) {
    console.error(e);
  }
}
