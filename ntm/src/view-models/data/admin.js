import { systemAccountRequested } from './user';
import { setItem } from './session';

const fetchConfig = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
};

export const fetchAllAccounts = async () =>
  await fetch(`${process.env.REACT_APP_ADMINS_ENDPOINT}`, fetchConfig)
    .then(async (response) => await response.json())
    .catch(error => {
      console.log(error);
      return null;
    });

export const fetchSearchAccounts = async text =>
  await fetch(`${process.env.REACT_APP_ADMINS_ENDPOINT}?q=${text}`, fetchConfig)
    .then(async (response) => await response.json())
    .catch(error => {
      console.log(error);
      return null;
    });

export const fetchAccount = async (id) =>
  await fetch(`${process.env.REACT_APP_ADMINS_ENDPOINT}/${id}`, fetchConfig)
    .then(async (response) => await response.json())
    .catch(error => {
      console.log(error);
      return null;
    });

export const createSystemAccount = async (data) =>
  await fetch(`${process.env.REACT_APP_ADMINS_ENDPOINT}`, {
    ...fetchConfig,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(async (response) => await response.json());


export const validateAccount = async ({ id, password }) => {
  const accountFromDb = await fetchAccount(id);

  if (accountFromDb.password === password) {
    setItem(['accountInSession', id]);
    return id;
  }

  return false;
}

export const addUserInUserGroup = async accountId => {
  const accountData = await fetchAccount(accountId);
  const userId = JSON.parse(sessionStorage.getItem('userInSession'));
  accountData.userGroupRequestedToAdd.push(userId);

  const promises = [
    fetch(`${process.env.REACT_APP_ADMINS_ENDPOINT}/${accountId}`, {
      ...fetchConfig,
      method: 'PUT',
      body: JSON.stringify(accountData)
    })
      .then(async (response) => await response.json())
      .catch(error => {
        console.log(error);
        return null;
      }),
    systemAccountRequested(accountId)
  ];

  return await Promise.all(promises);
}

export const updateAccountData = async data => {
  return await fetch(`${process.env.REACT_APP_ADMINS_ENDPOINT}/${data.id}`, {
    ...fetchConfig,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(async (response) => await response.json())
    .catch(error => {
      console.log(error);
      return null;
    });
}

export const fetchListOfAccounts = async accountIds => {
  return await Promise.all(accountIds.map(accountId => fetchAccount(accountId)));
};
