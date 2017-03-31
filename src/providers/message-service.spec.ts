import {MessageService} from "./message-service";
import {AlertControllerMock, ToastControllerMock, TranslateServiceMock} from "../mocks";
let service: MessageService = null;

describe("MessageService", () => {
    beforeEach(() => {
        service = new MessageService(new AlertControllerMock(), new ToastControllerMock(), new TranslateServiceMock());
    });

    it("initializes", () => {
        expect(service).toBeTruthy();
    });

    it("shows Toast", () => {
        spyOn(service.translate, "instant").and.returnValue("TEST");
        let promise = service.showToast("TEST");
        expect(promise).toBeTruthy();
    });

    it("shows Error", () => {
        spyOn(service.translate, "instant").and.returnValue("TEST");
        let promise = service.showError("TEST");
        expect(promise).toBeTruthy();
    });
});
