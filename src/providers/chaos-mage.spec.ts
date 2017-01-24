import {ChaosMage} from "./chaos-mage";
let service: ChaosMage = null;

describe("chaosMage", () => {
  beforeEach(() => {
    service = new ChaosMage
  });

  it("is initialized", () => {
    expect(service).toBeTruthy();
  });
});
