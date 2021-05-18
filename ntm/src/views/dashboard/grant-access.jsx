import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

import AccountList from './user-list';
import { getResultsInChunks } from '../../utils/array';
import { fetchListOfAccounts, provideAccess } from '../../view-models/data/user'; 
import './index.scss';

export default React.memo(({ dispatch, accountInSession }) => {
  const [userList, setUserList] = React.useState(null);

  React.useEffect(() => {
    async function fetchAllUserAccounts() {
      setUserList(getResultsInChunks(await fetchListOfAccounts(accountInSession.userGroupRequestedToAdd), 5));
    }

    if (!userList)
      fetchAllUserAccounts();
  }, [setUserList, accountInSession]);

  const onAccessGranted = React.useCallback((params) => {
    async function grantAccess() {
      await provideAccess(params);
      dispatch({ type: 'initiateAccountRefetch' });
    }

    grantAccess();
  }, []);

  if (!accountInSession?.id) {
    return <></>;
  }

  return (
    <div className={'accounts-list'}>
      { userList
        ?
        <AccountList userList={userList} onAccessGranted={onAccessGranted} dispatch={dispatch} />
        :
        (
          <Jumbotron fluid>
            <Container>
              <h1>No accounts to manage</h1>
              <p>{'If a user requests access to this account they will appear here'}</p>
            </Container>
          </Jumbotron>
        )
      }
    </div>
  );
});
