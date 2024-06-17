#! /usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("combinejson")
  .description(
    "Combines JSON files in a given format in to one JSON file, saving the result to a new JSON file"
  )
  .version("0.1");

program
  .command("combine")
  .description("Here is a description")
  .argument("<sring>", "src path")
  .action((str, options) => {
    console.log(str, options);
  });

program.parse(); // what does this do?!
