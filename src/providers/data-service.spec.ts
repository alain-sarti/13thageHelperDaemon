import {DataService} from "./data-service";

let service: DataService = null;

describe("DataService", () => {
    beforeEach(() => {
        service = new DataService(true);
    });

    it("initializes", () => {
        expect(service).toBeTruthy();
    });

    it("saves data", () => {

    });
});
