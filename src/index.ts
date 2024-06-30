#! /usr/bin/env node

import { Command } from "commander";
import { combineJSON } from "./combineJSON";

const program = new Command();

program
  .name("jasarm")
  .description(
    "Combines JSON files in a given format in to one JSON file, saving the result to a new JSON file"
  )
  .version("0.1");

program
  .command("combine")
  .description("Here is a description")
  .argument("<sring>", "src path")
  .action((path, _options) => {
    combineJSON(path);
  });

program.parse(); // what does this do?!
