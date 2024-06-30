## Arm coding task CLI app

I have used commander.js to make "jasarm", a json manipulation tool.

It currently only has one command, 'combine', which combines json files as specified by the task.

### Installation

Tested with Node 20.14.0.

run `npm install && npm run build`.

### How to use it

run `jasarm combine <path-to-dir-containing-json-files>`

The .json file containing the combined data will be saved in a directory called 'res', in output.json.

### Development

`npm run dev` to compile the source typeScript in watch mode, outputting to `build`, and re-installing the package globally to make the updated version available for testing.

### Tests

Run the jest unit tests with `npm run test`.
