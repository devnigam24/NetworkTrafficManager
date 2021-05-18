import { v4 as uuidv4 } from 'uuid';

class SystemAccount {
  constructor(params) {
    this.id = params.id || uuidv4();
    this.accountName = params.accountName;
    this.password = params.password;
    this.userGroup = params.userGroup || [];
    this.userGroupRequestedToAdd = params.userGroupRequestedToAdd || [];
  }
};

let singeltonAccount = null;

const AccountCreater = (params) => {
  if (params.override) {
    singeltonAccount = new SystemAccount(params);
  }

  if (!singeltonAccount) {
    singeltonAccount = new SystemAccount(params);
  }
  
  return singeltonAccount;
}

export default AccountCreater;
