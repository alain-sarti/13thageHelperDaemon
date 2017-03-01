import {App} from "./app.component";
import {PlatformMock, TranslateServiceMock} from "../mocks";
describe("App", () => {
  let app: App = null;

  beforeEach(() => {
    app = new App((<any>new PlatformMock), (<any>new TranslateServiceMock));
  });

  it("initializes", () => {
    expect(app).toBeTruthy();
  });
});
