import React from 'react';

import ManageAccess from './request-access';
import GrantAccess from './grant-access';
import UserHome from './user-home';
import AccountHome from './admin-home';
import ManageACL from './manage-acl'
import Nav from './nav';
import { AccountContext } from '../../view-models/context/account';
import { UserContext } from '../../view-models/context/user';
import { fetchAllAccounts, fetchSearchAccounts } from '../../view-models/data/admin';
import { getResultsInChunks, compare } from '../../utils/array';

const Dashboard = (props) => {
  const accountInSession = React.useContext(AccountContext);
  const userInSession = React.useContext(UserContext);

  function reducer(state, action) {
    switch (action.type) {
      case 'home':
        return { ...state, activeTab: 'home' };
      case 'manageAccess':
        return { ...state, activeTab: 'manageAccess' };
      case 'createACL':
        return { ...state, activeTab: 'createACL' };
      case 'initiateUserRefetch': {
        props.dispatch({ type: 'triggerUserUpdate' });
        return state;
      }
      case 'initiateAccountRefetch': {
        props.dispatch({ type: 'triggerAccountUpdate' });
        return state;
      }
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(reducer, {
    activeTab: 'home'
  });

  const [allAccounts, setAllAccounts] = React.useState(null);
  const [searchText, setTextSearch] = React.useState(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    async function searchTextEntered() {
      const allAccounts = await fetchSearchAccounts(searchText);
      setAllAccounts(getResultsInChunks(allAccounts, 5));
    }
    if (state.activeTab === 'manageAccess')
      searchTextEntered();
  }, [searchText]);

  React.useEffect(() => {
    async function fetchAllSystemmAccounts() {
      const allAccounts = await fetchAllAccounts();
      setAllAccounts(getResultsInChunks(allAccounts, 5));
    }
    fetchAllSystemmAccounts();
  }, [setAllAccounts]);

  const onClickId = React.useCallback(() => {
    const aclsCopy = [...userInSession?.acls];
    count % 2 === 0
      ?
      aclsCopy.sort((a, b) => compare(a.id, b.id))
      :
      aclsCopy.sort((a, b) => compare(b.id, a.id));

    userInSession.acls = null;
    userInSession.acls = aclsCopy;
    setCount(value => value + 1);
  }, [userInSession?.acls]);

  const onClickName = React.useCallback(() => {
    const aclsCopy = [...userInSession?.acls];
    count % 2 === 0
      ?
      aclsCopy.sort((a, b) => compare(a.name, b.name))
      :
      aclsCopy.sort((a, b) => compare(b.name, a.name));

    userInSession.acls = null;
    userInSession.acls = aclsCopy;
    setCount(value => value + 1);
  }, [userInSession?.acls]);

  const onClickIP = React.useCallback(() => {
    const aclsCopy = [...userInSession?.acls];
    count % 2 === 0
      ?
      aclsCopy.sort((a, b) => compare(a.type === 'Source' ? a.sourceIP : a.destinationIP, b.type === 'Source' ? b.sourceIP : b.destinationIP))
      :
      aclsCopy.sort((a, b) => compare(b.type === 'Source' ? b.sourceIP : b.destinationIP, a.type === 'Source' ? a.sourceIP : a.destinationIP))

    userInSession.acls = null;
    userInSession.acls = aclsCopy;
    setCount(value => value + 1);
  }, [userInSession?.acls]);

  const onSearchACLs = React.useCallback((text) => {
    let aclsCopy = [...userInSession?.acls];
    aclsCopy = aclsCopy.filter(acl => {
      return acl?.id.indexOf(text) > -1 || acl?.name.indexOf(text) > -1 || acl?.accountName.indexOf(text) > -1 || acl?.sourceIP.indexOf(text) > -1 || acl?.sourceProtocol.indexOf(text) > -1 || acl?.sourceDecesion.indexOf(text) > -1 || acl?.accountName.indexOf(text) > -1;
    });
    userInSession.acls = null;
    userInSession.acls = aclsCopy;
    setCount(value => value + 1);
  }, [userInSession?.acls]);

  console.log(userInSession);

  return (
    <div className={'dashboard-container'}>
      <Nav
        dispatch={dispatch}
        userInSession={userInSession}
        setTextSearch={setTextSearch}
      />

      <div className={'dashboard'}>
        {userInSession && state.activeTab === 'home' &&
          <UserHome
            acls={userInSession?.acls ?? []}
            fullName={userInSession.fullName}
            accountRequestsPending={userInSession.accountRequestsPending}
            onClickId={onClickId}
            onClickName={onClickName}
            onClickIP={onClickIP}
            onSearchACLs={onSearchACLs}
          />}
        {userInSession && state.activeTab === 'manageAccess' && <ManageAccess dispatch={dispatch} allAccounts={allAccounts} />}
        {userInSession && state.activeTab === 'createACL' && <ManageACL userInSession={userInSession} dispatch={dispatch} />}
        {accountInSession && state.activeTab === 'home' && <AccountHome accountInSession={accountInSession} />}
        {accountInSession && state.activeTab === 'manageAccess' && <GrantAccess accountInSession={accountInSession} dispatch={dispatch} />}
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
