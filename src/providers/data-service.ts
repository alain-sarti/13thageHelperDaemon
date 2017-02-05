import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import PouchDB from "pouchdb";

@Injectable()
export class DataService {
  private db: any;

  constructor() {
    this.db = new PouchDB("13thage_helper_daemon", { adapter: "websql" })
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

  private putPref(key: string, value: any, _rev: any): void {
    this.db.put({
      _id: key,
      _rev: _rev,
      value: value
    })
  }
}
