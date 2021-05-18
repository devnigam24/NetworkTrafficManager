import React from 'react';

import { fetchListOfAccounts } from '../../view-models/data/admin';
import CreateACL from './create-acl';
import UpdateACL from './update-acl';
import ReadACL from './read-acl';
import DeleteACL from './delete-acl';

export default React.memo(({ userInSession, dispatch }) => {
  const [allAccounts, setAllSystemAccounts] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const allAccountsCreate = userInSession.accounts.filter(acc => acc.roles.includes('Create')).map(acc => acc.accountId);
      const allAccountsRead = userInSession.accounts.filter(acc => acc.roles.includes('Read')).map(acc => acc.accountId);
      const allAccountsUpdate = userInSession.accounts.filter(acc => acc.roles.includes('Update')).map(acc => acc.accountId);
      const allAccountsDelete = userInSession.accounts.filter(acc => acc.roles.includes('Delete')).map(acc => acc.accountId);

      const [
        dropDownDataCreate,
        dropDownDataRead,
        dropDownDataUpdate,
        dropDownDataDelete,
      ] = await Promise.all([
        fetchListOfAccounts(allAccountsCreate),
        fetchListOfAccounts(allAccountsRead),
        fetchListOfAccounts(allAccountsUpdate),
        fetchListOfAccounts(allAccountsDelete)
      ]);

      setAllSystemAccounts({
        dropDownDataCreate,
        dropDownDataRead,
        dropDownDataUpdate,
        dropDownDataDelete
      });
    }

    fetchData();
  }, [userInSession, setAllSystemAccounts]);

  if (!userInSession || !allAccounts) {
    return <></>;
  }

  return (
    <>
      <CreateACL userInSession={userInSession} accounts={allAccounts.dropDownDataCreate} dispatch={dispatch}/>
      <UpdateACL userInSession={userInSession} accounts={allAccounts.dropDownDataUpdate} dispatch={dispatch}/>
      <DeleteACL userInSession={userInSession} accounts={allAccounts.dropDownDataDelete} dispatch={dispatch}/>
      <ReadACL userInSession={userInSession} accounts={allAccounts.dropDownDataRead} dispatch={dispatch}/>
    </>
  );
});
