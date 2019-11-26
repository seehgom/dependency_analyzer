import { ImportDefaultSpecifier } from "../src/types/ImportDefaultSpecifier";
import { expect } from "chai";

describe("ImportDefaultSpecifier test", () => {
  it("ImportDefaultSpecifier should exist", () => {
    const jsonData = {
      type: "ImportDefaultSpecifier",
      local: {
        type: "Identifier",
        name: "Ctrl3Name"
      }
    };
    const obj: ImportDefaultSpecifier = ImportDefaultSpecifier.fromJson(jsonData);
    expect(obj instanceof ImportDefaultSpecifier).true;
  });
});
