import {DataService} from "./data-service";

let service: DataService = null;
let prop = "PROP";
let value = "VALUE";

describe("DataService", () => {
    beforeEach(() => {
        service = new DataService(true);
    });

    it("initializes", () => {
        expect(service).toBeTruthy();
    });

    it("saves and loads data", (done) => {
        service.save(prop, value);
        setTimeout(() => {
            let loadedValue = "";
            service.load(prop).then((row) => {
                loadedValue = row.value
                expect(loadedValue).toEqual(value);
                done();
            }).catch((error) => {
                console.log(error);
            });
        }, 500);
    });

    it("saves and deletes data", (done) => {
        service.save(prop, value);
        setTimeout(() => {
            setTimeout(() => {
                service.delete(prop);
                let loadedValue = "";
                service.load(prop).then((row) => {
                    loadedValue = row.value
                }).catch((error) => {
                    console.log(error);
                });
                expect(loadedValue).toEqual("");
                done();
            }, 500);
        }, 500);
    });
});
