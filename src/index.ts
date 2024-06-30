#! /usr/bin/env node

import { Command } from "commander";
import { combineJSON } from "./combineJSON/combineJSON";

const program = new Command();

program
  .name("jasarm")
  .description("Manipulate json files from the command line.")
  .version("0.1");

program
  .command("combine")
  .description(
    "Combines json files of the format specified in the task in to a single json file, with metadata."
  )
  .argument("<sring>", "Path the directory container the source json files.")
  .action((path, _options) => {
    combineJSON(path);
  });

program.parse();
