// could probably use babel to use the src files, but using the build was faster to get going
const { describe } = require("node:test");
const { isBoard } = require("../../build/combineJSON/combineJSON");

// TODO add more tests, e.g. for isBoardCollection

describe("isBoard", () => {
  test("return true for valid boards", () => {
    [
      {
        name: "B7-400X",
        vendor: "Boards R Us",
        core: "Cortex-M7",
        has_wifi: true,
      },
      {
        name: "D4-200S",
        vendor: "Boards R Us",
        core: "Cortex-M4",
        has_wifi: false,
      },
      {
        name: "Low_Power",
        vendor: "Tech Corp.",
        core: "Cortex-M0+",
        has_wifi: false,
      },
    ].forEach((board) => {
      expect(isBoard(board)).toBe(true);
    });
  });

  test("it doesn't tollerate missing props", () => {
    [
      {
        name: "B7-400X",
        vendor: "Boards R Us",
        has_wifi: true,
      },
      {
        name: "D4-200S",
        vendor: "Boards R Us",
        core: "Cortex-M4",
      },
      {
        name: undefined,
        vendor: "Tech Corp.",
        core: "Cortex-M0+",
        has_wifi: false,
      },
    ].forEach((board) => {
      expect(isBoard(board)).toBe(false);
    });
  });

  test("it doesn't tollerate incorrect types", () => {
    [
      {
        name: "B7-400X",
        vendor: "Boards R Us",
        core: "Cortex-M7",
        has_wifi: "true",
      },
      {
        name: "D4-200S",
        vendor: "Boards R Us",
        core: 1,
        has_wifi: false,
      },
      {
        name: false,
        vendor: "Tech Corp.",
        core: "Cortex-M0+",
        has_wifi: false,
      },
    ].forEach((board) => {
      expect(isBoard(board)).toBe(false);
    });
  });

  test("it does tollerate extra props", () => {
    [
      {
        name: "B7-400X",
        vendor: "Boards R Us",
        core: "Cortex-M7",
        has_wifi: true,
        foo: 1,
      },
      {
        name: "D4-200S",
        vendor: "Boards R Us",
        core: "Cortex-M4",
        has_wifi: false,
        foo: "bar",
      },
    ].forEach((board) => {
      expect(isBoard(board)).toBe(true);
    });
  });
});
