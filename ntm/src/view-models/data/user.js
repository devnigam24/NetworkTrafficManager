import { setItem } from './session';
import { fetchAccount, updateAccountData } from './admin';
import { removeFromArray } from '../../utils/array';

const fetchConfig = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
};

export const fetchUser = async (id) =>
  await fetch(`${process.env.REACT_APP_USERS_ENDPOINT}/${id}`, fetchConfig)
    .then(async (response) => await response.json())
    .catch(error => {
      console.log(error);
      return null;
    });

export const searchResult = async (text) =>
  await fetch(`${process.env.REACT_APP_USERS_ENDPOINT}?q=${text}`, fetchConfig)
    .then(async (response) => await response.json())
    .catch(error => {
      console.log(error);
      return null;
    });

export const createUser = async (data) =>
  await fetch(`${process.env.REACT_APP_USERS_ENDPOINT}`, {
    ...fetchConfig,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(async (response) => await response.json());


export const validateLogin = async ({ email, password }) => {
  const emailSearch = await searchResult(email);

  if (emailSearch.length) {
    const { password: actualPassword, id } = emailSearch[0];
    
    if (actualPassword === password) {
      setItem(['userInSession', id]);
      return id;
    }
  }
  return false;
};

export const updateUserData = async data => {
  return await fetch(`${process.env.REACT_APP_USERS_ENDPOINT}/${data.id}`, {
    ...fetchConfig,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(async (response) => await response.json())
  .catch(error => {
    console.log(error);
    return null;
  });
}

export const systemAccountRequested = async accountId => {
  const userId = JSON.parse(sessionStorage.getItem('userInSession'));

  const userData = await fetchUser(userId);

  if (!userData.accountRequestsPending.includes(accountId)) {
    userData.accountRequestsPending.push(accountId);
    return await updateUserData(userData);
  }
};

export const fetchListOfAccounts = async accountIds => {
  return await Promise.all(accountIds.map(accountId => fetchUser(accountId)));
};

export const provideAccess = async ({ account, roles }) => {
  const currentAccountId = JSON.parse(sessionStorage.getItem('accountInSession'));
  account.accountRequestsPending = removeFromArray(account.accountRequestsPending, currentAccountId);
  account.accounts.push({
    accountId: currentAccountId,
    roles
  });

  const accountData = await fetchAccount(currentAccountId);
  accountData.userGroupRequestedToAdd = removeFromArray(accountData.userGroupRequestedToAdd, account.id);
  accountData.userGroup.push(account.id);

  return await Promise.all([updateUserData(account), updateAccountData(accountData)]);
};

export const saveACL = async (userInSession, acl) => {
  const aclIndex = userInSession.acls.findIndex(existingACL => existingACL.id === acl.id);
  if (aclIndex !== -1) {
    userInSession.acls.splice(aclIndex, 1, acl);
  } else {
    userInSession.acls.push(acl);
  }
  return await updateUserData(userInSession);
}
