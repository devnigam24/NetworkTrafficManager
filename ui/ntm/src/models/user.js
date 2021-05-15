export default class User {
  constructor({ id, name, accounts, acls }) {
    this.id = id;
    this.name = name;
    this.accounts = accounts;
    this.acls = acls;
  }
}
