import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  private _id: string;

  constructor() {}

  set id(id) {
    this._id = id;
  }

  get id() {
    return this.id;
  }
}
