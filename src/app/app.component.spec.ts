import {App} from "./app.component";
import {PlatformMock} from "../mocks";
describe("App", () => {
  let app: App = null;

  beforeEach(() => {
    app = new App((<any>new PlatformMock));
  });

  it("initializes", () => {
    expect(app).toBeTruthy();
  });
});
