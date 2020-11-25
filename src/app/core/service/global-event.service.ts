import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GlobalEventService {
  scrollEvent = new EventEmitter<any>();

  constructor() {}
}
