import React from 'react';
import { Alert } from 'react-bootstrap';

export default React.memo(({ accountInSession }) => {
  if (!accountInSession?.id) {
    return <></>;
  }

  return (
    <div className={'user-home-container'}>
      <Alert variant="success">
        <Alert.Heading>{`Account Name: ${accountInSession.accountName}`}</Alert.Heading>
        <p>{`Total number of Users: ${accountInSession.userGroup.length}`}</p>
        <p>{`Total number of pending requests :${accountInSession.userGroupRequestedToAdd.length}`}</p>
        <hr />
        <p className="mb-0">
          Below you can see the health of your ACLs
        </p>
      </Alert>
    </div>
  );
});
