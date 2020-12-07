import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";

@Injectable({
  providedIn: "root",
})
export class SubjectServiceService {
  constructor(private ds: DataServiceService) {}
}
