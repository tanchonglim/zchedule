import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor() {}

  //TODO: IF IS VALID STUDENT OR LECTURER, THEN ONLY SET ID and ROLE
  //VALIDATION LOGIC HERE
  //eg; if role = 1 , check if is student ,if yes then set id and role ; else if role = 2 check if is valid staff ..
  // then if if is valid only set role to data service
}
