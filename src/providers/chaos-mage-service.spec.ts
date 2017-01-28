import {ChaosMageService} from "./chaos-mage-service";

let service: ChaosMageService = null;

describe("ChaosMageService", () => {
  beforeEach(() => {
    service = new ChaosMageService();
  });

  it("initializes", () => {
    expect(service).toBeTruthy();
  });

  it("gets a random SpellType", () => {
    expect(service.nextSpellType()).toBeTruthy();
  });
});
