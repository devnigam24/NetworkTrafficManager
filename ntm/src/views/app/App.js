import React from 'react';
import './App.scss';

import Header from './header';
import Footer from './footer';
import Authentication from '../authentication';
import Dashboard from '../dashboard';
import { UserContextProvider } from '../../view-models/context/user';
import { AccountContextProvider } from '../../view-models/context/account';
import { getItem } from '../../view-models/data/session';
import { fetchUser } from '../../view-models/data/user';
import { fetchAccount } from '../../view-models/data/admin';
import User from '../../models/user';
import getAccount from '../../models/system-account';

function App() {
  function reducer(state, { type, data }) {
    switch (type) {
      case 'setUserId':
        return { ...state, userId: data };
      case 'triggerUserUpdate':
        return { ...state, refetchUser: !state.refetchUser };
      case 'setAccountId':
        return { ...state, accountId: data };
      case 'triggerAccountUpdate':
        return { ...state, refetchAccount: !state.refetchAccount };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = React.useReducer(reducer, {
    refetchUser: false,
    refetchAccount: false,
    userId: null,
    accountId: null,
  });
  const [userInsession, setUserInSession] = React.useState(getItem('userInSession'));
  const [accountInSession, setAccountInSession] = React.useState(getItem('accountInSession'));

  React.useEffect(() => {
    async function seUserDataInContext(id) {
      const newUserFetched = await fetchUser(id);
      setUserInSession(new User(newUserFetched));
    }

    if (userInsession) {
      if (typeof userInsession === 'string') {
        seUserDataInContext(userInsession);
      }

      if (typeof userInsession === 'object') {
        seUserDataInContext(userInsession.id);
      }
    }

  }, [setUserInSession, state.refetchUser]);

  React.useEffect(() => {
    async function seUserDataInContext(id) {
      setUserInSession(new User(await fetchUser(id)));
    }

    if (state.userId && !userInsession) {
      seUserDataInContext(state.userId);
    }

  }, [setUserInSession, state.userId]);

  React.useEffect(() => {
    async function setAccountDataInContext(id) {
      setAccountInSession(getAccount(await fetchAccount(id)));
    }

    if (state.accountId && !accountInSession) {
      setAccountDataInContext(state.accountId);
    }

  }, [setAccountInSession, state.accountId]);

  React.useEffect(() => {
    async function setAccountDataInContext(id) {
      const newAccountFetched = await fetchAccount(id);
      setAccountInSession(getAccount({ ...newAccountFetched, override: true }));
    }

    if (accountInSession) {
      if (typeof accountInSession === 'string') {
        setAccountDataInContext(accountInSession);
      }

      if (typeof accountInSession === 'object') {
        setAccountDataInContext(accountInSession.id);
      }
    }

  }, [setAccountInSession, state.refetchAccount]);

  return (
    <UserContextProvider value={userInsession}>
      <AccountContextProvider value={accountInSession}>
        <div className="App">
          <Header />
          <div className={'App-Body'}>
            {userInsession && <Dashboard dispatch={dispatch} />}
            {accountInSession && <Dashboard dispatch={dispatch} />}
            {!userInsession && !accountInSession && <Authentication dispatch={dispatch} />}
          </div>
          <Footer />
        </div>
      </AccountContextProvider>
    </UserContextProvider>
  );
}

export default React.memo(App);
