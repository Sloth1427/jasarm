const { exec } = require("child_process");

// TODO write more e2e tests

test("it correctly gives the correct output on the example data", async () => {
  const { stdout } = await cli(["combine", "e2e/test-data/example-boards"]);
  expect(stdout).toEqual(
    "Output written to e2e/test-data/example-boards/res\n"
  );
});

function cli(args, cwd) {
  return new Promise((resolve) => {
    exec(`jasarm ${args.join(" ")}`, { cwd }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}
