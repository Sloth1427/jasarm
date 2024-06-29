import * as fs from "fs";
import { globSync } from "glob";
import { BoardInfo } from "./types";

export function isDir(fullpath: string): Boolean {
  try {
    return fs.lstatSync(fullpath).isDirectory();
  } catch {
    throw new Error(`${fullpath} is not a directory`);
  }
}

export function getJsonFiles(dir: string): string[] {
  const jsonFilePaths = globSync(`${dir}/*.json`);
  if (jsonFilePaths.length < 1) {
    throw new Error(`${dir} does not contain any json files`);
  }

  return jsonFilePaths;
}

export function isValidJsonFormat(input: unknown): input is BoardInfo {
  // flesh this out
  return true;
}
