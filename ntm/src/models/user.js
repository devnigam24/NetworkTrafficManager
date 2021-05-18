import { v4 as uuidv4 } from 'uuid';

export default class User {
  constructor({ id, firstName, lastName, email, password, accountRequestsPending, accounts, acls }) {
    this.id = id || uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.accounts = accounts || [];
    this.accountRequestsPending = accountRequestsPending || [];
    this.acls = acls || [];
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
