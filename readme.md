## Arm coding task CLI app

I have used commander.js to make "jasarm", a json manipulation tool.

I have also copied the odd snippet from the internet, and make no claim that I have thought up every line of code.

It currently only has one command, 'combine', which combines json files as specified by the task.

### Installation

Tested with Node 20.14.0.

run `npm install && npm run build`.

### How to use it

run `jasarm combine <path-to-dir-containing-json-files>`

For example `jasarm combine e2e/test-data/example-boards`

The .json file containing the combined data will be saved in a directory called 'res', in output.json.

### Development

`npm run dev` to compile the source typeScript in watch mode, outputting to `build`, and re-installing the package globally to make the updated version available for testing.

### Tests

Run the jest tests with `npm run test`.

### Troubleshooting

After I cleaned the repo with `git clean -fdx` to test reinstalling everything, I found that I had to first uninstall the package globally with `npm uninstall -g` before I could then install it again, and then run jasarm without running in to "zsh: permission denied: jasarm" error.
