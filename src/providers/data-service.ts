import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import PouchDB from "pouchdb";
import {Character} from "../models/character-model";
let PouchDBMemory = require("pouchdb-memory");

@Injectable()
export class DataService {
    private db: any;

    constructor(inMemoryOnly: boolean = false) {
        if (inMemoryOnly) {
            console.log("memory DB");
            this.db = new PouchDBMemory("13thage_helper_daemon")
        } else {
            console.log("normal DB");
            this.db = new PouchDB("13thage_helper_daemon", {adapter: "websql"})
        }
    }

    public save(prop: string, value: any): void {
        this.db.get(prop).then((doc) => {
            this.putPref(prop, value, doc._rev);
        }).catch((error) => {
            if (error.status == 404) {
                this.putPref(prop, value, null);
            }
        });
    }

    public load(prop: string): Promise<any> {
        return this.db.get(prop);
    }

    public delete(prop: string): void {
        this.db.remove(prop).catch((error) => {
            if (error.status != 404) {
                return error;
            }
        });
    }

    public listCharacters(): Promise<Array<Character>> {
        return this.db.allDocs({include_docs: true}).then((rows) => {
            return rows.rows.map((row) => {
                if (row.doc._id.startsWith("CHAR_")) {
                    return row.doc.value
                } else {
                    return null;
                }
            }).filter(row => row);
        });
    }

    private putPref(key: string, value: any, _rev: any): Promise<any> {
        return this.db.put({
            _id: key,
            _rev: _rev,
            value: value
        })
    }
}
