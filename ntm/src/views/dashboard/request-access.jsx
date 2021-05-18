import React from 'react';

import AccountList from './accounts-list';

import './index.scss';

export default React.memo(({ dispatch, allAccounts }) => {
  return (
    <div className={'accounts-list'}>
      { allAccounts &&  <AccountList accountList={allAccounts} dispatch={dispatch}/>}
    </div>
  );
});
