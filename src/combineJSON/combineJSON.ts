import { BoardCollection, Board, BoardCollectionValidated } from "../types";
import * as fs from "fs";
import { isDir, getJsonFiles } from "../utils";

// TODO refactor these to actually help with type narrowing.
function hasStringProp(propName: string, obj: object): boolean {
  return propName in obj && typeof obj[propName] === "string";
}

function hasBooleanProp(propName: string, obj: object): boolean {
  return propName in obj && typeof obj[propName] === "boolean";
}

function hasArrayProp(propName: string, obj: object): boolean {
  return propName in obj && Array.isArray(obj[propName]);
}

export function isBoard(input: unknown): input is Board {
  if (typeof input !== "object") {
    return false;
  }

  return (
    hasStringProp("name", input) &&
    hasStringProp("vendor", input) &&
    hasStringProp("core", input) &&
    hasBooleanProp("has_wifi", input)
  );
}

export function isBoardCollection(input: unknown): input is BoardCollection {
  if (typeof input !== "object") {
    return false;
  }
  if (hasArrayProp("boards", input)) {
    const boards = (input as any).boards as any[];

    // only require it to contain one good board
    return boards.some((element) => isBoard(element));
  }

  return false;
}

export function combineJSON(path: string): void {
  // check if path is directory
  isDir(path);
  // check if dir contains .json files
  const jsonFilePaths = getJsonFiles(path);
  // for each json:

  const combined: BoardCollectionValidated = {
    boards: [],
    _metadata: { total_boards: 0, total_vendors: 0 },
  };

  const boardNames: string[] = [];
  const vendors: string[] = [];

  for (const path of jsonFilePaths) {
    let boardCollection: BoardCollection;
    try {
      const obj = JSON.parse(fs.readFileSync(path, "utf-8"));
      if (!isBoardCollection(obj)) {
        console.warn(
          `${path} is not in the correct JSON format, or has no valid boards.`
        );
        continue;
      }
      boardCollection = obj;

      // iterate through each board, validate, and add to combined if not already in
      boardCollection.boards.forEach((board) => {
        if (!isBoard(board)) {
          console.warn(`Skipping bad board in ${path}`, board);
          return;
        }
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
